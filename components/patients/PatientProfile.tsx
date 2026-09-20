import type { Patient } from "@/types/patient";
import { PatientInfoSection } from "./PatientInfoSection";

type PatientProfileProps = { patient: Patient };

export function PatientProfile({ patient }: PatientProfileProps) {
  return (
    <section className="patient-profile panel" aria-labelledby="patient-profile-title">
      <div className="profile-header"><div><p className="panel-eyebrow">Selected synthetic record / {patient.id}</p><h2 id="patient-profile-title">{patient.name}</h2><p className="profile-subtitle">Patient profile · Simulation data</p></div><span className="profile-record-status">READ ONLY</span></div>
      <div className="patient-facts"><div><span>Patient ID</span><strong>{patient.id}</strong></div><div><span>Age</span><strong>{patient.age}</strong></div><div><span>Sex</span><strong>{patient.sex}</strong></div><div><span>Blood type</span><strong>{patient.bloodType}</strong></div><div><span>Date of birth</span><strong>{patient.dateOfBirth}</strong></div></div>
      <div className="profile-sections"><PatientInfoSection title="Current symptoms" items={patient.currentSymptoms} /><PatientInfoSection title="Medical history" items={patient.medicalHistory} /><PatientInfoSection title="Allergies" items={patient.allergies} /></div>
      <p className="profile-disclaimer"><span>i</span> This record is synthetic and provided for interface development only. No clinical conclusions are generated.</p>
    </section>
  );
}
