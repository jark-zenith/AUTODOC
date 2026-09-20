import { safetyEngine, SafetyEngine } from "./safety-engine";
import type { SafetyRequest, SafetyResult } from "./types";

export class SafetyService {
  constructor(private readonly engine: SafetyEngine = safetyEngine) {}
  analyze(request: SafetyRequest): SafetyResult { return this.engine.analyze(request); }
}

export const safetyService = new SafetyService();
