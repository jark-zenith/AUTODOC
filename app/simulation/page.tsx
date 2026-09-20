import { AppShell } from "@/components/autodoc/AppShell";
import { SimulationWorkspace } from "@/components/simulation/SimulationWorkspace";

export default function SimulationPage() {
  return <AppShell activeHref="/simulation"><SimulationWorkspace /></AppShell>;
}
