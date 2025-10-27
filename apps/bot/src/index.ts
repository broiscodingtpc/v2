import { Telegraf, Context } from 'telegraf';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config';
import { CommandHandlers } from './handlers/commands';
import { CallbackHandlers } from './handlers/callbacks';
import { apiService } from './services/api';
import { userService } from './services/user';
import { watchlistService } from './services/watchlist';
import { signalService } from './services/signal';
import { botService } from './services/bot';
import { alertService } from './services/alert';
import { formatSteampunkMessage } from './utils/formatter';
import { logger } from './utils/logger';
import { setupWebhook } from './utils/webhook';

const app = express();
const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting middleware
const userLastRequest = new Map<string, number>();

const rateLimitMiddleware = (ctx: Context, next: () => Promise<void>) => {
  const userId = ctx.from?.id.toString();
  if (!userId) return next();

  const now = Date.now();
  const lastRequest = userLastRequest.get(userId) || 0;
  
  if (now - lastRequest < config.RATE_LIMIT_WINDOW / config.RATE_LIMIT_MAX_REQUESTS) {
    ctx.reply('⏰ Please wait a moment before sending another request.');
    return;
  }
  
  userLastRequest.set(userId, now);
  return next();
};

bot.use(rateLimitMiddleware);

// Middleware for user registration/authentication
bot.use(async (ctx, next) => {
  if (ctx.from) {
    await userService.ensureUser(ctx.from);
  }
  return next();
});

// Start command with ASCII steampunk welcome
bot.start(async (ctx) => {
  const welcomeMessage = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║        🎩 METAPULSE BOT v2.0 🎩        ║
║                                       ║
║    ⚙️  STEAMPUNK CRYPTO TERMINAL  ⚙️    ║
║                                       ║
║  Welcome to the future of crypto      ║
║  trading, powered by steam & gears!   ║
╚═══════════════════════════════════════╝

🎯 **What I can do for you:**

📊 **Real-time Signals** - Get AI-powered trading signals
👁️ **Watchlist Management** - Track your favorite tokens  
🔔 **Price Alerts** - Never miss important price movements
📈 **Market Analysis** - Deep insights & analytics
🤖 **Account Linking** - Connect with MetaPulse web app

Type /menu to see all available commands!

🔗 **Join our community:**
• Group: https://t.me/metapulseai
• Twitter: https://x.com/METAPULSaibot
  `);

  await ctx.reply(welcomeMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📊 Main Menu', callback_data: 'main_menu' },
          { text: '🔗 Link Account', callback_data: 'link_account' }
        ],
        [
          { text: '💬 Join Group', url: 'https://t.me/metapulseai' },
          { text: '🐦 Follow Twitter', url: 'https://x.com/METAPULSaibot' }
        ]
      ]
    }
  });
});

// Main menu command
bot.command('menu', async (ctx) => {
  const menuMessage = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║            🎩 MAIN MENU 🎩            ║
╚═══════════════════════════════════════╝

Choose your adventure in the crypto realm:
  `);

  await ctx.reply(menuMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📊 Trading Signals', callback_data: 'signals_menu' },
          { text: '👁️ My Watchlist', callback_data: 'watchlist_menu' }
        ],
        [
          { text: '🔔 Price Alerts', callback_data: 'alerts_menu' },
          { text: '📈 Market Analysis', callback_data: 'analysis_menu' }
        ],
        [
          { text: '⚙️ Settings', callback_data: 'settings_menu' },
          { text: '❓ Help', callback_data: 'help_menu' }
        ],
        [
          { text: '🔗 Link Web Account', callback_data: 'link_account' }
        ]
      ]
    }
  });
});

