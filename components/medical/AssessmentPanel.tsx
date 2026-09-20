import type { MedicalAssessment } from "@/lib/medical/response";
import { AssessmentStatus } from "./AssessmentStatus";
import { LimitationsPanel } from "./LimitationsPanel";
import { NextStepPanel } from "./NextStepPanel";
import { PossibleExplanationList } from "./PossibleExplanationList";
import { SafetyObservation } from "./SafetyObservation";
import { UnderstoodSymptoms } from "./UnderstoodSymptoms";

type AssessmentPanelProps = { assessment: MedicalAssessment };

export function AssessmentPanel({ assessment }: AssessmentPanelProps) {
  return <div className="assessment-output"><AssessmentStatus assessment={assessment} /><UnderstoodSymptoms symptoms={assessment.symptoms} /><PossibleExplanationList explanations={assessment.possibleExplanations} /><SafetyObservation result={assessment.safetyResult} /><NextStepPanel nextStep={assessment.nextStep} /><LimitationsPanel limitations={assessment.limitations} /></div>;
}
