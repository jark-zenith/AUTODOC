"use client";

import { useState } from "react";
import { knowledgeService } from "@/lib/medical";
import type { KnowledgeCategory } from "@/types/medical";
import { KnowledgeDetail } from "./KnowledgeDetail";
import { KnowledgeList } from "./KnowledgeList";

const categories = knowledgeService.getCategories();

export function KnowledgeExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<KnowledgeCategory | "ALL">("ALL");
  const [selectedId, setSelectedId] = useState("");
  const entries = category === "ALL" ? knowledgeService.searchKnowledge(query) : knowledgeService.getKnowledgeByCategory(category).filter((entry) => !query || `${entry.title} ${entry.summary}`.toLowerCase().includes(query.toLowerCase()));
  const selected = entries.find((entry) => entry.id === selectedId) ?? entries[0];
  return <div className="dashboard-content knowledge-content" id="knowledge"><div className="dashboard-intro"><div><p className="page-kicker">AUTODOC / medical knowledge</p><h1>Knowledge explorer</h1><p className="page-description">Browse concise educational entries from the local AUTODOC knowledge fixture.</p></div><div className="system-clock"><span className="clock-dot" />INDEX <strong>LOCAL / READY</strong></div></div><section className="knowledge-controls panel"><div className="knowledge-search"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topics, symptoms, or concepts" aria-label="Search knowledge" /><span>⌕</span></div><div className="knowledge-filters"><button className={category === "ALL" ? "is-active" : ""} onClick={() => setCategory("ALL")}>ALL</button>{categories.map((item) => <button className={category === item ? "is-active" : ""} key={item} onClick={() => setCategory(item)}>{item.replace("_", " ")}</button>)}</div></section><div className="knowledge-layout"><KnowledgeList entries={entries} selectedId={selected?.id ?? ""} onSelect={setSelectedId} /><KnowledgeDetail entry={selected} /></div></div>;
}
