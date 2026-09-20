import assert from "node:assert/strict";
import test from "node:test";
import { adminService } from "../lib/admin";
import { familyId, members } from "../lib/family";
import { identityService } from "../lib/identity";
import { checkPermission } from "../lib/security/permissions";
import { auditService } from "../lib/security";

test("admin snapshot aggregates existing systems", () => { const snapshot = adminService.getSnapshot(identityService.developmentSession(familyId, members[0].id, "OWNER")); assert.equal(snapshot.environment, "DEVELOPMENT / SIMULATION"); assert.ok(snapshot.systemStatus.modules.CORE); assert.ok(snapshot.knowledge.total > 0); assert.equal(typeof snapshot.tasks.pending, "number"); });
test("admin access is permission protected", () => { const session = identityService.developmentSession(familyId, members[1].id, "CHILD_MEMBER"); const access = checkPermission(session, { actorId: members[1].id, actorType: "CHILD_MEMBER", familyId, permission: "SYSTEM_SETTINGS_VIEW", purpose: "ADMINISTRATION", timestamp: new Date().toISOString() }, "SYSTEM_SETTINGS_VIEW"); assert.equal(access.allowed, false); });
test("safe admin health check does not mutate medical systems", () => { const before = auditService.list().length; const result = adminService.runHealthCheck(); assert.equal(result.ok, true); assert.equal(auditService.list().length, before); });
test("audit inspection contains metadata only", () => { const events = adminService.inspectAudit(); assert.ok(events.every((event) => !JSON.stringify(event).toLowerCase().includes("diabetes"))); });
