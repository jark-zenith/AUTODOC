import { AppShell } from "@/components/autodoc/AppShell";
import { KnowledgeExplorer } from "@/components/medical/KnowledgeExplorer";

export default function KnowledgePage() {
  return <AppShell activeHref="/knowledge"><KnowledgeExplorer /></AppShell>;
}
