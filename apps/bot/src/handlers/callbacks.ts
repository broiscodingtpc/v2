import { Context } from 'telegraf';
import { apiService, Token } from '../services/api';
import { 
  formatTokenInfo, 
  formatWatchlistItem, 
  formatSignal, 
  formatAlert,
  formatErrorMessage,
  formatSuccessMessage,
  formatSteampunkMessage,
  formatPaginationButtons,
  truncateMessage
} from '../utils/formatter';
import { config } from '../config';
import { CommandHandlers } from './commands';

export class CallbackHandlers {
  
  // Main menu callback
  static async mainMenu(ctx: Context) {
    await CommandHandlers.menu(ctx);
  }

  // Help callback
  static async help(ctx: Context) {
    await CommandHandlers.help(ctx);
  }

  // Signals menu
  static async signalsMenu(ctx: Context) {
    const menuMessage = formatSteampunkMessage(`
📊 **Trading Signals Menu**

Choose your signal preference:
    `);

    const keyboard = {
      inline_keyboard: [
        [
          { text: '🆕 Latest Signals', callback_data: 'signals_latest' },
          { text: '🚀 Bullish Only', callback_data: 'signals_bullish' }
        ],
        [
          { text: '🐻 Bearish Only', callback_data: 'signals_bearish' },
          { text: '💎 High Confidence', callback_data: 'signals_high_confidence' }
        ],
        [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
      ]
    };

    await ctx.editMessageText(menuMessage, { 
      reply_markup: keyboard,
      parse_mode: 'Markdown'
    });
  }

  // Latest signals
  static async signalsLatest(ctx: Context) {
    try {
      const signals = await apiService.getSignals(5, 0);
      
      if (signals.length === 0) {
        await ctx.editMessageText(formatSteampunkMessage(`
📊 **No Recent Signals**

Our AI is analyzing the market. Check back soon!
        `), { parse_mode: 'Markdown' });
        return;
      }

      let message = formatSteampunkMessage(`
📊 **Latest Trading Signals**

${signals.map((signal, index) => 
        `${index + 1}. ${signal.type.toUpperCase()} - ${signal.tokenSymbol} (${signal.confidence}%)`
      ).join('\n')}

Click on a signal for details:
      `);

      const keyboard = {
        inline_keyboard: [
          ...signals.map(signal => [
            { 
              text: `${signal.type === 'bullish' ? '🚀' : signal.type === 'bearish' ? '🐻' : '📊'} ${signal.tokenSymbol} - ${signal.confidence}%`, 
              callback_data: `signal_detail_${signal.id}` 
            }
          ]),
          [
            { text: '🔄 Refresh', callback_data: 'signals_latest' },
            { text: '🔙 Signals Menu', callback_data: 'signals_menu' }
          ]
        ]
      };

      await ctx.editMessageText(truncateMessage(message), { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Latest signals error:', error);
      await ctx.editMessageText(formatErrorMessage('Failed to load signals.'));
    }
  }

  // Signal detail
  static async signalDetail(ctx: Context, signalId: string) {
    try {
      const signals = await apiService.getSignals(100, 0);
      const signal = signals.find(s => s.id === signalId);
      
      if (!signal) {
        await ctx.editMessageText(formatErrorMessage('Signal not found.'));
        return;
      }

      const signalMessage = formatSignal(signal);
      
      const keyboard = {
        inline_keyboard: [
          [
            { 
              text: `📊 View ${signal.tokenSymbol}`, 
              callback_data: `token_info_${signal.tokenId}` 
            },
            { 
              text: '➕ Add to Watchlist', 
              callback_data: `watchlist_add_${signal.tokenId}` 
            }
          ],
          [
            { text: '🔙 All Signals', callback_data: 'signals_latest' },
            { text: '🏠 Main Menu', callback_data: 'main_menu' }
          ]
        ]
      };

      await ctx.editMessageText(truncateMessage(signalMessage), { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Signal detail error:', error);
      await ctx.editMessageText(formatErrorMessage('Failed to load signal details.'));
    }
  }

  // Watchlist menu
  static async watchlistMenu(ctx: Context) {
    const menuMessage = formatSteampunkMessage(`
👁️ **Watchlist Menu**

Manage your tracked tokens:
    `);

    const keyboard = {
      inline_keyboard: [
        [
          { text: '📋 View Watchlist', callback_data: 'watchlist_view' },
          { text: '🔍 Add Token', callback_data: 'token_search' }
        ],
        [
          { text: '🧹 Clear All', callback_data: 'watchlist_clear_confirm' },
          { text: '📊 Watchlist Signals', callback_data: 'watchlist_signals' }
        ],
        [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
      ]
    };

    await ctx.editMessageText(menuMessage, { 
      reply_markup: keyboard,
      parse_mode: 'Markdown'
    });
  }

  // View watchlist
  static async watchlistView(ctx: Context) {
    const telegramId = ctx.from?.id.toString();
    if (!telegramId) {
      await ctx.editMessageText(formatErrorMessage('Unable to identify user.'));
      return;
    }

    try {
      const watchlistItems = await apiService.getWatchlist(telegramId);
      
      if (watchlistItems.length === 0) {
        const emptyMessage = formatSteampunkMessage(`
👁️ **Your Watchlist is Empty**

Start adding tokens to track their performance!
        `);

        const keyboard = {
          inline_keyboard: [
            [{ text: '🔍 Search Tokens', callback_data: 'token_search' }],
            [{ text: '🔥 Browse Trending', callback_data: 'trending_tokens' }],
            [{ text: '🔙 Watchlist Menu', callback_data: 'watchlist_menu' }]
          ]
        };

        await ctx.editMessageText(emptyMessage, { 
          reply_markup: keyboard,
          parse_mode: 'Markdown'
        });
        return;
      }

      const watchlistMessage = formatSteampunkMessage(`
👁️ **Your Watchlist** (${watchlistItems.length}/${config.MAX_WATCHLIST_ITEMS})

${watchlistItems.map((item, index) => 
        formatWatchlistItem(item.token, index)
      ).join('\n')}
      `);

      const keyboard = {
        inline_keyboard: [
          ...watchlistItems.slice(0, 8).map(item => [
            { 
              text: `📊 ${item.token.symbol}`, 
              callback_data: `token_info_${item.token.address}` 
            },
            { 
              text: '❌', 
              callback_data: `watchlist_remove_${item.token.address}` 
            }
          ]),
          [
            { text: '🔄 Refresh', callback_data: 'watchlist_view' },
            { text: '🔙 Watchlist Menu', callback_data: 'watchlist_menu' }
          ]
        ]
      };

      await ctx.editMessageText(truncateMessage(watchlistMessage), { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Watchlist view error:', error);
      await ctx.editMessageText(formatErrorMessage('Failed to load watchlist.'));
    }
  }

  // Add to watchlist
  static async watchlistAdd(ctx: Context, tokenAddress: string) {
    const telegramId = ctx.from?.id.toString();
    if (!telegramId) {
      await ctx.answerCbQuery('Unable to identify user.');
      return;
    }

    try {
      const token = await apiService.getToken(tokenAddress);
      if (!token) {
        await ctx.answerCbQuery('Token not found.');
        return;
      }

      await apiService.addToWatchlist(telegramId, tokenAddress);
      await ctx.answerCbQuery(`✅ ${token.symbol} added to watchlist!`);
      
      // Update the message to reflect the change
      const updatedMessage = formatSteampunkMessage(`
✅ **Added to Watchlist**

${token.symbol} has been added to your watchlist!
      `);

      const keyboard = {
        inline_keyboard: [
          [
            { text: '👁️ View Watchlist', callback_data: 'watchlist_view' },
            { text: `📊 View ${token.symbol}`, callback_data: `token_info_${tokenAddress}` }
          ],
          [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
        ]
      };

      await ctx.editMessageText(updatedMessage, { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Add to watchlist error:', error);
      await ctx.answerCbQuery('Failed to add to watchlist.');
    }
  }

  // Remove from watchlist
  static async watchlistRemove(ctx: Context, tokenAddress: string) {
    const telegramId = ctx.from?.id.toString();
    if (!telegramId) {
      await ctx.answerCbQuery('Unable to identify user.');
      return;
    }

    try {
      await apiService.removeFromWatchlist(telegramId, tokenAddress);
      await ctx.answerCbQuery('✅ Removed from watchlist!');
      
      // Refresh the watchlist view
      await this.watchlistView(ctx);
    } catch (error) {
      console.error('Remove from watchlist error:', error);
      await ctx.answerCbQuery('Failed to remove from watchlist.');
    }
  }

  // Token info
  static async tokenInfo(ctx: Context, tokenAddress: string) {
    try {
      const token = await apiService.getToken(tokenAddress);
      if (!token) {
        await ctx.editMessageText(formatErrorMessage('Token not found.'));
        return;
      }

      const tokenMessage = formatTokenInfo(token);
      
      const keyboard = {
        inline_keyboard: [
          [
            { text: '➕ Add to Watchlist', callback_data: `watchlist_add_${tokenAddress}` },
            { text: '🚨 Set Alert', callback_data: `alert_create_${tokenAddress}` }
          ],
          [
            { text: '📊 View Signals', callback_data: `token_signals_${tokenAddress}` },
            { text: '📈 Price Chart', url: `https://dexscreener.com/solana/${tokenAddress}` }
          ],
          [{ text: '🔙 Back', callback_data: 'main_menu' }]
        ]
      };

      await ctx.editMessageText(truncateMessage(tokenMessage), { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Token info error:', error);
      await ctx.editMessageText(formatErrorMessage('Failed to load token information.'));
    }
  }

  // Token search
  static async tokenSearch(ctx: Context) {
    const searchMessage = formatSteampunkMessage(`
🔍 **Token Search**

Send me a token symbol or name to search for.

**Examples:**
• BTC
• Ethereum  
• PEPE
• Solana

Or browse popular tokens below:
    `);

    const keyboard = {
      inline_keyboard: [
        [
          { text: '📈 Top Tokens', callback_data: 'top_tokens' },
          { text: '🔥 Trending', callback_data: 'trending_tokens' }
        ],
        [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
      ]
    };

    await ctx.editMessageText(searchMessage, { 
      reply_markup: keyboard,
      parse_mode: 'Markdown'
    });
  }

  // Top tokens
  static async topTokens(ctx: Context) {
    try {
      const tokens = await apiService.getTopTokens('24h', 10);
      
      if (tokens.length === 0) {
        await ctx.editMessageText(formatErrorMessage('No token data available.'));
        return;
      }

      const topMessage = formatSteampunkMessage(`
📈 **Top Performing Tokens (24h)**

${tokens.map((token, index) => {
        const emoji = index < 3 ? ['🥇', '🥈', '🥉'][index] : `${index + 1}.`;
        const change = token.priceChange24h >= 0 ? `+${token.priceChange24h.toFixed(2)}%` : `${token.priceChange24h.toFixed(2)}%`;
        return `${emoji} **${token.symbol}** - $${token.price.toFixed(6)} (${change})`;
      }).join('\n')}
      `);

      const keyboard = {
        inline_keyboard: [
          ...tokens.slice(0, 5).map(token => [
            { 
              text: `📊 ${token.symbol}`, 
              callback_data: `token_info_${token.address}` 
            }
          ]),
          [
            { text: '🔄 Refresh', callback_data: 'top_tokens' },
            { text: '🔙 Main Menu', callback_data: 'main_menu' }
          ]
        ]
      };

      await ctx.editMessageText(truncateMessage(topMessage), { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Top tokens error:', error);
      await ctx.editMessageText(formatErrorMessage('Failed to load top tokens.'));
    }
  }

  // Trending tokens
  static async trendingTokens(ctx: Context) {
    try {
      const tokens = await apiService.getTrendingTokens(10);
      
      if (tokens.length === 0) {
        await ctx.editMessageText(formatErrorMessage('No trending data available.'));
        return;
      }

      const trendingMessage = formatSteampunkMessage(`
🔥 **Trending Tokens**

${tokens.map((token, index) => 
        `${index + 1}. **${token.symbol}** - $${token.price.toFixed(6)} 📊 Vol: ${(token.volume24h / 1000000).toFixed(2)}M`
      ).join('\n')}
      `);

      const keyboard = {
        inline_keyboard: [
          ...tokens.slice(0, 5).map(token => [
            { 
              text: `📊 ${token.symbol}`, 
              callback_data: `token_info_${token.address}` 
            }
          ]),
          [
            { text: '🔄 Refresh', callback_data: 'trending_tokens' },
            { text: '🔙 Main Menu', callback_data: 'main_menu' }
          ]
        ]
      };

      await ctx.editMessageText(truncateMessage(trendingMessage), { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Trending tokens error:', error);
      await ctx.editMessageText(formatErrorMessage('Failed to load trending tokens.'));
    }
  }

  // Alerts menu
  static async alertsMenu(ctx: Context) {
    const menuMessage = formatSteampunkMessage(`
🚨 **Price Alerts Menu**

Manage your price notifications:
    `);

    const keyboard = {
      inline_keyboard: [
        [
          { text: '📋 View Alerts', callback_data: 'alerts_view' },
          { text: '➕ Create Alert', callback_data: 'alert_create_menu' }
        ],
        [
          { text: '🧹 Clear All', callback_data: 'alerts_clear_confirm' },
          { text: '⚙️ Alert Settings', callback_data: 'alert_settings' }
        ],
        [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
      ]
    };

    await ctx.editMessageText(menuMessage, { 
      reply_markup: keyboard,
      parse_mode: 'Markdown'
    });
  }

  // View alerts
  static async alertsView(ctx: Context) {
    const telegramId = ctx.from?.id.toString();
    if (!telegramId) {
      await ctx.editMessageText(formatErrorMessage('Unable to identify user.'));
      return;
    }

    try {
      const alerts = await apiService.getAlerts(telegramId);
      
      if (alerts.length === 0) {
        const emptyMessage = formatSteampunkMessage(`
🚨 **No Active Alerts**

Set up price alerts to get notified when tokens reach your target prices!
        `);

        const keyboard = {
          inline_keyboard: [
            [{ text: '➕ Create Alert', callback_data: 'alert_create_menu' }],
            [{ text: '🔍 Search Tokens', callback_data: 'token_search' }],
            [{ text: '🔙 Alerts Menu', callback_data: 'alerts_menu' }]
          ]
        };

        await ctx.editMessageText(emptyMessage, { 
          reply_markup: keyboard,
          parse_mode: 'Markdown'
        });
        return;
      }

      const alertsMessage = formatSteampunkMessage(`
🚨 **Your Active Alerts** (${alerts.length}/${config.MAX_ALERTS_PER_USER})

${alerts.map((alert, index) => 
        `${index + 1}. ${formatAlert(alert)}`
      ).join('\n')}
      `);

      const keyboard = {
        inline_keyboard: [
          ...alerts.slice(0, 8).map(alert => [
            { 
              text: `📊 ${alert.tokenSymbol}`, 
              callback_data: `token_info_${alert.tokenId}` 
            },
            { 
              text: '❌', 
              callback_data: `alert_delete_${alert.id}` 
            }
          ]),
          [
            { text: '🔄 Refresh', callback_data: 'alerts_view' },
            { text: '🔙 Alerts Menu', callback_data: 'alerts_menu' }
          ]
        ]
      };

      await ctx.editMessageText(truncateMessage(alertsMessage), { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Alerts view error:', error);
      await ctx.editMessageText(formatErrorMessage('Failed to load alerts.'));
    }
  }

  // Settings menu
  static async settingsMenu(ctx: Context) {
    const settingsMessage = formatSteampunkMessage(`
⚙️ **Bot Settings**

Configure your MetaPulse experience:
    `);

    const keyboard = {
      inline_keyboard: [
        [
          { text: '🔔 Notifications', callback_data: 'settings_notifications' },
          { text: '⏰ Timeframes', callback_data: 'settings_timeframes' }
        ],
        [
          { text: '🎨 Display Options', callback_data: 'settings_display' },
          { text: '🔗 Account Linking', callback_data: 'settings_account' }
        ],
        [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
      ]
    };

    await ctx.editMessageText(settingsMessage, { 
      reply_markup: keyboard,
      parse_mode: 'Markdown'
    });
  }

  // Handle callback query routing
  static async handleCallback(ctx: Context) {
    const callbackData = ctx.callbackQuery && 'data' in ctx.callbackQuery ? 
      ctx.callbackQuery.data : '';
    
    if (!callbackData) return;

    const [action, ...params] = callbackData.split('_');

    try {
      switch (action) {
        case 'main':
          if (params[0] === 'menu') await this.mainMenu(ctx);
          break;
        case 'help':
          await this.help(ctx);
          break;
        case 'signals':
          if (params[0] === 'menu') await this.signalsMenu(ctx);
          else if (params[0] === 'latest') await this.signalsLatest(ctx);
          break;
        case 'signal':
          if (params[0] === 'detail') await this.signalDetail(ctx, params[1]);
          break;
        case 'watchlist':
          if (params[0] === 'menu') await this.watchlistMenu(ctx);
          else if (params[0] === 'view') await this.watchlistView(ctx);
          else if (params[0] === 'add') await this.watchlistAdd(ctx, params[1]);
          else if (params[0] === 'remove') await this.watchlistRemove(ctx, params[1]);
          break;
        case 'token':
          if (params[0] === 'info') await this.tokenInfo(ctx, params[1]);
          else if (params[0] === 'search') await this.tokenSearch(ctx);
          break;
        case 'top':
          if (params[0] === 'tokens') await this.topTokens(ctx);
          break;
        case 'trending':
          if (params[0] === 'tokens') await this.trendingTokens(ctx);
          break;
        case 'alerts':
          if (params[0] === 'menu') await this.alertsMenu(ctx);
          else if (params[0] === 'view') await this.alertsView(ctx);
          break;
        case 'settings':
          if (params[0] === 'menu') await this.settingsMenu(ctx);
          break;
        default:
          await ctx.answerCbQuery('Unknown action');
      }
    } catch (error) {
      console.error('Callback handler error:', error);
      await ctx.answerCbQuery('An error occurred. Please try again.');
    }
  }
}