// Signals menu
bot.action('signals_menu', async (ctx) => {
  const signalsMessage = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║         📊 TRADING SIGNALS 📊         ║
╚═══════════════════════════════════════╝

Access AI-powered trading insights:
  `);

  await ctx.editMessageText(signalsMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🔥 Hot Signals', callback_data: 'hot_signals' },
          { text: '📈 Bullish Signals', callback_data: 'bullish_signals' }
        ],
        [
          { text: '📉 Bearish Signals', callback_data: 'bearish_signals' },
          { text: '⚡ Flash Signals', callback_data: 'flash_signals' }
        ],
        [
          { text: '🎯 Custom Alerts', callback_data: 'custom_signals' },
          { text: '📊 Signal History', callback_data: 'signal_history' }
        ],
        [
          { text: '🔙 Back to Menu', callback_data: 'main_menu' }
        ]
      ]
    }
  });
});

// Watchlist menu
bot.action('watchlist_menu', async (ctx) => {
  const user = await userService.getUser(ctx.from!.id);
  const watchlist = await watchlistService.getUserWatchlist(user.id);
  
  const watchlistMessage = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║          👁️ MY WATCHLIST 👁️           ║
╚═══════════════════════════════════════╝

You're tracking ${watchlist.length} tokens:
  `);

  await ctx.editMessageText(watchlistMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📋 View Watchlist', callback_data: 'view_watchlist' },
          { text: '➕ Add Token', callback_data: 'add_token' }
        ],
        [
          { text: '🗑️ Remove Token', callback_data: 'remove_token' },
          { text: '🔄 Refresh Prices', callback_data: 'refresh_watchlist' }
        ],
        [
          { text: '📊 Watchlist Signals', callback_data: 'watchlist_signals' }
        ],
        [
          { text: '🔙 Back to Menu', callback_data: 'main_menu' }
        ]
      ]
    }
  });
});

// Alerts menu
bot.action('alerts_menu', async (ctx) => {
  const user = await userService.getUser(ctx.from!.id);
  const alerts = await alertService.getUserAlerts(user.id);
  
  const alertsMessage = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║          🔔 PRICE ALERTS 🔔           ║
╚═══════════════════════════════════════╝

You have ${alerts.length} active alerts:
  `);

  await ctx.editMessageText(alertsMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📋 View Alerts', callback_data: 'view_alerts' },
          { text: '➕ Create Alert', callback_data: 'create_alert' }
        ],
        [
          { text: '✏️ Edit Alert', callback_data: 'edit_alert' },
          { text: '🗑️ Delete Alert', callback_data: 'delete_alert' }
        ],
        [
          { text: '🔕 Mute All', callback_data: 'mute_alerts' },
          { text: '🔔 Unmute All', callback_data: 'unmute_alerts' }
        ],
        [
          { text: '🔙 Back to Menu', callback_data: 'main_menu' }
        ]
      ]
    }
  });
});

// Settings menu
bot.action('settings_menu', async (ctx) => {
  const settingsMessage = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║            ⚙️ SETTINGS ⚙️             ║
╚═══════════════════════════════════════╝

Customize your MetaPulse experience:
  `);

  await ctx.editMessageText(settingsMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🔔 Notifications', callback_data: 'notification_settings' },
          { text: '🎨 Display Options', callback_data: 'display_settings' }
        ],
        [
          { text: '⏰ Timezone', callback_data: 'timezone_settings' },
          { text: '💱 Currency', callback_data: 'currency_settings' }
        ],
        [
          { text: '🔗 Account Linking', callback_data: 'link_account' },
          { text: '📊 Export Data', callback_data: 'export_data' }
        ],
        [
          { text: '🔙 Back to Menu', callback_data: 'main_menu' }
        ]
      ]
    }
  });
});

