import { knowledgeService, type KnowledgeService } from "../knowledge-service";
import type { Symptom, SymptomAnalysisResult, SymptomInput } from "@/types/symptom";
import { calculateSymptomConfidence, clampConfidence } from "./symptom-confidence";
import { SymptomExtractor } from "./symptom-extraction";

export class SymptomUnderstandingEngine {
  constructor(private readonly extractor = new SymptomExtractor(), private readonly knowledge: KnowledgeService = knowledgeService) {}

  analyze(input: SymptomInput): SymptomAnalysisResult {
    const extracted = this.extractor.extract(input);
    const symptoms: Symptom[] = extracted.map((item, index) => ({ id: `SYM-${String(index + 1).padStart(3, "0")}`, name: item.normalizedName, normalizedName: item.normalizedName, category: item.category, description: item.description, severity: item.severity, duration: item.duration, onset: item.onset, frequency: "UNKNOWN", location: "UNKNOWN", associatedSymptoms: [], triggers: [], notes: [`Matched phrase: ${item.matchedPhrase}`], confidence: 0.8 }));
    const relatedKnowledgeIds = Array.from(new Set(symptoms.flatMap((symptom) => this.knowledge.searchKnowledge(symptom.normalizedName).map((entry) => entry.id))));
    const warnings = symptoms.some((symptom) => ["chest pain", "shortness of breath"].includes(symptom.normalizedName)) ? ["This deterministic system identified a symptom that may warrant timely professional attention. It does not assess urgency or provide medical advice."] : [];
    return { originalInput: { ...input }, extractedSymptoms: symptoms, unrecognizedTerms: this.findUnrecognizedTerms(input.freeText, extracted.map((item) => item.matchedPhrase)), confidence: calculateSymptomConfidence(symptoms, input.freeText), analyzedAt: new Date().toISOString(), warnings, relatedKnowledgeIds };
  }

  private findUnrecognizedTerms(text: string, matchedPhrases: string[]): string[] {
    const remainder = text.toLowerCase();
    const known = matchedPhrases.reduce((value, phrase) => value.replace(phrase.toLowerCase(), " "), remainder);
    const ignored = new Set(["i", "ive", "have", "been", "am", "and", "my", "a", "for", "since", "about", "feel", "felt", "the", "is", "it", "three", "one", "two", "day", "days", "week", "weeks", "hour", "hours"]);
    return Array.from(new Set(known.replace(/[^a-z\s]/g, " ").split(/\s+/).filter((term) => term.length > 2 && !ignored.has(term))));
  }
}

export const symptomUnderstandingEngine = new SymptomUnderstandingEngine();
export { clampConfidence };
