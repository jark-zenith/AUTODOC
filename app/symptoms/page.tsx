import { AppShell } from "@/components/autodoc/AppShell";
import { SymptomAnalyzer } from "@/components/medical/SymptomAnalyzer";

export default function SymptomsPage() {
  return <AppShell activeHref="/symptoms"><SymptomAnalyzer /></AppShell>;
}
