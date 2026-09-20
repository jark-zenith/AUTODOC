import { reasoningService, type ReasoningRequest } from "../reasoning";
import { safetyService, type SafetyRequest } from "../safety";
import { symptomUnderstandingEngine } from "../symptoms";
import type { ResponseProvider, AssessmentRequest, MedicalAssessment } from "./types";
import { buildLimitations, buildSummary, chooseNextStep, chooseOverallStatus } from "./response-builder";

export class DeterministicResponseProvider implements ResponseProvider {
  assess(request: AssessmentRequest): MedicalAssessment {
    const createdAt = request.createdAt ?? new Date().toISOString();
    const symptoms = request.symptoms ?? symptomUnderstandingEngine.analyze({ freeText: request.originalInput, patientId: request.patientId, source: request.source, reportedAt: createdAt }).extractedSymptoms;
    const requestId = request.assessmentId ?? `ASSESSMENT-${Date.now()}`;
    const reasoning = reasoningService.analyze({ requestId: `${requestId}-REASONING`, patientId: request.patientId, symptoms, context: request.context, createdAt });
    const safety = safetyService.analyze({ requestId: `${requestId}-SAFETY`, patientId: request.patientId, symptoms, context: request.context, source: request.source, createdAt });
    const overallStatus = chooseOverallStatus(symptoms, safety);
    return { assessmentId: requestId, patientId: request.patientId, originalInput: request.originalInput, symptoms, reasoningResult: reasoning, safetyResult: safety, overallStatus, summary: buildSummary(symptoms, reasoning, safety, overallStatus), possibleExplanations: reasoning.possibleExplanations, detectedSafetySignals: safety.detectedSignals, nextStep: chooseNextStep(overallStatus, request.source), limitations: buildLimitations(reasoning, safety), createdAt, method: "deterministic-assessment-response" };
  }
}
