/* Illustrated product scenes for covers. Pure SVG, coloured entirely by CSS tokens in covers.css
 * so each appearance (and light/dark) restyles them. Decorative only: always rendered aria-hidden. */
import type { ReactNode } from "react";

type Box = { x: number; y: number; w: number; h: number };
const Win = ({ x, y, w, h, title }: Box & { title?: string }) => <g>
  <rect className="pn" x={x} y={y} width={w} height={h} rx="12" />
  <circle className="ln" cx={x + 14} cy={y + 13} r="3" /><circle className="ln" cx={x + 24} cy={y + 13} r="3" /><circle className="ln" cx={x + 34} cy={y + 13} r="3" />
  {title && <text x={x + 48} y={y + 16.5} className="mut">{title}</text>}
</g>;
const Bar = ({ x, y, w, cls = "ln" }: { x: number; y: number; w: number; cls?: string }) => <rect className={cls} x={x} y={y} width={w} height="5" rx="2.5" />;
const Tick = ({ x, y }: { x: number; y: number }) => <g><circle className="br" cx={x} cy={y} r="6" /><path className="tick" d={`M${x - 2.6} ${y}l1.8 1.9 3.4-3.6`} /></g>;
const Chip = ({ x, y, w, children, brand = false }: { x: number; y: number; w: number; children: ReactNode; brand?: boolean }) => <g>
  <rect className={brand ? "chip-b" : "chip"} x={x} y={y} width={w} height="22" rx="11" />
  <text x={x + w / 2} y={y + 14.5} textAnchor="middle" className={brand ? "on-br" : ""}>{children}</text>
</g>;

