export type KnowledgeCategory = "CONDITION" | "SYMPTOM" | "ANATOMY" | "BODY_SYSTEM" | "EMERGENCY" | "MEDICAL_CONCEPT" | "PROCEDURE" | "GENERAL_HEALTH";
export type KnowledgeStatus = "DRAFT" | "VERIFIED" | "UNDER_REVIEW" | "ARCHIVED";

export type KnowledgeVersion = {
  version: string;
  createdAt: string;
  source: string;
  changeDescription: string;
  previousVersion?: string;
  status: KnowledgeStatus;
};

export type KnowledgeEntry = {
  id: string;
  title: string;
  slug: string;
  category: KnowledgeCategory;
  summary: string;
  description: string;
  symptoms: string[];
  causes: string[];
  riskFactors: string[];
  commonTriggers: string[];
  warningSigns: string[];
  prevention: string[];
  relatedTopics: string[];
  sourceReferences: string[];
  version: KnowledgeVersion;
  status: KnowledgeStatus;
  createdAt: string;
  updatedAt: string;
};

export type Assessment = {
  id: string;
  subjectId: string;
  observations: string[];
  confidence?: number;
  createdAt: string;
  isSimulation: boolean;
};
