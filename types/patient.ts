export type PatientSex = "Female" | "Male" | "Intersex" | "Unspecified";

export type Patient = {
  id: string;
  name: string;
  age: number;
  sex: PatientSex;
  dateOfBirth: string;
  bloodType: string;
  allergies: string[];
  medicalHistory: string[];
  currentSymptoms: string[];
  createdAt: string;
  updatedAt: string;
};
