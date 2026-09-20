import type { KnowledgeService } from "../knowledge-service";
import type { KnowledgeEntry } from "@/types/medical";
import type { ReasoningProvider, ReasoningRequest, ReasoningResult } from "./types";
import { matchKnowledge } from "./matching";

export class DeterministicReasoningProvider implements ReasoningProvider {
  constructor(private readonly knowledge: KnowledgeService) {}

  analyze(request: ReasoningRequest): ReasoningResult {
    const matches = matchKnowledge(request.symptoms, this.knowledge.searchKnowledge(""));
    const matchedKnowledgeEntries = matches.map((match) => match.entry);
    const reportedNames = new Set(request.symptoms.map((symptom) => symptom.normalizedName));
    const relatedNames = new Set(matchedKnowledgeEntries.flatMap((entry) => entry.symptoms.map((symptom) => symptom.toLowerCase())));
    const unmatchedSymptoms = request.symptoms.map((symptom) => symptom.normalizedName).filter((symptom) => !relatedNames.has(symptom) && !matches.some((match) => match.explanation.matchedSymptoms.includes(symptom)));
    const limitations = ["This is an educational information-matching result.", "It is not a medical diagnosis.", "Unreported symptoms are not assumed to be absent.", "The current engine uses deterministic knowledge matching.", "The result depends on the completeness and quality of the available knowledge entries."];
    const matchedText = request.symptoms.length ? request.symptoms.map((symptom) => symptom.normalizedName).join(", ") : "no structured symptoms";
    const summary = matches.length ? `The available symptoms (${matchedText}) overlap with information described in ${matches.length} educational knowledge entr${matches.length === 1 ? "y" : "ies"}. This information match is limited and should not be interpreted as a diagnosis.` : `No meaningful relationship was found in the available educational knowledge for ${matchedText}. The available information is limited and does not support a medical conclusion.`;
    return { requestId: request.requestId, possibleExplanations: matches.map((match) => match.explanation), matchedKnowledgeEntries, unmatchedSymptoms: Array.from(new Set(unmatchedSymptoms)), reasoningSummary: summary, limitations, warnings: request.symptoms.some((symptom) => ["chest pain", "shortness of breath"].includes(symptom.normalizedName)) ? ["A reported symptom may warrant timely professional attention. The Reasoning Engine does not assess urgency; the Safety Engine is separate."] : [], generatedAt: new Date().toISOString(), method: "deterministic-knowledge-matching" };
  }
}
