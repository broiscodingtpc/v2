# MetaPulse API Service

🚀 **NestJS-powered REST & GraphQL API Gateway**

The MetaPulse API service is a robust, scalable backend built with NestJS that provides comprehensive cryptocurrency market data, user management, trading signals, and real-time analytics through both REST and GraphQL interfaces.

## 🌟 Features

### 🔌 API Interfaces
- **REST API** - Traditional HTTP endpoints for standard operations
- **GraphQL API** - Flexible query language for complex data fetching
- **WebSocket Support** - Real-time data streaming
- **OpenAPI Documentation** - Auto-generated API documentation

### 🔐 Authentication & Security
- **JWT Authentication** - Secure token-based authentication
- **Role-based Access Control** - Granular permission system
- **Rate Limiting** - Request throttling and abuse prevention
- **CORS Configuration** - Cross-origin resource sharing
- **Input Validation** - Comprehensive request validation

### 📊 Core Services
- **Token Management** - Cryptocurrency token data and analytics
- **User Management** - User registration, profiles, and preferences
- **Watchlist Service** - Personal token tracking and alerts
- **Signal Service** - AI-generated trading signals and scores
- **Analytics Service** - Market trends and statistical analysis

### 🔍 Monitoring & Health
- **Health Checks** - Service and dependency health monitoring
- **Metrics Collection** - Performance and usage metrics
- **Structured Logging** - Comprehensive request/response logging
- **Error Tracking** - Centralized error handling and reporting

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Apps   │    │   API Gateway   │    │   Data Layer    │
│                 │    │                 │    │                 │
│  • Web App      │───▶│  • REST API     │───▶│  • PostgreSQL   │
│  • Telegram Bot │    │  • GraphQL      │    │  • Redis Cache  │
│  • Mobile App   │    │  • WebSockets   │    │  • Prisma ORM   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │  External APIs  │
                       │                 │
                       │  • DexScreener  │
                       │  • PumpPortal   │
                       │  • Twitter      │
                       │  • Groq AI      │
                       │  • Gemini AI    │
                       └─────────────────┘
```

## 📋 Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Redis server (optional, for caching)
- API keys for external services

## 🛠️ Installation

1. **Navigate to API directory**
   ```bash
   cd apps/api
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
   cd ../../packages/db
   pnpm prisma generate
   pnpm prisma db push
   cd ../../apps/api
   ```

5. **Start the service**
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
| `JWT_SECRET` | JWT signing secret | ✅ |
| `PORT` | Server port (default: 3000) | ❌ |
| `NODE_ENV` | Environment (development/production) | ❌ |
| `REDIS_URL` | Redis connection string | ❌ |
| `CORS_ORIGIN` | Allowed CORS origins | ❌ |
| `RATE_LIMIT_TTL` | Rate limit window (seconds) | ❌ |
| `RATE_LIMIT_MAX` | Max requests per window | ❌ |

### External API Keys

| Variable | Description | Required |
|----------|-------------|----------|
| `DEXSCREENER_API_URL` | DexScreener API endpoint | ✅ |
| `PUMPPORTAL_API_KEY` | PumpPortal API key | ❌ |
| `TWITTER_BEARER_TOKEN` | Twitter Bearer Token | ❌ |
| `GROQ_API_KEY` | Groq AI API key | ❌ |
| `GEMINI_API_KEY` | Gemini AI API key | ❌ |

## 📊 API Endpoints

### Health & Status

```bash
# Health check
GET /health

# API documentation
GET /api/docs

# GraphQL playground
GET /graphql
```

### Authentication

```bash
# User registration
POST /auth/register
{
  "email": "user@example.com",
  "password": "password",
  "name": "User Name"
}

# User login
POST /auth/login
{
  "email": "user@example.com",
  "password": "password"
}

# Refresh token
POST /auth/refresh
{
  "refreshToken": "refresh_token_here"
}
```

### Tokens

```bash
# Get all tokens
GET /tokens?limit=50&offset=0&search=bitcoin

# Get token details
GET /tokens/:address

# Get trending tokens
GET /tokens/trending?limit=10

# Get top tokens by market cap
GET /tokens/top?limit=10&sortBy=marketCap
```

### Watchlist

```bash
# Get user watchlist
GET /watchlist

# Add token to watchlist
POST /watchlist
{
  "tokenAddress": "0x...",
  "alertsEnabled": true,
  "priceAlertThreshold": 5.0
}

# Remove from watchlist
DELETE /watchlist/:id

# Update watchlist item
PATCH /watchlist/:id
{
  "alertsEnabled": false,
  "priceAlertThreshold": 10.0
}
```

### Signals

```bash
# Get trading signals
GET /signals?limit=50&offset=0&type=technical

# Get signal events
GET /signals/events?limit=20&severity=high

# Get token signal scores
GET /signals/scores/:tokenAddress?limit=50
```

### Users

```bash
# Get user profile
GET /users/profile

# Update user profile
PATCH /users/profile
{
  "name": "New Name",
  "preferences": {
    "notifications": true,
    "theme": "dark"
  }
}

