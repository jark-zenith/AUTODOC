import { AppShell } from "@/components/autodoc/AppShell";
import { TaskDashboard } from "@/components/tasks/TaskDashboard";

export default function TasksPage() {
  return <AppShell activeHref="/tasks"><TaskDashboard /></AppShell>;
}
