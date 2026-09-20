import type { SafetyResult } from "@/lib/medical/safety";

type SafetyObservationProps = { result: SafetyResult };

export function SafetyObservation({ result }: SafetyObservationProps) {
  return <section className="assessment-section panel"><div className="panel-heading"><div><p className="panel-eyebrow">Safety output</p><h2>Safety observations</h2></div><span className="timeline-status">{result.status}</span></div><div className="assessment-safety-body">{result.detectedSignals.length ? result.detectedSignals.map((signal) => <div className="assessment-signal" key={signal.id}><strong>{signal.name}</strong><p>{signal.explanation}</p></div>) : <p className="task-empty">No specific warning signal was identified from the information provided.</p>}<div className="assessment-urgency"><span>System urgency</span><strong>{result.urgency}</strong></div></div></section>;
}
