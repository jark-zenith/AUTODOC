import type { ResearchFinding, ResearchSource, ResearchStep } from "@/types/research";

export function createSimulatedFinding(taskId: string, step: ResearchStep): ResearchFinding {
  const statements: Record<string, string> = {
    "Identify common symptoms": "Simulated finding: the fixture includes variable symptoms for interface testing.",
    "Identify common triggers": "Simulated finding: the fixture models triggers as configurable scenario context.",
    "Review risk factors": "Simulated finding: risk factors are represented as review prompts, not clinical conclusions.",
    "Review emergency warning signs": "Simulated finding: warning signs are included as a safety review checkpoint.",
    "Summarize findings": "Simulated finding: the scenario can be summarized after its review steps complete."
  };
  const source: ResearchSource = { id: `SIM-SOURCE-${step.order}`, title: "AUTODOC simulated research fixture", sourceType: "SIMULATED", credibility: { external: false } };
  return { id: `${taskId}-F${step.order}`, researchTaskId: taskId, stepId: step.id, statement: statements[step.title] ?? "Simulated finding recorded for this research step.", sources: [source], validated: false, createdAt: new Date().toISOString() };
}
