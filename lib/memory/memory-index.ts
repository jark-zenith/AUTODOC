import type { MemoryEntry } from "@/types/memory";

export function indexMemory(entries: MemoryEntry[], query: string): MemoryEntry[] { const normalized = query.trim().toLowerCase(); if (!normalized) return entries; return entries.filter((entry) => `${entry.key} ${entry.value} ${entry.category}`.toLowerCase().includes(normalized)); }
