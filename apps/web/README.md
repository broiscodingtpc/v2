# MetaPulse Web Frontend

🎩 **Next.js Steampunk Trading Dashboard**

The MetaPulse Web Frontend is a modern, responsive web application built with Next.js 14 that provides a comprehensive cryptocurrency trading dashboard with a unique steampunk aesthetic, real-time market data, and AI-powered insights.

## 🌟 Features

### 🎨 User Interface
- **Steampunk Design** - Unique ASCII art and retro-futuristic aesthetic
- **Responsive Layout** - Mobile-first design with Tailwind CSS
- **Dark Theme** - Optimized for extended trading sessions
- **Interactive Components** - Modern UI components with smooth animations
- **Real-time Updates** - Live data streaming and notifications

### 📊 Trading Dashboard
- **Market Overview** - Real-time cryptocurrency market data
- **Token Analytics** - Detailed token information and charts
- **Signal Dashboard** - AI-generated trading signals and recommendations
- **Watchlist Management** - Personal token tracking and alerts
- **Portfolio Tracking** - Investment performance monitoring

### 🔐 Authentication & User Management
- **Telegram Integration** - Seamless login with Telegram bot
- **User Profiles** - Customizable user preferences and settings
- **Session Management** - Secure authentication with JWT tokens
- **Role-based Access** - Different access levels for users

### 📱 Modern Web Features
- **Progressive Web App** - Installable web application
- **Offline Support** - Basic functionality without internet
- **Push Notifications** - Real-time trading alerts
- **Fast Loading** - Optimized performance with Next.js
- **SEO Optimized** - Search engine friendly structure

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Browser  │    │  Next.js App    │    │   API Gateway   │
│                 │    │                 │    │                 │
│  • React UI     │───▶│  • App Router   │───▶│  • REST API     │
│  • WebSockets   │    │  • Server Side  │    │  • GraphQL      │
│  • PWA Features │    │  • Static Gen   │    │  • WebSockets   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │  External APIs  │
                       │                 │
                       │  • Telegram     │
                       │  • Analytics    │
                       │  • CDN Assets   │
                       └─────────────────┘
```

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm
- MetaPulse API service running
- Modern web browser with JavaScript enabled

## 🛠️ Installation

1. **Navigate to web directory**
   ```bash
   cd apps/web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   # Development
   npm run dev
   # or
   pnpm dev

   # Production build
   npm run build
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | MetaPulse API base URL | ✅ |
| `NEXT_PUBLIC_WS_URL` | WebSocket server URL | ✅ |
| `NEXT_PUBLIC_BOT_USERNAME` | Telegram bot username | ✅ |
| `NEXTAUTH_URL` | NextAuth.js URL | ✅ |
| `NEXTAUTH_SECRET` | NextAuth.js secret | ✅ |
| `NODE_ENV` | Environment (development/production) | ❌ |

### Development Configuration

```javascript
// next.config.js
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['assets.coingecko.com', 'logos.covalenthq.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}
```

## 🎨 Design System

### Color Palette

```css
/* ASCII Green Theme */
--ascii-green: #00ff41;
--ascii-green-dark: #00cc33;
--ascii-green-light: #66ff80;

/* Dark Background */
--ascii-dark-900: #0a0a0a;
--ascii-dark-800: #1a1a1a;
--ascii-dark-700: #2a2a2a;

/* Accent Colors */
--ascii-red: #ff4444;
--ascii-yellow: #ffff44;
--ascii-blue: #4444ff;
```

### Typography

```css
/* Monospace Fonts */
font-family: 'Courier New', 'Monaco', 'Menlo', monospace;

/* ASCII Art Headers */
.ascii-header {
  font-family: monospace;
  white-space: pre;
  line-height: 1;
}
```

### Components

- **Frame** - Steampunk-styled container with ASCII borders
- **Button** - Interactive buttons with hover effects
- **Input** - Form inputs with ASCII styling
- **Loading** - Animated loading indicators
- **Modal** - Overlay dialogs with steampunk design

## 📱 Pages & Routes

### Public Pages

```bash
/                    # Landing page and market overview
/auth/login          # User authentication
/auth/register       # User registration
/tokens              # Token search and discovery
/tokens/[address]    # Individual token details
/signals             # Public trading signals
```

