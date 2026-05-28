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
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#FAFAF7',
        surface: '#FFFFFF',
        'surface-alt': '#F4F4F0',
        border: '#E5E5DF',
        ink: '#18181B',
        'ink-2': '#52525B',
        muted: '#A1A1AA',
        accent: '#6366F1',
        'accent-dark': '#4F46E5',
        'accent-light': '#EEF2FF',
        slate: '#0F172A',
      },
    },
  },
  plugins: [],
}
