import { defineEcConfig } from '@astrojs/starlight/expressive-code';
import { loadSharpLanguage } from './src/syntax/sharp-language.js';

export default defineEcConfig({
  shiki: {
    langs: [loadSharpLanguage],
  },
});
