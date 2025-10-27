# MetaPulse Telegram Bot

🎩 **Steampunk Trading AI Companion**

A sophisticated Telegram bot that provides real-time cryptocurrency market analysis, trading signals, watchlist management, and price alerts with a unique ASCII steampunk aesthetic.

## Features

### 🤖 Core Functionality
- **Real-time Market Analysis** - Live token data and price tracking
- **AI Trading Signals** - Machine learning-powered buy/sell recommendations
- **Smart Watchlist** - Track your favorite tokens with real-time updates
- **Price Alerts** - Custom notifications for price movements
- **Token Search** - Find any cryptocurrency instantly
- **Top & Trending** - Discover market leaders and trending tokens

### 🎨 User Experience
- **ASCII Steampunk UI** - Unique retro-futuristic design
- **Inline Keyboards** - Fast navigation with interactive buttons
- **Rate Limiting** - Prevents spam and ensures smooth operation
- **Error Handling** - Graceful error recovery and user feedback

### 🔗 Integration
- **MetaPulse API** - Seamless integration with backend services
- **External APIs** - DexScreener, CoinGecko data sources
- **Webhook Support** - Production-ready webhook configuration
- **Health Monitoring** - Built-in health checks and monitoring

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Telegram Bot Token (from @BotFather)
- MetaPulse API access
- PostgreSQL database

### Installation

1. **Clone and navigate to bot directory**
   ```bash
   cd apps/bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the bot**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TELEGRAM_BOT_TOKEN` | Bot token from @BotFather | ✅ |
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `API_BASE_URL` | MetaPulse API endpoint | ✅ |
| `PORT` | Server port (default: 3001) | ❌ |
| `NODE_ENV` | Environment (development/production) | ❌ |
| `TELEGRAM_WEBHOOK_URL` | Webhook URL (production only) | ⚠️ |
| `API_KEY` | API authentication key | ❌ |
| `GROQ_API_KEY` | Groq AI service key | ❌ |
| `GEMINI_API_KEY` | Google Gemini API key | ❌ |

### Bot Configuration

The bot includes several configurable limits and settings:

- **Max Watchlist Items**: 50 per user
- **Max Alerts**: 20 per user
- **Rate Limiting**: 30 requests per minute
- **Message Length**: 4096 characters max
- **Pagination**: 10 items per page

## Bot Commands

### User Commands
- `/start` - Welcome message and main menu
- `/menu` - Access main navigation
- `/help` - Command help and usage guide
- `/search <token>` - Search for specific tokens
- `/watchlist` - View your tracked tokens
- `/alerts` - Manage price alerts
- `/signals` - Latest trading signals
- `/top` - Top performing tokens
- `/trending` - Trending tokens by volume
- `/settings` - Bot preferences

### Text Input
Send any text message to search for tokens by name or symbol.

## API Integration

The bot integrates with the MetaPulse backend API for:

- **User Management** - Registration and profile management
- **Token Data** - Real-time price and market data
- **Trading Signals** - AI-generated trading recommendations
- **Watchlist** - Personal token tracking
- **Alerts** - Price notification management
- **Analytics** - Market trends and statistics

## Architecture

```
src/
├── config/           # Configuration and environment setup
├── handlers/         # Command and callback handlers
├── services/         # API and external service integrations
├── utils/           # Utility functions and formatters
└── index.ts         # Main bot application
```

### Key Components

- **CommandHandlers** - Process user commands (/start, /menu, etc.)
- **CallbackHandlers** - Handle inline keyboard interactions
- **ApiService** - Interface with MetaPulse backend API
- **Formatter** - ASCII steampunk message formatting
- **Config** - Environment and bot configuration

## Development

### Scripts
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server
npm run lint        # Run ESLint code analysis
npm test            # Run test suite
```

### Code Style
- TypeScript with strict type checking
- ESLint for code quality
- Consistent error handling
- Comprehensive logging

## Deployment

### Development
```bash
npm run dev
```
The bot will use polling to receive updates from Telegram.

### Production
```bash
npm run build
npm start
```
Configure webhook URL for production deployment:
1. Set `TELEGRAM_WEBHOOK_URL` in environment
2. Ensure HTTPS endpoint is accessible
3. Bot will automatically configure webhook

### Railway Deployment
The bot is configured for Railway deployment with:
- Automatic builds from Git
- Environment variable management
- Health check endpoints
- Graceful shutdown handling

## Monitoring

### Health Endpoints
- `GET /health` - Basic health check
- `GET /bot/info` - Bot information and statistics

### Logging
The bot includes comprehensive logging for:
- User interactions and commands
- API requests and responses
- Error tracking and debugging
- Performance monitoring

## Security

### Rate Limiting
- 30 requests per minute per user
- Prevents spam and abuse
- Configurable limits

### Input Validation
- Sanitized user inputs
- SQL injection prevention
- XSS protection

### Error Handling
- Graceful error recovery
- User-friendly error messages
- Detailed logging for debugging

## Support

### Community
- **Telegram Group**: https://t.me/metapulseai
- **Twitter**: https://x.com/METAPULSaibot

### Development
- Report issues via GitHub
- Feature requests welcome
- Contribution guidelines in main repository

## License

Part of the MetaPulse project. See main repository for license information.