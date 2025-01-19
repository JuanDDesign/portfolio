import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import robotsTxt from "astro-robots-txt";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://juanda-portfolio.pages.dev",
  experimental: { svg: { mode: "sprite" } },
  integrations: [tailwind(), robotsTxt(), mdx()],
  i18n: { defaultLocale: "en", locales: ["en", "es"] },
});
