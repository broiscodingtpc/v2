import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { SignalsModule } from './signals/signals.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { ReportsModule } from './reports/reports.module';
import { BotModule } from './bot/bot.module';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    HealthModule,
    AuthModule,
    UsersModule,
    TokensModule,
    SignalsModule,
    WatchlistModule,
    ReportsModule,
    BotModule,
    WebSocketModule,
  ],
})
export class AppModule {}