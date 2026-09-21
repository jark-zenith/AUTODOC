import type { CreateMemoryInput, MemoryEntry } from "@/types/memory";
import { indexMemory } from "./memory-index";
import { activeMemory, isExpired } from "./memory-utils";
import { InMemoryMemoryStore, type MemoryStore } from "./memory-store";

export class MemoryService {
  constructor(private readonly store: MemoryStore = new InMemoryMemoryStore()) {}
  createMemory(input: CreateMemoryInput) { return this.store.create(input); }
  getMemory(id: string, familyId: string, memberId?: string) { const entry = this.store.get(id, { familyId, memberId }); return entry ? activeMemory(entry) : undefined; }
  updateMemory(id: string, familyId: string, value: string, memberId?: string, updatedBy?: string) { return this.store.update(id, { familyId, memberId }, value, updatedBy); }
  deleteMemory(id: string, familyId: string, memberId?: string) { return this.store.delete(id, { familyId, memberId }); }
  listMemberMemories(familyId: string, memberId: string) { return this.store.list({ familyId, memberId }).map((entry) => activeMemory(entry)); }
  getFamilyMemories(familyId: string) { return this.store.list({ familyId }).filter((entry) => entry.accessScope === "FAMILY").map((entry) => activeMemory(entry)); }
  searchMemory(familyId: string, query: string, memberId?: string) { return indexMemory(this.store.list({ familyId, memberId }).map((entry) => activeMemory(entry)), query); }
  getImportantMemories(familyId: string, memberId?: string) { return this.store.list({ familyId, memberId }).filter((entry) => ["HIGH", "CRITICAL"].includes(entry.importance) && !isExpired(entry)).map((entry) => activeMemory(entry)); }
  getRecentMemories(familyId: string, memberId?: string) { return this.store.list({ familyId, memberId }).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 10).map((entry) => activeMemory(entry)); }
}

export const memoryService = new MemoryService();
