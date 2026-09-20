import type { SafetyResult } from "@/lib/medical/safety";

type SafetyStatusProps = { result: SafetyResult };

export function SafetyStatus({ result }: SafetyStatusProps) {
  return <div className={`safety-status-card ${result.status.toLowerCase()}`}><div className="safety-status-orb" /><div><span className="safety-status-kicker">SYSTEM STATUS</span><strong>{result.status.replace("_", " ")}</strong><p>{result.status === "CLEAR" ? "No defined warning signal was identified in the available information." : "Potential warning signal detected. Review the available information carefully."}</p></div><div className="urgency-pill">{result.urgency}<small>System urgency</small></div></div>;
}
