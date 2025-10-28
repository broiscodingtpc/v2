import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log('Starting API server...');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Port:', process.env.PORT);
    console.log('Database URL:', process.env.DATABASE_URL ? 'configured' : 'missing');
    
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    
    const configService = app.get(ConfigService);
    const logger = app.get(Logger);
    
    app.useLogger(logger);
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // CORS configuration
  const allowedOrigins = configService.get<string>('ALLOWED_ORIGINS')?.split(',') || [
    'http://localhost:3000',
    'https://metapulseweb-production.up.railway.app',
    'https://metapulsebot-production.up.railway.app'
  ];
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  });

  // Global prefix
  app.setGlobalPrefix('api');

    const port = configService.get<number>('PORT') || 3001;
    await app.listen(port);
    
    logger.log(`🚀 API server running on port ${port}`, 'Bootstrap');
  } catch (error) {
    console.error('Failed to start API server:', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
  process.exit(1);
});