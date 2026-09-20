import type { IdentitySession } from "./types";

export class IdentitySessionStore {
  private sessions = new Map<string, IdentitySession>();
  save(session: IdentitySession) { this.sessions.set(session.sessionId, { ...session }); return { ...session }; }
  get(sessionId: string) { const session = this.sessions.get(sessionId); return session ? { ...session } : undefined; }
  revoke(sessionId: string) { const session = this.sessions.get(sessionId); if (!session) return undefined; const revoked = { ...session, status: "REVOKED" as const, verified: false }; this.sessions.set(sessionId, revoked); return { ...revoked }; }
  active(sessionId: string) { const session = this.get(sessionId); if (!session || session.status !== "ACTIVE" || new Date(session.expiresAt) <= new Date()) return undefined; return session; }
}
