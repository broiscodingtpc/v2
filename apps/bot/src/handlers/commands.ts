import { Context } from 'telegraf';
import { apiService, Token, Signal, WatchlistItem, Alert } from '../services/api';
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

export class CommandHandlers {
  
  // Start command - Welcome message and main menu
  static async start(ctx: Context) {
    const welcomeMessage = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║        🎩 WELCOME TO METAPULSE 🎩     ║
║           Steampunk Trading AI        ║
╚═══════════════════════════════════════╝

⚙️ **Your AI-Powered Trading Companion** ⚙️

🔍 **Real-time Market Analysis**
📊 **Advanced Trading Signals** 
👁️ **Smart Watchlist Management**
🚨 **Custom Price Alerts**
🤖 **AI-Driven Insights**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 **Join Our Community:**
• Group: ${config.TELEGRAM_GROUP_URL}
• Twitter: ${config.TWITTER_URL}

Use /menu to access all features!
    `);

    const keyboard = {
      inline_keyboard: [
        [{ text: '🎛️ Main Menu', callback_data: 'main_menu' }],
        [
          { text: '📊 Latest Signals', callback_data: 'signals_latest' },
          { text: '👁️ My Watchlist', callback_data: 'watchlist_view' }
        ],
        [
          { text: '🔍 Search Token', callback_data: 'token_search' },
          { text: '🚨 My Alerts', callback_data: 'alerts_view' }
        ],
        [{ text: '🌐 Join Community', url: config.TELEGRAM_GROUP_URL }]
      ]
    };

    try {
      // Create or update user
      const telegramId = ctx.from?.id.toString();
      if (telegramId) {
        const existingUser = await apiService.getUser(telegramId);
        if (!existingUser) {
          await apiService.createUser(telegramId, {
            username: ctx.from?.username,
            firstName: ctx.from?.first_name,
            lastName: ctx.from?.last_name
          });
        }
      }

      await ctx.reply(welcomeMessage, { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Start command error:', error);
      await ctx.reply(formatErrorMessage('Failed to initialize. Please try again.'));
    }
  }

  // Help command
  static async help(ctx: Context) {
    const helpMessage = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║              🛠️ HELP GUIDE 🛠️         ║
╚═══════════════════════════════════════╝

**📋 Available Commands:**

🎛️ **/menu** - Main navigation menu
🔍 **/search <token>** - Search for tokens
👁️ **/watchlist** - View your watchlist
🚨 **/alerts** - Manage price alerts
📊 **/signals** - Latest trading signals
📈 **/top** - Top performing tokens
🔥 **/trending** - Trending tokens
⚙️ **/settings** - Bot preferences
ℹ️ **/help** - This help message

**🎯 Quick Actions:**
• Add to watchlist: Click ➕ on any token
• Set alert: Use 🚨 button on token info
• Remove items: Use ❌ buttons

**💡 Tips:**
• Use inline buttons for faster navigation
• Set alerts for important price levels
• Check signals regularly for opportunities

Need more help? Join our community!
    `);

    const keyboard = {
      inline_keyboard: [
        [{ text: '🎛️ Main Menu', callback_data: 'main_menu' }],
        [{ text: '🌐 Join Community', url: config.TELEGRAM_GROUP_URL }]
      ]
    };

