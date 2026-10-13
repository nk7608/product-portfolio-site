export const appearances = [
  {id:"fieldnotes",name:"Fieldnotes",icon:"☀",description:"Warm paper · connected notebook",detail:"A little Bangalore sunshine."},
  {id:"blocks",name:"Blue Blocks",icon:"✚",description:"Cobalt tiles · playful grid",detail:"Serious work. Playful building blocks."},
  {id:"greenroom",name:"Green Room",icon:"♫",description:"Green accents · record collection",detail:"Good work, on repeat."},
  {id:"chic",name:"Chic",icon:"✳",description:"Cream & ink · editorial index",detail:"A quieter kind of confidence."},
] as const;
export type Appearance = typeof appearances[number]["id"];
export const appearanceKey = "nayana-appearance-v1";
export function validAppearance(value:unknown):value is Appearance {return appearances.some(item=>item.id===value);}
