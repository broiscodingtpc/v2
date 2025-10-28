# MetaPulse Worker Service

The MetaPulse Worker Service is a robust background processing system that handles data ingestion, AI analysis, and signal generation for the MetaPulse cryptocurrency platform. It processes real-time market data from multiple sources and generates intelligent trading insights.

## 🚀 Features

### Data Ingestion
- **DexScreener Integration**: Real-time token data, price metrics, and market statistics
- **PumpPortal Integration**: WebSocket-based token creation and trading events
- **Twitter API Integration**: Social sentiment analysis and trending topic detection
- **Multi-source Data**: Aggregates data from various cryptocurrency APIs

### AI-Powered Analysis
- **Groq Integration**: Fast technical analysis and market insights
- **Gemini Integration**: Comprehensive sentiment analysis and predictions
- **Multi-model Approach**: Combines multiple AI models for robust analysis

### Signal Generation
- **Technical Signals**: RSI, MACD, moving averages, and momentum indicators
- **Social Signals**: Sentiment-based trading opportunities
- **AI Signals**: Machine learning-powered predictions
- **Risk Assessment**: Automated risk level calculation

### Background Processing
- **Bull Queue System**: Reliable job processing with Redis
- **Scheduled Tasks**: Automated data collection and analysis
- **Error Handling**: Robust error recovery and retry mechanisms
- **Rate Limiting**: Respects API limits and prevents abuse

### Monitoring & Health
- **Health Checks**: Comprehensive service monitoring
- **Performance Metrics**: Real-time system performance tracking
- **Logging**: Structured logging with Winston
- **Database Monitoring**: Connection health and query performance

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Data Sources  │    │  Worker Service │    │    Database     │
│                 │    │                 │    │                 │
│  • DexScreener  │───▶│  • Job Queues   │───▶│  • PostgreSQL   │
│  • PumpPortal   │    │  • AI Services  │    │  • Prisma ORM   │
│  • Twitter API  │    │  • Processors   │    │  • Data Models  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │  Redis Queues   │
                       │                 │
                       │  • Token Data   │
                       │  • Social Data  │
                       │  • AI Analysis  │
                       │  • Signals      │
                       └─────────────────┘
```

## 📋 Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Redis server
- API keys for external services

## 🛠️ Installation

1. **Clone and navigate to worker directory**:
   ```bash
   cd apps/worker
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**:
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. **Start the service**:
   ```bash
   # Development
   pnpm dev

   # Production
   pnpm build
   pnpm start
   ```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `REDIS_URL` | Redis connection string | ✅ |
| `GROQ_API_KEY` | Groq AI API key | ✅ |
| `GEMINI_API_KEY` | Google Gemini API key | ✅ |
| `TWITTER_BEARER_TOKEN` | Twitter API bearer token | ✅ |
| `DEXSCREENER_API_URL` | DexScreener API endpoint | ✅ |
| `NODE_ENV` | Environment (development/production) | ✅ |

### Job Configuration

```typescript
// Job intervals (milliseconds)
TOKEN_DATA_INTERVAL=300000     // 5 minutes
SOCIAL_DATA_INTERVAL=600000    // 10 minutes
AI_ANALYSIS_INTERVAL=900000    // 15 minutes
SIGNAL_GENERATION_INTERVAL=300000  // 5 minutes
CLEANUP_INTERVAL=3600000       // 1 hour
```

### Rate Limiting

```typescript
DEXSCREENER_RATE_LIMIT=10      // requests per second
TWITTER_RATE_LIMIT=300         // requests per 15 minutes
GROQ_RATE_LIMIT=30            // requests per minute
GEMINI_RATE_LIMIT=60          // requests per minute
```

## 🔄 Job Types

### Token Data Jobs
- **Popular Tokens**: Fetches trending and high-volume tokens
- **Specific Tokens**: Updates data for specific token addresses
- **Technical Indicators**: Calculates RSI, SMA, and momentum

### Social Data Jobs
- **Trending Topics**: Identifies trending cryptocurrency topics
- **Token Mentions**: Tracks social media mentions for tokens
- **Sentiment Analysis**: Analyzes social sentiment

### AI Analysis Jobs
- **Technical Analysis**: AI-powered technical indicator analysis
- **Sentiment Analysis**: AI-driven sentiment evaluation
- **Comprehensive Analysis**: Full market analysis with predictions

### Signal Generation Jobs
- **Technical Signals**: Based on price action and indicators
- **Social Signals**: Based on social sentiment and volume
- **AI Signals**: Machine learning predictions
- **Risk Assessment**: Automated risk level calculation

