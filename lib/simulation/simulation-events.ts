export type SimulationEventType = "OBSERVATION" | "SCENARIO_MARKER" | "SYSTEM_NOTE";

export type SimulationEvent = {
  id: string;
  timeMinutes: number;
  title: string;
  description: string;
  type: SimulationEventType;
};
