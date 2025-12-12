/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // white-10
        input: 'var(--color-input)', // elevated-surface
        ring: 'var(--color-ring)', // electric-cyan
        background: 'var(--color-background)', // deep-space-blue
        foreground: 'var(--color-foreground)', // slate-50
        primary: {
          DEFAULT: 'var(--color-primary)', // electric-cyan
          foreground: 'var(--color-primary-foreground)' // deep-space-blue
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // violet-500
          foreground: 'var(--color-secondary-foreground)' // slate-50
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)' // slate-50
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-400-10
          foreground: 'var(--color-muted-foreground)' // slate-400
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // amber-500
          foreground: 'var(--color-accent-foreground)' // deep-space-blue
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // elevated-surface
          foreground: 'var(--color-popover-foreground)' // slate-50
        },
        card: {
          DEFAULT: 'var(--color-card)', // elevated-surface
          foreground: 'var(--color-card-foreground)' // slate-50
        },
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)' // slate-50
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)' // deep-space-blue
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)' // slate-50
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        caption: ['var(--font-caption)'],
        data: ['var(--font-data)']
      },
      boxShadow: {
        ambient: 'var(--shadow-ambient)',
        focused: 'var(--shadow-focused)',
        elevated: 'var(--shadow-elevated)'
      },
      transitionTimingFunction: {
        spring: 'var(--spring-bounce)'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px var(--color-primary)' },
          '100%': { boxShadow: '0 0 20px var(--color-primary), 0 0 30px var(--color-primary)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate')
  ],
}