### Cleanup Jobs
- **Expired Signals**: Removes old and expired signals
- **Old Metrics**: Cleans up historical data beyond retention period
- **Database Optimization**: Optimizes database performance

## 📊 API Endpoints

### Health Monitoring

```bash
# Full health check
GET /health

# Health summary
GET /health/summary
```

### Manual Job Triggers (Development Only)

```bash
# Trigger token data collection
POST /jobs/token-data

# Trigger social data collection
POST /jobs/social-data

# Trigger AI analysis
POST /jobs/ai-analysis

# Trigger signal generation
POST /jobs/signals

# Trigger cleanup
POST /jobs/cleanup
```

## 🗄️ Database Schema

### Core Models
- **Token**: Cryptocurrency token information
- **TokenMetrics**: Historical price and volume data
- **SocialMetrics**: Social media metrics and sentiment
- **TechnicalAnalysis**: Technical indicator results
- **AIAnalysis**: AI-generated analysis and predictions
- **Signal**: Trading signals and recommendations

### User Models
- **User**: Bot user information
- **WatchlistItem**: User watchlist tokens
- **Alert**: Price and volume alerts

### System Models
- **JobLog**: Job execution history
- **HealthMetric**: System health metrics
- **TrendingTopic**: Social media trending topics

## 🔍 Monitoring

### Health Checks
- Database connectivity
- External API availability
- Queue system status
- Memory and CPU usage
- Job processing rates

### Metrics
- Job success/failure rates
- API response times
- Database query performance
- Memory usage patterns
- Error frequencies

### Logging
- Structured JSON logging
- Request/response logging
- Error tracking
- Performance monitoring
- Job lifecycle tracking

## 🚀 Deployment

### Railway Deployment

1. **Connect Repository**:
   - Link your GitHub repository to Railway
   - Select the worker service directory

2. **Environment Variables**:
   ```bash
   # Set all required environment variables in Railway dashboard
   DATABASE_URL=postgresql://...
   REDIS_URL=redis://...
   GROQ_API_KEY=...
   GEMINI_API_KEY=...
   TWITTER_BEARER_TOKEN=...
   ```

3. **Build Configuration**:
   ```json
   {
     "build": {
       "commands": [
         "cd apps/worker",
         "pnpm install",
         "pnpm prisma generate",
         "pnpm build"
       ]
     },
     "start": {
       "command": "cd apps/worker && pnpm start"
     }
   }
   ```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3002
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run integration tests
pnpm test:integration
```

## 📈 Performance

### Optimization Features
- Connection pooling for database and Redis
- Batch processing for bulk operations
- Intelligent caching strategies
- Rate limiting and backoff mechanisms
- Memory usage monitoring

### Scaling Considerations
- Horizontal scaling with multiple worker instances
- Queue-based architecture for load distribution
- Database read replicas for analytics
- Redis clustering for high availability

## 🔒 Security

- API key encryption and secure storage
- Rate limiting to prevent abuse
- Input validation and sanitization
- Error handling without information leakage
- Secure database connections

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   - Check DATABASE_URL format
   - Verify database server accessibility
   - Check connection pool settings

2. **Redis Connection Issues**:
   - Verify REDIS_URL configuration
   - Check Redis server status
   - Review connection timeout settings

3. **API Rate Limiting**:
   - Monitor rate limit headers
   - Adjust request intervals
   - Implement exponential backoff

4. **Memory Issues**:
   - Monitor heap usage
   - Check for memory leaks
   - Optimize batch sizes

### Debug Mode

```bash
# Enable debug logging
LOG_LEVEL=debug pnpm dev

# Enable performance monitoring
ENABLE_PERFORMANCE_MONITORING=true pnpm dev
```

## 📚 Development

### Project Structure
```
src/
├── config/          # Configuration management
├── services/        # External API integrations
├── jobs/           # Job processors and queue management
├── database/       # Database connection and utilities
├── health/         # Health monitoring system
├── types/          # TypeScript type definitions
├── utils/          # Utility functions and helpers
└── index.ts        # Main application entry point
```

### Adding New Jobs

1. Create processor in `src/jobs/processors/`
2. Register in `src/jobs/index.ts`
3. Add job trigger functions
4. Update configuration

### Adding New Services

1. Create service in `src/services/`
2. Implement health check method
3. Add to health monitoring
4. Update configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting guide
- Review the logs for error details

---

**MetaPulse Worker Service** - Powering intelligent cryptocurrency analysis through automated data processing and AI-driven insights.