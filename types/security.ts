export type ProtectedInformation = {
  resourceId: string;
  classification: "PUBLIC" | "PRIVATE" | "RESTRICTED";
  ownerId?: string;
};

export type AuditLogEntry = {
  id: string;
  actorId?: string;
  action: string;
  resourceId?: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
};
