import { demoFamilyService } from "@/lib/family";
import { DevelopmentIdentityProvider } from "./development-identity-provider";
import { IdentitySessionStore } from "./identity-session";
import { IdentityVerificationService } from "./identity-verification";
import type { IdentityRole, IdentitySession, IdentityVerificationRequest } from "./types";

export class IdentityService {
  private readonly verification = new IdentityVerificationService(new DevelopmentIdentityProvider());
  private readonly sessions = new IdentitySessionStore();
  verifyDevelopment(familyId: string, memberId?: string) { return this.verification.verify({ requestId: `VERIFY-${Date.now()}`, familyId, claimedMemberId: memberId, method: "DEVELOPMENT", createdAt: new Date().toISOString() }); }
  createSession(request: IdentityVerificationRequest, role: IdentityRole = "OWNER"): IdentitySession | undefined { const result = this.verification.verify(request); if (result.status !== "VERIFIED" || !result.memberId) return undefined; const now = new Date(); const session: IdentitySession = { sessionId: `SESSION-${Date.now()}`, familyId: request.familyId, memberId: result.memberId, role, verified: true, verificationMethod: result.method, createdAt: now.toISOString(), expiresAt: new Date(now.getTime() + 60 * 60 * 1000).toISOString(), status: "ACTIVE" }; return this.sessions.save(session); }
  getSession(sessionId: string) { return this.sessions.active(sessionId); }
  revokeSession(sessionId: string) { return this.sessions.revoke(sessionId); }
  developmentSession(familyId: string, memberId: string, role: IdentityRole = "OWNER") { return this.createSession({ requestId: `VERIFY-${Date.now()}`, familyId, claimedMemberId: memberId, method: "DEVELOPMENT", createdAt: new Date().toISOString() }, role); }
  getMemberName(familyId: string, memberId: string) { return demoFamilyService.getMember(familyId, memberId)?.preferredName ?? demoFamilyService.getMember(familyId, memberId)?.name; }
}

export const identityService = new IdentityService();
