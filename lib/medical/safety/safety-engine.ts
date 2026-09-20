import type { SafetyProvider } from "./safety-provider";
import { DeterministicSafetyProvider } from "./deterministic-safety-provider";
import type { SafetyRequest, SafetyResult } from "./types";

export class SafetyEngine {
  constructor(private readonly provider: SafetyProvider) {}
  analyze(request: SafetyRequest): SafetyResult { return this.provider.analyze(request); }
}

export const safetyEngine = new SafetyEngine(new DeterministicSafetyProvider());
