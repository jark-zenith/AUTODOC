"use client";

import { useState } from "react";
import { patientRepository } from "@/lib/medical/patient-repository";
import type { Patient } from "@/types/patient";
import { PatientList } from "./PatientList";
import { PatientProfile } from "./PatientProfile";

const patients = patientRepository.list();

export function PatientManagement() {
  const [selectedId, setSelectedId] = useState<Patient["id"]>(patients[0]?.id ?? "");
  const selectedPatient = patients.find((patient) => patient.id === selectedId) ?? patients[0];

  return (
    <div className="dashboard-content patient-management" id="patients">
      <div className="dashboard-intro"><div><p className="page-kicker">AUTODOC / patient system</p><h1>Patient management</h1><p className="page-description">Browse fictional records available to the simulation environment.</p></div><div className="system-clock"><span className="clock-dot" />REGISTRY <strong>READ-ONLY / SYNTHETIC</strong></div></div>
      <div className="patient-workspace"><PatientList patients={patients} selectedId={selectedId} onSelect={setSelectedId} />{selectedPatient ? <PatientProfile patient={selectedPatient} /> : <p className="patient-empty-state">No synthetic patients are available.</p>}</div>
    </div>
  );
}