// Help menu
bot.action('help_menu', async (ctx) => {
  const helpMessage = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║              ❓ HELP ❓               ║
╚═══════════════════════════════════════╝

**Available Commands:**
/start - Welcome & setup
/menu - Main menu
/watchlist - Quick watchlist view
/signals - Latest trading signals
/alerts - Your price alerts
/help - This help message

**Quick Actions:**
• Send a token symbol (e.g., "BTC") for instant info
• Send a contract address for detailed analysis
• Use /add [symbol] to quickly add to watchlist

**Support:**
• Group: https://t.me/metapulseai
• Twitter: https://x.com/METAPULSaibot
• Web App: https://metapulse.io

🎩 Happy trading, fellow steampunk!
  `);

  await ctx.editMessageText(helpMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '💬 Join Group', url: 'https://t.me/metapulseai' },
          { text: '🌐 Web App', url: 'https://metapulse.io' }
        ],
        [
          { text: '🔙 Back to Menu', callback_data: 'main_menu' }
        ]
      ]
    }
  });
});

// Back to main menu handler
bot.action('main_menu', async (ctx) => {
  const menuMessage = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║            🎩 MAIN MENU 🎩            ║
╚═══════════════════════════════════════╝

Choose your adventure in the crypto realm:
  `);

  await ctx.editMessageText(menuMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📊 Trading Signals', callback_data: 'signals_menu' },
          { text: '👁️ My Watchlist', callback_data: 'watchlist_menu' }
        ],
        [
          { text: '🔔 Price Alerts', callback_data: 'alerts_menu' },
          { text: '📈 Market Analysis', callback_data: 'analysis_menu' }
        ],
        [
          { text: '⚙️ Settings', callback_data: 'settings_menu' },
          { text: '❓ Help', callback_data: 'help_menu' }
        ],
        [
          { text: '🔗 Link Web Account', callback_data: 'link_account' }
        ]
      ]
    }
  });
});

// Quick commands
bot.command('watchlist', async (ctx) => {
  const user = await userService.getUser(ctx.from!.id);
  const watchlist = await watchlistService.getUserWatchlist(user.id);
  
  if (watchlist.length === 0) {
    await ctx.reply(formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║          👁️ EMPTY WATCHLIST 👁️        ║
╚═══════════════════════════════════════╝

Your watchlist is empty! 
Use /add [symbol] to start tracking tokens.
    `));
    return;
  }

  const watchlistText = await watchlistService.formatWatchlistMessage(watchlist);
  await ctx.reply(watchlistText);
});

bot.command('signals', async (ctx) => {
  const signals = await signalService.getLatestSignals(10);
  const signalsText = await signalService.formatSignalsMessage(signals);
  await ctx.reply(signalsText);
});

// Token symbol handler (e.g., "BTC", "ETH")
bot.hears(/^[A-Z]{2,10}$/, async (ctx) => {
  const symbol = ctx.message.text.toUpperCase();
  try {
    const tokenInfo = await botService.getTokenInfo(symbol);
    const formattedInfo = botService.formatTokenInfo(tokenInfo);
    
    await ctx.reply(formattedInfo, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '➕ Add to Watchlist', callback_data: `add_watchlist_${symbol}` },
            { text: '🔔 Set Alert', callback_data: `set_alert_${symbol}` }
          ],
          [
            { text: '📊 View Chart', callback_data: `view_chart_${symbol}` },
            { text: '📈 Get Signals', callback_data: `get_signals_${symbol}` }
          ]
        ]
      }
    });
  } catch (error) {
    await ctx.reply(formatSteampunkMessage(`
❌ Token "${symbol}" not found or error occurred.
Try a different symbol or contract address.
    `));
  }
});

// Error handling
bot.catch((err, ctx) => {
  logger.error('Bot error:', err);
  ctx.reply(formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║              ⚠️ ERROR ⚠️              ║
╚═══════════════════════════════════════╝

Something went wrong in the steam pipes!
Please try again or contact support.

Error ID: ${Date.now()}
  `));
});

// Start the bot
async function startBot() {
  try {
    logger.info('Starting MetaPulse Telegram Bot...');
    
    // Setup webhook if in production
    if (config.NODE_ENV === 'production') {
      await setupWebhook(bot);
    } else {
      // Use polling in development
      await bot.launch();
      logger.info('Bot started with polling');
    }

    // Graceful shutdown
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
    
    logger.info('MetaPulse Bot is running! 🎩⚙️');
  } catch (error) {
    logger.error('Failed to start bot:', error);
    process.exit(1);
  }
}

// Start the bot
startBot();