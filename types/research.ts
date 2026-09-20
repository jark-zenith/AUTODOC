export type ResearchStage = "REQUEST" | "PLAN" | "RESEARCH" | "ANALYZE" | "VALIDATE" | "PROPOSE_UPDATE" | "COMPLETE";
export type ResearchStepStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
export type KnowledgeUpdateProposalStatus = "PROPOSED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "APPLIED";

export type ResearchSource = {
  id: string;
  title: string;
  url?: string;
  publisher?: string;
  sourceType: "SIMULATED" | "WEB" | "DATABASE" | "DOCUMENT";
  publicationDate?: string;
  retrievedDate?: string;
  credibility?: Record<string, unknown>;
};

export type ResearchStep = {
  id: string;
  order: number;
  title: string;
  description: string;
  status: ResearchStepStatus;
  progress: number;
  findingIds: string[];
};

export type ResearchPlan = {
  id: string;
  researchTaskId: string;
  steps: ResearchStep[];
  createdAt: string;
};

export type ResearchFinding = {
  id: string;
  researchTaskId: string;
  stepId: string;
  statement: string;
  sources: ResearchSource[];
  validated: boolean;
  createdAt: string;
};

export type ResearchTask = {
  id: string;
  taskId: string;
  query: string;
  requestedBy: string;
  stage: ResearchStage;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  progress: number;
  createdAt: string;
  updatedAt: string;
};

export type ResearchResult = {
  id: string;
  researchTaskId: string;
  summary: string;
  findings: ResearchFinding[];
  simulated: boolean;
  validated: boolean;
  version?: string;
  createdAt: string;
};

export type KnowledgeUpdateProposal = {
  id: string;
  researchTaskId: string;
  proposedChanges: string[];
  supportingFindings: string[];
  status: KnowledgeUpdateProposalStatus;
  createdAt: string;
  reviewedAt?: string;
};
