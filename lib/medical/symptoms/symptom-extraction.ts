import type { SymptomInput, SymptomSeverity } from "@/types/symptom";
import { matchSymptoms, type SymptomMatch } from "./symptom-matching";

export type ExtractedSymptomContext = SymptomMatch & { duration: string; onset: "SUDDEN" | "GRADUAL" | "UNKNOWN"; severity: SymptomSeverity };

function extractDuration(text: string): string {
  const match = text.match(/(?:for|since)\s+(?:about\s+)?(\d+)\s+(hour|hours|day|days|week|weeks|month|months)/i);
  return match ? `${match[1]} ${match[2]}` : "UNKNOWN";
}

function extractOnset(text: string): ExtractedSymptomContext["onset"] {
  if (/sudden|suddenly|abrupt/i.test(text)) return "SUDDEN";
  if (/gradual|gradually|slowly/i.test(text)) return "GRADUAL";
  return "UNKNOWN";
}

function extractSeverity(text: string): SymptomSeverity {
  if (/severe|intense|extreme/i.test(text)) return "SEVERE";
  if (/moderate/i.test(text)) return "MODERATE";
  if (/mild|slight/i.test(text)) return "MILD";
  return "UNKNOWN";
}

export class SymptomExtractor {
  extract(input: SymptomInput): ExtractedSymptomContext[] {
    const matches = matchSymptoms(input.freeText);
    const duration = extractDuration(input.freeText);
    const onset = extractOnset(input.freeText);
    const severity = extractSeverity(input.freeText);
    return matches.map((match) => ({ ...match, duration, onset, severity }));
  }
}
