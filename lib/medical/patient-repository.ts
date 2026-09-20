import { mockPatients } from "./mock-patients";
import type { Patient } from "@/types/patient";

export interface PatientRepository {
  list(): Patient[];
  getById(id: Patient["id"]): Patient | undefined;
}

export function createMockPatientRepository(): PatientRepository {
  return {
    list: () => mockPatients.map((patient) => ({ ...patient })),
    getById: (id) => {
      const patient = mockPatients.find((item) => item.id === id);
      return patient ? { ...patient } : undefined;
    }
  };
}

export const patientRepository = createMockPatientRepository();
