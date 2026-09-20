import type { ResearchPlan } from "@/types/research";

type ResearchStepListProps = { plan?: ResearchPlan };

export function ResearchStepList({ plan }: ResearchStepListProps) {
  return <div className="research-steps">{plan?.steps.map((step) => <div className="research-step" key={step.id}><span className={`research-step-marker ${step.status.toLowerCase()}`}>{step.status === "COMPLETED" ? "✓" : step.status === "IN_PROGRESS" ? "→" : "○"}</span><span><strong>{step.title}</strong><small>{step.status.replace("_", " ")}</small></span></div>)}</div>;
}
