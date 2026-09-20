import type { WarningSignal } from "@/lib/medical/safety";

type WarningSignalCardProps = { signal: WarningSignal };

export function WarningSignalCard({ signal }: WarningSignalCardProps) {
  return <article className="warning-signal-card"><div className="warning-signal-heading"><div><span className="warning-signal-label">POTENTIAL WARNING SIGNAL</span><h3>{signal.name}</h3></div><span className="urgency-pill">{signal.severity}</span></div><dl><div><dt>Matched information</dt><dd>{signal.matchedSymptoms.join(" · ")}</dd></div><div><dt>Why attention may be needed</dt><dd>{signal.explanation}</dd></div><div><dt>Next step</dt><dd>{signal.actionGuidance}</dd></div></dl><small>Rule set {signal.version} · {signal.source}</small></article>;
}
