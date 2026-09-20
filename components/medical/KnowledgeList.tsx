import type { KnowledgeEntry } from "@/types/medical";
import { KnowledgeCard } from "./KnowledgeCard";

type KnowledgeListProps = { entries: KnowledgeEntry[]; selectedId: string; onSelect: (id: string) => void };

export function KnowledgeList({ entries, selectedId, onSelect }: KnowledgeListProps) {
  return <section className="knowledge-list panel" aria-labelledby="knowledge-list-title"><div className="panel-heading"><div><p className="panel-eyebrow">Local educational index</p><h2 id="knowledge-list-title">Knowledge entries <span className="patient-count">{entries.length.toString().padStart(2, "0")}</span></h2></div><span className="panel-corner" aria-hidden="true" /></div><div className="knowledge-cards">{entries.length ? entries.map((entry) => <KnowledgeCard key={entry.id} entry={entry} selected={entry.id === selectedId} onSelect={onSelect} />) : <p className="task-empty">No entries match this search.</p>}</div></section>;
}
