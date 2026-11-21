import { defineConfig } from 'vitest/config';

// xt-plugin-intl 1.5.0 imports world-countries/countries.json from its published
// ESM build without a JSON import attribute. Inlining it lets Vite transform the
// JSON import so the unit tests run under Node 24.
export default defineConfig({
  test: {
    server: {
      deps: {
        inline: ['xt-plugin-intl'],
      },
    },
  },
});
