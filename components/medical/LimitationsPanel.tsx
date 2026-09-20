type LimitationsPanelProps = { limitations: string[] };

export function LimitationsPanel({ limitations }: LimitationsPanelProps) {
  return <section className="assessment-section panel"><div className="panel-heading"><div><p className="panel-eyebrow">Audit boundary</p><h2>Limitations</h2></div><span className="timeline-status">TRANSPARENT</span></div><ul className="assessment-limitations">{limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul></section>;
}
