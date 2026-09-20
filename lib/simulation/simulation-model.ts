import type { SimulationScenario } from "./simulation-scenario";
import type { SimulationStatus } from "./simulation-status";
import type { SimulationTimeline } from "./simulation-timeline";
import type { SimulatedPatientState } from "./simulated-patient-state";

export type Simulation = {
  id: string;
  scenarioId: SimulationScenario["id"];
  scenarioName: string;
  fictionalPatient: SimulatedPatientState["patient"];
  initialCondition: string;
  symptoms: string[];
  vitalSigns: SimulatedPatientState["vitalSigns"];
  timeline: SimulationTimeline;
  currentSimulationTime: number;
  status: SimulationStatus;
};
