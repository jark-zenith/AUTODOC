import type { SafetyRequest, SafetyResult } from "./types";

export interface SafetyProvider {
  analyze(request: SafetyRequest): SafetyResult;
}
