import type { MedicalAssessment } from "@/lib/medical/response";

type AssessmentStatusProps = { assessment: MedicalAssessment };

export function AssessmentStatus({ assessment }: AssessmentStatusProps) {
  return <div className={`assessment-status ${assessment.overallStatus.toLowerCase()}`}><span className="assessment-status-mark">{assessment.overallStatus === "URGENT_REVIEW" ? "!" : assessment.overallStatus === "ATTENTION" ? "△" : "◎"}</span><div><span>ASSESSMENT STATUS</span><strong>{assessment.overallStatus.replace("_", " ")}</strong><p>{assessment.summary}</p></div><small>{assessment.method}</small></div>;
}
