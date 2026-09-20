import type { PossibleExplanation } from "@/lib/medical/reasoning";

type PossibleExplanationListProps = { explanations: PossibleExplanation[] };

export function PossibleExplanationList({ explanations }: PossibleExplanationListProps) {
  return <section className="assessment-section panel"><div className="panel-heading"><div><p className="panel-eyebrow">Reasoning output</p><h2>Possible explanations</h2></div><span className="timeline-status">INFORMATION MATCH</span></div><div className="assessment-explanations">{explanations.length ? explanations.map((explanation) => <article key={explanation.knowledgeId}><div><strong>{explanation.title}</strong><span>{Math.round(explanation.informationMatch * 100)}% Information Match</span></div><p>{explanation.explanation}</p><small>Matched: {explanation.matchedSymptoms.join(" · ")}</small></article>) : <p className="task-empty">No meaningful information matches were found.</p>}</div></section>;
}
