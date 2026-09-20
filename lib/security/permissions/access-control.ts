import type { PermissionSubject, AccessContext, Permission, PermissionResult } from "./types";
import { roleHasPermission } from "./permission-rules";

export function checkPermission(subject: PermissionSubject | undefined, context: AccessContext, permission: Permission): PermissionResult {
  if (!subject || !subject.verified) return { decision: "NOT_AUTHENTICATED", allowed: false, reason: "An active verified identity is required.", scope: context.memberId ? "MEMBER" : "FAMILY" };
  if (subject.familyId !== context.familyId) return { decision: "DENIED", allowed: false, reason: "Family scope does not match the active identity.", scope: context.memberId ? "MEMBER" : "FAMILY" };
  const targetMember = context.memberId;
  if (targetMember && targetMember !== subject.memberId && !["OWNER", "ADMIN", "SYSTEM"].includes(subject.role)) return { decision: "DENIED", allowed: false, reason: "The active identity cannot access another member without an explicit family-level role.", scope: "MEMBER" };
  const allowed = roleHasPermission(subject.role, permission);
  return { decision: allowed ? "ALLOWED" : "DENIED", allowed, reason: allowed ? "Permission granted by the explicit role matrix." : "The active role does not include this permission.", scope: context.memberId ? "MEMBER" : "FAMILY" };
}
