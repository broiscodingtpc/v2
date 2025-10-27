/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ascii-green': '#00ff41',
        'ascii-amber': '#ffb000',
        'ascii-red': '#ff4444',
        'ascii-blue': '#4488ff',
        'ascii-gray': '#888888',
        'ascii-dark': '#111111',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
      },
      animation: {
        'ascii-blink': 'ascii-blink 1s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
      },
      keyframes: {
        'ascii-blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px #00ff41' },
          '50%': { boxShadow: '0 0 20px #00ff41' },
        },
      },
    },
  },
  plugins: [],
}