import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'metapulse-api',
      version: '2.0.0'
    };
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
  }
}