"use client";

import { useState } from "react";
import { responseService } from "@/lib/medical/response";
import type { MedicalAssessment } from "@/lib/medical/response";
import { AssessmentPanel } from "./AssessmentPanel";

export function AssessmentWorkspace() {
  const [input, setInput] = useState("I have been coughing for three days and feel tired.");
  const [assessment, setAssessment] = useState<MedicalAssessment>();
  const assess = () => { if (!input.trim()) return; setAssessment(responseService.assess({ originalInput: input.trim(), source: "USER_TEXT" })); };
  return <div className="dashboard-content assessment-content" id="assessment"><div className="dashboard-intro"><div><p className="page-kicker">AUTODOC / response layer</p><h1>AUTODOC ASSESSMENT</h1><p className="page-description">A structured educational response assembled from symptom understanding, reasoning, and safety services.</p></div><div className="system-clock"><span className="clock-dot" />ENGINE <strong>RESPONSE / READY</strong></div></div><div className="assessment-flow"><span>INPUT</span><b>↓</b><span>SYMPTOM UNDERSTANDING</span><b>↓</b><span>REASONING + SAFETY</span><b>↓</b><span>ASSESSMENT</span></div><section className="assessment-input panel"><div className="panel-heading"><div><p className="panel-eyebrow">Unified input</p><h2>Describe available information</h2></div><span className="timeline-status">EDUCATIONAL</span></div><div className="assessment-input-body"><textarea value={input} onChange={(event) => setInput(event.target.value)} aria-label="Assessment input" placeholder="Describe available symptoms" /><button className="task-action-button" onClick={assess}>Create assessment</button></div></section>{assessment ? <AssessmentPanel assessment={assessment} /> : <section className="assessment-empty panel"><span className="orbit-core">A</span><div><strong>Awaiting assessment input</strong><p>The response layer will preserve structured symptom, reasoning, and safety results.</p></div></section>}</div>;
}
