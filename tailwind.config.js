/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f8f6f0',
        ink: '#111414',
        accent: '#3451f5',        // Electric Cobalt Blue (e2.vc style)
        'accent-dark': '#233cd8',
        'accent-glow': 'rgba(52, 81, 245, 0.15)',
        'grid-line': 'rgba(17, 20, 20, 0.12)',
        'dark-bg': '#111414',
        'dark-ink': '#f8f6f0',
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.035em',
        tighter: '-0.02em',
        widebadge: '0.12em',
      }
    },
  },
  plugins: [],
};
