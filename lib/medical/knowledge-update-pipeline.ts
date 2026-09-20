import type { KnowledgeUpdateProposal } from "@/types/research";
import type { KnowledgeVersion } from "@/types/medical";
import type { KnowledgeService } from "./knowledge-service";

export class KnowledgeUpdatePipeline {
  constructor(private readonly knowledge: KnowledgeService) {}

  reviewProposal(proposal: KnowledgeUpdateProposal): KnowledgeUpdateProposal { return { ...proposal, status: "UNDER_REVIEW", reviewedAt: new Date().toISOString() }; }

  versionApprovedProposal(proposal: KnowledgeUpdateProposal, entryId: string): KnowledgeVersion | undefined {
    if (proposal.status !== "APPROVED") return undefined;
    return this.knowledge.recordVersion(entryId, `Reviewed proposal ${proposal.id}; no entry content was automatically changed.`);
  }
}
