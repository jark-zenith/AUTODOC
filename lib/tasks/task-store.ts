import type { CreateTaskInput, Task, TaskStatus } from "@/types/task";

export interface TaskStore {
  create(input: CreateTaskInput): Task;
  list(): Task[];
  getById(id: Task["id"]): Task | undefined;
  updateStatus(id: Task["id"], status: TaskStatus): Task | undefined;
  updateProgress(id: Task["id"], progress: number): Task | undefined;
  complete(id: Task["id"], result: string): Task | undefined;
  fail(id: Task["id"], error: string): Task | undefined;
}

function copyTask(task: Task): Task {
  return { ...task, metadata: task.metadata ? { ...task.metadata } : undefined };
}

export class InMemoryTaskStore implements TaskStore {
  private readonly tasks = new Map<string, Task>();
  private nextId = 1;

  create(input: CreateTaskInput): Task {
    const now = new Date().toISOString();
    const task: Task = { ...input, id: `TASK-${String(this.nextId++).padStart(4, "0")}`, status: "PENDING", progress: 0, createdAt: now, updatedAt: now };
    this.tasks.set(task.id, task);
    return copyTask(task);
  }

  list(): Task[] {
    return Array.from(this.tasks.values()).map(copyTask);
  }

  getById(id: string): Task | undefined {
    const task = this.tasks.get(id);
    return task ? copyTask(task) : undefined;
  }

  updateStatus(id: string, status: TaskStatus): Task | undefined {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    const now = new Date().toISOString();
    const startedAt = status === "IN_PROGRESS" && !task.startedAt ? now : task.startedAt;
    const completedAt = status === "COMPLETED" || status === "FAILED" || status === "CANCELLED" ? now : task.completedAt;
    const progress = status === "COMPLETED" ? 100 : task.progress;
    const updated = { ...task, status, progress, startedAt, completedAt, updatedAt: now };
    this.tasks.set(id, updated);
    return copyTask(updated);
  }

  updateProgress(id: string, progress: number): Task | undefined {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    const updated = { ...task, progress: Math.max(0, Math.min(100, progress)), updatedAt: new Date().toISOString() };
    this.tasks.set(id, updated);
    return copyTask(updated);
  }

  complete(id: string, result: string): Task | undefined {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    const now = new Date().toISOString();
    const updated = { ...task, status: "COMPLETED" as const, progress: 100, result, completedAt: now, updatedAt: now };
    this.tasks.set(id, updated);
    return copyTask(updated);
  }

  fail(id: string, error: string): Task | undefined {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    const now = new Date().toISOString();
    const updated = { ...task, status: "FAILED" as const, error, completedAt: now, updatedAt: now };
    this.tasks.set(id, updated);
    return copyTask(updated);
  }
}
