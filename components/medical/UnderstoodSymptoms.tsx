import type { Symptom } from "@/types/symptom";

type UnderstoodSymptomsProps = { symptoms: Symptom[] };

export function UnderstoodSymptoms({ symptoms }: UnderstoodSymptomsProps) {
  return <section className="assessment-section panel"><div className="panel-heading"><div><p className="panel-eyebrow">Structured data</p><h2>Understood information</h2></div><span className="timeline-status">{symptoms.length.toString().padStart(2, "0")} SYMPTOMS</span></div><div className="assessment-symptoms">{symptoms.length ? symptoms.map((symptom) => <div className="assessment-symptom" key={symptom.id}><strong>{symptom.name}</strong><span>{symptom.category} · {symptom.duration} · {symptom.severity}</span></div>) : <p className="task-empty">No structured symptoms were identified.</p>}</div></section>;
}
