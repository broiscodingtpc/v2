import { Telegraf } from 'telegraf';
import express from 'express';
import { config } from '../config';
import { logger } from './logger';

export async function setupWebhook(bot: Telegraf) {
  try {
    if (!config.TELEGRAM_WEBHOOK_URL) {
      throw new Error('TELEGRAM_WEBHOOK_URL is required for webhook setup');
    }

    // Create Express app for webhook
    const app = express();
    
    // Use built-in webhook middleware
    app.use(bot.webhookCallback('/webhook'));
    
    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        service: 'metapulse-bot'
      });
    });

    // Bot info endpoint
    app.get('/bot/info', async (req, res) => {
      try {
        const botInfo = await bot.telegram.getMe();
        res.json({
          bot: botInfo,
          webhook: config.TELEGRAM_WEBHOOK_URL,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        logger.error('Error getting bot info:', error);
        res.status(500).json({ error: 'Failed to get bot info' });
      }
    });

    // Start server
    const server = app.listen(config.PORT, () => {
      logger.info(`Bot webhook server listening on port ${config.PORT}`);
    });

    // Set webhook
    await bot.telegram.setWebhook(config.TELEGRAM_WEBHOOK_URL + '/webhook', {
      secret_token: config.TELEGRAM_WEBHOOK_SECRET
    });

    logger.info(`Webhook set to: ${config.TELEGRAM_WEBHOOK_URL}/webhook`);

    // Graceful shutdown
    process.once('SIGINT', () => {
      logger.info('Received SIGINT, shutting down gracefully');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });

    process.once('SIGTERM', () => {
      logger.info('Received SIGTERM, shutting down gracefully');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to setup webhook:', error);
    throw error;
  }
}