### Protected Pages

```bash
/dashboard           # Personal trading dashboard
/watchlist           # User watchlist management
/portfolio           # Portfolio tracking
/alerts              # Price alert management
/settings            # User preferences
/reports             # Detailed analysis reports
```

### API Routes

```bash
/api/auth/[...nextauth]  # NextAuth.js authentication
/api/health              # Health check endpoint
/api/webhook             # Webhook handlers
```

## 🔧 Components

### Layout Components

```typescript
// Header with navigation
<Header />

// Main navigation sidebar
<Sidebar />

// Page footer
<Footer />

// Loading states
<Loading size="lg" text="Loading..." />
```

### Data Components

```typescript
// Token price display
<TokenPrice token={token} />

// Signal card
<SignalCard signal={signal} />

// Watchlist item
<WatchlistItem item={item} />

// Chart components
<PriceChart data={priceData} />
```

### Form Components

```typescript
// Search input
<SearchInput onSearch={handleSearch} />

// Token selector
<TokenSelector onSelect={handleSelect} />

// Alert form
<AlertForm onSubmit={handleSubmit} />
```

## 🔌 API Integration

### REST API Client

```typescript
// API client configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication interceptor
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### WebSocket Integration

```typescript
// Real-time price updates
const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle real-time updates
    };
    setSocket(ws);
    
    return () => ws.close();
  }, [url]);
  
  return socket;
};
```

## 🧪 Testing

### Test Setup

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

### Test Structure

```
src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   └── utils/
├── components/
│   └── __tests__/
└── pages/
    └── __tests__/
```

### Testing Libraries

- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Cypress** - End-to-end testing
- **MSW** - API mocking for tests

## 🚀 Deployment

### Railway Deployment

The web application is configured for Railway deployment:

```json
{
  "build": {
    "commands": [
      "cd apps/web",
      "npm install",
      "npm run build"
    ]
  },
  "start": {
    "command": "cd apps/web && npm start"
  }
}
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Docker Deployment

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## 📈 Performance

### Optimization Features

- **Static Site Generation** - Pre-rendered pages for fast loading
- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic bundle splitting for faster loads
- **Caching** - Intelligent caching strategies
- **Compression** - Gzip compression for assets

### Performance Monitoring

```typescript
// Web Vitals tracking
export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
  // Send to analytics service
}

// Performance API
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.duration);
  }
});
observer.observe({ entryTypes: ['measure'] });
```

## 🔒 Security

### Security Features

- **Content Security Policy** - Prevent XSS attacks
- **HTTPS Enforcement** - Secure data transmission
- **Input Sanitization** - Prevent injection attacks
- **Authentication** - Secure user authentication
- **CSRF Protection** - Cross-site request forgery prevention

### Security Headers

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
];
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

2. **Environment Variables**
   ```bash
   # Check environment variables
   echo $NEXT_PUBLIC_API_URL
   
   # Restart development server
   npm run dev
   ```

3. **API Connection Issues**
   ```bash
   # Test API connectivity
   curl $NEXT_PUBLIC_API_URL/health
   ```

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev

# Enable Next.js debug mode
NODE_OPTIONS='--inspect' npm run dev
```

## 📚 Development

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                # Utility libraries and configurations
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── styles/             # Global styles and Tailwind config
└── utils/              # Helper functions
```

### Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Develop Component**
   ```bash
   # Create component
   mkdir src/components/NewComponent
   touch src/components/NewComponent/index.tsx
   ```

3. **Add Tests**
   ```bash
   # Create test file
   touch src/components/NewComponent/__tests__/index.test.tsx
   ```

4. **Update Documentation**
   ```bash
   # Update component documentation
   # Add to Storybook if applicable
   ```

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

### Component Guidelines

- Use TypeScript for all components
- Follow the steampunk design system
- Add proper accessibility attributes
- Include comprehensive tests
- Document component props and usage

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For web frontend support:
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review the [React Documentation](https://react.dev)
- Create an issue on GitHub
- Check the troubleshooting guide

---

**MetaPulse Web Frontend** - A modern, steampunk-themed cryptocurrency trading dashboard built with Next.js.