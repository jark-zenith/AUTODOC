import type { CreateTaskInput, Task, TaskStatus } from "@/types/task";
import { InMemoryTaskStore, type TaskStore } from "./task-store";

export class TaskManager {
  constructor(private readonly store: TaskStore = new InMemoryTaskStore()) {}

  createTask(input: CreateTaskInput): Task { return this.store.create(input); }
  listTasks(): Task[] { return this.store.list(); }
  getTask(id: string): Task | undefined { return this.store.getById(id); }
  updateTaskStatus(id: string, status: TaskStatus): Task | undefined { return this.store.updateStatus(id, status); }
  updateTaskProgress(id: string, progress: number): Task | undefined { return this.store.updateProgress(id, progress); }
  completeTask(id: string, result: string): Task | undefined { return this.store.complete(id, result); }
  failTask(id: string, error: string): Task | undefined { return this.store.fail(id, error); }
}

export const taskManager = new TaskManager();
