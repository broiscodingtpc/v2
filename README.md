# MetaPulse

🚀 **AI-Powered Cryptocurrency Analysis Platform**

MetaPulse is a comprehensive cryptocurrency analysis platform that combines real-time market data, social sentiment analysis, and AI-driven insights to provide intelligent trading signals and market analysis through a sophisticated Telegram bot interface.

## 🌟 Features

### 🤖 AI-Powered Analysis
- **Machine Learning Signals** - Advanced algorithms for buy/sell recommendations
- **Technical Analysis** - RSI, SMA, momentum indicators with AI interpretation
- **Sentiment Analysis** - Social media sentiment tracking and analysis
- **Market Predictions** - AI-generated market forecasts and trend analysis

### 📊 Real-Time Data Processing
- **Multi-Source Integration** - DexScreener, Twitter, CoinGecko, CoinMarketCap
- **Live Price Tracking** - Real-time token price and volume monitoring
- **Social Media Monitoring** - Twitter mentions and trending topic analysis
- **Background Processing** - Automated data collection and analysis jobs

### 🎩 Telegram Bot Interface
- **Steampunk ASCII UI** - Unique retro-futuristic design aesthetic
- **Interactive Commands** - Comprehensive bot commands for market analysis
- **Personal Watchlists** - Track favorite tokens with real-time updates
- **Price Alerts** - Custom notifications for price movements
- **Signal Notifications** - AI-generated trading signal alerts

### 🔧 Enterprise Features
- **Scalable Architecture** - Microservices with horizontal scaling
- **Health Monitoring** - Comprehensive system health checks
- **Rate Limiting** - Intelligent API rate limiting and backoff
- **Database Optimization** - Automated cleanup and performance tuning

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Telegram Bot  │    │   Web Frontend  │    │   API Gateway   │
│                 │    │                 │    │                 │
│  • Commands     │───▶│  • Dashboard    │───▶│  • REST API     │
│  • Webhooks     │    │  • Analytics    │    │  • GraphQL      │
│  • Notifications│    │  • User Mgmt    │    │  • Auth         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Worker Service │    │   Data Sources  │    │    Database     │
│                 │    │                 │    │                 │
│  • Job Queues   │───▶│  • DexScreener  │    │  • PostgreSQL   │
│  • AI Services  │    │  • Twitter API  │    │  • Redis Cache  │
│  • Processors   │    │  • CoinGecko    │    │  • Prisma ORM   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database
- Redis server
- API keys for external services

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/metapulse.git
   cd metapulse
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   cd packages/db
   pnpm prisma generate
   pnpm prisma db push
   ```

5. **Start all services**
   ```bash
   # Development mode
   pnpm dev

   # Production mode
   pnpm build
   pnpm start
   ```

## 📦 Project Structure

```
metapulse/
├── apps/
│   ├── api/              # NestJS API Gateway
│   ├── bot/              # Telegram Bot Service
│   ├── web/              # Next.js Web Frontend
│   └── worker/           # Background Job Processor
├── packages/
│   ├── db/               # Database Schema & Migrations
│   ├── shared/           # Shared Utilities
│   └── ui/               # UI Components Library
├── DEPLOYMENT.md         # Deployment Guide
├── railway.json          # Railway Configuration
└── turbo.json           # Turborepo Configuration
```

## 🛠️ Services

### API Gateway (`apps/api`)
- **NestJS Framework** - Scalable Node.js server framework
- **GraphQL & REST** - Flexible API interfaces
- **Authentication** - JWT-based user authentication
- **Rate Limiting** - Request throttling and abuse prevention
- **Health Monitoring** - Service health checks and metrics

### Telegram Bot (`apps/bot`)
- **Grammy Framework** - Modern Telegram bot framework
- **Steampunk UI** - Unique ASCII art interface
- **Command Handlers** - Comprehensive bot command system
- **Webhook Support** - Production-ready webhook configuration
- **User Management** - Registration and profile management

### Worker Service (`apps/worker`)
- **Bull Queues** - Redis-based job queue system
- **AI Integration** - Groq and Gemini AI services
- **Data Processing** - Real-time market data analysis
- **Signal Generation** - AI-powered trading signals
- **Background Jobs** - Automated data collection and cleanup

### Web Frontend (`apps/web`)
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Real-time Updates** - WebSocket integration
- **Responsive Design** - Mobile-first approach

## 🔧 Configuration

### Environment Variables

Core variables required across all services:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `REDIS_URL` | Redis connection string | ✅ |
| `JWT_SECRET` | JWT signing secret | ✅ |
| `NODE_ENV` | Environment (development/production) | ✅ |

### Service-Specific Variables

See individual service README files for detailed configuration:
- [API Configuration](apps/api/README.md)
- [Bot Configuration](apps/bot/README.md)
- [Worker Configuration](apps/worker/README.md)
- [Web Configuration](apps/web/README.md)

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run integration tests
pnpm test:integration

# Run specific service tests
pnpm --filter @metapulse/worker test
```

