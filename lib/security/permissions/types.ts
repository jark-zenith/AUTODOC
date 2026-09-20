import type { IdentityRole, IdentitySession } from "@/lib/identity";

export type Permission = "FAMILY_VIEW" | "FAMILY_EDIT" | "MEMBER_VIEW" | "MEMBER_EDIT" | "HEALTH_PROFILE_VIEW" | "HEALTH_PROFILE_EDIT" | "HEALTH_HISTORY_VIEW" | "HEALTH_HISTORY_EDIT" | "MEMORY_VIEW" | "MEMORY_CREATE" | "MEMORY_EDIT" | "MEMORY_DELETE" | "FOLLOWUP_VIEW" | "FOLLOWUP_CREATE" | "FOLLOWUP_EDIT" | "ASSESSMENT_VIEW" | "ASSESSMENT_CREATE" | "RESEARCH_VIEW" | "RESEARCH_CREATE" | "SIMULATION_VIEW" | "SIMULATION_CREATE" | "NOTIFICATION_VIEW" | "NOTIFICATION_CREATE" | "NOTIFICATION_MANAGE" | "NOTIFICATION_SETTINGS_VIEW" | "NOTIFICATION_SETTINGS_EDIT" | "SYSTEM_SETTINGS_VIEW" | "SYSTEM_SETTINGS_EDIT" | "IDENTITY_MANAGE";
export type AccessScope = "FAMILY" | "MEMBER" | "PRIVATE" | "SYSTEM";
export type AccessPurpose = "ASSESSMENT" | "MEMORY" | "FOLLOWUP" | "PROFILE" | "SYSTEM" | "ADMINISTRATION";
export type AccessContext = { actorId: string; actorType: IdentityRole; familyId: string; memberId?: string; permission: Permission; purpose: AccessPurpose; timestamp: string };
export type PermissionDecision = "ALLOWED" | "DENIED" | "NOT_AUTHENTICATED" | "NOT_CONFIGURED";
export type PermissionResult = { decision: PermissionDecision; allowed: boolean; reason: string; scope: AccessScope };
export type PermissionAuditEvent = { id: string; actorId: string; familyId: string; memberId?: string; action: string; resource: string; allowed: boolean; reason: string; timestamp: string };
export type PermissionSubject = IdentitySession | { memberId: string; familyId: string; role: IdentityRole; verified: boolean };
