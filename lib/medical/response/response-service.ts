import { DeterministicResponseProvider } from "./deterministic-response-provider";
import { ResponseEngine } from "./response-engine";
import type { AssessmentRequest, MedicalAssessment } from "./types";

export class ResponseService {
  constructor(private readonly engine = new ResponseEngine(new DeterministicResponseProvider())) {}
  assess(request: AssessmentRequest): MedicalAssessment { return this.engine.assess(request); }
}

export const responseService = new ResponseService();
