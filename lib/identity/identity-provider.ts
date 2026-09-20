import type { CameraIdentityProvider, IdentityVerificationRequest, IdentityVerificationResult } from "./types";

export class NotConfiguredCameraIdentityProvider implements CameraIdentityProvider {
  captureIdentityInput() { return { status: "NOT_CONFIGURED" as const, reason: "Camera access is not implemented." }; }
  verify(request: IdentityVerificationRequest): IdentityVerificationResult { return { requestId: request.requestId, status: "NOT_CONFIGURED", method: request.method, confidence: 0, reason: "Camera and biometric identity are not configured." }; }
}
