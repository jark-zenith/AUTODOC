import type { AssessmentRequest, MedicalAssessment, ResponseProvider } from "./types";

export class ResponseEngine {
  constructor(private readonly provider: ResponseProvider) {}
  assess(request: AssessmentRequest): MedicalAssessment { return this.provider.assess(request); }
}
