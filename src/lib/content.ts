import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { projectSchema, type Project, testimonialSchema } from "./schema";
import recommendations from "../../content/recommendations.json";
import writingItems from "../../content/writing.json";
export const getProjects = cache(async (): Promise<Project[]> => {
  const dir = path.join(process.cwd(), "content/projects");
  const files = (await fs.readdir(dir)).filter(file => /^[a-z0-9-]+\.mdx$/.test(file));
  const projects = await Promise.all(files.map(async file => {
    const {data, content} = matter(await fs.readFile(path.join(dir, file), "utf8"));
    return {...projectSchema.parse(data), slug:file.replace(/\.mdx$/, ""), body:content};
  }));
  return projects.filter(project => !project.draft).sort((a,b) => a.order - b.order);
});
export const getProject = async (slug:string) => (await getProjects()).find(project => project.slug === slug);
export const testimonials = recommendations.map(item => testimonialSchema.parse(item));
export const writing = writingItems;
