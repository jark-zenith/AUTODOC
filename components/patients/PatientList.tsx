import type { Patient } from "@/types/patient";
import { PatientCard } from "./PatientCard";

type PatientListProps = {
  patients: Patient[];
  selectedId: Patient["id"];
  onSelect: (id: Patient["id"]) => void;
};

export function PatientList({ patients, selectedId, onSelect }: PatientListProps) {
  return (
    <section className="patient-list-panel panel" aria-labelledby="patient-list-title">
      <div className="panel-heading"><div><p className="panel-eyebrow">Synthetic registry</p><h2 id="patient-list-title">Patients <span className="patient-count">{patients.length.toString().padStart(2, "0")}</span></h2></div><span className="panel-corner" aria-hidden="true" /></div>
      <div className="patient-list">{patients.map((patient) => <PatientCard key={patient.id} patient={patient} isSelected={patient.id === selectedId} onSelect={onSelect} />)}</div>
      <p className="patient-list-footnote">All records are fictional development fixtures.</p>
    </section>
  );
}
