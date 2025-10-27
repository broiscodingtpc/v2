# MetaPulse Deployment Guide

This guide covers deploying the complete MetaPulse platform to Railway, including all services and required infrastructure.

## 🏗️ Architecture Overview

The MetaPulse platform consists of four main services:

1. **API Service** (NestJS) - Core backend API
2. **Bot Service** (Telegraf) - Telegram bot interface
3. **Worker Service** (Node.js) - Background data processing
4. **Web Service** (Next.js) - Frontend dashboard

## 🚀 Railway Deployment

### Quick Fix Checklist (Railway)

- Create separate Railway services for each subdirectory: `apps/web`, `apps/api`, `apps/bot`, and `apps/worker`.
- Web service: set `NEXT_PUBLIC_API_URL` to your API service URL (no trailing `/api`), `NEXT_PUBLIC_WS_URL` to `wss://<api-service>`, `NEXT_PUBLIC_BOT_USERNAME` to `@metapulsemetabot`, `NEXTAUTH_URL` to your web URL, and `NEXTAUTH_SECRET`.
- API service: set `PORT=$PORT`, `DATABASE_URL`, `JWT_SECRET`, and `ALLOWED_ORIGINS` to include your web URL (comma-separated if multiple origins).
- Bot service: set `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_URL` to your bot service URL (no `/webhook` suffix; the app appends it), `TELEGRAM_WEBHOOK_SECRET`, and `API_BASE_URL` to `https://<api-service>/api`.
- Worker service: set `PORT=$PORT`, `DATABASE_URL`, and any external API keys needed.
- Remove unused `WEB_PORT` and `BOT_PORT` env vars — the platform-provided `PORT` is used.
- Verify:
  - API health: `GET https://<api-service>/api/health`
  - Web loads and can fetch from API without CORS errors
  - Bot logs show “Webhook set to: <bot-url>/webhook” and responds to `/health`
  - Worker logs show DB activity (pairs/mentions/reports populated)

### Prerequisites

- Railway account
- GitHub repository with MetaPulse code
- Required API keys (see environment variables section)

### 1. Database Setup

First, create a PostgreSQL database on Railway:

1. Go to Railway dashboard
2. Click "New Project"
3. Select "Provision PostgreSQL"
4. Note the connection details

### 2. Redis Setup

Create a Redis instance for job queues:

1. In your Railway project
2. Click "New Service"
3. Select "Redis"
4. Note the connection URL

### 3. Service Deployment

Deploy each service separately:

#### API Service

1. **Create New Service**:
   - Click "New Service" → "GitHub Repo"
   - Select your MetaPulse repository
   - Set root directory to `apps/api`

2. **Environment Variables**:
  ```bash
  NODE_ENV=production
  PORT=$PORT
  DATABASE_URL=${{Postgres.DATABASE_URL}}
  JWT_SECRET=your-super-secret-jwt-key-here
  ALLOWED_ORIGINS=https://your-web-app.railway.app
  ```

3. **Build Configuration**:
   Railway will automatically detect the build configuration from `railway.json`

#### Bot Service

1. **Create New Service**:
   - Click "New Service" → "GitHub Repo"
   - Select your MetaPulse repository
   - Set root directory to `apps/bot`

2. **Environment Variables**:
  ```bash
  NODE_ENV=production
  TELEGRAM_BOT_TOKEN=your-telegram-bot-token
  API_BASE_URL=https://your-api-service.railway.app/api
  API_KEY=your-api-key
  TELEGRAM_WEBHOOK_URL=https://your-bot-service.railway.app
  TELEGRAM_WEBHOOK_SECRET=your-webhook-secret
  RATE_LIMIT_WINDOW=60000
  RATE_LIMIT_MAX=30
  ENABLE_WEBHOOK=true
  ```

#### Worker Service

1. **Create New Service**:
   - Click "New Service" → "GitHub Repo"
   - Select your MetaPulse repository
   - Set root directory to `apps/worker`

2. **Environment Variables**:
   ```bash
   NODE_ENV=production
   PORT=$PORT
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   REDIS_URL=${{Redis.REDIS_URL}}
   
   # External APIs
   DEXSCREENER_API_URL=https://api.dexscreener.com/latest
   COINGECKO_API_KEY=your-coingecko-api-key
   COINMARKETCAP_API_KEY=your-coinmarketcap-api-key
   
   # AI Services
   GROQ_API_KEY=your-groq-api-key
   GEMINI_API_KEY=your-gemini-api-key
   
   # Twitter API
   TWITTER_BEARER_TOKEN=your-twitter-bearer-token
   TWITTER_API_KEY=your-twitter-api-key
   TWITTER_API_SECRET=your-twitter-api-secret
   TWITTER_ACCESS_TOKEN=your-twitter-access-token
   TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
   
   # Job Configuration
   ENABLE_SCHEDULED_JOBS=true
   TOKEN_DATA_INTERVAL=300000
   SOCIAL_DATA_INTERVAL=600000
   AI_ANALYSIS_INTERVAL=900000
   SIGNAL_GENERATION_INTERVAL=300000
   CLEANUP_INTERVAL=3600000
   ```

#### Web Service

1. **Create New Service**:
   - Click "New Service" → "GitHub Repo"
   - Select your MetaPulse repository
   - Set root directory to `apps/web`

