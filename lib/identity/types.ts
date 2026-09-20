export type IdentityStatus = "ACTIVE" | "INACTIVE" | "LOCKED" | "NOT_CONFIGURED";
export type IdentityVerificationMethod = "DEVELOPMENT" | "CAMERA" | "PIN" | "AUTHENTICATION" | "FUTURE_BIOMETRIC";
export type IdentityVerificationStatus = "VERIFIED" | "NOT_VERIFIED" | "NOT_CONFIGURED" | "FAILED";
export type IdentitySessionStatus = "ACTIVE" | "EXPIRED" | "REVOKED";
export type IdentityRole = "OWNER" | "ADMIN" | "ADULT_MEMBER" | "CHILD_MEMBER" | "GUEST" | "SYSTEM";
export type IdentityProfile = { id: string; familyId: string; memberId: string; displayName: string; role: IdentityRole; status: IdentityStatus; createdAt: string; updatedAt: string };
export type IdentityVerificationRequest = { requestId: string; familyId: string; claimedMemberId?: string; method: IdentityVerificationMethod; createdAt: string };
export type IdentityVerificationResult = { requestId: string; status: IdentityVerificationStatus; memberId?: string; method: IdentityVerificationMethod; confidence: number; reason: string; verifiedAt?: string };
export type IdentitySession = { sessionId: string; familyId: string; memberId: string; role: IdentityRole; verified: boolean; verificationMethod: IdentityVerificationMethod; createdAt: string; expiresAt: string; status: IdentitySessionStatus };
export interface IdentityProvider { verify(request: IdentityVerificationRequest): IdentityVerificationResult; }
export interface CameraIdentityProvider extends IdentityProvider { captureIdentityInput(): { status: "NOT_CONFIGURED"; reason: string }; }
export interface AuthenticationProvider { authenticate(): { status: "DEVELOPMENT_ONLY"; reason: string }; }
