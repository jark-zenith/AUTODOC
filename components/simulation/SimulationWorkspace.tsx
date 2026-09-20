"use client";

import { useState } from "react";
import { simulationScenarios } from "@/data/simulations/scenarios";
import { SimulationEngine } from "@/lib/simulation";
import type { SimulationScenario } from "@/lib/simulation";
import { ScenarioList } from "./ScenarioList";
import { SimulationTimeline } from "./SimulationTimeline";

const simulationEngine = new SimulationEngine(simulationScenarios);
const scenarios = simulationEngine.listScenarios();

export function SimulationWorkspace() {
  const [selectedId, setSelectedId] = useState<SimulationScenario["id"]>(scenarios[0]?.id ?? "");
  const scenario = scenarios.find((item) => item.id === selectedId) ?? scenarios[0];
  const simulation = scenario ? simulationEngine.createSimulation(scenario.id) : undefined;

  return (
    <div className="dashboard-content simulation-content" id="simulation">
      <div className="dashboard-intro"><div><p className="page-kicker">AUTODOC / simulation engine</p><h1>Simulation workspace</h1><p className="page-description">Explore fictional medical scenarios through a controlled, read-only timeline.</p></div><div className="system-clock"><span className="clock-dot" />ENGINE <strong>READY / LOCAL</strong></div></div>
      <div className="simulation-banner"><span className="simulation-banner-icon">◌</span><div><strong>Educational simulation only</strong><p>These scenarios do not represent real patients and do not generate treatment or clinical conclusions.</p></div><span className="ready-tag">READY</span></div>
      <div className="simulation-workspace"> <ScenarioList scenarios={scenarios} selectedId={selectedId} onSelect={setSelectedId} />{simulation ? <div className="simulation-detail"><section className="simulation-overview panel"><div className="panel-heading"><div><p className="panel-eyebrow">Selected scenario / {simulation.scenarioId}</p><h2>{simulation.scenarioName}</h2></div><span className="timeline-status">{simulation.status}</span></div><div className="simulation-overview-body"><p>{scenario.summary}</p><div className="simulation-facts"><div><span>Fictional patient</span><strong>{simulation.fictionalPatient.name}</strong></div><div><span>Initial condition</span><strong>{simulation.initialCondition}</strong></div><div><span>Symptoms</span><strong>{simulation.symptoms.join(" · ")}</strong></div></div></div></section><SimulationTimeline simulation={simulation} /></div> : <p className="patient-empty-state">No scenario selected.</p>}</div>
    </div>
  );
}
