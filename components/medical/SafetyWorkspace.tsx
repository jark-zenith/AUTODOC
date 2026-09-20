"use client";

import { useState } from "react";
import { safetyService } from "@/lib/medical/safety";
import { symptomUnderstandingEngine } from "@/lib/medical/symptoms";
import type { SafetyResult } from "@/lib/medical/safety";
import { SafetyStatus } from "./SafetyStatus";
import { SafetySummary } from "./SafetySummary";
import { UrgencyIndicator } from "./UrgencyIndicator";

export function SafetyWorkspace() {
  const [input, setInput] = useState("I have severe difficulty breathing.");
  const [result, setResult] = useState<SafetyResult>();
  const analyze = () => { if (!input.trim()) return; const symptomResult = symptomUnderstandingEngine.analyze({ freeText: input.trim(), source: "USER_TEXT", reportedAt: new Date().toISOString() }); setResult(safetyService.analyze({ requestId: `SAFETY-${Date.now()}`, symptoms: symptomResult.extractedSymptoms, source: "USER_TEXT", createdAt: new Date().toISOString() })); };
  return <div className="dashboard-content safety-content" id="safety"><div className="dashboard-intro"><div><p className="page-kicker">AUTODOC / safety engine</p><h1>SAFETY ENGINE</h1><p className="page-description">Identify defined warning signals in available information without making a diagnosis.</p></div><div className="system-clock"><span className="clock-dot" />ENGINE <strong>DETERMINISTIC / READY</strong></div></div><div className="safety-disclaimer"><span>!</span><p>Safety classifications are system signals, not clinically validated emergency predictions. This engine does not contact emergency services or provide treatment.</p></div><section className="safety-input panel"><div className="panel-heading"><div><p className="panel-eyebrow">Input</p><h2>Available symptom information</h2></div><span className="timeline-status">USER TEXT</span></div><div className="safety-input-body"><textarea value={input} onChange={(event) => setInput(event.target.value)} aria-label="Safety symptom input" placeholder="Describe available symptoms" /><button className="task-action-button" onClick={analyze}>Run safety analysis</button></div></section>{result ? <><SafetyStatus result={result} /><UrgencyIndicator urgency={result.urgency} /><SafetySummary result={result} /></> : <section className="safety-empty panel"><span className="safety-shield">◇</span><div><strong>Awaiting safety input</strong><p>Enter available symptom information to check defined warning signals.</p></div></section>}</div>;
}
