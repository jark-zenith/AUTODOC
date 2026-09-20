import type { SimulationEvent } from "./simulation-events";
import type { SimulatedPatientState } from "./simulated-patient-state";

export type SimulationScenario = {
  id: string;
  name: string;
  summary: string;
  initialCondition: string;
  patientState: SimulatedPatientState;
  timelineEvents: SimulationEvent[];
};
