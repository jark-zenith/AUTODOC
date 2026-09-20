import type { PermissionAuditEvent } from "./permissions/types";

export class AuditService { private events: PermissionAuditEvent[] = []; record(event: Omit<PermissionAuditEvent, "id">) { const saved = { ...event, id: `AUDIT-${this.events.length + 1}` }; this.events.push(saved); return { ...saved }; } list() { return this.events.map((event) => ({ ...event })); } }
export const auditService = new AuditService();
