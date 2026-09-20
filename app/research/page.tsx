import { AppShell } from "@/components/autodoc/AppShell";
import { ResearchDashboard } from "@/components/research/ResearchDashboard";

export default function ResearchPage() {
  return <AppShell activeHref="/research"><ResearchDashboard /></AppShell>;
}
