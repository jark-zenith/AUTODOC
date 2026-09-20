import type { MedicalAssessment, NextStep, NextStepCategory } from "./types";
import type { ReasoningResult } from "../reasoning";
import type { SafetyResult } from "../safety";
import type { Symptom } from "@/types/symptom";

export function chooseOverallStatus(symptoms: Symptom[], safety: SafetyResult): MedicalAssessment["overallStatus"] {
  if (safety.status === "URGENT_REVIEW") return "URGENT_REVIEW";
  if (safety.status === "ATTENTION") return "ATTENTION";
  if (!symptoms.length) return "INSUFFICIENT_INFORMATION";
  return "INFORMATIONAL";
}

export function chooseNextStep(status: MedicalAssessment["overallStatus"], source: AssessmentRequestSource): NextStep {
  if (source === "SIMULATION") return { category: "SIMULATION_ONLY", message: "This result belongs to a fictional simulation and is not a real patient assessment." };
  const steps: Record<MedicalAssessment["overallStatus"], NextStep> = {
    INFORMATIONAL: { category: "MONITOR_INFORMATION", message: "No specific warning signal was identified from the information provided. If symptoms are severe or worsening, professional medical evaluation may be appropriate." },
    ATTENTION: { category: "SEEK_PROMPT_PROFESSIONAL_ADVICE", message: "A potential warning signal was identified. Prompt professional medical evaluation may be appropriate." },
    URGENT_REVIEW: { category: "SEEK_URGENT_PROFESSIONAL_HELP", message: "A potential urgent warning signal was identified. Seek immediate professional help if severe symptoms are occurring." },
    INSUFFICIENT_INFORMATION: { category: "NEED_MORE_INFORMATION", message: "AUTODOC does not have enough structured information to provide meaningful information matches." }
  };
  return steps[status];
}

type AssessmentRequestSource = "USER_TEXT" | "VOICE" | "SIMULATION" | "SYSTEM";

export function buildSummary(symptoms: Symptom[], reasoning: ReasoningResult, safety: SafetyResult, status: MedicalAssessment["overallStatus"]): string {
  const understood = symptoms.length ? `AUTODOC understood that the reported information includes ${symptoms.map((symptom) => symptom.normalizedName).join(", ")}.` : "AUTODOC did not identify structured symptoms in the available information.";
  if (status === "URGENT_REVIEW" || status === "ATTENTION") return `${safety.detectedSignals.length ? "A potential warning signal was identified in the available information." : "Safety information requires attention."} ${safety.recommendedNextStep} ${understood} Possible explanations are secondary to this safety observation.`;
  if (status === "INSUFFICIENT_INFORMATION") return `${understood} AUTODOC does not have enough structured information to identify meaningful information matches.`;
  return `${understood} ${reasoning.reasoningSummary}`;
}

export function buildLimitations(reasoning: ReasoningResult, safety: SafetyResult): string[] { return Array.from(new Set([...reasoning.limitations, ...safety.limitations, "This unified response is educational infrastructure and does not replace professional healthcare guidance."])); }
