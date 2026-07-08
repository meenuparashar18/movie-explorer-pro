/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        marquee: {
          bg: '#0B0C10',        // near-black stage
          panel: '#15161C',     // card/panel surface
          panel2: '#1D1F27',    // raised surface
          gold: '#E8B959',      // marquee bulb gold
          gold2: '#F4D791',
          crimson: '#B3413E',   // velvet curtain red
          crimson2: '#D65C55',
          cream: '#F3ECDD',     // ivory text on dark
          smoke: '#8B8D98',     // muted text
          line: '#2A2C36',      // hairline borders
        },
        // light mode counterparts
        paper: {
          bg: '#FAF7F0',
          panel: '#FFFFFF',
          panel2: '#F1ECE0',
          ink: '#1B1B1F',
          smoke: '#6B6D78',
          line: '#E6E1D3',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'film-grain': "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
        'spotlight': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(232,185,89,0.18), transparent 60%)',
      },
      boxShadow: {
        marquee: '0 0 0 1px rgba(232,185,89,0.25), 0 8px 30px rgba(0,0,0,0.45)',
        glow: '0 0 20px rgba(232,185,89,0.35)',
      },
      keyframes: {
        bulbPulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.55 },
        },
        marqueeScroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        bulb: 'bulbPulse 1.8s ease-in-out infinite',
        marquee: 'marqueeScroll 30s linear infinite',
        fadeUp: 'fadeUp 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}

