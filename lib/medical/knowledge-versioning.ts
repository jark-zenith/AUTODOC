import type { KnowledgeEntry, KnowledgeVersion } from "@/types/medical";
import type { KnowledgeStorage } from "./knowledge-storage";

export function recordKnowledgeVersion(storage: KnowledgeStorage, entry: KnowledgeEntry, changeDescription: string): KnowledgeVersion {
  const version: KnowledgeVersion = { version: entry.version.version, createdAt: entry.version.createdAt, source: entry.version.source, changeDescription, previousVersion: entry.version.previousVersion, status: entry.status };
  return storage.saveVersion(entry.id, version);
}