const scenes: Record<string, ReactNode> = {
  /* Long-form video: brief → pipeline → editable timeline. */
  vidrush: <>
    <Win x={232} y={26} w={384} h={190} title="vidrush / editor" />
    <rect className="br-grad" x={248} y={44} width={214} height={112} rx="8" />
    <path className="on-br-f" d="M347 88v24l20-12z" />
    <text x={256} y={146} className="on-br">00:42 / 12:08</text>
    {[["Script", 0], ["Voice · fallback", 1], ["Media", 2], ["Render", 3]].map(([label, i]) => <g key={label as string}>
      <rect className="pn2" x={474} y={44 + (i as number) * 28} width={126} height={22} rx="6" />
      {(i as number) < 3 ? <Tick x={486} y={55 + (i as number) * 28} /> : <circle className="stb" cx={486} cy={55 + (i as number) * 28} r="5.5" strokeWidth="2" strokeDasharray="22 40" />}
      <text x={498} y={58.5 + (i as number) * 28}>{label}</text>
    </g>)}
    {[[248, 46, "br"], [298, 70, "brs"], [372, 38, "br"], [414, 80, "brs"], [498, 52, "br"], [554, 46, "brs"]].map(([x, w, c]) => <rect key={x as number} className={c as string} x={x as number} y={172} width={w as number} height="12" rx="4" />)}
    {[[248, 110], [362, 60], [426, 120], [550, 50]].map(([x, w]) => <rect key={x} className="ln" x={x} y={190} width={w} height="10" rx="4" />)}
    <rect className="ink" x={404} y={164} width="2" height="42" rx="1" />
    <Chip x={150} y={160} w={96}>EN · DE · ES</Chip>
    <Chip x={170} y={58} w={76} brand>12 min</Chip>
  </>,

  /* DevOps agent: natural-language intent → plan → validated, reviewable change. */
  opsmith: <>
    <Win x={232} y={22} w={300} h={196} title="opsmith / agent" />
    <rect className="pn2" x={246} y={42} width={272} height={30} rx="8" />
    <text x={256} y={61}><tspan className="br-t">›</tspan> rotate certs on prod-eu, no downtime</text>
    {["Inventory 14 hosts", "Drain + rotate in batches", "Health-check each batch"].map((t, i) => <g key={t}>
      <Tick x={258} y={92 + i * 24} /><text x={272} y={95.5 + i * 24}>{t}</text>
    </g>)}
    <rect className="pn2" x={246} y={164} width={272} height={40} rx="8" />
    <rect className="add" x={256} y={172} width={118} height="7" rx="3" /><rect className="del" x={256} y={186} width={86} height="7" rx="3" />
    <Chip x={430} y={173} w={78} brand>Review</Chip>
    {[0, 1, 2, 3].map(i => <g key={i}>
      <circle className={i === 3 ? "br" : "pn"} cx={568} cy={48 + i * 50} r="15" />
      {i < 3 && <rect className="ln" x={567} y={64 + i * 50} width="2" height="19" />}
    </g>)}
    <text x={568} y={52} textAnchor="middle" className="mut">in</text><text x={568} y={102} textAnchor="middle" className="mut">plan</text>
    <text x={568} y={152} textAnchor="middle" className="mut">test</text><text x={568} y={202} textAnchor="middle" className="on-br">run</text>
    <Chip x={140} y={150} w={100}>SRE · on-call</Chip>
  </>,

  /* Campaign CRM: one campaign fanning out to channels, with a lift readout. */
  blaze: <>
    <path className="flow" d="M330 120C380 120 380 50 430 50M330 120C380 120 380 100 430 100M330 120C380 120 380 150 430 150M330 120C380 120 380 200 430 200" />
    <rect className="pn" x={226} y={84} width={112} height={72} rx="14" />
    <rect className="br" x={240} y={98} width="24" height="24" rx="7" />
    <text x={272} y={114}>Campaign</text><Bar x={240} y={132} w={84} /><Bar x={240} y={142} w={56} />
    {["LinkedIn", "Warpcast", "Email", "SEO"].map((c, i) => <g key={c}>
      <rect className="pn" x={430} y={36 + i * 50} width={96} height={28} rx="14" />
      <circle className={i % 2 ? "brs" : "br"} cx={446} cy={50 + i * 50} r="6" /><text x={458} y={53.5 + i * 50}>{c}</text>
    </g>)}
    <rect className="pn" x={540} y={60} width={84} height={130} rx="12" />
    {[34, 48, 42, 62, 78].map((h, i) => <rect key={i} className={i === 4 ? "br" : "brs"} x={552 + i * 14} y={174 - h} width="9" height={h} rx="3" />)}
    <text x={552} y={84} className="br-t">+8%</text>
    <Chip x={130} y={46} w={92}>20+ tests</Chip>
  </>,

  /* Manufacturing: part viewport + guided configuration + assistant. */
  phasio: <>
    <Win x={232} y={22} w={222} h={196} title="part.stl" />
    <g className="iso">
      <path className="pn2" d="M343 70l58 32-58 32-58-32z" /><path className="brs" d="M285 102v44l58 32v-44z" /><path className="br" d="M401 102v44l-58 32v-44z" />
      <circle className="hole" cx={343} cy={102} r="11" />
    </g>
    <text x={246} y={206} className="mut">48 × 32 × 20 mm</text>
    <rect className="pn" x={466} y={22} width={150} height={118} rx="12" />
    {[["Material", "PA12-GF"], ["Process", "SLS"], ["Qty", "250"]].map(([k, v], i) => <g key={k}>
      <text x={480} y={48 + i * 24} className="mut">{k}</text><text x={604} y={48 + i * 24} textAnchor="end">{v}</text>
    </g>)}
    <rect className="br" x={480} y={112} width={122} height="18" rx="6" /><text x={541} y={124.5} textAnchor="middle" className="on-br">Quote · ₹ 41.2k</text>
    <rect className="pn" x={466} y={150} width={150} height={68} rx="12" />
    <rect className="pn2" x={478} y={160} width={112} height={20} rx="8" /><text x={486} y={173.5} className="mut">heat-resistant?</text>
    <rect className="chip-b" x={498} y={186} width={106} height={22} rx="8" /><text x={506} y={200.5} className="on-br">Try PA12-GF ✦</text>
  </>,

  /* Repeat food orders: one-tap reorder. */
  swish: <>
    <rect className="pn" x={240} y={14} width={146} height={226} rx="22" />
    <text x={256} y={42}>Order again</text>
    {["Masala dosa", "Filter coffee", "Paneer bowl"].map((t, i) => <g key={t}>
      <rect className="pn2" x={252} y={54 + i * 42} width={122} height={34} rx="9" />
      <circle className={i === 0 ? "br" : "brs"} cx={268} cy={71 + i * 42} r="8" /><text x={282} y={74.5 + i * 42}>{t}</text>
    </g>)}
    <rect className="br" x={252} y={186} width={122} height="26" rx="13" /><text x={313} y={203} textAnchor="middle" className="on-br">Reorder · 1 tap</text>
    <rect className="pn" x={404} y={70} width={170} height={58} rx="14" />
    <text x={420} y={94} className="mut">Home · Koramangala</text><Bar x={420} y={106} w={92} />
    <Chip x={404} y={146} w={104} brand>ETA 12 min</Chip>
    <Chip x={404} y={178} w={132}>₹ compare: −₹38</Chip>
  </>,

  /* Travel discovery: interests → curated picks. */
  headout: <>
    <rect className="pn" x={226} y={14} width={146} height={226} rx="22" />
    <text x={242} y={42}>What are you into?</text>
    {[["Food", 242, 54, true], ["Museums", 290, 54, false], ["Night", 242, 82, false], ["Views", 290, 82, true]].map(([t, x, y, on]) => <Chip key={t as string} x={x as number} y={y as number} w={t === "Museums" ? 70 : 42} brand={on as boolean}>{t as string}</Chip>)}
    <rect className="br" x={242} y={196} width={114} height="26" rx="13" /><text x={299} y={213} textAnchor="middle" className="on-br">Show my picks</text>
    {[0, 1].map(i => <g key={i}>
      <rect className="pn" x={392 + i * 116} y={46} width={104} height={150} rx="14" />
      <rect className={i ? "brs" : "br-grad"} x={400 + i * 116} y={54} width={88} height={70} rx="9" />
      <Bar x={400 + i * 116} y={136} w={76} /><Bar x={400 + i * 116} y={148} w={48} />
      <text x={400 + i * 116} y={182} className="br-t">★ 4.{8 - i}</text>
    </g>)}
  </>,

  /* Checkout trust: clear steps, transparent price, guarantee. */
  pronto: <>
    <rect className="pn" x={232} y={20} width={260} height={200} rx="16" />
    {["Slot", "Details", "Pay"].map((t, i) => <g key={t}>
      <circle className={i < 2 ? "br" : "pn2"} cx={262 + i * 92} cy={46} r="10" />
      {i < 2 && <path className="tick" d={`M${257.5 + i * 92} 46l3 3 5-5.5`} />}
      {i < 2 && <rect className={i === 0 ? "br" : "ln"} x={274 + i * 92} y={45} width={70} height="2" />}
      <text x={262 + i * 92} y={72} textAnchor="middle" className="mut">{t}</text>
    </g>)}
    {[["Deep clean · 2 BHK", "₹ 1,899"], ["Visit fee", "₹ 0"], ["Taxes", "₹ 342"]].map(([k, v], i) => <g key={k}>
      <text x={250} y={104 + i * 22}>{k}</text><text x={474} y={104 + i * 22} textAnchor="end">{v}</text>
    </g>)}
    <rect className="ln" x={250} y={166} width={224} height="1" />
    <rect className="br" x={250} y={178} width={224} height="28" rx="9" /><text x={362} y={196} textAnchor="middle" className="on-br">Pay ₹ 2,241</text>
    <rect className="pn" x={508} y={60} width={110} height={104} rx="14" />
    <path className="br" d="M563 78l22 9v17c0 15-10 24-22 28-12-4-22-13-22-28V87z" /><path className="tick" d="M555 104l6 6 11-12" />
    <text x={563} y={152} textAnchor="middle" className="mut">Re-do free</text>
  </>,

  /* Field verification: guided evidence capture with privacy. */
  loans24: <>
    <rect className="pn" x={226} y={20} width={196} height={200} rx="16" />
    <g className="map">{[0, 1, 2, 3, 4].map(i => <rect key={i} className="ln" x={226} y={44 + i * 36} width={196} height="1" />)}{[0, 1, 2, 3].map(i => <rect key={i} className="ln" x={262 + i * 40} y={20} width="1" height={200} />)}</g>
    <path className="flow" d="M250 190C290 160 300 120 340 110S380 80 330 64" />
    <path className="br" d="M324 60c0-9 7-16 16-16s16 7 16 16c0 12-16 26-16 26s-16-14-16-26z" /><circle className="pn" cx={340} cy={60} r="5" />
    <rect className="pn" x={438} y={20} width={180} height={200} rx="16" />
    <text x={454} y={46}>Capture checklist</text>
    {["Front gate", "Name plate", "Interior · blur faces", "Utility bill"].map((t, i) => <g key={t}>
      {i < 3 ? <Tick x={460} y={70 + i * 28} /> : <circle className="stb" cx={460} cy={70 + i * 28} r="5.5" strokeWidth="1.5" />}
      <text x={474} y={73.5 + i * 28}>{t}</text>
    </g>)}
    <rect className="br" x={454} y={180} width={148} height="26" rx="9" /><text x={528} y={197} textAnchor="middle" className="on-br">Open camera</text>
  </>,

  /* AI deployment helper: generated script → simulated deploy. */
  foobar: <>
    <Win x={226} y={22} w={392} h={196} title="foobar / deploy" />
    {[["$", "foobar init --stack next+postgres"], ["✦", "generated deploy.sh (42 lines)"], ["›", "provisioning db … ok"], ["›", "building image … ok"], ["›", "health check … 200"]].map(([p, t], i) => <g key={t}>
      <text x={244} y={58 + i * 24} className={i === 1 ? "br-t" : "mut"}>{p}</text><text x={260} y={58 + i * 24}>{t}</text>
    </g>)}
    <rect className="pn2" x={244} y={184} width={356} height={16} rx="8" /><rect className="br" x={244} y={184} width={300} height={16} rx="8" />
    <text x={594} y={196} textAnchor="end" className="mut">84%</text>
  </>,

  /* Cycle-aware training: phase ring → today's workout. */
  "cycle-synced": <>
    <circle className="ring" cx={316} cy={120} r="72" />
    <circle className="ring-b" cx={316} cy={120} r="72" strokeDasharray="113 340" transform="rotate(-90 316 120)" />
    {[0, 1, 2, 3].map(i => <circle key={i} className={i === 0 ? "br" : "pn"} cx={316 + 72 * Math.sin(i * Math.PI / 2 + .79)} cy={120 - 72 * Math.cos(i * Math.PI / 2 + .79)} r="7" />)}
    <text x={316} y={114} textAnchor="middle" className="mut">day 9</text><text x={316} y={132} textAnchor="middle">Follicular</text>
    <rect className="pn" x={418} y={42} width={196} height={156} rx="16" />
    <text x={434} y={68}>Today · strength</text>
    {[["Squats", "3×10"], ["Push-ups", "3×12"], ["Mobility", "10 min"]].map(([k, v], i) => <g key={k}>
      <rect className="pn2" x={432} y={80 + i * 30} width={168} height={24} rx="8" /><text x={442} y={96 + i * 30}>{k}</text><text x={592} y={96 + i * 30} textAnchor="end" className="br-t">{v}</text>
    </g>)}
  </>,
};

export function CoverScene({ id }: { id: string }) {
  const scene = scenes[id];
  if (!scene) return null;
  return <svg className="scene" viewBox="124 0 516 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
    <defs><linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--brand)" /><stop offset="1" stopColor="var(--brand-2)" /></linearGradient></defs>
    <g style={{ ["--grad" as string]: `url(#g-${id})` }}>{scene}</g>
  </svg>;
}
