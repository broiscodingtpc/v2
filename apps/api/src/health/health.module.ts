import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController, RootController } from './health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [RootController, HealthController],
})
export class HealthModule {}