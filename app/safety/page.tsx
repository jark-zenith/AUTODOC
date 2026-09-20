import { AppShell } from "@/components/autodoc/AppShell";
import { SafetyWorkspace } from "@/components/medical/SafetyWorkspace";

export default function SafetyPage() {
  return <AppShell activeHref="/safety"><SafetyWorkspace /></AppShell>;
}
