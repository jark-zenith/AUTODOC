export type SimulatedPatient = {
  id: string;
  name: string;
  age: number;
  sex: "Female" | "Male" | "Intersex" | "Unspecified";
};

export type SimulatedVitalSigns = {
  heartRate: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  temperatureCelsius: number;
  bloodPressure: string;
};

export type SimulatedPatientState = {
  patient: SimulatedPatient;
  symptoms: string[];
  vitalSigns: SimulatedVitalSigns;
};
