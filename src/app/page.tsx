import { PortfolioHome } from "@/components/portfolio-home";
import { getProjects, testimonials, writing } from "@/lib/content";

export default async function Home() {
  const projects = await getProjects();
  return <PortfolioHome projects={projects} testimonials={testimonials} writing={writing}/>;
}
