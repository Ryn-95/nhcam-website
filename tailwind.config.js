/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'syne': ['Syne', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontWeight: {
        '100': '100',
        '200': '200',
        '300': '300',
      },
      colors: {
        'nhcam': {
          'primary': '#FFB454',
          'secondary': '#8B5CF6', 
          'tertiary': '#06B6D4',
          'quaternary': '#10B981',
          'dark': '#0F0F0F',
          'light': '#F3F3F3',
        },
        'white': {
          '5': 'rgba(255, 255, 255, 0.05)',
          '10': 'rgba(255, 255, 255, 0.1)',
          '15': 'rgba(255, 255, 255, 0.15)',
          '20': 'rgba(255, 255, 255, 0.2)',
          '30': 'rgba(255, 255, 255, 0.3)',
          '40': 'rgba(255, 255, 255, 0.4)',
          '50': 'rgba(255, 255, 255, 0.5)',
          '60': 'rgba(255, 255, 255, 0.6)',
          '70': 'rgba(255, 255, 255, 0.7)',
          '80': 'rgba(255, 255, 255, 0.8)',
          '90': 'rgba(255, 255, 255, 0.9)',
        },
        'black': {
          '5': 'rgba(0, 0, 0, 0.05)',
          '10': 'rgba(0, 0, 0, 0.1)',
          '20': 'rgba(0, 0, 0, 0.2)',
          '30': 'rgba(0, 0, 0, 0.3)',
          '40': 'rgba(0, 0, 0, 0.4)',
          '50': 'rgba(0, 0, 0, 0.5)',
          '60': 'rgba(0, 0, 0, 0.6)',
          '70': 'rgba(0, 0, 0, 0.7)',
          '80': 'rgba(0, 0, 0, 0.8)',
          '90': 'rgba(0, 0, 0, 0.9)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-ultra': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
        'grain': `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      },
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px',
        '4xl': '128px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-in-left': 'slideInLeft 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-in-right': 'slideInRight 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'scale-in': 'scaleIn 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'grain': 'grain 8s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(60px) scale(0.95)',
            filter: 'blur(10px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0px)'
          }
        },
        slideInLeft: {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(-100px) rotate(-2deg)',
            filter: 'blur(5px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0) rotate(0deg)',
            filter: 'blur(0px)'
          }
        },
        slideInRight: {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(100px) rotate(2deg)',
            filter: 'blur(5px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0) rotate(0deg)',
            filter: 'blur(0px)'
          }
        },
        scaleIn: {
          '0%': { 
            opacity: '0', 
            transform: 'scale(0.8) rotate(-1deg)',
            filter: 'blur(8px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1) rotate(0deg)',
            filter: 'blur(0px)'
          }
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '0.6'
          },
          '50%': { 
            transform: 'translateY(-12px) rotate(0.5deg)',
            opacity: '1'
          }
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.05)'
          }
        },
        breathe: {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '0.4'
          },
          '50%': { 
            transform: 'scale(1.02)',
            opacity: '0.7'
          }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(-2px, -1px) rotate(0.5deg)' },
          '50%': { transform: 'translate(1px, -2px) rotate(-0.5deg)' },
          '75%': { transform: 'translate(-1px, 1px) rotate(0.25deg)' }
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '1' }],
        '11xl': ['12rem', { lineHeight: '1' }],
        '12xl': ['14rem', { lineHeight: '1' }],
        '13xl': ['16rem', { lineHeight: '1' }],
        '14xl': ['18rem', { lineHeight: '1' }],
        '15xl': ['20rem', { lineHeight: '1' }],
        '16xl': ['22rem', { lineHeight: '1' }],
        '17xl': ['24rem', { lineHeight: '1' }],
        '18xl': ['26rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        'ultra-wide': '0.5em',
        'mega-wide': '0.8em',
      },
      lineHeight: {
        '0': '0',
        '0.5': '0.5',
        '0.8': '0.8',
        '0.9': '0.9',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      blur: {
        '4xl': '128px',
        '5xl': '256px',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
        '110': '1.1',
        '115': '1.15',
        '120': '1.2',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
      },
      transitionTimingFunction: {
        'ultra': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      boxShadow: {
        'ultra': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'mega': '0 35px 60px -12px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(255, 255, 255, 0.1)',
        'glow-lg': '0 0 40px rgba(255, 255, 255, 0.15)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      },
      dropShadow: {
        'ultra': '0 25px 25px rgba(0, 0, 0, 0.15)',
        'mega': '0 35px 35px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          'background': 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 100%)',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.text-ultra-large': {
          'font-size': 'clamp(4rem, 20vw, 25rem)',
          'line-height': '0.8',
          'letter-spacing': '0.05em',
          'font-weight': '100',
          'background': 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 100%)',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.glass-ultra': {
          'background': 'rgba(0, 0, 0, 0.05)',
          'backdrop-filter': 'blur(20px) saturate(180%)',
          'border': '1px solid rgba(255, 255, 255, 0.02)',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
        },
        '.line-ultra': {
          'height': '0.5px',
          'background': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        },
        '.line-vertical': {
          'width': '0.5px',
          'background': 'linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
        },
        '.hover-lift': {
          'transition': 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        },
        '.hover-lift:hover': {
          'transform': 'translateY(-8px) scale(1.02)',
          'filter': 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))',
        },
        '.shimmer': {
          'position': 'relative',
          'overflow': 'hidden',
        },
        '.shimmer::before': {
          'content': '""',
          'position': 'absolute',
          'top': '0',
          'left': '0',
          'width': '100%',
          'height': '100%',
          'background': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent)',
          'transform': 'translateX(-100%)',
          'animation': 'shimmer 3s infinite',
        },
        '.gpu-accelerated': {
          'transform': 'translateZ(0)',
          'will-change': 'transform, opacity',
          'backface-visibility': 'hidden',
        }
      }
      addUtilities(newUtilities)
    }
  ],
} 