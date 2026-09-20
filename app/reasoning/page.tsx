import { AppShell } from "@/components/autodoc/AppShell";
import { ReasoningWorkspace } from "@/components/medical/ReasoningWorkspace";

export default function ReasoningPage() {
  return <AppShell activeHref="/reasoning"><ReasoningWorkspace /></AppShell>;
}
