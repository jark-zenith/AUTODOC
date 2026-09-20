import { AppShell } from "@/components/autodoc/AppShell";
import { PatientManagement } from "@/components/patients/PatientManagement";

export default function PatientsPage() {
  return <AppShell activeHref="/patients"><PatientManagement /></AppShell>;
}