2. **Environment Variables**:
   ```bash
   NODE_ENV=production
   PORT=$PORT
   NEXT_PUBLIC_API_URL=https://your-api-service.railway.app
   NEXTAUTH_URL=https://your-web-service.railway.app
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

### 4. Domain Configuration

1. **Custom Domains** (Optional):
   - Go to each service settings
   - Add custom domain
   - Update CORS and webhook URLs accordingly

2. **Service URLs**:
   - API: `https://your-api-service.railway.app`
   - Bot: `https://your-bot-service.railway.app`
   - Worker: `https://your-worker-service.railway.app`
   - Web: `https://your-web-service.railway.app`

## 🔧 Environment Variables Reference

### Required API Keys

| Service | Description | Where to Get |
|---------|-------------|--------------|
| `BOT_TOKEN` | Telegram Bot Token | [@BotFather](https://t.me/botfather) |
| `GROQ_API_KEY` | Groq AI API Key | [Groq Console](https://console.groq.com) |
| `GEMINI_API_KEY` | Google Gemini API Key | [Google AI Studio](https://makersuite.google.com) |
| `TWITTER_BEARER_TOKEN` | Twitter API Bearer Token | [Twitter Developer Portal](https://developer.twitter.com) |
| `COINGECKO_API_KEY` | CoinGecko API Key | [CoinGecko API](https://www.coingecko.com/en/api) |
| `COINMARKETCAP_API_KEY` | CoinMarketCap API Key | [CoinMarketCap API](https://coinmarketcap.com/api/) |

### Security Keys

Generate secure random keys for:
- `JWT_SECRET`: `openssl rand -base64 32`
- `WEBHOOK_SECRET`: `openssl rand -base64 32`
- `NEXTAUTH_SECRET`: `openssl rand -base64 32`

## 📋 Deployment Checklist

### Pre-deployment
- [ ] All API keys obtained and tested
- [ ] Database schema reviewed
- [ ] Environment variables prepared
- [ ] Custom domains configured (if using)

### Deployment Steps
- [ ] PostgreSQL database created
- [ ] Redis instance created
- [ ] API service deployed and healthy
- [ ] Worker service deployed and processing jobs
- [ ] Bot service deployed and responding
- [ ] Web service deployed and accessible

### Post-deployment
- [ ] Database migrations applied
- [ ] Health checks passing
- [ ] Bot webhook configured
- [ ] Job queues processing
- [ ] Monitoring alerts configured

## 🔍 Monitoring & Health Checks

### Health Check Endpoints

- **API**: `GET /health`
- **Worker**: `GET /health`
- **Bot**: `GET /health`

### Monitoring Setup

1. **Railway Metrics**:
   - CPU and memory usage
   - Request rates and response times
   - Error rates

2. **Application Logs**:
   - Structured JSON logging
   - Error tracking
   - Performance metrics

3. **Database Monitoring**:
   - Connection pool status
   - Query performance
   - Storage usage

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   ```bash
   # Check DATABASE_URL format
   postgresql://username:password@host:port/database
   ```

2. **Redis Connection Issues**:
   ```bash
   # Verify REDIS_URL
   redis://default:password@host:port
   ```

3. **API Key Issues**:
   - Verify all API keys are valid
   - Check rate limits and quotas
   - Ensure proper permissions

4. **Build Failures**:
   - Check build logs in Railway dashboard
   - Verify package.json scripts
   - Check TypeScript compilation

### Debug Commands

```bash
# Check service logs
railway logs --service=api-service

# Connect to database
railway connect postgres

# Check Redis connection
railway connect redis
```

## 🔄 CI/CD Pipeline

### Automatic Deployments

Railway automatically deploys when you push to your main branch:

1. **Webhook Setup**:
   - Railway monitors your GitHub repository
   - Automatic builds on push to main
   - Zero-downtime deployments

2. **Build Process**:
   - Install dependencies
   - Run TypeScript compilation
   - Execute database migrations
   - Start services

### Manual Deployments

```bash
# Deploy specific service
railway up --service=api-service

# Deploy with environment
railway up --environment=production
```

## 📊 Scaling Considerations

### Horizontal Scaling

1. **API Service**:
   - Multiple replicas for high availability
   - Load balancing handled by Railway

2. **Worker Service**:
   - Scale based on job queue length
   - Redis handles job distribution

3. **Database**:
   - Read replicas for analytics
   - Connection pooling optimization

### Performance Optimization

1. **Caching Strategy**:
   - Redis for session storage
   - API response caching
   - Database query optimization

2. **Resource Allocation**:
   - Monitor CPU and memory usage
   - Adjust replica counts based on load
   - Optimize database queries

## 🔒 Security Best Practices

### Environment Security
- Use Railway's secret management
- Rotate API keys regularly
- Enable HTTPS for all services
- Configure CORS properly

### Database Security
- Use connection pooling
- Enable SSL connections
- Regular security updates
- Backup strategy

### API Security
- Rate limiting enabled
- JWT token validation
- Input sanitization
- Error handling without information leakage

## 📈 Cost Optimization

### Railway Pricing
- Monitor resource usage
- Optimize build times
- Use appropriate service sizes
- Consider sleep mode for development

### Resource Efficiency
- Optimize Docker images
- Minimize dependencies
- Use efficient algorithms
- Monitor and optimize queries

## 🆘 Support & Maintenance

### Regular Maintenance
- Monitor service health
- Update dependencies
- Review logs for errors
- Performance optimization

### Backup Strategy
- Database backups
- Environment variable backups
- Code repository backups
- Configuration backups

### Emergency Procedures
- Service restart procedures
- Rollback strategies
- Incident response plan
- Contact information

---

## 📞 Support

For deployment issues:
1. Check Railway service logs
2. Review environment variables
3. Verify API key validity
4. Check database connectivity
5. Contact support if needed

**MetaPulse Platform** - Successfully deployed and ready to provide intelligent cryptocurrency analysis!
