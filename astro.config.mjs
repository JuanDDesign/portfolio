import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import robotsTxt from "astro-robots-txt";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  // TODO: Add domain site
  site: "http:localhost:4321",
  experimental: { svg: { mode: "sprite" } },
  integrations: [tailwind(), robotsTxt(), mdx()],
  i18n: { defaultLocale: "en", locales: ["en", "es"] },
});