### Test Coverage
- **Unit Tests** - Individual component testing
- **Integration Tests** - Service interaction testing
- **End-to-End Tests** - Full workflow testing
- **Performance Tests** - Load and stress testing

## 🚀 Deployment

### Railway (Recommended)

MetaPulse is optimized for Railway deployment with automatic scaling and zero-downtime deployments.

1. **Quick Deploy**
   ```bash
   # Deploy all services
   railway up

   # Deploy specific service
   railway up --service=api-service
   ```

2. **Environment Setup**
   - Configure environment variables in Railway dashboard
   - Set up PostgreSQL and Redis add-ons
   - Configure custom domains (optional)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Docker

```bash
# Build all services
docker-compose build

# Start all services
docker-compose up -d

# Scale specific services
docker-compose up --scale worker=3
```

## 📊 Monitoring

### Health Checks
- **API**: `GET /health`
- **Worker**: `GET /health`
- **Bot**: `GET /health`

### Metrics
- Request rates and response times
- Job processing statistics
- Database performance metrics
- Memory and CPU usage
- Error rates and patterns

### Logging
- Structured JSON logging
- Centralized log aggregation
- Error tracking and alerting
- Performance monitoring

## 🔒 Security

### Best Practices
- **API Key Management** - Secure storage and rotation
- **Rate Limiting** - Prevent abuse and DDoS attacks
- **Input Validation** - Sanitize all user inputs
- **SQL Injection Prevention** - Parameterized queries
- **CORS Configuration** - Proper cross-origin settings

### Authentication
- JWT-based authentication
- Secure session management
- Role-based access control
- API key authentication for services

## 🤝 Contributing

### Development Setup

1. **Fork and clone the repository**
2. **Install dependencies**: `pnpm install`
3. **Set up development environment**
4. **Create feature branch**: `git checkout -b feature/your-feature`
5. **Make changes and add tests**
6. **Submit pull request**

### Code Standards
- **TypeScript** - Strict type checking
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Conventional Commits** - Standardized commit messages

### Testing Requirements
- Unit tests for new features
- Integration tests for API changes
- Documentation updates
- Performance impact assessment

## 📚 Documentation

### Service Documentation
- [API Service](apps/api/README.md) - REST/GraphQL API documentation
- [Bot Service](apps/bot/README.md) - Telegram bot implementation
- [Worker Service](apps/worker/README.md) - Background job processing
- [Web Service](apps/web/README.md) - Frontend application

### Deployment & Operations
- [Deployment Guide](DEPLOYMENT.md) - Production deployment instructions
- [Database Schema](packages/db/README.md) - Database structure and migrations

## 🆘 Support

### Community
- **Telegram Group**: https://t.me/metapulseai
- **Twitter**: https://x.com/METAPULSaibot
- **GitHub Issues**: Report bugs and feature requests

### Development Support
- **Documentation**: Comprehensive guides and API references
- **Examples**: Sample implementations and use cases
- **Community**: Active developer community

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NestJS** - Scalable Node.js server framework
- **Grammy** - Modern Telegram bot framework
- **Next.js** - React production framework
- **Prisma** - Next-generation ORM
- **Railway** - Modern deployment platform

---

**MetaPulse** - Empowering traders with AI-driven cryptocurrency insights and real-time market analysis.