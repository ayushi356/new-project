/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ivory: {
          DEFAULT: '#FAF8F5',
          light: '#FDFBF9',
          dark: '#F3EFE9',
          muted: '#EAE4DC',
        },
        forest: {
          DEFAULT: '#1A3D2F',
          dark: '#10271E',
          deep: '#0D2119',
          light: '#285844',
          subtle: '#E8F1EC',
        },
        ink: {
          DEFAULT: '#181A19',
          light: '#2D312E',
          muted: '#525A55',
          faint: '#818C85',
        },
        ochre: {
          DEFAULT: '#8F5C2C',
          light: '#B87B41',
          subtle: '#FAF3EA',
        },
        'warm-border': '#E4DFD5',
        'warm-card': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
