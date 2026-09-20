import type { Task } from "@/types/task";

type TaskCardProps = { task: Task; selected: boolean; onSelect: (id: string) => void };

export function TaskCard({ task, selected, onSelect }: TaskCardProps) {
  return <button className={`task-card ${selected ? "is-selected" : ""}`} onClick={() => onSelect(task.id)} aria-pressed={selected}><span className={`task-status-dot ${task.status.toLowerCase()}`} /><span className="task-card-main"><strong>{task.title}</strong><small>{task.type} · {task.priority}</small></span><span className="task-card-progress"><b>{task.progress}%</b><small>{task.status.replace("_", " ")}</small></span></button>;
}
