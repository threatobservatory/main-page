import { defineConfig } from 'astro/config';

const output = {
  entryFileNames: 'a/[hash].js',
  chunkFileNames: 'a/[hash].js',
  assetFileNames: 'a/[hash][extname]',
};

export default defineConfig({
  site: 'https://threatobservatory.org',
  output: 'static',
  compressHTML: true,
  devToolbar: { enabled: false },
  build: {
    inlineStylesheets: 'never',
    assets: 'a',
  },
  vite: {
    build: {
      sourcemap: false,
      assetsInlineLimit: 0,
    },
    environments: {
      client: {
        build: {
          sourcemap: false,
          rolldownOptions: { output },
        },
      },
    },
  },
});
