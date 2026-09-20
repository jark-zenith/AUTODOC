import type { KnowledgeEntry, KnowledgeVersion } from "@/types/medical";

export interface KnowledgeStorage {
  listEntries(): KnowledgeEntry[];
  getEntryById(id: string): KnowledgeEntry | undefined;
  saveEntry(entry: KnowledgeEntry): KnowledgeEntry;
  getVersions(entryId: string): KnowledgeVersion[];
  saveVersion(entryId: string, version: KnowledgeVersion): KnowledgeVersion;
}

function copyEntry(entry: KnowledgeEntry): KnowledgeEntry {
  return { ...entry, symptoms: [...entry.symptoms], causes: [...entry.causes], riskFactors: [...entry.riskFactors], commonTriggers: [...entry.commonTriggers], warningSigns: [...entry.warningSigns], prevention: [...entry.prevention], relatedTopics: [...entry.relatedTopics], sourceReferences: [...entry.sourceReferences], version: { ...entry.version } };
}

export class InMemoryKnowledgeStorage implements KnowledgeStorage {
  private readonly entries = new Map<string, KnowledgeEntry>();
  private readonly versions = new Map<string, KnowledgeVersion[]>();

  constructor(entries: KnowledgeEntry[] = []) { entries.forEach((entry) => this.saveEntry(entry)); }
  listEntries(): KnowledgeEntry[] { return Array.from(this.entries.values()).map(copyEntry); }
  getEntryById(id: string): KnowledgeEntry | undefined { const entry = this.entries.get(id); return entry ? copyEntry(entry) : undefined; }
  saveEntry(entry: KnowledgeEntry): KnowledgeEntry { const copy = copyEntry(entry); this.entries.set(copy.id, copy); return copyEntry(copy); }
  getVersions(entryId: string): KnowledgeVersion[] { return (this.versions.get(entryId) ?? []).map((version) => ({ ...version })); }
  saveVersion(entryId: string, version: KnowledgeVersion): KnowledgeVersion { const versions = this.versions.get(entryId) ?? []; versions.push({ ...version }); this.versions.set(entryId, versions); return { ...version }; }
}
