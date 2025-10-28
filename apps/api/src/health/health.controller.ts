import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { prisma } from '@metapulse/db';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.prismaHealth.pingCheck('database', prisma),
    ]);
  }

  @Get('status')
  getStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      port: process.env.PORT,
      database: process.env.DATABASE_URL ? 'configured' : 'missing',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'not set',
      cors: process.env.ALLOWED_ORIGINS || 'default'
    };
  }

  @Get('test')
  async testConnection() {
    try {
      // Test database connection
      await prisma.$queryRaw`SELECT 1`;
      
      return {
        status: 'success',
        message: 'API is working correctly',
        timestamp: new Date().toISOString(),
        database: 'connected',
        services: {
          api: 'running',
          database: 'connected',
          websocket: 'available'
        }
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Database connection failed',
        timestamp: new Date().toISOString(),
        error: error.message,
        database: 'disconnected'
      };
    }
  }
}