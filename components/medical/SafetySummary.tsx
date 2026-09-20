import type { SafetyResult } from "@/lib/medical/safety";
import { WarningSignalCard } from "./WarningSignalCard";

type SafetySummaryProps = { result: SafetyResult };

export function SafetySummary({ result }: SafetySummaryProps) {
  return <div className="safety-summary"><section className="panel"><div className="panel-heading"><div><p className="panel-eyebrow">Detected signals</p><h2>Safety analysis</h2></div><span className="timeline-status">{result.method}</span></div><div className="safety-signals">{result.detectedSignals.length ? result.detectedSignals.map((signal) => <WarningSignalCard key={signal.id} signal={signal} />) : <p className="task-empty">No defined warning signals detected in the available information.</p>}</div></section><section className="panel safety-limitations"><div className="panel-heading"><div><p className="panel-eyebrow">Response boundary</p><h2>Next step and limitations</h2></div></div><div className="safety-summary-body"><h3>Recommended next step</h3><p>{result.recommendedNextStep}</p><h3>Limitations</h3><ul>{result.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul></div></section></div>;
}
