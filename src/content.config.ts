import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const ROLES = z.enum(["UX/UI", "Product Owner", "Product Lead"]);

export type Roles = z.infer<typeof ROLES>;

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/projects" }),
  schema: z.object({ title: z.string(), roles: ROLES.array(), description: z.string() }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/experience" }),
  schema: z.array(
    z.object({ date: z.string(), title: z.string(), company: z.string(), descriptions: z.string().array() })
  ),
});

export const collections = { projects, experience };
