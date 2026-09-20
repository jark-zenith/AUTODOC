import type { PossibleExplanation } from "@/lib/medical/reasoning";

type ReasoningCardProps = { explanation: PossibleExplanation };

export function ReasoningCard({ explanation }: ReasoningCardProps) {
  return <article className="reasoning-card"><div className="reasoning-card-header"><div><span className="reasoning-label">POSSIBLE EXPLANATION</span><h3>{explanation.title}</h3></div><div className="information-match"><strong>{Math.round(explanation.informationMatch * 100)}%</strong><small>Information Match</small></div></div><p className="reasoning-explanation">{explanation.explanation}</p><div className="reasoning-evidence"><section><h4>Matched symptoms</h4><p>{explanation.matchedSymptoms.join(" · ")}</p></section><section><h4>Supporting evidence</h4><ul>{explanation.supportingEvidence.map((evidence) => <li key={evidence}>{evidence}</li>)}</ul></section>{explanation.unmatchedRelevantSymptoms.length ? <section><h4>Not included in available information</h4><p>{explanation.unmatchedRelevantSymptoms.join(" · ")}</p></section> : null}</div><p className="reasoning-card-limitations">{explanation.limitations[0]}</p></article>;
}
