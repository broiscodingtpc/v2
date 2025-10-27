// Groq - Scoring System Prompt
export const GROQ_SCORING_SYSTEM_PROMPT = `You are a fast market signal classifier. Output concise JSON with fields:
score (0..10), label (one of: low, medium, high), rationale (<=180 chars).
Consider price/volume/liquidity deltas and social pulse features only.
Do not provide advice or instructions to trade.`;

// Groq - Scoring User Template
export function createGroqScoringPrompt(data: {
  symbol: string;
  mint: string;
  price5m: number;
  vol5m: number;
  trades5m: number;
  liq30m: number;
  socialPulse: number;
  notes?: string;
}): string {
  return `FEATURES:
token: ${data.symbol} (${data.mint})
price_5m_delta: ${data.price5m}
vol_5m_delta: ${data.vol5m}
trades_5m_delta: ${data.trades5m}
liq_delta_30m: ${data.liq30m}
social_pulse: ${data.socialPulse}
context_notes: ${data.notes || 'none'}

Return JSON only.`;
}

// Gemini - Analyst Report System Prompt
export const GEMINI_ANALYST_SYSTEM_PROMPT = `You write clear, neutral, human-grade market summaries. No financial advice.
Structure sections: Market Context, On-chain/Trading Notes, Social Pulse,
Risk Factors, Actionable Considerations (neutral, general). Max 400 words.`;

// Gemini - Analyst Report User Template
export function createGeminiAnalystPrompt(data: {
  symbol: string;
  mint: string;
  price5m: number;
  vol5m: number;
  vol1h: number;
  vol24h: number;
  liqUsd: number;
  socialPulse: number;
  signalsCompact: string;
  notes?: string;
}): string {
  return `TOKEN: ${data.symbol} (${data.mint})
WINDOW: last 60 minutes
METRICS:
- Price Δ5m: ${data.price5m}
- Volume 5m / 1h / 24h: ${data.vol5m} / ${data.vol1h} / ${data.vol24h}
- Liquidity: ${data.liqUsd}
- Social Pulse: ${data.socialPulse} (0..10)

RECENT SIGNALS: ${data.signalsCompact}
NOTES: ${data.notes || 'none'}

Generate sections as instructed. Avoid hype. No emojis. No advice.`;
}

export interface GroqScoringResponse {
  score: number;
  label: 'low' | 'medium' | 'high';
  rationale: string;
}

export interface GeminiAnalystResponse {
  marketContext: string;
  tradingNotes: string;
  socialPulse: string;
  riskFactors: string;
  actionableConsiderations: string;
}