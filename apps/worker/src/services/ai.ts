import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '@/config';
import { createLogger } from '@/utils/logger';
import { 
  AIAnalysis, 
  TradingSignal, 
  PriceData, 
  SocialMetrics, 
  TokenMetrics,
  Tweet 
} from '@/types';

const log = createLogger('ai');

export class AIService {
  private groq: Groq | null = null;
  private gemini: GoogleGenerativeAI | null = null;
  private requestCount: Map<string, { count: number; resetTime: Date }> = new Map();

  constructor() {
    // Initialize Groq
    if (config.GROQ_API_KEY) {
      this.groq = new Groq({
        apiKey: config.GROQ_API_KEY
      });
      log.info('Groq AI service initialized');
    }

    // Initialize Gemini
    if (config.GEMINI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(config.GEMINI_API_KEY);
      log.info('Gemini AI service initialized');
    }

    if (!this.groq && !this.gemini) {
      log.warn('No AI services configured');
    }
  }

  /**
   * Generate technical analysis using AI
   */
  async generateTechnicalAnalysis(
    tokenId: string,
    priceData: PriceData[],
    timeframe: '1h' | '4h' | '1d' | '1w' = '1d'
  ): Promise<AIAnalysis> {
    try {
      log.info(`Generating technical analysis for ${tokenId} (${timeframe})`);

      if (priceData.length < 10) {
        throw new Error('Insufficient price data for analysis');
      }

      // Prepare data for analysis
      const analysisData = this.prepareTechnicalData(priceData);
      
      const prompt = this.buildTechnicalAnalysisPrompt(tokenId, analysisData, timeframe);
      
      // Try Groq first, fallback to Gemini
      let analysisText: string;
      let model: string;

      if (this.groq && this.canMakeRequest('groq')) {
        const response = await this.groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: config.GROQ_MODEL,
          temperature: 0.3,
          max_tokens: 1000
        });
        
        analysisText = response.choices[0]?.message?.content || '';
        model = 'groq-' + config.GROQ_MODEL;
        this.updateRequestCount('groq');
        
      } else if (this.gemini && this.canMakeRequest('gemini')) {
        const geminiModel = this.gemini.getGenerativeModel({ model: config.GEMINI_MODEL });
        const response = await geminiModel.generateContent(prompt);
        
        analysisText = response.response.text();
        model = 'gemini-' + config.GEMINI_MODEL;
        this.updateRequestCount('gemini');
        
      } else {
        throw new Error('No AI service available or rate limited');
      }

      // Parse the analysis response
      const analysis = this.parseAnalysisResponse(analysisText);

      const result: AIAnalysis = {
        id: `${tokenId}-tech-${Date.now()}`,
        tokenId,
        type: 'technical',
        analysis: analysisText,
        confidence: analysis.confidence,
        sentiment: analysis.sentiment,
        signals: analysis.signals,
        recommendations: analysis.recommendations,
        riskLevel: analysis.riskLevel,
        timeframe,
        createdAt: new Date(),
        model
      };

      log.info(`Technical analysis generated for ${tokenId}`, {
        confidence: result.confidence,
        sentiment: result.sentiment,
        riskLevel: result.riskLevel
      });

