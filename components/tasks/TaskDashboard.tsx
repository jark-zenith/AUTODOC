"use client";

import { useState } from "react";
import { taskManager } from "@/lib/tasks";
import type { Task } from "@/types/task";
import { TaskDetail } from "./TaskDetail";
import { TaskList } from "./TaskList";

export function TaskDashboard() {
  const [version, setVersion] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  const tasks = taskManager.listTasks();
  const selectedTask = tasks.find((task) => task.id === selectedId) ?? tasks[0];
  const refresh = () => setVersion((value) => value + 1);
  const createSystemTask = () => { const task = taskManager.createTask({ title: "Review AUTODOC system state", description: "Placeholder system operation created in the local task store.", type: "SYSTEM", priority: "NORMAL" }); setSelectedId(task.id); refresh(); };
  const groups: [string, Task[]][] = [["ACTIVE OPERATIONS", tasks.filter((task) => ["PLANNING", "IN_PROGRESS", "WAITING"].includes(task.status))], ["PENDING OPERATIONS", tasks.filter((task) => task.status === "PENDING" && task.type !== "RESEARCH")], ["RESEARCH OPERATIONS", tasks.filter((task) => task.type === "RESEARCH")], ["COMPLETED OPERATIONS", tasks.filter((task) => task.status === "COMPLETED")], ["FAILED OPERATIONS", tasks.filter((task) => task.status === "FAILED")]];
  void version;
  return <div className="dashboard-content task-content" id="tasks"><div className="dashboard-intro"><div><p className="page-kicker">AUTODOC / task management</p><h1>AUTODOC TASKS</h1><p className="page-description">Track software operations, research work, and future system follow-ups.</p></div><button className="task-action-button" onClick={createSystemTask}>＋ New system task</button></div><div className="task-layout"><div className="task-groups">{groups.map(([title, items]) => <TaskList key={title} title={title} tasks={items} selectedId={selectedTask?.id ?? ""} onSelect={setSelectedId} />)}</div><TaskDetail task={selectedTask} /></div></div>;
}
