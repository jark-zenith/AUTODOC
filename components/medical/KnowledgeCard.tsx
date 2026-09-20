import type { KnowledgeEntry } from "@/types/medical";

type KnowledgeCardProps = { entry: KnowledgeEntry; selected: boolean; onSelect: (id: string) => void };

export function KnowledgeCard({ entry, selected, onSelect }: KnowledgeCardProps) {
  return <button className={`knowledge-card ${selected ? "is-selected" : ""}`} onClick={() => onSelect(entry.id)} aria-pressed={selected}><span className="knowledge-card-category">{entry.category}</span><strong>{entry.title}</strong><p>{entry.summary}</p><span className={`knowledge-card-status ${entry.status.toLowerCase()}`}>{entry.status.replace("_", " ")}</span></button>;
}
