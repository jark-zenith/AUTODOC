import type { KnowledgeCategory, KnowledgeEntry } from "@/types/medical";
import type { KnowledgeStorage } from "./knowledge-storage";

export class KnowledgeRetrieval {
  constructor(private readonly storage: KnowledgeStorage) {}
  getById(id: string): KnowledgeEntry | undefined { return this.storage.getEntryById(id); }
  getBySlug(slug: string): KnowledgeEntry | undefined { return this.storage.listEntries().find((entry) => entry.slug === slug); }
  search(query: string): KnowledgeEntry[] { const normalized = query.trim().toLowerCase(); if (!normalized) return this.storage.listEntries(); return this.storage.listEntries().filter((entry) => [entry.title, entry.summary, entry.description, entry.category, ...entry.relatedTopics].join(" ").toLowerCase().includes(normalized)); }
  byCategory(category: KnowledgeCategory): KnowledgeEntry[] { return this.storage.listEntries().filter((entry) => entry.category === category); }
  related(entry: KnowledgeEntry): KnowledgeEntry[] { const related = new Set(entry.relatedTopics.map((topic) => topic.toLowerCase())); return this.storage.listEntries().filter((candidate) => candidate.id !== entry.id && (related.has(candidate.title.toLowerCase()) || related.has(candidate.slug))); }
}
