"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import experiments from "../../content/experiments.json";
import { BrandLogo, ProductCover } from "./brand-cover";
import { TrackedLink, useAnalytics } from "./analytics";

/** Independent work as an index: one line each, open a row for the summary, honesty note and links. */
export function ExperimentLab() {
  const [openId, setOpenId] = useState<string | null>(null);
  const track = useAnalytics();
  return <ol className="rows">{experiments.map((item, index) => {
    const open = openId === item.id;
    return <li key={item.id} className={`row ${open ? "is-open" : ""}`} id={`exp-${item.id}`}>
      <button type="button" className="row-btn" aria-expanded={open} aria-controls={`exp-body-${item.id}`} onClick={() => { setOpenId(open ? null : item.id); if (!open) track("artifact_open", { item: `${item.id}:expand` }); }}>
        <span className="n">{String(index + 1).padStart(2, "0")}</span>
        <span className="t"><BrandLogo id={item.id} /><b>{item.name}</b> <span>· {item.title}</span></span>
        <span className="y">{item.type.replace("Case study + prototype", "Case study")}</span>
        <Plus className="chev" size={15} aria-hidden="true" />
        <span className="d">{item.summary}</span>
      </button>
      {open && <div className="row-body" id={`exp-body-${item.id}`}>
        <p>{item.summary}</p>
        <ProductCover id={item.id} />
        <p className="boundary">{item.boundary}</p>
        <div className="row-links">{item.links.map(link => <TrackedLink className="link" key={link.href} href={link.href} event="artifact_open" item={`${item.id}:${link.label}`}>{link.label} ↗</TrackedLink>)}</div>
      </div>}
    </li>;
  })}</ol>;
}
