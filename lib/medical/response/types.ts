import type { ReasoningResult } from "../reasoning";
import type { SafetyResult } from "../safety";
import type { Symptom, SymptomInputSource } from "@/types/symptom";

export type AssessmentOverallStatus = "INFORMATIONAL" | "ATTENTION" | "URGENT_REVIEW" | "INSUFFICIENT_INFORMATION";
export type NextStepCategory = "MONITOR_INFORMATION" | "SEEK_ROUTINE_PROFESSIONAL_ADVICE" | "SEEK_PROMPT_PROFESSIONAL_ADVICE" | "SEEK_URGENT_PROFESSIONAL_HELP" | "NEED_MORE_INFORMATION" | "SIMULATION_ONLY";

export type AssessmentContext = { age?: number; sex?: string; duration?: string; simulationContext?: string };

export type AssessmentRequest = {
  assessmentId?: string;
  patientId?: string;
  originalInput: string;
  symptoms?: Symptom[];
  source: SymptomInputSource;
  context?: AssessmentContext;
  createdAt?: string;
};

export type NextStep = { category: NextStepCategory; message: string };

export type MedicalAssessment = {
  assessmentId: string;
  patientId?: string;
  originalInput: string;
  symptoms: Symptom[];
  reasoningResult: ReasoningResult;
  safetyResult: SafetyResult;
  overallStatus: AssessmentOverallStatus;
  summary: string;
  possibleExplanations: ReasoningResult["possibleExplanations"];
  detectedSafetySignals: SafetyResult["detectedSignals"];
  nextStep: NextStep;
  limitations: string[];
  createdAt: string;
  method: "deterministic-assessment-response";
};

export interface ResponseProvider {
  assess(request: AssessmentRequest): MedicalAssessment;
}
