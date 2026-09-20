import { initializeCore } from "./core-initialization";
import type { SystemModuleRegistry } from "./system-modules";
import type { SystemState } from "./system-state";

export function getSystemStatus(core: SystemModuleRegistry = initializeCore()): SystemState {
  return core.toState();
}
