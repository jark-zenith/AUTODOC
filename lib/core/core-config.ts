import type { SystemModule, SystemModuleId } from "./system-state";

export type CoreConfig = {
  name: string;
  version: string;
  mode: "LOCAL" | "SIMULATION";
  modules: Record<SystemModuleId, Omit<SystemModule, "status"> & { status: SystemModule["status"] }>;
};

export const defaultCoreConfig: CoreConfig = {
  name: "AUTODOC",
  version: "0.1.0",
  mode: "SIMULATION",
  modules: {
    CORE: { id: "CORE", name: "AUTODOC Core", description: "Primary orchestration layer", detail: "Boot sequence 04 / 07", status: "INITIALIZING" },
    PATIENTS: { id: "PATIENTS", name: "Patient System", description: "Synthetic records interface", detail: "No data connection", status: "OFFLINE" },
    SYMPTOMS: { id: "SYMPTOMS", name: "Symptom Understanding Engine", description: "Deterministic symptom extraction", detail: "Controlled vocabulary ready", status: "READY" },
    ASSESSMENT: { id: "ASSESSMENT", name: "Assessment Response Engine", description: "Unified reasoning and safety response", detail: "Response service ready", status: "READY" },
    MEDICAL_KNOWLEDGE: { id: "MEDICAL_KNOWLEDGE", name: "Medical Knowledge Engine", description: "Educational reference library", detail: "Knowledge service ready", status: "READY" },
    REASONING: { id: "REASONING", name: "Reasoning Engine", description: "Deterministic knowledge matching", detail: "Reasoning service ready", status: "READY" },
    SAFETY: { id: "SAFETY", name: "Safety Engine", description: "Boundary enforcement layer", detail: "Guardrails active", status: "READY" },
    SIMULATION: { id: "SIMULATION", name: "Simulation Engine", description: "Synthetic scenario runtime", detail: "Scenario library loaded", status: "READY" },
    DATABASE: { id: "DATABASE", name: "Database", description: "Persistence services", detail: "Not configured", status: "OFFLINE" },
    AI: { id: "AI", name: "AI Connector", description: "External model connection", detail: "Not configured", status: "OFFLINE" },
    IVY: { id: "IVY", name: "IVY", description: "Conversational interface", detail: "Not configured", status: "OFFLINE" },
    FAMILY: { id: "FAMILY", name: "Family System", description: "Fictional household profiles", detail: "Demo family store ready", status: "READY" },
    MEMORY: { id: "MEMORY", name: "Long-term Memory", description: "Scoped in-memory context", detail: "Memory service ready", status: "READY" },
    FOLLOWUPS: { id: "FOLLOWUPS", name: "Health Follow-ups", description: "Task-linked follow-up foundation", detail: "Task integration ready", status: "READY" },
    SCHEDULER: { id: "SCHEDULER", name: "Notification Scheduler", description: "Deterministic due processing", detail: "Manual scheduler ready", status: "READY" },
    EMERGENCY: { id: "EMERGENCY", name: "Emergency Response", description: "Emergency event abstraction", detail: "Not configured", status: "OFFLINE" },
    IDENTITY: { id: "IDENTITY", name: "Identity System", description: "Development identity provider", detail: "Development mode ready", status: "READY" },
    VOICE: { id: "VOICE", name: "Voice Interaction", description: "Speech interaction abstraction", detail: "Not configured", status: "OFFLINE" },
    NOTIFICATIONS: { id: "NOTIFICATIONS", name: "Notification System", description: "Development in-app delivery", detail: "Development provider ready", status: "READY" },
    MULTIMODAL: { id: "MULTIMODAL", name: "Multimodal Explanation", description: "Rich content response model", detail: "Not configured", status: "OFFLINE" },
    SECURITY: { id: "SECURITY", name: "Audit and Security", description: "Access and audit boundaries", detail: "Permission foundation ready", status: "READY" },
    PERMISSIONS: { id: "PERMISSIONS", name: "Permission System", description: "Role and scope access control", detail: "Permission matrix ready", status: "READY" },
    AUDIT: { id: "AUDIT", name: "Audit System", description: "Non-sensitive access events", detail: "Audit service ready", status: "READY" },
    TASKS: { id: "TASKS", name: "Task Engine", description: "Task lifecycle coordination", detail: "In-memory service ready", status: "READY" },
    RESEARCH: { id: "RESEARCH", name: "Research Engine", description: "Simulated research pipeline", detail: "Simulated provider ready", status: "READY" }
  }
};
