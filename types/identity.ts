export type IdentityVerificationMethod = "CAMERA_FACE" | "VOICE" | "PASSWORD_PIN" | "OTHER";

export type IdentityVerification = {
  id: string;
  subjectId: string;
  method: IdentityVerificationMethod;
  verified: boolean;
  verifiedAt?: string;
  evidenceRef?: string;
};
