export type TaskType = "RESEARCH" | "KNOWLEDGE_UPDATE" | "HEALTH_FOLLOWUP" | "REMINDER" | "SIMULATION" | "EXPLANATION" | "SYSTEM" | "OTHER";
export type TaskPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";
export type TaskStatus = "PENDING" | "PLANNING" | "IN_PROGRESS" | "WAITING" | "COMPLETED" | "FAILED" | "CANCELLED";

export type Task = {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
  scheduledFor?: string;
  startedAt?: string;
  completedAt?: string;
  result?: string;
  error?: string;
  metadata?: Record<string, unknown>;
};

export type CreateTaskInput = Pick<Task, "title" | "description" | "type" | "priority"> & Partial<Pick<Task, "scheduledFor" | "metadata">>;
