import type { Patient } from "@/types/patient";

export const mockPatients: Patient[] = [
  {
    id: "SIM-0017",
    name: "Elena Marlowe",
    age: 42,
    sex: "Female",
    dateOfBirth: "1984-03-18",
    bloodType: "O+",
    allergies: ["Penicillin"],
    medicalHistory: ["Seasonal asthma", "Appendectomy (2016)"],
    currentSymptoms: ["Fatigue", "Mild headache"],
    createdAt: "2026-09-18T09:20:00Z",
    updatedAt: "2026-09-20T10:15:00Z"
  },
  {
    id: "SIM-0024",
    name: "Jonas Vale",
    age: 67,
    sex: "Male",
    dateOfBirth: "1959-11-02",
    bloodType: "A-",
    allergies: [],
    medicalHistory: ["Type 2 diabetes (synthetic)", "Knee arthroscopy (2021)"],
    currentSymptoms: ["Occasional dizziness"],
    createdAt: "2026-09-17T14:05:00Z",
    updatedAt: "2026-09-19T16:42:00Z"
  },
  {
    id: "SIM-0031",
    name: "Mira Chen",
    age: 29,
    sex: "Female",
    dateOfBirth: "1997-07-24",
    bloodType: "B+",
    allergies: ["Latex", "Synthetic placeholder allergen"],
    medicalHistory: ["Migraine history"],
    currentSymptoms: ["Light sensitivity", "Nausea"],
    createdAt: "2026-09-16T11:30:00Z",
    updatedAt: "2026-09-20T08:10:00Z"
  }
];
