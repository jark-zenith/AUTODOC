import type { NextStep } from "@/lib/medical/response";

type NextStepPanelProps = { nextStep: NextStep };

export function NextStepPanel({ nextStep }: NextStepPanelProps) {
  return <section className="assessment-section panel"><div className="panel-heading"><div><p className="panel-eyebrow">Response guidance</p><h2>Next step</h2></div><span className="timeline-status">{nextStep.category.replaceAll("_", " ")}</span></div><div className="assessment-next-step"><strong>{nextStep.message}</strong><small>No treatment or medication instructions are generated.</small></div></section>;
}