      return result;

    } catch (error) {
      log.error(`Failed to generate technical analysis for ${tokenId}`, error);
      throw error;
    }
  }

  /**
   * Generate sentiment analysis from social data
   */
  async generateSentimentAnalysis(
    tokenId: string,
    socialData: SocialMetrics[],
    tweets: Tweet[]
  ): Promise<AIAnalysis> {
    try {
      log.info(`Generating sentiment analysis for ${tokenId}`);

      if (tweets.length === 0 && socialData.length === 0) {
        throw new Error('No social data available for analysis');
      }

      const prompt = this.buildSentimentAnalysisPrompt(tokenId, socialData, tweets);
      
      let analysisText: string;
      let model: string;

      if (this.groq && this.canMakeRequest('groq')) {
        const response = await this.groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: config.GROQ_MODEL,
          temperature: 0.4,
          max_tokens: 800
        });
        
        analysisText = response.choices[0]?.message?.content || '';
        model = 'groq-' + config.GROQ_MODEL;
        this.updateRequestCount('groq');
        
      } else if (this.gemini && this.canMakeRequest('gemini')) {
        const geminiModel = this.gemini.getGenerativeModel({ model: config.GEMINI_MODEL });
        const response = await geminiModel.generateContent(prompt);
        
        analysisText = response.response.text();
        model = 'gemini-' + config.GEMINI_MODEL;
        this.updateRequestCount('gemini');
        
      } else {
        throw new Error('No AI service available or rate limited');
      }

      const analysis = this.parseAnalysisResponse(analysisText);

      const result: AIAnalysis = {
        id: `${tokenId}-sent-${Date.now()}`,
        tokenId,
        type: 'sentiment',
        analysis: analysisText,
        confidence: analysis.confidence,
        sentiment: analysis.sentiment,
        signals: analysis.signals,
        recommendations: analysis.recommendations,
        riskLevel: analysis.riskLevel,
        timeframe: '1d',
        createdAt: new Date(),
        model
      };

      log.info(`Sentiment analysis generated for ${tokenId}`, {
        confidence: result.confidence,
        sentiment: result.sentiment
      });

      return result;

    } catch (error) {
      log.error(`Failed to generate sentiment analysis for ${tokenId}`, error);
      throw error;
    }
  }

  /**
   * Generate trading signal based on multiple analyses
   */
  async generateTradingSignal(
    tokenId: string,
    analyses: AIAnalysis[],
    marketData: TokenMetrics,
    socialData: SocialMetrics[]
  ): Promise<TradingSignal> {
    try {
      log.info(`Generating trading signal for ${tokenId}`);

      if (analyses.length === 0) {
        throw new Error('No analyses available for signal generation');
      }

      const prompt = this.buildSignalGenerationPrompt(tokenId, analyses, marketData, socialData);
      
      let signalText: string;

      if (this.groq && this.canMakeRequest('groq')) {
        const response = await this.groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: config.GROQ_MODEL,
          temperature: 0.2,
          max_tokens: 600
        });
        
        signalText = response.choices[0]?.message?.content || '';
        this.updateRequestCount('groq');
        
      } else if (this.gemini && this.canMakeRequest('gemini')) {
        const geminiModel = this.gemini.getGenerativeModel({ model: config.GEMINI_MODEL });
        const response = await geminiModel.generateContent(prompt);
        
        signalText = response.response.text();
        this.updateRequestCount('gemini');
        
      } else {
        throw new Error('No AI service available or rate limited');
      }

      const signal = this.parseSignalResponse(signalText);

      // Calculate overall confidence from analyses
      const avgConfidence = analyses.reduce((sum, a) => sum + a.confidence, 0) / analyses.length;
      const avgSentiment = analyses.reduce((sum, a) => sum + a.sentiment, 0) / analyses.length;

      const result: TradingSignal = {
        id: `${tokenId}-signal-${Date.now()}`,
        tokenId,
        type: signal.type,
        strength: signal.strength,
        confidence: Math.min(avgConfidence, signal.confidence),
        reasoning: signalText,
        technicalIndicators: this.extractTechnicalIndicators(marketData),
        socialSentiment: avgSentiment,
        aiAnalysis: analyses.map(a => a.analysis).join('\n\n'),
        targetPrice: signal.targetPrice || 0,
        stopLoss: signal.stopLoss || 0,
        timeframe: signal.timeframe,
        expiresAt: new Date(Date.now() + config.SIGNAL_EXPIRY_HOURS * 60 * 60 * 1000),
        createdAt: new Date(),
        status: 'active'
      };

      // Only return signals above minimum confidence threshold
      if (result.confidence < config.MIN_CONFIDENCE_SCORE) {
        log.info(`Signal confidence too low for ${tokenId}: ${result.confidence}`);
        throw new Error('Signal confidence below threshold');
      }

      log.info(`Trading signal generated for ${tokenId}`, {
        type: result.type,
        strength: result.strength,
        confidence: result.confidence
      });

      return result;

    } catch (error) {
      log.error(`Failed to generate trading signal for ${tokenId}`, error);
      throw error;
    }
  }

  /**
   * Generate a comprehensive AI analysis summary for a token
   */
  async generateComprehensiveAnalysis(tokenData: any): Promise<{
    summary: string;
    keyPoints: string[];
    riskLevel: 'low' | 'medium' | 'high';
    timeHorizon: string;
    confidence: number;
    recommendation: 'buy' | 'sell' | 'hold';
    targetPrice?: number | undefined;
    stopLoss?: number | undefined;
    model?: string | undefined;
    processingTime?: number | undefined;
    dataQuality?: 'low' | 'medium' | 'high';
    factors?: string[];
  }> {
    try {
      const start = Date.now();
      const tokenId = tokenData?.token?.address || tokenData?.token?.id || 'unknown';

      // Build a concise prompt leveraging existing market and social data
      const prompt = `
Create a comprehensive analysis for token ${tokenId} using the provided context.
Include: summary, 5 key points, risk level (low/medium/high), time horizon,
confidence (0-1), recommendation (buy/sell/hold), optional target/stop.
Be conservative and avoid overfitting.
`;

      let text = '';
      let model: string | undefined = 'unknown';

      if (this.groq && this.canMakeRequest('groq')) {
        const response = await this.groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: config.GROQ_MODEL,
          temperature: 0.3,
          max_tokens: 600
        });
        text = response.choices[0]?.message?.content || '';
        model = 'groq-' + config.GROQ_MODEL;
        this.updateRequestCount('groq');
      } else if (this.gemini && this.canMakeRequest('gemini')) {
        const geminiModel = this.gemini.getGenerativeModel({ model: config.GEMINI_MODEL });
        const response = await geminiModel.generateContent(prompt);
        text = response.response.text();
        model = 'gemini-' + config.GEMINI_MODEL;
        this.updateRequestCount('gemini');
      } else {
        // Fallback: synthesize from token data heuristics
        const price = tokenData?.token?.price ?? 0;
        const change = tokenData?.token?.priceChange24h ?? 0;
        const vol = tokenData?.token?.volume24h ?? 0;
        text = `Summary: Price ${price}, 24h Change ${change}%, Volume ${vol}.`;
      }

      // Simple parsing using existing helpers
      const riskLevel = this.determineRiskLevel(text, 0.6);
      const confidenceMatch = text.match(/confidence[:\s]+([0-9.]+)/i);
      const confidence = confidenceMatch ? Math.max(0, Math.min(1, parseFloat(confidenceMatch[1]))) : 0.6;
      const recMatch = text.match(/(BUY|SELL|HOLD)/i);
      const recommendation = (recMatch?.[1]?.toLowerCase() as 'buy' | 'sell' | 'hold') || 'hold';
      const tpMatch = text.match(/target[:\s]+\$?([0-9.]+)/i);
      const slMatch = text.match(/stop[:\s]+\$?([0-9.]+)/i);

      const keyPoints = (text
        .split(/\n|\r/)
        .map(l => l.trim())
        .filter(l => l.length > 0)
        .slice(0, 5));

      return {
        summary: text.substring(0, 600),
        keyPoints,
        riskLevel,
        timeHorizon: '24h',
        confidence,
        recommendation,
        targetPrice: tpMatch ? parseFloat(tpMatch[1]) : undefined,
        stopLoss: slMatch ? parseFloat(slMatch[1]) : undefined,
        model: model || 'unknown',
        processingTime: Date.now() - start,
        dataQuality: 'medium',
        factors: this.extractSignals(text)
      };
    } catch (error) {
      log.error('Failed to generate comprehensive analysis', error);
      throw error;
    }
  }

  /**
   * Generate a short market overview analysis
   */
  async generateMarketOverview(marketData: any): Promise<{
    summary: string;
    riskLevel: 'low' | 'medium' | 'high';
    confidence: number;
  }> {
    try {
      const prompt = `
Provide a brief market overview with risk level and confidence.
Focus on top performers, average price changes, and liquidity.
`;

      let text = '';
      if (this.groq && this.canMakeRequest('groq')) {
        const response = await this.groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: config.GROQ_MODEL,
          temperature: 0.3,
          max_tokens: 300
        });
        text = response.choices[0]?.message?.content || '';
        this.updateRequestCount('groq');
      } else if (this.gemini && this.canMakeRequest('gemini')) {
        const geminiModel = this.gemini.getGenerativeModel({ model: config.GEMINI_MODEL });
        const response = await geminiModel.generateContent(prompt);
        text = response.response.text();
        this.updateRequestCount('gemini');
      } else {
        const stats = marketData?.statistics || {};
        text = `Overview: avgChange=${stats.avgPriceChange ?? 0}%, liquidity=${stats.totalVolume ?? 0}.`;
      }

      const confidenceMatch = text.match(/confidence[:\s]+([0-9.]+)/i);
      const confidence = confidenceMatch ? Math.max(0, Math.min(1, parseFloat(confidenceMatch[1]))) : 0.6;
      const riskLevel = this.determineRiskLevel(text, confidence);

      return {
        summary: text.substring(0, 600),
        riskLevel,
        confidence
      };
    } catch (error) {
      log.error('Failed to generate market overview', error);
      throw error;
    }
  }

  /**
   * Prepare technical data for analysis
   */
  private prepareTechnicalData(priceData: PriceData[]) {
    const sortedData = priceData.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    return {
      prices: sortedData.map(d => d.price),
      volumes: sortedData.map(d => d.volume),
      marketCaps: sortedData.map(d => d.marketCap),
      timestamps: sortedData.map(d => d.timestamp.toISOString()),
      priceChange: this.calculatePriceChange(sortedData),
      volumeChange: this.calculateVolumeChange(sortedData),
      volatility: this.calculateVolatility(sortedData)
    };
  }

  /**
   * Build technical analysis prompt
   */
  private buildTechnicalAnalysisPrompt(
    tokenId: string,
    data: any,
    timeframe: string
  ): string {
    return `
Analyze the following cryptocurrency token data and provide a technical analysis:

Token: ${tokenId}
Timeframe: ${timeframe}
Price Data Points: ${data.prices.length}

Recent Prices: ${data.prices.slice(-10).join(', ')}
Price Change: ${data.priceChange.toFixed(2)}%
Volume Change: ${data.volumeChange.toFixed(2)}%
Volatility: ${data.volatility.toFixed(4)}

Please provide:
1. Technical analysis summary
2. Key support and resistance levels
3. Trend direction and strength
4. Risk assessment (low/medium/high)
5. Confidence score (0-1)
6. Sentiment score (-1 to 1)
7. Trading signals (buy/sell/hold indicators)
8. Specific recommendations

Format your response as a structured analysis with clear sections.
`;
  }

  /**
   * Build sentiment analysis prompt
   */
  private buildSentimentAnalysisPrompt(
    tokenId: string,
    socialData: SocialMetrics[],
    tweets: Tweet[]
  ): string {
    const recentTweets = tweets.slice(0, 20).map(t => 
      `"${t.text}" (${t.likes} likes, ${t.retweets} retweets, sentiment: ${t.sentiment.toFixed(2)})`
    ).join('\n');

    const socialSummary = socialData.map(s => 
      `${s.platform}: ${s.mentions} mentions, avg sentiment: ${s.sentiment.toFixed(2)}, engagement: ${s.engagement}`
    ).join('\n');

    return `
Analyze the social sentiment for cryptocurrency token: ${tokenId}

Social Media Metrics:
${socialSummary}

Recent Tweets:
${recentTweets}

Please provide:
1. Overall sentiment analysis
2. Key themes and topics
3. Influencer impact assessment
4. Community engagement level
5. Sentiment trend direction
6. Risk factors from social data
7. Confidence score (0-1)
8. Overall sentiment score (-1 to 1)

Focus on actionable insights for trading decisions.
`;
  }

  /**
   * Build signal generation prompt
   */
  private buildSignalGenerationPrompt(
    tokenId: string,
    analyses: AIAnalysis[],
    marketData: TokenMetrics,
    socialData: SocialMetrics[]
  ): string {
    const analysisSum = analyses.map(a => 
      `${a.type.toUpperCase()}: ${a.analysis.substring(0, 200)}... (confidence: ${a.confidence}, sentiment: ${a.sentiment})`
    ).join('\n\n');

    return `
Generate a trading signal for token: ${tokenId}

Current Market Data:
- Price: $${marketData.price}
- 24h Change: ${marketData.priceChange24h.toFixed(2)}%
- Volume: $${marketData.volume24h.toLocaleString()}
- Market Cap: $${marketData.marketCap.toLocaleString()}
- Liquidity: $${marketData.liquidity.toLocaleString()}

AI Analyses:
${analysisSum}

Social Metrics:
${socialData.map(s => `${s.platform}: ${s.mentions} mentions, sentiment: ${s.sentiment.toFixed(2)}`).join('\n')}

Based on all available data, provide:
1. Signal type: BUY/SELL/HOLD
2. Signal strength: 1-10
3. Confidence level: 0-1
4. Target price (if applicable)
5. Stop loss level (if applicable)
6. Recommended timeframe
7. Key reasoning points

Be conservative and only recommend strong signals with high confidence.
`;
  }

  /**
   * Parse analysis response
   */
  private parseAnalysisResponse(text: string) {
    // Extract confidence score
    const confidenceMatch = text.match(/confidence[:\s]+([0-9.]+)/i);
    const confidence = confidenceMatch ? parseFloat(confidenceMatch[1]) : 0.5;

    // Extract sentiment score
    const sentimentMatch = text.match(/sentiment[:\s]+(-?[0-9.]+)/i);
    const sentiment = sentimentMatch ? parseFloat(sentimentMatch[1]) : 0;

    // Extract signals
    const signals = this.extractSignals(text);
    
    // Extract recommendations
    const recommendations = this.extractRecommendations(text);
    
    // Determine risk level
    const riskLevel = this.determineRiskLevel(text, confidence);

    return {
      confidence: Math.max(0, Math.min(1, confidence)),
      sentiment: Math.max(-1, Math.min(1, sentiment)),
      signals,
      recommendations,
      riskLevel
    };
  }

  /**
   * Parse signal response
   */
  private parseSignalResponse(text: string) {
    // Extract signal type
    const typeMatch = text.match(/(BUY|SELL|HOLD)/i);
    const type = (typeMatch?.[1]?.toLowerCase() as 'buy' | 'sell' | 'hold') || 'hold';

    // Extract strength
    const strengthMatch = text.match(/strength[:\s]+([0-9]+)/i);
    const strength = strengthMatch ? parseInt(strengthMatch[1]) : 5;

    // Extract confidence
    const confidenceMatch = text.match(/confidence[:\s]+([0-9.]+)/i);
    const confidence = confidenceMatch ? parseFloat(confidenceMatch[1]) : 0.5;

    // Extract target price
    const targetMatch = text.match(/target[:\s]+\$?([0-9.]+)/i);
    const targetPrice = targetMatch ? parseFloat(targetMatch[1]) : undefined;

    // Extract stop loss
    const stopMatch = text.match(/stop[:\s]+\$?([0-9.]+)/i);
    const stopLoss = stopMatch ? parseFloat(stopMatch[1]) : undefined;

    // Extract timeframe
    const timeframeMatch = text.match(/timeframe[:\s]+([0-9]+[hdw])/i);
    const timeframe = timeframeMatch?.[1] || '1d';

    return {
      type,
      strength: Math.max(1, Math.min(10, strength)),
      confidence: Math.max(0, Math.min(1, confidence)),
      targetPrice,
      stopLoss,
      timeframe
    };
  }

  /**
   * Extract signals from text
   */
  private extractSignals(text: string): string[] {
    const signals: string[] = [];
    const signalPatterns = [
      /bullish/i, /bearish/i, /uptrend/i, /downtrend/i,
      /breakout/i, /breakdown/i, /support/i, /resistance/i,
      /oversold/i, /overbought/i, /momentum/i
    ];

    signalPatterns.forEach(pattern => {
      if (pattern.test(text)) {
        const match = text.match(pattern);
        if (match) signals.push(match[0].toLowerCase());
      }
    });

    return [...new Set(signals)];
  }

  /**
   * Extract recommendations from text
   */
  private extractRecommendations(text: string): string[] {
    const recommendations: string[] = [];
    const lines = text.split('\n');
    
    lines.forEach(line => {
      if (line.match(/recommend|suggest|advice|should/i)) {
        recommendations.push(line.trim());
      }
    });

    return recommendations.slice(0, 5); // Limit to 5 recommendations
  }

  /**
   * Determine risk level
   */
  private determineRiskLevel(text: string, confidence: number): 'low' | 'medium' | 'high' {
    if (confidence < 0.3 || text.match(/high risk|very risky|dangerous/i)) {
      return 'high';
    }
    if (confidence < 0.6 || text.match(/medium risk|moderate/i)) {
      return 'medium';
    }
    return 'low';
  }

  /**
   * Extract technical indicators
   */
  private extractTechnicalIndicators(marketData: TokenMetrics): Record<string, number> {
    return {
      price: marketData.price,
      volume24h: marketData.volume24h,
      marketCap: marketData.marketCap,
      priceChange24h: marketData.priceChange24h,
      volumeChange24h: marketData.volumeChange24h,
      liquidity: marketData.liquidity
    };
  }

  /**
   * Calculate price change percentage
   */
  private calculatePriceChange(data: PriceData[]): number {
    if (data.length < 2) return 0;
    const first = data[0].price;
    const last = data[data.length - 1].price;
    return ((last - first) / first) * 100;
  }

  /**
   * Calculate volume change percentage
   */
  private calculateVolumeChange(data: PriceData[]): number {
    if (data.length < 2) return 0;
    const first = data[0].volume;
    const last = data[data.length - 1].volume;
    return first > 0 ? ((last - first) / first) * 100 : 0;
  }

  /**
   * Calculate price volatility
   */
  private calculateVolatility(data: PriceData[]): number {
    if (data.length < 2) return 0;
    
    const prices = data.map(d => d.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    
    return Math.sqrt(variance) / mean;
  }

  /**
   * Check if we can make a request to the specified service
   */
  private canMakeRequest(service: 'groq' | 'gemini'): boolean {
    const status = this.requestCount.get(service);
    if (!status) return true;
    
    const now = new Date();
    if (now >= status.resetTime) {
      this.requestCount.delete(service);
      return true;
    }
    
    const limit = service === 'groq' ? config.AI_RATE_LIMIT : config.AI_RATE_LIMIT;
    return status.count < limit;
  }

  /**
   * Update request count for rate limiting
   */
  private updateRequestCount(service: 'groq' | 'gemini'): void {
    const now = new Date();
    const resetTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour
    
    const status = this.requestCount.get(service);
    if (!status || now >= status.resetTime) {
      this.requestCount.set(service, { count: 1, resetTime });
    } else {
      status.count++;
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      if (this.groq) {
        // Simple test request to Groq
        await this.groq.chat.completions.create({
          messages: [{ role: 'user', content: 'Hello' }],
          model: config.GROQ_MODEL,
          max_tokens: 10
        });
        return true;
      }
      
      if (this.gemini) {
        // Simple test request to Gemini
        const model = this.gemini.getGenerativeModel({ model: config.GEMINI_MODEL });
        await model.generateContent('Hello');
        return true;
      }
      
      return false;
    } catch (error) {
      log.error('AI service health check failed', error);
      return false;
    }
  }

  /**
   * Get service status
   */
  getServiceStatus() {
    return {
      groq: {
        available: !!this.groq,
        rateLimitStatus: this.requestCount.get('groq')
      },
      gemini: {
        available: !!this.gemini,
        rateLimitStatus: this.requestCount.get('gemini')
      }
    };
  }
}

export const aiService = new AIService();
