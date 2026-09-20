import type { Symptom } from "@/types/symptom";

export function clampConfidence(value: number): number { return Math.max(0, Math.min(1, Number(value.toFixed(2)))); }

export function calculateSymptomConfidence(symptoms: Symptom[], originalText: string): number {
  if (!originalText.trim() || symptoms.length === 0) return 0;
  return clampConfidence(Math.min(0.95, 0.55 + symptoms.length * 0.1));
}
