import type { SymptomCategory } from "@/types/symptom";
import { getNormalizationTerms, normalizeSymptomPhrase } from "./symptom-normalization";

export type SymptomMatch = { normalizedName: string; category: SymptomCategory; description: string; matchedPhrase: string };

const definitions: Record<string, { category: SymptomCategory; description: string }> = {
  cough: { category: "RESPIRATORY", description: "A cough-like symptom reported in the input." },
  headache: { category: "NEUROLOGICAL", description: "Head discomfort reported in the input." },
  fatigue: { category: "GENERAL", description: "Tiredness or low energy reported in the input." },
  weakness: { category: "GENERAL", description: "Weakness reported in the input." },
  fever: { category: "GENERAL", description: "An elevated-temperature symptom reported in the input." },
  wheezing: { category: "RESPIRATORY", description: "A wheezing symptom reported in the input." },
  "shortness of breath": { category: "RESPIRATORY", description: "Breathing difficulty reported in the input." },
  "loss of consciousness": { category: "NEUROLOGICAL", description: "Loss of consciousness reported in the input." },
  confusion: { category: "NEUROLOGICAL", description: "Confusion reported in the input." },
  "severe bleeding": { category: "OTHER", description: "Severe bleeding reported in the input." },
  "seizure-like activity": { category: "NEUROLOGICAL", description: "Seizure-like activity reported in the input." },
  "sudden severe weakness": { category: "GENERAL", description: "Sudden severe weakness reported in the input." },
  "serious allergic reaction": { category: "SKIN", description: "A possible serious allergic reaction reported in the input." },
  "major trauma": { category: "MUSCULOSKELETAL", description: "Major trauma reported in the input." },
  nausea: { category: "GASTROINTESTINAL", description: "Nausea reported in the input." },
  dizziness: { category: "NEUROLOGICAL", description: "Dizziness reported in the input." },
  "sore throat": { category: "RESPIRATORY", description: "Throat discomfort reported in the input." },
  "runny nose": { category: "RESPIRATORY", description: "Nasal discharge reported in the input." },
  "chest pain": { category: "PAIN", description: "Chest pain reported in the input." }
};

export function matchSymptoms(freeText: string): SymptomMatch[] {
  const input = freeText.toLowerCase();
  const matches = getNormalizationTerms().filter((term) => input.includes(term)).map((matchedPhrase) => {
    const normalizedName = normalizeSymptomPhrase(matchedPhrase) as string;
    return { normalizedName, matchedPhrase, ...definitions[normalizedName] };
  });
  return Array.from(new Map(matches.map((match) => [match.normalizedName, match])).values());
}
