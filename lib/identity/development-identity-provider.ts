import { demoFamilyService } from "@/lib/family";
import type { IdentityProvider, IdentityVerificationRequest, IdentityVerificationResult } from "./types";

export class DevelopmentIdentityProvider implements IdentityProvider {
  verify(request: IdentityVerificationRequest): IdentityVerificationResult {
    if (request.method !== "DEVELOPMENT") return { requestId: request.requestId, status: "NOT_CONFIGURED", method: request.method, confidence: 0, reason: "Only DEVELOPMENT identity verification is active." };
    if (!request.claimedMemberId || !demoFamilyService.getMember(request.familyId, request.claimedMemberId)) return { requestId: request.requestId, status: "NOT_VERIFIED", method: request.method, confidence: 0, reason: "The selected fictional family member was not found." };
    return { requestId: request.requestId, status: "VERIFIED", memberId: request.claimedMemberId, method: "DEVELOPMENT", confidence: 1, reason: "Development identity selected; this is not real identity verification.", verifiedAt: new Date().toISOString() };
  }
}