# Get user statistics
GET /users/stats
```

## 🔍 GraphQL Schema

### Queries

```graphql
type Query {
  # Token queries
  tokens(limit: Int, offset: Int, search: String): TokenConnection
  token(address: String!): Token
  trendingTokens(limit: Int): [Token!]!
  
  # User queries
  me: User
  watchlist: [WatchlistItem!]!
  
  # Signal queries
  signals(limit: Int, offset: Int, type: SignalType): SignalConnection
  signalScores(tokenAddress: String!, limit: Int): [SignalScore!]!
}

type Mutation {
  # Auth mutations
  login(input: LoginInput!): AuthPayload!
  register(input: RegisterInput!): AuthPayload!
  
  # Watchlist mutations
  addToWatchlist(input: AddWatchlistInput!): WatchlistItem!
  removeFromWatchlist(id: String!): Boolean!
  
  # User mutations
  updateProfile(input: UpdateProfileInput!): User!
}

type Subscription {
  # Real-time updates
  tokenPriceUpdates(addresses: [String!]!): TokenPriceUpdate!
  newSignals(types: [SignalType!]): Signal!
  watchlistUpdates: WatchlistUpdate!
}
```

## 🗄️ Database Models

### Core Models

- **Token** - Cryptocurrency token information
- **TokenMetrics** - Historical price and volume data
- **TokenPair** - Trading pair information
- **SocialMetrics** - Social media metrics and sentiment

### User Models

- **User** - User account information
- **WatchlistItem** - User watchlist entries
- **Alert** - Price and volume alerts
- **UserPreferences** - User settings and preferences

### Signal Models

- **Signal** - Trading signals and recommendations
- **SignalScore** - Token scoring and analysis
- **SignalEvent** - Signal-related events and notifications
- **TechnicalAnalysis** - Technical indicator results

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run tests with coverage
pnpm test:cov

# Run integration tests
pnpm test:e2e

# Run tests in watch mode
pnpm test:watch
```

### Test Structure

```
src/
├── auth/
│   ├── auth.service.spec.ts
│   └── auth.controller.spec.ts
├── tokens/
│   ├── tokens.service.spec.ts
│   └── tokens.controller.spec.ts
└── test/
    ├── app.e2e-spec.ts
    └── helpers/
```

## 🚀 Deployment

### Railway Deployment

The API service is configured for Railway deployment:

```json
{
  "build": {
    "commands": [
      "cd apps/api",
      "pnpm install",
      "pnpm build"
    ]
  },
  "start": {
    "command": "cd apps/api && pnpm start:prod"
  }
}
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start:prod"]
```

## 📈 Performance

### Optimization Features

- **Database Connection Pooling** - Efficient database connections
- **Redis Caching** - Fast data retrieval for frequently accessed data
- **Query Optimization** - Optimized database queries with proper indexing
- **Response Compression** - Gzip compression for API responses
- **Request Validation** - Early validation to prevent unnecessary processing

### Monitoring

- **Response Time Tracking** - Monitor API endpoint performance
- **Error Rate Monitoring** - Track and alert on error rates
- **Database Query Performance** - Monitor slow queries
- **Memory Usage** - Track memory consumption patterns

## 🔒 Security

### Security Features

- **JWT Token Validation** - Secure authentication tokens
- **Rate Limiting** - Prevent API abuse and DDoS attacks
- **Input Sanitization** - Prevent injection attacks
- **CORS Configuration** - Secure cross-origin requests
- **Helmet Integration** - Security headers and protection

### Best Practices

- Environment variable validation
- Secure password hashing with bcrypt
- SQL injection prevention with Prisma
- XSS protection with input validation
- Secure session management

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   ```bash
   # Check DATABASE_URL format
   postgresql://username:password@host:port/database
   
   # Test connection
   pnpm prisma db pull
   ```

2. **JWT Token Issues**
   ```bash
   # Verify JWT_SECRET is set
   echo $JWT_SECRET
   
   # Check token expiration
   # Tokens expire after 24 hours by default
   ```

3. **Rate Limiting Issues**
   ```bash
   # Check rate limit configuration
   RATE_LIMIT_TTL=60
   RATE_LIMIT_MAX=100
   ```

### Debug Mode

```bash
# Enable debug logging
LOG_LEVEL=debug pnpm dev

# Enable SQL query logging
DATABASE_LOGGING=true pnpm dev
```

## 📚 Development

### Project Structure

```
src/
├── auth/              # Authentication module
├── tokens/            # Token management module
├── users/             # User management module
├── watchlist/         # Watchlist management module
├── signals/           # Signal processing module
├── common/            # Shared utilities and decorators
├── config/            # Configuration management
├── database/          # Database connection and utilities
├── health/            # Health check module
└── main.ts           # Application entry point
```

### Adding New Modules

1. Generate module: `nest g module feature`
2. Generate service: `nest g service feature`
3. Generate controller: `nest g controller feature`
4. Add to app.module.ts imports
5. Write tests and documentation

### Code Standards

- **TypeScript** - Strict type checking
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Update documentation
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For API-specific support:
- Check the [API Documentation](http://localhost:3000/api/docs)
- Review the [GraphQL Playground](http://localhost:3000/graphql)
- Create an issue on GitHub
- Check the troubleshooting guide

---

**MetaPulse API Service** - Powering the MetaPulse platform with robust, scalable backend services.