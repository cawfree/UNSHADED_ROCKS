import animated from 'tailwindcss-animated';
import autoprefixer from 'autoprefixer';

import {colors, screens, fontSize} from './src/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*'],
  theme: {
    fontSize,
    screens,
    extend: {
      fontFamily: {
        'LetterformVariations00': ['LetterformVariations00'],
        'LetterformVariations01': ['LetterformVariations01'],
        'Gallery': ['DiatypeProgrammFinal'],
      },
      colors,
    },
  },
  plugins: [animated, autoprefixer],
}

