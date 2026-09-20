import { AppShell } from "@/components/autodoc/AppShell";
import { AssessmentWorkspace } from "@/components/medical/AssessmentWorkspace";

export default function AssessmentPage() {
  return <AppShell activeHref="/assessment"><AssessmentWorkspace /></AppShell>;
}
