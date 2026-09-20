import type { KnowledgeEntry } from "@/types/medical";

export type KnowledgeValidation = { valid: boolean; issues: string[] };

export function validateKnowledgeEntry(entry: KnowledgeEntry): KnowledgeValidation {
  const issues: string[] = [];
  if (!entry.title.trim()) issues.push("Title is required.");
  if (!entry.summary.trim()) issues.push("Summary is required.");
  if (!entry.slug.trim()) issues.push("Slug is required.");
  if (entry.sourceReferences.length === 0) issues.push("At least one source reference is required.");
  return { valid: issues.length === 0, issues };
}
