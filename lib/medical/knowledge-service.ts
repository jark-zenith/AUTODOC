import { educationalKnowledge } from "@/data/knowledge/educational-knowledge";
import type { KnowledgeCategory, KnowledgeEntry, KnowledgeVersion } from "@/types/medical";
import { knowledgeCategories } from "./knowledge-categories";
import { KnowledgeRetrieval } from "./knowledge-retrieval";
import { recordKnowledgeVersion } from "./knowledge-versioning";
import { InMemoryKnowledgeStorage, type KnowledgeStorage } from "./knowledge-storage";
import { validateKnowledgeEntry, type KnowledgeValidation } from "./knowledge-validation";

export class KnowledgeService {
  private readonly retrieval: KnowledgeRetrieval;
  constructor(private readonly storage: KnowledgeStorage = new InMemoryKnowledgeStorage(educationalKnowledge)) { this.retrieval = new KnowledgeRetrieval(storage); }
  getKnowledgeById(id: string): KnowledgeEntry | undefined { return this.retrieval.getById(id); }
  getKnowledgeBySlug(slug: string): KnowledgeEntry | undefined { return this.retrieval.getBySlug(slug); }
  searchKnowledge(query: string): KnowledgeEntry[] { return this.retrieval.search(query); }
  getKnowledgeByCategory(category: KnowledgeCategory): KnowledgeEntry[] { return this.retrieval.byCategory(category); }
  getRelatedKnowledge(entryId: string): KnowledgeEntry[] { const entry = this.getKnowledgeById(entryId); return entry ? this.retrieval.related(entry) : []; }
  getCategories(): KnowledgeCategory[] { return [...knowledgeCategories]; }
  validateKnowledge(entryId: string): KnowledgeValidation | undefined { const entry = this.getKnowledgeById(entryId); return entry ? validateKnowledgeEntry(entry) : undefined; }
  getVersions(entryId: string): KnowledgeVersion[] { return this.storage.getVersions(entryId); }
  recordVersion(entryId: string, changeDescription: string): KnowledgeVersion | undefined { const entry = this.getKnowledgeById(entryId); return entry ? recordKnowledgeVersion(this.storage, entry, changeDescription) : undefined; }
}

export const knowledgeService = new KnowledgeService();
