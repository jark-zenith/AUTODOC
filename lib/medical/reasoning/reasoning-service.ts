import { knowledgeService, type KnowledgeService } from "../knowledge-service";
import type { ReasoningRequest, ReasoningResult } from "./types";
import { DeterministicReasoningProvider } from "./deterministic-reasoning-provider";

export class ReasoningService {
  private readonly provider: DeterministicReasoningProvider;
  constructor(knowledge: KnowledgeService = knowledgeService) { this.provider = new DeterministicReasoningProvider(knowledge); }
  analyze(request: ReasoningRequest): ReasoningResult { return this.provider.analyze(request); }
}

export const reasoningService = new ReasoningService();
