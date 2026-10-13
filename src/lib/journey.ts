export const chapters = {
  brief: { label: "Product brief", hint: "The short version", question: "What do I bring to a product team?" },
  journey: { label: "Career flow", hint: "How the work connects", question: "How did I get here?" },
  work: { label: "Shipped work", hint: "Decisions → outcomes", question: "What have I shipped, and why?" },
  experiments: { label: "Experiment lab", hint: "Ideas made testable", question: "What do I explore beyond my day job?" },
  evidence: { label: "Evidence & notes", hint: "People and perspective", question: "What is it like to work with me?" },
  about: { label: "Off the clock", hint: "The person behind the PRDs", question: "What keeps me curious?" },
} as const;
export type Chapter = keyof typeof chapters;
export const routes = {
  hiring: { label: "I’m hiring", description: "Outcomes, ownership, and how I work with a team.", steps: ["brief", "work", "journey", "experiments", "evidence", "about"] },
  building: { label: "I build products", description: "Product decisions, tradeoffs, and experiments.", steps: ["work", "journey", "brief", "experiments", "evidence", "about"] },
  exploring: { label: "I’m just curious", description: "The journey, the side quests, and the person.", steps: ["journey", "brief", "work", "experiments", "evidence", "about"] },
} satisfies Record<string, {label:string;description:string;steps:Chapter[]}>;
export type Route = keyof typeof routes;
export function readJourney(search:string): {route:Route|null;chapter:Chapter} {
  const params = new URLSearchParams(search);
  const value = params.get("tour");
  if (!value || !Object.hasOwn(routes,value)) return {route:null,chapter:"brief"};
  const route = value as Route;
  const chapter = params.get("step") as Chapter;
  return {route,chapter:routes[route].steps.includes(chapter) ? chapter : routes[route].steps[0]};
}
export function journeyUrl(route:Route|null, chapter:Chapter) {
  const anchor = chapter === "experiments" ? "independent-work" : chapter === "evidence" ? "references" : chapter;
  return route ? `/?tour=${route}&step=${chapter}#${anchor}` : `/#${anchor}`;
}
