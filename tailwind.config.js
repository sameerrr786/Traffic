/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#0c1631',
        'dark-secondary': '#324376',
        'dark-accent': '#242b42',
        'orange-primary': '#ff5e00',
        'orange-light': '#ff8d4d',
        'blue-primary': '#0dd3ff',
        'blue-secondary': '#0088ff',
        'neutral-light': '#e6e4e1',
        'success': '#29b474',
        'warning': '#ffb52e',
        'danger': '#ff3a54',
        'info': '#5b83eb',
      },
      backgroundColor: {
        'dark-100': 'rgba(50, 67, 118, 0.07)',
        'dark-200': '#0c1631',
        'dark-300': 'rgba(36, 43, 66, 0.5)',
        'dark-accent': 'rgba(13, 211, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ff5e00 0%, #ff8d4d 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #0dd3ff 0%, #0088ff 100%)',
        'gradient-mixed': 'linear-gradient(135deg, #ff5e00 0%, #0dd3ff 100%)',
      },
      borderColor: {
        'dark-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'primary': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'secondary': ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
        'neon': '0 0 20px 2px var(--color-accent-alt)',
        'button': '0 4px 12px rgba(255, 94, 0, 0.3)',
        'button-blue': '0 4px 12px rgba(13, 211, 255, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'bounce-custom': 'bounce 1.4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        'pulse-ring': {
          '0%, 100%': { transform: 'scale(0.8)', opacity: 0.2 },
          '50%': { transform: 'scale(1.1)', opacity: 0.5 },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
      backdropFilter: {
        'blur-md': 'blur(16px)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e6e4e1',
            a: {
              color: '#0dd3ff',
              '&:hover': {
                color: '#0088ff',
              },
            },
            h1: {
              color: '#e6e4e1',
            },
            h2: {
              color: '#e6e4e1',
            },
            h3: {
              color: '#e6e4e1',
            },
            h4: {
              color: '#e6e4e1',
            },
            h5: {
              color: '#e6e4e1',
            },
            h6: {
              color: '#e6e4e1',
            },
            strong: {
              color: '#e6e4e1',
            },
            code: {
              color: '#ff5e00',
            },
            figcaption: {
              color: '#94a3b8',
            },
          },
        },
      },
    },
  },
  plugins: [],
} 