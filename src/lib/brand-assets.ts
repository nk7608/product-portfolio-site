/** Public company assets verified from their LinkedIn pages. Keep labels separate from artwork.
 * Assets are served locally; contextual motifs are used for personal prototypes.
 */
export type BrandAsset = {name:string;domain:string;logo?:string;cover?:string;source?:string;motif:"film"|"terminal"|"campaign"|"parts"|"meal"|"travel"|"home"|"verify"|"wellness"};
export const brandAssets:Record<string,BrandAsset> = {
  vidrush:{name:"Vidrush",domain:"Generative video",motif:"film",logo:"/brands/vidrush-logo.jpg",cover:"/brands/vidrush-cover.jpg",source:"https://www.linkedin.com/company/vidrush"},
  opsmith:{name:"Progress / Opsmith",domain:"DevOps AI",motif:"terminal",logo:"/brands/opsmith-logo.jpg",cover:"/brands/opsmith-cover.jpg",source:"https://www.linkedin.com/company/progress-software"},
  phasio:{name:"Phasio",domain:"Manufacturing workflows",motif:"parts",logo:"/brands/phasio-logo.jpg",cover:"/brands/phasio-cover.jpg",source:"https://www.linkedin.com/company/phasio"},
  blaze:{name:"Blaze",domain:"Campaign CRM",motif:"campaign",logo:"/brands/blaze-logo.jpg",cover:"/brands/blaze-cover.jpg",source:"https://www.linkedin.com/company/withblazeapp"},
  swish:{name:"Swish",domain:"Everyday food orders",motif:"meal",logo:"/brands/swish-logo.jpg",cover:"/brands/swish-cover.jpg",source:"https://www.linkedin.com/company/justswish"},
  pronto:{name:"Pronto",domain:"Home services",motif:"home",logo:"/brands/pronto-logo.jpg",cover:"/brands/pronto-cover.jpg",source:"https://www.linkedin.com/company/withpronto"},
  headout:{name:"Headout",domain:"Travel & discovery",motif:"travel",logo:"/brands/headout-logo.jpg",cover:"/brands/headout-cover.jpg",source:"https://www.linkedin.com/company/headout-com"},
  loans24:{name:"Loans24",domain:"Premises verification",motif:"verify",logo:"/brands/loans24-logo.jpg",cover:"/brands/loans24-cover.jpg",source:"https://in.linkedin.com/company/loans24-cars24-financial-services-pvt-ltd"},
  foobar:{name:"Foobar",domain:"Deployment prototype",motif:"terminal"},
  "cycle-synced":{name:"Cycle-synced",domain:"A personal wellness experiment",motif:"wellness"},
};
