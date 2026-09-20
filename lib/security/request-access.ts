import { demoFamilyService } from "@/lib/family";
import { identityService } from "@/lib/identity";
import { auditService } from "./audit";
import { permissionService, type AccessPurpose, type Permission, type PermissionResult } from "./permissions";

export function getDevelopmentAccess(familyId: string, memberId: string | undefined, permission: Permission, purpose: AccessPurpose): PermissionResult {
  const family = demoFamilyService.getFamily(familyId);
  const actorId = family?.ownerMemberId ?? "DEVELOPMENT-UNKNOWN";
  const session = family ? identityService.developmentSession(familyId, actorId, "OWNER") : undefined;
  const result = permissionService.check(session, { actorId, actorType: session?.role ?? "GUEST", familyId, memberId, permission, purpose, timestamp: new Date().toISOString() }, permission);
  auditService.record({ actorId, familyId, memberId, action: `${permission}_CHECK`, resource: purpose, allowed: result.allowed, reason: result.reason, timestamp: new Date().toISOString() });
  return result;
}
