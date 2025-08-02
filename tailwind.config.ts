import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      animation: {
        'spin-slow': 'spin-slow 3s linear infinite',
        'reverse-spin': 'reverse-spin 2s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-border': 'pulse-border 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'flicker': 'flicker 2s ease-in-out infinite',
        'quantum-shift': 'quantum-shift 0.5s ease-in-out',
      },
      keyframes: {
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'reverse-spin': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' },
        },
        'pulse-border': {
          '0%, 100%': { borderColor: 'rgba(6, 182, 212, 0.3)' },
          '50%': { borderColor: 'rgba(6, 182, 212, 0.6)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'quantum-shift': {
          '0%': { transform: 'translateX(0) scale(1)' },
          '25%': { transform: 'translateX(2px) scale(1.02)' },
          '50%': { transform: 'translateX(0) scale(1)' },
          '75%': { transform: 'translateX(-2px) scale(0.98)' },
          '100%': { transform: 'translateX(0) scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(6, 182, 212, 0.3)',
        'glow-lg': '0 0 40px rgba(6, 182, 212, 0.5)',
        'glow-xl': '0 0 60px rgba(6, 182, 212, 0.7)',
      },
    },
  },
  plugins: [],
}

export default config 