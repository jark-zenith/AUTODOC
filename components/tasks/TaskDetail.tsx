import type { Task } from "@/types/task";

type TaskDetailProps = { task?: Task };

export function TaskDetail({ task }: TaskDetailProps) {
  if (!task) return <section className="task-detail panel"><p className="task-empty">Select an operation to inspect its details.</p></section>;
  return <section className="task-detail panel" aria-labelledby="task-detail-title"><div className="panel-heading"><div><p className="panel-eyebrow">Operation record / {task.id}</p><h2 id="task-detail-title">{task.title}</h2></div><span className={`task-detail-status ${task.status.toLowerCase()}`}>{task.status.replace("_", " ")}</span></div><div className="task-detail-body"><p>{task.description}</p><div className="task-progress-line"><span>Progress</span><strong>{task.progress}%</strong><div><i style={{ width: `${task.progress}%` }} /></div></div><dl className="task-facts"><div><dt>Type</dt><dd>{task.type}</dd></div><div><dt>Priority</dt><dd>{task.priority}</dd></div><div><dt>Created</dt><dd>{new Date(task.createdAt).toLocaleString()}</dd></div><div><dt>Updated</dt><dd>{new Date(task.updatedAt).toLocaleString()}</dd></div>{task.result ? <div><dt>Result</dt><dd>{task.result}</dd></div> : null}</dl><p className="task-safety-note"><span>i</span> Task execution is limited to software simulation in this environment.</p></div></section>;
}
