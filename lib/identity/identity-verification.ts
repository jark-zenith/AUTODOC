import type { IdentityProvider, IdentityVerificationRequest, IdentityVerificationResult } from "./types";

export class IdentityVerificationService {
  constructor(private readonly provider: IdentityProvider) {}
  verify(request: IdentityVerificationRequest): IdentityVerificationResult { return this.provider.verify(request); }
}
