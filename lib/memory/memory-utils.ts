import type { MemoryEntry } from "@/types/memory";

export function isExpired(entry: MemoryEntry, now = new Date()): boolean { return Boolean(entry.expiresAt && new Date(entry.expiresAt) <= now); }
export function activeMemory(entry: MemoryEntry, now = new Date()): MemoryEntry { return isExpired(entry, now) ? { ...entry, status: "EXPIRED" } : entry; }
