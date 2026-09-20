import type { Simulation } from "./simulation-model";
import type { SimulationScenario } from "./simulation-scenario";
import { formatSimulationTime } from "./simulation-timeline";

export class SimulationEngine {
  private readonly scenarios: SimulationScenario[];

  constructor(scenarios: SimulationScenario[]) {
    this.scenarios = scenarios.map((scenario) => ({ ...scenario, timelineEvents: [...scenario.timelineEvents] }));
  }

  listScenarios(): SimulationScenario[] {
    return this.scenarios.map((scenario) => ({ ...scenario, timelineEvents: [...scenario.timelineEvents] }));
  }

  createSimulation(scenarioId: SimulationScenario["id"]): Simulation | undefined {
    const scenario = this.scenarios.find((item) => item.id === scenarioId);
    if (!scenario) return undefined;

    return {
      id: `SIMULATION-${scenario.id}`,
      scenarioId: scenario.id,
      scenarioName: scenario.name,
      fictionalPatient: { ...scenario.patientState.patient },
      initialCondition: scenario.initialCondition,
      symptoms: [...scenario.patientState.symptoms],
      vitalSigns: { ...scenario.patientState.vitalSigns },
      timeline: { currentTimeMinutes: 0, durationMinutes: scenario.timelineEvents.at(-1)?.timeMinutes ?? 0, events: [...scenario.timelineEvents] },
      currentSimulationTime: 0,
      status: "READY"
    };
  }

  describeCurrentTime(simulation: Simulation): string {
    return formatSimulationTime(simulation.currentSimulationTime);
  }
}
