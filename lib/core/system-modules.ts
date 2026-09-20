import type { SystemModule, SystemModuleId, SystemModuleStatus, SystemState } from "./system-state";

export class SystemModuleRegistry {
  private readonly modules = new Map<SystemModuleId, SystemModule>();

  constructor(initialModules: SystemModule[] = []) {
    initialModules.forEach((module) => this.register(module));
  }

  register(module: SystemModule): void {
    this.modules.set(module.id, { ...module });
  }

  setStatus(id: SystemModuleId, status: SystemModuleStatus, detail?: string): void {
    const module = this.modules.get(id);
    if (!module) return;
    this.modules.set(id, { ...module, status, detail: detail ?? module.detail });
  }

  get(id: SystemModuleId): SystemModule | undefined {
    const module = this.modules.get(id);
    return module ? { ...module } : undefined;
  }

  getAll(): SystemModule[] {
    return Array.from(this.modules.values()).map((module) => ({ ...module }));
  }

  toState(): SystemState {
    const modules = Object.fromEntries(this.getAll().map((module) => [module.id, module])) as SystemState["modules"];
    const statuses = this.getAll().map((module) => module.status);
    const status = statuses.includes("ERROR") ? "ERROR" : statuses.includes("INITIALIZING") ? "INITIALIZING" : statuses.every((item) => item === "READY") ? "READY" : "OFFLINE";
    return { modules, status };
  }
}
