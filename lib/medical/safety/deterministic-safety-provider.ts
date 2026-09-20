import type { SafetyProvider } from "./safety-provider";
import type { SafetyRequest, SafetyResult } from "./types";
import { detectRedFlags, highestUrgency } from "./red-flags";

export class DeterministicSafetyProvider implements SafetyProvider {
  analyze(request: SafetyRequest): SafetyResult {
    const detectedSignals = detectRedFlags(request.symptoms);
    const urgency = detectedSignals.length ? highestUrgency(detectedSignals) : "LOW";
    const status = detectedSignals.some((signal) => signal.severity === "HIGH" || signal.severity === "CRITICAL") ? "URGENT_REVIEW" : detectedSignals.length ? "ATTENTION" : "CLEAR";
    const explanations = detectedSignals.map((signal) => `${signal.name}: ${signal.explanation}`);
    const recommendedNextStep = detectedSignals.length ? detectedSignals[0].actionGuidance : "No defined warning signal was identified in the available information.";
    return { requestId: request.requestId, status, urgency, detectedSignals, explanations, recommendedNextStep, limitations: ["This is a system safety classification, not a clinically validated emergency prediction.", "This system cannot determine an underlying medical cause.", "Unreported symptoms are not assumed to be absent.", "The Safety Engine does not contact emergency services or provide treatment instructions."], generatedAt: new Date().toISOString(), method: "deterministic-red-flag-matching" };
  }
}
