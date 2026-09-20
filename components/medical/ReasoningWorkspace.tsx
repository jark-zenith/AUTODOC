"use client";

import { useState } from "react";
import { reasoningService } from "@/lib/medical/reasoning";
import { symptomUnderstandingEngine } from "@/lib/medical/symptoms";
import type { ReasoningResult } from "@/lib/medical/reasoning";
import { ReasoningResultView } from "./ReasoningResultView";

export function ReasoningWorkspace() {
  const [input, setInput] = useState("I have been coughing for three days and feel tired.");
  const [result, setResult] = useState<ReasoningResult>();
  const [analyzedSymptoms, setAnalyzedSymptoms] = useState<string[]>([]);
  const analyze = () => { if (!input.trim()) return; const symptomResult = symptomUnderstandingEngine.analyze({ freeText: input.trim(), source: "USER_TEXT", reportedAt: new Date().toISOString() }); setAnalyzedSymptoms(symptomResult.extractedSymptoms.map((symptom) => symptom.name)); setResult(reasoningService.analyze({ requestId: `REASONING-${Date.now()}`, symptoms: symptomResult.extractedSymptoms, createdAt: new Date().toISOString() })); };
  return <div className="dashboard-content reasoning-content" id="reasoning"><div className="dashboard-intro"><div><p className="page-kicker">AUTODOC / reasoning engine</p><h1>AUTODOC REASONING</h1><p className="page-description">Compare structured symptoms with educational knowledge entries using transparent deterministic matching.</p></div><div className="system-clock"><span className="clock-dot" />ENGINE <strong>DETERMINISTIC / READY</strong></div></div><div className="reasoning-flow"><span>Input</span><b>↓</b><span>Symptom understanding</span><b>↓</b><span>Knowledge matching</span><b>↓</b><span>Possible explanations</span></div><section className="reasoning-input panel"><div className="panel-heading"><div><p className="panel-eyebrow">Input layer</p><h2>Describe available symptoms</h2></div><span className="timeline-status">NO DIAGNOSIS</span></div><div className="reasoning-input-body"><textarea value={input} onChange={(event) => setInput(event.target.value)} aria-label="Reasoning symptom input" placeholder="Describe symptoms in plain language" /><button className="task-action-button" onClick={analyze}>Run reasoning</button></div>{analyzedSymptoms.length ? <div className="reasoning-understood"><span>STRUCTURED SYMPTOMS</span><strong>{analyzedSymptoms.join(" · ")}</strong></div> : null}</section>{result ? <ReasoningResultView result={result} /> : <section className="reasoning-empty panel"><span className="orbit-core">A</span><div><strong>Awaiting structured symptom input</strong><p>Run the deterministic analysis to see educational information matches.</p></div></section>}</div>;
}
