import { SelectorConfig } from "@/types";

// ↓ 型書く
export const selectorConfig: SelectorConfig[] = [
  {
    title: "default",
    framework: ["Next.js", "Astro"],
    auth: ["Nextuth", "Clerk"],
    orm: ["prisma"]
  },
  {
    title: "mdx blog",
    framework: ["Next.js", "Astro"],
    auth: ["Nextuth", "Clerk"],
    // orm: []
  },
  {
    title: "e-commmers",
    framework: ["Next.js"],
    auth: ["Nextuth", "Clerk"],
    orm: ["prisma"]
  },
]