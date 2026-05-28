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
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        bg:          '#060d1f',
        surface:     '#0a1628',
        'surface-2': '#0f1f3d',
        border:      '#1a2d4f',
        'border-bright': '#2a4a7f',
        cyan:        '#00d4ff',
        'cyan-dim':  '#0099bb',
        'cyan-glow': 'rgba(0,212,255,0.12)',
        purple:      '#8b5cf6',
        green:       '#10b981',
        amber:       '#f59e0b',
        red:         '#ef4444',
        text:        '#e2e8f0',
        'text-2':    '#94a3b8',
        muted:       '#475569',
      },
      animation: {
        'blink':      'blink 1s step-end infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'link-light': 'linkLight 2.5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'fade-in':    'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        blink:      { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        linkLight: {
          '0%':   { transform: 'translateX(-100%)', opacity: 0 },
          '10%':  { opacity: 1 },
          '90%':  { opacity: 1 },
          '100%': { transform: 'translateX(400%)', opacity: 0 },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 8px rgba(0,212,255,0.2)' },
          '50%':     { boxShadow: '0 0 24px rgba(0,212,255,0.5), 0 0 48px rgba(0,212,255,0.2)' },
        },
        fadeIn: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
