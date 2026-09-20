import type { Task } from "@/types/task";
import { TaskCard } from "./TaskCard";

type TaskListProps = { title: string; tasks: Task[]; selectedId: string; onSelect: (id: string) => void };

export function TaskList({ title, tasks, selectedId, onSelect }: TaskListProps) {
  return <section className="task-group"><div className="task-group-heading"><h2>{title}</h2><span>{tasks.length.toString().padStart(2, "0")}</span></div>{tasks.length > 0 ? <div className="task-cards">{tasks.map((task) => <TaskCard key={task.id} task={task} selected={task.id === selectedId} onSelect={onSelect} />)}</div> : <p className="task-empty">No operations in this state.</p>}</section>;
}
