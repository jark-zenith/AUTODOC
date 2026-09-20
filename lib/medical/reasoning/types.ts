import type { KnowledgeEntry } from "@/types/medical";
import type { Symptom } from "@/types/symptom";

export type ReasoningContext = {
  age?: number;
  sex?: string;
  duration?: string;
  associatedSymptoms?: string[];
  simulationContext?: string;
};

export type ReasoningRequest = {
  requestId: string;
  patientId?: string;
  symptoms: Symptom[];
  context?: ReasoningContext;
  createdAt: string;
};

export type PossibleExplanation = {
  knowledgeId: KnowledgeEntry["id"];
  title: string;
  matchedSymptoms: string[];
  unmatchedRelevantSymptoms: string[];
  supportingEvidence: string[];
  explanation: string;
  informationMatch: number;
  limitations: string[];
};

export type ReasoningResult = {
  requestId: string;
  possibleExplanations: PossibleExplanation[];
  matchedKnowledgeEntries: KnowledgeEntry[];
  unmatchedSymptoms: string[];
  reasoningSummary: string;
  limitations: string[];
  warnings: string[];
  generatedAt: string;
  method: "deterministic-knowledge-matching";
};

export interface ReasoningProvider {
  analyze(request: ReasoningRequest): ReasoningResult;
}
