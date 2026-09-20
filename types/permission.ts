export type PermissionAction = "VIEW" | "CREATE" | "UPDATE" | "SHARE";

export type Permission = {
  id: string;
  subjectId: string;
  resource: string;
  action: PermissionAction;
  grantedBy: string;
  expiresAt?: string;
};
