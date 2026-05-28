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
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['var(--font-orbitron)', 'Orbitron', 'monospace'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      colors: {
        terminal: {
          bg: '#020c06',
          surface: '#041209',
          border: '#0d3320',
          green: '#00ff7f',
          'green-dim': '#00cc64',
          'green-glow': '#00ff7f33',
          amber: '#ffb800',
          red: '#ff3333',
          blue: '#00d4ff',
          text: '#b4ffda',
          muted: '#4a7a5e',
          dim: '#1a4030',
        },
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scan': 'scan 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'type': 'typing 2s steps(20) forwards',
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px #00ff7f33, 0 0 20px #00ff7f22' },
          '50%': { boxShadow: '0 0 20px #00ff7f66, 0 0 40px #00ff7f44' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      backgroundImage: {
        'grid-terminal': `linear-gradient(rgba(0, 255, 127, 0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0, 255, 127, 0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}
