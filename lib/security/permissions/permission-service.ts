import type { PermissionSubject } from "./types";
import { checkPermission } from "./access-control";
import type { AccessContext, Permission, PermissionResult } from "./types";

export class PermissionService { check(subject: PermissionSubject | undefined, context: AccessContext, permission: Permission): PermissionResult { return checkPermission(subject, context, permission); } }
export const permissionService = new PermissionService();
