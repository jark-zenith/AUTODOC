import type { Symptom, SymptomInputSource } from "@/types/symptom";

export type SafetyStatus = "CLEAR" | "ATTENTION" | "URGENT_REVIEW";
export type SafetyUrgency = "LOW" | "MODERATE" | "HIGH" | "CRITICAL" | "UNKNOWN";

export type SafetyContext = { age?: number; sex?: string; duration?: string; simulationContext?: string };

export type SafetyRequest = {
  requestId: string;
  patientId?: string;
  symptoms: Symptom[];
  context?: SafetyContext;
  source: SymptomInputSource;
  createdAt: string;
};

export type WarningSignal = {
  id: string;
  name: string;
  description: string;
  matchedSymptoms: string[];
  severity: SafetyUrgency;
  explanation: string;
  actionGuidance: string;
  source: string;
  version: string;
};

export type SafetyResult = {
  requestId: string;
  status: SafetyStatus;
  urgency: SafetyUrgency;
  detectedSignals: WarningSignal[];
  explanations: string[];
  recommendedNextStep: string;
  limitations: string[];
  generatedAt: string;
  method: "deterministic-red-flag-matching";
};
