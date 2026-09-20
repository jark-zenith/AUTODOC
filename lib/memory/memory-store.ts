import type { CreateMemoryInput, MemoryEntry } from "@/types/memory";

export interface MemoryStore { create(input: CreateMemoryInput): MemoryEntry; get(id: string, scope: { familyId: string; memberId?: string }): MemoryEntry | undefined; update(id: string, scope: { familyId: string; memberId?: string }, value: string, updatedBy?: string): MemoryEntry | undefined; delete(id: string, scope: { familyId: string; memberId?: string }): boolean; list(scope: { familyId: string; memberId?: string }): MemoryEntry[]; }
function copy(entry: MemoryEntry): MemoryEntry { return { ...entry }; }
export class InMemoryMemoryStore implements MemoryStore {
  private entries = new Map<string, MemoryEntry>(); private nextId = 1;
  create(input: CreateMemoryInput) { const now = new Date().toISOString(); const entry: MemoryEntry = { ...input, id: `MEMORY-${String(this.nextId++).padStart(4, "0")}`, confidence: input.confidence ?? 1, status: "ACTIVE", version: 1, createdAt: now, updatedAt: now }; this.entries.set(entry.id, entry); return copy(entry); }
  get(id: string, scope: { familyId: string; memberId?: string }) { const entry = this.entries.get(id); return entry && this.inScope(entry, scope) ? copy(entry) : undefined; }
  update(id: string, scope: { familyId: string; memberId?: string }, value: string, updatedBy?: string) { const entry = this.entries.get(id); if (!entry || !this.inScope(entry, scope)) return undefined; const updated = { ...entry, previousValue: entry.value, value, version: entry.version + 1, updatedAt: new Date().toISOString(), updatedBy }; this.entries.set(id, updated); return copy(updated); }
  delete(id: string, scope: { familyId: string; memberId?: string }) { const entry = this.entries.get(id); return Boolean(entry && this.inScope(entry, scope) && this.entries.delete(id)); }
  list(scope: { familyId: string; memberId?: string }) { return Array.from(this.entries.values()).filter((entry) => this.inScope(entry, scope)).map(copy); }
  private inScope(entry: MemoryEntry, scope: { familyId: string; memberId?: string }) { return entry.familyId === scope.familyId && (scope.memberId ? entry.memberId === scope.memberId : true); }
}
