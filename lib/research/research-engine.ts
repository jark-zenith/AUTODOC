import type { KnowledgeUpdateProposal, ResearchFinding, ResearchPlan, ResearchResult, ResearchStage, ResearchStep, ResearchTask } from "@/types/research";
import { taskManager, type TaskManager } from "@/lib/tasks";
import type { Task } from "@/types/task";
import { createSimulatedFinding } from "./simulated-research-provider";

const createStepTitles = (query: string) => [`Define ${query}`, "Identify common symptoms", "Identify common triggers", "Review risk factors", "Review emergency warning signs", "Summarize findings"];

export class ResearchEngine {
  private readonly researchTasks = new Map<string, ResearchTask>();
  private readonly plans = new Map<string, ResearchPlan>();
  private readonly findings = new Map<string, ResearchFinding>();
  private readonly results = new Map<string, ResearchResult>();
  private readonly proposals = new Map<string, KnowledgeUpdateProposal>();
  private nextId = 1;

  constructor(private readonly tasks: TaskManager = taskManager) {}

  createResearchTask(query: string, requestedBy = "local-session"): ResearchTask {
    const task = this.tasks.createTask({ title: `Research ${query}`, description: `Simulated research operation for ${query}.`, type: "RESEARCH", priority: "NORMAL", metadata: { simulated: true } });
    this.tasks.updateTaskStatus(task.id, "PLANNING");
    const now = new Date().toISOString();
    const researchTask: ResearchTask = { id: `RESEARCH-${String(this.nextId++).padStart(4, "0")}`, taskId: task.id, query, requestedBy, stage: "REQUEST", status: "PENDING", progress: 0, createdAt: now, updatedAt: now };
    this.researchTasks.set(researchTask.id, researchTask);
    this.createResearchPlan(researchTask.id);
    return { ...researchTask };
  }

  createResearchPlan(researchTaskId: string): ResearchPlan | undefined {
    if (!this.researchTasks.has(researchTaskId)) return undefined;
    const query = this.researchTasks.get(researchTaskId)?.query ?? "requested topic";
    const steps: ResearchStep[] = createStepTitles(query).map((title, index) => ({ id: `${researchTaskId}-STEP-${index + 1}`, order: index + 1, title, description: `Simulated review step for ${title.toLowerCase()}.`, status: "PENDING", progress: 0, findingIds: [] }));
    const plan = { id: `${researchTaskId}-PLAN`, researchTaskId, steps, createdAt: new Date().toISOString() };
    this.plans.set(researchTaskId, plan);
    return this.copyPlan(plan);
  }

  executeResearchStep(researchTaskId: string): ResearchStep | undefined {
    const plan = this.plans.get(researchTaskId);
    const task = this.researchTasks.get(researchTaskId);
    if (!plan || !task) return undefined;
    const step = plan.steps.find((item) => item.status === "PENDING");
    if (!step) return plan.steps.at(-1);
    step.status = "IN_PROGRESS";
    task.status = "IN_PROGRESS";
    task.stage = "RESEARCH";
    this.tasks.updateTaskStatus(task.taskId, "IN_PROGRESS");
    const finding = createSimulatedFinding(researchTaskId, step);
    finding.validated = true;
    this.findings.set(finding.id, finding);
    step.findingIds.push(finding.id);
    step.progress = 100;
    step.status = "COMPLETED";
    task.progress = Math.round((plan.steps.filter((item) => item.status === "COMPLETED").length / plan.steps.length) * 100);
    task.updatedAt = new Date().toISOString();
    this.tasks.updateTaskProgress(task.taskId, task.progress);
    if (task.progress === 100) this.completeResearch(researchTaskId);
    return { ...step, findingIds: [...step.findingIds] };
  }

  recordFinding(finding: ResearchFinding): ResearchFinding { this.findings.set(finding.id, { ...finding, sources: [...finding.sources] }); return { ...finding, sources: [...finding.sources] }; }
  validateFinding(findingId: string): ResearchFinding | undefined { const finding = this.findings.get(findingId); if (!finding) return undefined; finding.validated = true; return { ...finding, sources: [...finding.sources] }; }

  completeResearch(researchTaskId: string): ResearchResult | undefined {
    const task = this.researchTasks.get(researchTaskId);
    const plan = this.plans.get(researchTaskId);
    if (!task || !plan) return undefined;
    const researchFindings = plan.steps.flatMap((step) => step.findingIds.map((id) => this.findings.get(id))).filter((finding): finding is ResearchFinding => Boolean(finding));
    const result: ResearchResult = { id: `${researchTaskId}-RESULT`, researchTaskId, summary: `Simulated research completed for ${task.query}. Findings are educational fixtures, not verified medical information.`, findings: researchFindings, simulated: true, validated: researchFindings.every((finding) => finding.validated), createdAt: new Date().toISOString() };
    task.stage = "COMPLETE"; task.status = "COMPLETED"; task.progress = 100; task.updatedAt = result.createdAt;
    this.results.set(researchTaskId, result);
    this.createKnowledgeUpdateProposal(researchTaskId);
    this.tasks.completeTask(task.taskId, result.summary);
    return this.copyResult(result);
  }

  createKnowledgeUpdateProposal(researchTaskId: string): KnowledgeUpdateProposal | undefined {
    const result = this.results.get(researchTaskId);
    if (!result) return undefined;
    const proposal: KnowledgeUpdateProposal = { id: `${researchTaskId}-PROPOSAL`, researchTaskId, proposedChanges: ["Review simulated findings before any knowledge update."], supportingFindings: result.findings.map((finding) => finding.id), status: "PROPOSED", createdAt: new Date().toISOString() };
    this.proposals.set(researchTaskId, proposal);
    return { ...proposal, proposedChanges: [...proposal.proposedChanges], supportingFindings: [...proposal.supportingFindings] };
  }

  listResearchTasks(): ResearchTask[] { return Array.from(this.researchTasks.values()).map((task) => ({ ...task })); }
  getPlan(id: string): ResearchPlan | undefined { const plan = this.plans.get(id); return plan ? this.copyPlan(plan) : undefined; }
  getResult(id: string): ResearchResult | undefined { const result = this.results.get(id); return result ? this.copyResult(result) : undefined; }
  getProposal(id: string): KnowledgeUpdateProposal | undefined { const proposal = this.proposals.get(id); return proposal ? { ...proposal, proposedChanges: [...proposal.proposedChanges], supportingFindings: [...proposal.supportingFindings] } : undefined; }
  getTaskForResearch(id: string): Task | undefined { const researchTask = this.researchTasks.get(id); return researchTask ? this.tasks.getTask(researchTask.taskId) : undefined; }

  private copyPlan(plan: ResearchPlan): ResearchPlan { return { ...plan, steps: plan.steps.map((step) => ({ ...step, findingIds: [...step.findingIds] })) }; }
  private copyResult(result: ResearchResult): ResearchResult { return { ...result, findings: result.findings.map((finding) => ({ ...finding, sources: [...finding.sources] })) }; }
}

export const researchEngine = new ResearchEngine();
