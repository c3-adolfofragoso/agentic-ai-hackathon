/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#8B5CF6',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        dark: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        gray: {
          850: '#1A202C',
          900: '#171923',
          950: '#0D1117',
        }
      },
      backgroundColor: {
        'dark-primary': '#0D1117',
        'dark-secondary': '#161B22',
        'dark-tertiary': '#21262D',
      },
      borderColor: {
        'dark-border': '#30363D',
      }
    },
  },
  plugins: [],
}