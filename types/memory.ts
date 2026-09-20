export type MemoryCategory = "IDENTITY" | "PREFERENCE" | "HEALTH_HISTORY" | "SYMPTOM_HISTORY" | "FOLLOW_UP" | "FAMILY_CONTEXT" | "SYSTEM_PREFERENCE" | "CONVERSATION_CONTEXT" | "OTHER";
export type MemorySource = "USER_PROVIDED" | "SYSTEM_GENERATED" | "SIMULATION" | "IMPORT" | "RESEARCH";
export type MemoryImportance = "LOW" | "NORMAL" | "HIGH" | "CRITICAL";
export type MemoryStatus = "ACTIVE" | "ARCHIVED" | "EXPIRED";
export type MemoryAccessScope = "FAMILY" | "MEMBER" | "PRIVATE";
export type MemoryEntry = { id: string; familyId: string; memberId?: string; category: MemoryCategory; key: string; value: string; source: MemorySource; confidence: number; importance: MemoryImportance; createdAt: string; updatedAt: string; expiresAt?: string; status: MemoryStatus; accessScope: MemoryAccessScope; version: number; previousValue?: string; updatedBy?: string };
export type CreateMemoryInput = Pick<MemoryEntry, "familyId" | "category" | "key" | "value" | "source" | "importance" | "accessScope"> & Partial<Pick<MemoryEntry, "memberId" | "confidence" | "expiresAt" | "updatedBy">>;
