/**
 * Utility functions for formatting Telegram messages with ASCII steampunk styling
 */

export function formatSteampunkMessage(message: string): string {
  return message.trim();
}

export function formatPrice(price: number): string {
  if (price < 0.000001) {
    return price.toExponential(2);
  } else if (price < 0.01) {
    return price.toFixed(6);
  } else if (price < 1) {
    return price.toFixed(4);
  } else if (price < 100) {
    return price.toFixed(2);
  } else {
    return price.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }
}

export function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
}

export function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  } else {
    return `$${marketCap.toFixed(2)}`;
  }
}

export function formatVolume(volume: number): string {
  return formatMarketCap(volume);
}

export function formatTimeAgo(timestamp: string | Date): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now.getTime() - time.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return time.toLocaleDateString();
}

export function formatTokenInfo(token: any): string {
  const priceChange = token.priceChange24h || 0;
  const priceEmoji = priceChange >= 0 ? '📈' : '📉';
  const changeColor = priceChange >= 0 ? '🟢' : '🔴';
  
  return formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║          ${token.symbol} TOKEN INFO          ║
╚═══════════════════════════════════════╝

🏷️ **Name:** ${token.name}
💰 **Price:** $${formatPrice(token.price)}
${priceEmoji} **24h Change:** ${changeColor} ${formatPercentage(priceChange)}
📊 **Market Cap:** ${formatMarketCap(token.marketCap || 0)}
💧 **Volume 24h:** ${formatVolume(token.volume24h || 0)}
🔥 **Liquidity:** ${formatMarketCap(token.liquidity || 0)}

⚙️ **Contract:** \`${token.address}\`
🕒 **Updated:** ${formatTimeAgo(token.updatedAt || new Date())}
  `);
}

export function formatWatchlistItem(item: any, index: number): string {
  const priceChange = item.priceChange24h || 0;
  const emoji = priceChange >= 0 ? '📈' : '📉';
  const changeColor = priceChange >= 0 ? '🟢' : '🔴';
  
  return `${index + 1}. **${item.symbol}** - $${formatPrice(item.price)} ${emoji} ${changeColor} ${formatPercentage(priceChange)}`;
}

export function formatSignal(signal: any): string {
  const signalEmoji = {
    'bullish': '🚀',
    'bearish': '🐻',
    'neutral': '⚖️',
    'strong_buy': '💚',
    'buy': '🟢',
    'hold': '🟡',
    'sell': '🔴',
    'strong_sell': '💀'
  };

  const emoji = signalEmoji[signal.type as keyof typeof signalEmoji] || '📊';
  
  return formatSteampunkMessage(`
${emoji} **${signal.type.toUpperCase()} SIGNAL**

🏷️ **Token:** ${signal.tokenSymbol}
💰 **Price:** $${formatPrice(signal.currentPrice)}
🎯 **Target:** $${formatPrice(signal.targetPrice || 0)}
📊 **Confidence:** ${signal.confidence}%
⏰ **Time:** ${formatTimeAgo(signal.createdAt)}

📝 **Analysis:** ${signal.description || 'No description available'}
  `);
}

export function formatAlert(alert: any): string {
  const typeEmoji = {
    'price_above': '📈',
    'price_below': '📉',
    'volume_spike': '🌊',
    'market_cap': '💰'
  };

  const emoji = typeEmoji[alert.type as keyof typeof typeEmoji] || '🔔';
  
  return `${emoji} **${alert.tokenSymbol}** - ${alert.type.replace('_', ' ')} $${formatPrice(alert.targetValue)}`;
}

export function formatPaginationButtons(currentPage: number, totalPages: number, prefix: string) {
  const buttons = [];
  
  if (currentPage > 1) {
    buttons.push({ text: '⬅️ Previous', callback_data: `${prefix}_${currentPage - 1}` });
  }
  
  buttons.push({ text: `${currentPage}/${totalPages}`, callback_data: 'noop' });
  
  if (currentPage < totalPages) {
    buttons.push({ text: 'Next ➡️', callback_data: `${prefix}_${currentPage + 1}` });
  }
  
  return buttons;
}

export function truncateMessage(message: string, maxLength: number = 4000): string {
  if (message.length <= maxLength) {
    return message;
  }
  
  return message.substring(0, maxLength - 3) + '...';
}

export function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}

export function formatErrorMessage(error: string): string {
  return formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║              ⚠️ ERROR ⚠️              ║
╚═══════════════════════════════════════╝

${error}

🔧 If this persists, contact support:
• Group: https://t.me/metapulseai
• Twitter: https://x.com/METAPULSaibot
  `);
}

export function formatSuccessMessage(message: string): string {
  return formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║              ✅ SUCCESS ✅            ║
╚═══════════════════════════════════════╝

${message}
  `);
}