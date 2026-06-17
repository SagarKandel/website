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
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg:           '#fbfbfd',
        surface:      '#ffffff',
        'surface-2':  '#f5f5f7',
        text:         '#1d1d1f',
        'text-2':     '#6e6e73',
        muted:        '#86868b',
        accent:       '#0066cc',
        'accent-dark':'#004999',
        'accent-bg':  '#e8f0fb',
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease-out forwards',
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'float':      'float 6s ease-in-out infinite',
        'pulse-dot':  'pulseDot 2s ease-in-out infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: 0, transform: 'translateY(28px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        float:    { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseDot: { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.6, transform: 'scale(0.85)' } },
        shimmer:  {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      boxShadow: {
        glass:        '0 2px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.06)',
        'glass-lg':   '0 8px 60px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.06)',
        card:         '0 1px 4px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.06)',
        'card-hover': '0 6px 28px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.08)',
        accent:       '0 4px 20px rgba(0,102,204,0.28)',
        'accent-lg':  '0 8px 36px rgba(0,102,204,0.35)',
      },
    },
  },
  plugins: [],
}