    await ctx.reply(helpMessage, { 
      reply_markup: keyboard,
      parse_mode: 'Markdown'
    });
  }

  // Menu command
  static async menu(ctx: Context) {
    const menuMessage = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║            🎛️ MAIN MENU 🎛️           ║
╚═══════════════════════════════════════╝

Choose an option below:
    `);

    const keyboard = {
      inline_keyboard: [
        [
          { text: '📊 Trading Signals', callback_data: 'signals_menu' },
          { text: '👁️ Watchlist', callback_data: 'watchlist_menu' }
        ],
        [
          { text: '🚨 Price Alerts', callback_data: 'alerts_menu' },
          { text: '🔍 Token Search', callback_data: 'token_search' }
        ],
        [
          { text: '📈 Top Tokens', callback_data: 'top_tokens' },
          { text: '🔥 Trending', callback_data: 'trending_tokens' }
        ],
        [
          { text: '⚙️ Settings', callback_data: 'settings_menu' },
          { text: 'ℹ️ Help', callback_data: 'help' }
        ],
        [{ text: '🌐 Community', url: config.TELEGRAM_GROUP_URL }]
      ]
    };

    await ctx.reply(menuMessage, { 
      reply_markup: keyboard,
      parse_mode: 'Markdown'
    });
  }

  // Search command
  static async search(ctx: Context) {
    const args = ctx.message && 'text' in ctx.message ? 
      ctx.message.text.split(' ').slice(1) : [];
    
    if (args.length === 0) {
      await ctx.reply(formatSteampunkMessage(`
🔍 **Token Search**

Please provide a token symbol or name to search.

**Examples:**
• \`/search BTC\`
• \`/search Ethereum\`
• \`/search PEPE\`
      `), { parse_mode: 'Markdown' });
      return;
    }

    const query = args.join(' ');
    
    try {
      const tokens = await apiService.searchTokens(query, 5);
      
      if (tokens.length === 0) {
        await ctx.reply(formatErrorMessage(`No tokens found for "${query}"`));
        return;
      }

      const resultsMessage = formatSteampunkMessage(`
🔍 **Search Results for "${query}"**

Found ${tokens.length} token(s):
      `);

      const keyboard = {
        inline_keyboard: tokens.map(token => [
          { 
            text: `${token.symbol} - $${token.price.toFixed(6)}`, 
            callback_data: `token_info_${token.address}` 
          }
        ]).concat([[{ text: '🔙 Back to Menu', callback_data: 'main_menu' }]])
      };

      await ctx.reply(resultsMessage, { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Search error:', error);
      await ctx.reply(formatErrorMessage('Search failed. Please try again.'));
    }
  }

  // Watchlist command
  static async watchlist(ctx: Context) {
    const telegramId = ctx.from?.id.toString();
    if (!telegramId) {
      await ctx.reply(formatErrorMessage('Unable to identify user.'));
      return;
    }

    try {
      const watchlistItems = await apiService.getWatchlist(telegramId);
      
      if (watchlistItems.length === 0) {
        const emptyMessage = formatSteampunkMessage(`
👁️ **Your Watchlist is Empty**

Start adding tokens to track their performance!

Use /search to find tokens or browse trending tokens.
        `);

        const keyboard = {
          inline_keyboard: [
            [{ text: '🔍 Search Tokens', callback_data: 'token_search' }],
            [{ text: '🔥 Browse Trending', callback_data: 'trending_tokens' }],
            [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
          ]
        };

        await ctx.reply(emptyMessage, { 
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
          ...watchlistItems.slice(0, 10).map(item => [
            { 
              text: `📊 ${item.token.symbol}`, 
              callback_data: `token_info_${item.token.address}` 
            },
            { 
              text: '❌', 
              callback_data: `watchlist_remove_${item.token.address}` 
            }
          ]),
          [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
        ]
      };

      await ctx.reply(truncateMessage(watchlistMessage), { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Watchlist error:', error);
      await ctx.reply(formatErrorMessage('Failed to load watchlist.'));
    }
  }

  // Alerts command
  static async alerts(ctx: Context) {
    const telegramId = ctx.from?.id.toString();
    if (!telegramId) {
      await ctx.reply(formatErrorMessage('Unable to identify user.'));
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
            [{ text: '🔍 Search Tokens', callback_data: 'token_search' }],
            [{ text: '👁️ View Watchlist', callback_data: 'watchlist_view' }],
            [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
          ]
        };

        await ctx.reply(emptyMessage, { 
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
          ...alerts.slice(0, 10).map(alert => [
            { 
              text: `📊 ${alert.tokenSymbol}`, 
              callback_data: `token_info_${alert.tokenId}` 
            },
            { 
              text: '❌', 
              callback_data: `alert_delete_${alert.id}` 
            }
          ]),
          [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
        ]
      };

      await ctx.reply(truncateMessage(alertsMessage), { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Alerts error:', error);
      await ctx.reply(formatErrorMessage('Failed to load alerts.'));
    }
  }

  // Signals command
  static async signals(ctx: Context) {
    try {
      const signals = await apiService.getSignals(10, 0);
      
      if (signals.length === 0) {
        await ctx.reply(formatSteampunkMessage(`
📊 **No Recent Signals**

Our AI is analyzing the market. Check back soon for new trading opportunities!
        `));
        return;
      }

      const signalsMessage = formatSteampunkMessage(`
📊 **Latest Trading Signals**

Here are the most recent AI-generated signals:
      `);

      await ctx.reply(signalsMessage, { parse_mode: 'Markdown' });

      // Send each signal as a separate message for better readability
      for (const signal of signals.slice(0, 5)) {
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
            ]
          ]
        };

        await ctx.reply(truncateMessage(signalMessage), { 
          reply_markup: keyboard,
          parse_mode: 'Markdown'
        });
      }

      // Navigation buttons
      const navKeyboard = {
        inline_keyboard: [
          [{ text: '🔄 Refresh Signals', callback_data: 'signals_latest' }],
          [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
        ]
      };

      await ctx.reply('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', { 
        reply_markup: navKeyboard 
      });
    } catch (error) {
      console.error('Signals error:', error);
      await ctx.reply(formatErrorMessage('Failed to load signals.'));
    }
  }

  // Top tokens command
  static async topTokens(ctx: Context) {
    try {
      const tokens = await apiService.getTopTokens('24h', 10);
      
      if (tokens.length === 0) {
        await ctx.reply(formatErrorMessage('No token data available.'));
        return;
      }

      const topMessage = formatSteampunkMessage(`
📈 **Top Performing Tokens (24h)**

${tokens.map((token, index) => {
        const emoji = index < 3 ? ['🥇', '🥈', '🥉'][index] : `${index + 1}.`;
        return `${emoji} **${token.symbol}** - $${token.price.toFixed(6)} (${token.priceChange24h >= 0 ? '+' : ''}${token.priceChange24h.toFixed(2)}%)`;
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
          [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
        ]
      };

      await ctx.reply(truncateMessage(topMessage), { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Top tokens error:', error);
      await ctx.reply(formatErrorMessage('Failed to load top tokens.'));
    }
  }

  // Trending tokens command
  static async trendingTokens(ctx: Context) {
    try {
      const tokens = await apiService.getTrendingTokens(10);
      
      if (tokens.length === 0) {
        await ctx.reply(formatErrorMessage('No trending data available.'));
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
          [{ text: '🔙 Main Menu', callback_data: 'main_menu' }]
        ]
      };

      await ctx.reply(truncateMessage(trendingMessage), { 
        reply_markup: keyboard,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Trending tokens error:', error);
      await ctx.reply(formatErrorMessage('Failed to load trending tokens.'));
    }
  }

  // Settings command
  static async settings(ctx: Context) {
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

    await ctx.reply(settingsMessage, { 
      reply_markup: keyboard,
      parse_mode: 'Markdown'
    });
  }
}