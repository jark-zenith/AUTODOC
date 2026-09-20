export const SYSTEM_MODULE_IDS = [
  "CORE",
  "PATIENTS",
  "SYMPTOMS",
  "ASSESSMENT",
  "MEDICAL_KNOWLEDGE",
  "REASONING",
  "SAFETY",
  "SIMULATION",
  "DATABASE",
  "AI",
  "IVY",
  "FAMILY",
  "MEMORY",
  "FOLLOWUPS",
  "SCHEDULER",
  "TASKS",
  "RESEARCH",
  "EMERGENCY",
  "IDENTITY",
  "VOICE",
  "NOTIFICATIONS",
  "MULTIMODAL",
  "SECURITY"
  ,"PERMISSIONS"
  ,"AUDIT"
] as const;

export type SystemModuleId = (typeof SYSTEM_MODULE_IDS)[number];

export type SystemStatus = "INITIALIZING" | "READY" | "OFFLINE" | "ERROR";
export type SystemModuleStatus = SystemStatus;

export type SystemModule = {
  id: SystemModuleId;
  name: string;
  description: string;
  status: SystemModuleStatus;
  detail: string;
};

export type SystemState = {
  modules: Record<SystemModuleId, SystemModule>;
  status: SystemStatus;
};
