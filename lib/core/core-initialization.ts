import { defaultCoreConfig, type CoreConfig } from "./core-config";
import { SystemModuleRegistry } from "./system-modules";
import type { SystemModule } from "./system-state";

export function initializeCore(config: CoreConfig = defaultCoreConfig): SystemModuleRegistry {
  const modules = Object.values(config.modules) as SystemModule[];
  return new SystemModuleRegistry(modules);
}
