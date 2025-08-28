import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Brand Colors
        brand: {
          indigo: '#4B0082', // Deep indigo - Primary dark backgrounds
          'indigo-light': '#6A1B99',
          'indigo-dark': '#3B0066',
          blue: '#0F62FE', // Electric blue - Interactive elements
          'blue-light': '#3D7EFF',
          'blue-dark': '#0A4FE1',
          orange: '#FF6F00', // Vibrant orange - CTAs
          'orange-light': '#FF8533',
          'orange-dark': '#E65100',
          charcoal: '#1A1A1A', // Deep backgrounds
          'charcoal-light': '#2D2D2D',
          'charcoal-dark': '#0D0D0D',
        },

        // Extended Purple Gradients
        purple: {
          50: '#F3E8FF',
          100: '#E9D5FF',
          200: '#D8B4FE',
          300: '#C084FC',
          400: '#A855F7',
          500: '#9333EA',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4B0082', // Brand indigo
          950: '#3B0066',
        },

        // Dark theme colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Glassmorphism colors
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.1)',
          indigo: 'rgba(75, 0, 130, 0.2)',
          blue: 'rgba(15, 98, 254, 0.2)',
          orange: 'rgba(255, 111, 0, 0.2)',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.25rem' }],
        '6xl': ['3.75rem', { lineHeight: '4rem' }],
        '7xl': ['4.5rem', { lineHeight: '4.75rem' }],
        '8xl': ['6rem', { lineHeight: '6.25rem' }],
      },

      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Custom Animations
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease-in-out infinite',
        'gradient-y': 'gradient-y 3s ease-in-out infinite',
        'gradient-xy': 'gradient-xy 6s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'float-delayed': 'float-delayed 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        ripple: 'ripple 0.6s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'scale-out': 'scale-out 0.3s ease-out',
        glow: 'glow 2s ease-in-out infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'text-gradient': 'text-gradient 3s ease-in-out infinite',
        blob: 'blob 7s ease-in-out infinite',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in': {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in-left': {
          from: {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-in-right': {
          from: {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '0.8',
            boxShadow: '0 0 20px rgba(15, 98, 254, 0.3)',
          },
          '50%': {
            opacity: '1',
            boxShadow: '0 0 40px rgba(15, 98, 254, 0.6)',
          },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { 'background-position': '50% 0%' },
          '50%': { 'background-position': '50% 100%' },
        },
        'gradient-xy': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '25%': { 'background-position': '100% 100%' },
          '50%': { 'background-position': '100% 50%' },
          '75%': { 'background-position': '0% 0%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'scale-in': {
          '0%': {
            transform: 'scale(0.95)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'scale-out': {
          '0%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(0.95)',
            opacity: '0',
          },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(75, 0, 130, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(75, 0, 130, 0.8)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        'text-gradient': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },

      // Custom Gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient':
          'linear-gradient(135deg, #4B0082 0%, #0F62FE 50%, #FF6F00 100%)',
        'hero-gradient':
          'linear-gradient(135deg, #4B0082 0%, #6D28D9 25%, #0F62FE 50%, #3D7EFF 75%, #FF6F00 100%)',
        'card-gradient':
          'linear-gradient(135deg, rgba(75, 0, 130, 0.1) 0%, rgba(15, 98, 254, 0.1) 100%)',
        'glass-gradient':
          'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'shimmer-gradient':
          'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
        'text-gradient':
          'linear-gradient(90deg, #4B0082, #0F62FE, #FF6F00, #4B0082)',
        'orb-gradient':
          'radial-gradient(circle, rgba(15, 98, 254, 0.3) 0%, rgba(75, 0, 130, 0.1) 100%)',
      },

      // Enhanced Box Shadows
      boxShadow: {
        'glow-sm': '0 0 10px rgba(15, 98, 254, 0.3)',
        glow: '0 0 20px rgba(15, 98, 254, 0.4)',
        'glow-lg': '0 0 30px rgba(15, 98, 254, 0.5)',
        'glow-xl': '0 0 40px rgba(15, 98, 254, 0.6)',
        'glow-orange': '0 0 20px rgba(255, 111, 0, 0.4)',
        'glow-orange-lg': '0 0 30px rgba(255, 111, 0, 0.5)',
        'glow-indigo': '0 0 20px rgba(75, 0, 130, 0.4)',
        'glow-indigo-lg': '0 0 30px rgba(75, 0, 130, 0.5)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 16px 64px 0 rgba(31, 38, 135, 0.37)',
        floating:
          '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'floating-lg':
          '0 20px 50px -10px rgba(0, 0, 0, 0.15), 0 20px 20px -10px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 40px -10px rgba(75, 0, 130, 0.2)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(15, 98, 254, 0.3)',
      },

      // Backdrop Blur
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },

      // Custom Grid
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(250px, 1fr))',
        'card-grid': 'repeat(auto-fit, minmax(280px, 1fr))',
      },

      // Responsive Screens
      screens: {
        xs: '475px',
        '3xl': '1600px',
      },

      // Z-Index Scale
      zIndex: {
        '100': '100',
        '1000': '1000',
      },

      // Custom Aspect Ratios
      aspectRatio: {
        golden: '1.618',
      },

      // Custom Transitions
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        '2000': '2000ms',
      },

      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        glass: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
