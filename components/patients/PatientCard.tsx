import type { Patient } from "@/types/patient";

type PatientCardProps = {
  patient: Patient;
  isSelected: boolean;
  onSelect: (id: Patient["id"]) => void;
};

export function PatientCard({ patient, isSelected, onSelect }: PatientCardProps) {
  return (
    <button className={`patient-card ${isSelected ? "is-selected" : ""}`} onClick={() => onSelect(patient.id)} aria-pressed={isSelected}>
      <span className="patient-avatar">{patient.name.split(" ").map((part) => part[0]).join("")}</span>
      <span className="patient-card-copy"><strong>{patient.name}</strong><small>{patient.id} · {patient.age} years · {patient.sex}</small></span>
      <span className="patient-card-arrow" aria-hidden="true">→</span>
    </button>
  );
}
