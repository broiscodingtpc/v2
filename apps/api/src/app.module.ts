import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { SignalsModule } from './signals/signals.module';
import { ReportsModule } from './reports/reports.module';
import { BotModule } from './bot/bot.module';
import { WebSocketModule } from './websocket/websocket.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
    AuthModule,
    TokensModule,
    WatchlistModule,
    SignalsModule,
    ReportsModule,
    BotModule,
    WebSocketModule,
    HealthModule,
  ],
})
export class AppModule {}