/** Company logos are verified from official LinkedIn pages and served locally (see public/brands/SOURCES.json).
 * Covers are original illustrations (cover-scenes.tsx) tinted with each brand's hue, never company marketing banners.
 * `shipped` is the one-line caption on work covers: what the scene depicts, taken from the project's release notes.
 */
export type BrandAsset = {name:string;domain:string;logo?:string;source?:string;hue:string;hue2:string;shipped?:string;motif:"film"|"terminal"|"campaign"|"parts"|"meal"|"travel"|"home"|"verify"|"wellness"};
export const brandAssets:Record<string,BrandAsset> = {
  vidrush:{name:"Vidrush",domain:"Generative video",hue:"#ff7a1a",hue2:"#3d6bff",shipped:"Rebuilt editor, voice fallbacks, German + Spanish generation",motif:"film",logo:"/brands/vidrush-logo.jpg",source:"https://www.linkedin.com/company/vidrush"},
  opsmith:{name:"Progress / Opsmith",domain:"DevOps AI",hue:"#3fb618",hue2:"#0f8b6c",shipped:"Intent → validated, reviewable automation for SRE teams",motif:"terminal",logo:"/brands/opsmith-logo.jpg",source:"https://www.linkedin.com/company/progress-software"},
  phasio:{name:"Phasio",domain:"Manufacturing workflows",hue:"#5b4fd6",hue2:"#2c9fb5",shipped:"ManufacturingGPT buyer guidance, GST, Flywire, 40 E2E tests",motif:"parts",logo:"/brands/phasio-logo.jpg",source:"https://www.linkedin.com/company/phasio"},
  blaze:{name:"Blaze",domain:"Campaign CRM",hue:"#1aa3c4",hue2:"#7a5cff",shipped:"LinkedIn + Warpcast automations, 20+ growth experiments",motif:"campaign",logo:"/brands/blaze-logo.jpg",source:"https://www.linkedin.com/company/withblazeapp"},
  swish:{name:"Swish",domain:"Everyday food orders",hue:"#2f9b57",hue2:"#f2a93b",motif:"meal",logo:"/brands/swish-logo.jpg",source:"https://www.linkedin.com/company/justswish"},
  pronto:{name:"Pronto",domain:"Home services",hue:"#16856a",hue2:"#4c6fff",motif:"home",logo:"/brands/pronto-logo.jpg",source:"https://www.linkedin.com/company/withpronto"},
  headout:{name:"Headout",domain:"Travel & discovery",hue:"#8a3ffc",hue2:"#ff5c8a",motif:"travel",logo:"/brands/headout-logo.jpg",source:"https://www.linkedin.com/company/headout-com"},
  loans24:{name:"Loans24",domain:"Premises verification",hue:"#f2621f",hue2:"#2457c5",motif:"verify",logo:"/brands/loans24-logo.jpg",source:"https://in.linkedin.com/company/loans24-cars24-financial-services-pvt-ltd"},
  foobar:{name:"Foobar",domain:"Deployment prototype",hue:"#4a74c9",hue2:"#28b5a0",motif:"terminal"},
  "cycle-synced":{name:"Cycle-synced",domain:"A personal wellness experiment",hue:"#c8587a",hue2:"#8e6cf0",motif:"wellness"},
};
