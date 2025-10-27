export declare const createMockToken: (overrides?: {}) => {
    id: string;
    address: string;
    symbol: string;
    name: string;
    network: string;
    price: number;
    priceChange24h: number;
    volume24h: number;
    marketCap: number;
    liquidity: number;
    fdv: number;
    holders: number;
    createdAt: Date;
    updatedAt: Date;
};
export declare const createMockTokenMetrics: (overrides?: {}) => {
    id: string;
    tokenAddress: string;
    price: number;
    volume24h: number;
    marketCap: number;
    liquidity: number;
    priceChange1h: number;
    priceChange24h: number;
    priceChange7d: number;
    volumeChange24h: number;
    liquidityChange24h: number;
    holderCount: number;
    holderChange24h: number;
    timestamp: Date;
};
export declare const createMockSocialMetrics: (overrides?: {}) => {
    id: string;
    tokenAddress: string;
    platform: string;
    mentions: number;
    sentiment: number;
    engagement: number;
    followers: number;
    influencerMentions: number;
    hashtagCount: number;
    timestamp: Date;
};
export declare const createMockSignal: (overrides?: {}) => {
    id: string;
    tokenAddress: string;
    type: string;
    action: string;
    strength: number;
    confidence: number;
    price: number;
    targetPrice: number;
    stopLoss: number;
    timeframe: string;
    riskLevel: string;
    description: string;
    reasoning: string;
    metadata: {};
    status: string;
    createdAt: Date;
    expiresAt: Date;
};
export declare const createMockJobData: (overrides?: {}) => {
    jobId: string;
    jobType: string;
    status: string;
    startedAt: Date;
    completedAt: Date;
    duration: number;
    result: {
        processed: number;
    };
    error: null;
    metadata: {};
    createdAt: Date;
};
export declare const waitFor: (ms: number) => Promise<unknown>;
export declare const mockDexScreenerResponse: {
    pairs: {
        chainId: string;
        dexId: string;
        url: string;
        pairAddress: string;
        baseToken: {
            address: string;
            name: string;
            symbol: string;
        };
        quoteToken: {
            address: string;
            name: string;
            symbol: string;
        };
        priceNative: string;
        priceUsd: string;
        volume: {
            h24: number;
        };
        priceChange: {
            h24: number;
        };
        liquidity: {
            usd: number;
        };
        fdv: number;
        marketCap: number;
    }[];
};
export declare const mockTwitterResponse: {
    data: {
        id: string;
        text: string;
        created_at: string;
        author_id: string;
        public_metrics: {
            retweet_count: number;
            like_count: number;
            reply_count: number;
            quote_count: number;
        };
    }[];
    includes: {
        users: {
            id: string;
            username: string;
            name: string;
            public_metrics: {
                followers_count: number;
                following_count: number;
            };
        }[];
    };
};
//# sourceMappingURL=setup.d.ts.map