import type { KnowledgeEntry } from "@/types/medical";
import type { Symptom } from "@/types/symptom";
import type { PossibleExplanation } from "./types";

const aliases: Record<string, string> = { "head pain": "headache", tiredness: "fatigue", fatigued: "fatigue", coughing: "cough", "throat irritation": "sore throat", "chest tightness": "chest tightness" };
const comparable = (value: string) => aliases[value.toLowerCase()] ?? value.toLowerCase();

export type KnowledgeMatch = { entry: KnowledgeEntry; explanation: PossibleExplanation };

export function matchKnowledgeEntry(symptoms: Symptom[], entry: KnowledgeEntry): KnowledgeMatch | undefined {
  const reported = new Set(symptoms.map((symptom) => comparable(symptom.normalizedName)));
  const entrySymptoms = entry.symptoms.map(comparable);
  const matchedSymptoms = entrySymptoms.filter((symptom) => reported.has(symptom));
  const unmatchedRelevantSymptoms = entrySymptoms.filter((symptom) => !reported.has(symptom));
  const categoryMatch = symptoms.some((symptom) => entry.category === "CONDITION" && ["RESPIRATORY", "NEUROLOGICAL", "GENERAL", "GASTROINTESTINAL"].includes(symptom.category)) ? 0.1 : 0;
  const directScore = entrySymptoms.length ? matchedSymptoms.length / entrySymptoms.length : 0;
  const informationMatch = Math.min(0.95, Number((directScore * 0.85 + categoryMatch).toFixed(2)));
  if (matchedSymptoms.length === 0 || informationMatch < 0.15) return undefined;
  const evidence = matchedSymptoms.map((symptom) => `Reported ${symptom}, also listed in the ${entry.title} educational entry.`);
  const limitations = ["This is an educational information match, not a medical diagnosis.", "Unreported symptoms are not assumed to be absent.", "The score is not a disease probability or medical certainty."];
  return { entry, explanation: { knowledgeId: entry.id, title: entry.title, matchedSymptoms, unmatchedRelevantSymptoms, supportingEvidence: evidence, explanation: `The available symptom information contains features also described in the ${entry.title} knowledge entry.`, informationMatch, limitations } };
}

export function matchKnowledge(symptoms: Symptom[], entries: KnowledgeEntry[]): KnowledgeMatch[] {
  return entries.map((entry) => matchKnowledgeEntry(symptoms, entry)).filter((match): match is KnowledgeMatch => Boolean(match)).sort((a, b) => b.explanation.informationMatch - a.explanation.informationMatch);
}
