import { formatSimulationTime, type Simulation } from "@/lib/simulation";

type SimulationTimelineProps = { simulation: Simulation };

export function SimulationTimeline({ simulation }: SimulationTimelineProps) {
  return (
    <section className="simulation-timeline panel" aria-labelledby="timeline-title">
      <div className="panel-heading"><div><p className="panel-eyebrow">Scenario progression</p><h2 id="timeline-title">Simulation timeline</h2></div><span className="timeline-status">{simulation.status}</span></div>
      <div className="timeline-summary"><div><span>Current time</span><strong>{formatSimulationTime(simulation.currentSimulationTime)}</strong></div><div><span>Duration</span><strong>{formatSimulationTime(simulation.timeline.durationMinutes)}</strong></div><div><span>Events</span><strong>{simulation.timeline.events.length.toString().padStart(2, "0")}</strong></div></div>
      <div className="timeline-events">{simulation.timeline.events.map((event) => <div className="timeline-event" key={event.id}><div className="timeline-marker" /><div className="timeline-event-time">{formatSimulationTime(event.timeMinutes)}</div><div className="timeline-event-copy"><strong>{event.title}</strong><p>{event.description}</p><span>{event.type.replace("_", " ")}</span></div></div>)}</div>
      <p className="timeline-disclaimer">Timeline playback is not connected to treatment, devices, or external systems.</p>
    </section>
  );
}
