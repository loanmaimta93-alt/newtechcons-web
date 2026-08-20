// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // THAY: đổi lại đúng domain khi deploy (đã có sẵn newtechcons.net)
  site: 'https://newtechcons.net',
  output: 'static', // build tĩnh — phù hợp deploy Cloudflare Pages
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
