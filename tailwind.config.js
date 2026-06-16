/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Scholar palette (Class 9-12)
        primary: '#FF8A00',
        background: '#0B0D11',
        surface: '#15181F',
        'surface-hover': '#1E222B',
        'text-main': '#E2E4E9',
        muted: '#8A919E',
        border: '#2C313D',
        success: '#00C853',
        danger: '#FF3B30',
        // Explorer palette (Class 6-8) - amber/warm
        amber: '#ffb77f',
        'amber-dim': '#ff8a00',
        tertiary: '#88ceff',
        'surface-container': '#281d15',
        'surface-container-low': '#241912',
        'surface-container-high': '#33281f',
        'surface-container-highest': '#3f3229',
        'border-structural': '#2C313D',
        'on-surface': '#f3dfd1',
        'on-surface-variant': '#ddc1ae',
        'outline-variant': '#564334',
      },
      fontFamily: {
        heading: ['Crimson Pro', 'serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        display: ['Newsreader', 'serif'],
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '4px',
        lg: '8px',
        xl: '12px',
        full: '9999px',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        glow: {
          from: { boxShadow: '0 0 10px rgba(255, 138, 0, 0.3)' },
          to: { boxShadow: '0 0 25px rgba(255, 138, 0, 0.6)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
