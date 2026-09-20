import type { SimulationScenario } from "@/lib/simulation";

type ScenarioListProps = { scenarios: SimulationScenario[]; selectedId: string; onSelect: (id: string) => void };

export function ScenarioList({ scenarios, selectedId, onSelect }: ScenarioListProps) {
  return (
    <section className="scenario-list-panel panel" aria-labelledby="scenario-list-title">
      <div className="panel-heading"><div><p className="panel-eyebrow">Development library</p><h2 id="scenario-list-title">Scenarios <span className="patient-count">{scenarios.length.toString().padStart(2, "0")}</span></h2></div><span className="panel-corner" aria-hidden="true" /></div>
      <div className="scenario-list">{scenarios.map((scenario) => <button className={`scenario-card ${scenario.id === selectedId ? "is-selected" : ""}`} key={scenario.id} onClick={() => onSelect(scenario.id)} aria-pressed={scenario.id === selectedId}><span className="scenario-card-marker" /><span><strong>{scenario.name}</strong><small>{scenario.id}</small></span><span className="patient-card-arrow" aria-hidden="true">→</span></button>)}</div>
      <p className="patient-list-footnote">All scenarios are fictional development fixtures.</p>
    </section>
  );
}
