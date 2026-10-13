import { PortfolioHome } from "@/components/portfolio-home";
import { getProjects, testimonials, writing } from "@/lib/content";
import { readJourney } from "@/lib/journey";

export default async function Home({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const [projects,params] = await Promise.all([getProjects(),searchParams]);
  const query = new URLSearchParams();
  for (const key of ["tour","step"]) if(typeof params[key] === "string") query.set(key,params[key]);
  return <PortfolioHome projects={projects} testimonials={testimonials} writing={writing} initialJourney={readJourney(query.toString())}/>;
}
