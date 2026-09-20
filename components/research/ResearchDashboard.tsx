"use client";

import { useState } from "react";
import { researchEngine } from "@/lib/research";
import type { ResearchTask } from "@/types/research";
import { ResearchStepList } from "./ResearchStepList";

export function ResearchDashboard() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [version, setVersion] = useState(0);
  const researchTasks = researchEngine.listResearchTasks();
  const selected = researchTasks.find((task) => task.id === selectedId) ?? researchTasks[0];
  const plan = selected ? researchEngine.getPlan(selected.id) : undefined;
  const result = selected ? researchEngine.getResult(selected.id) : undefined;
  const proposal = selected ? researchEngine.getProposal(selected.id) : undefined;
  const refresh = () => setVersion((value) => value + 1);
  const createRequest = () => { const trimmed = query.trim(); if (!trimmed) return; const task = researchEngine.createResearchTask(trimmed); setSelectedId(task.id); setQuery(""); refresh(); };
  const executeNext = () => { if (selected) { researchEngine.executeResearchStep(selected.id); refresh(); } };
  void version;
  return <div className="dashboard-content research-content" id="research"><div className="dashboard-intro"><div><p className="page-kicker">AUTODOC / research engine</p><h1>Research operations</h1><p className="page-description">Create controlled, simulated research work without external sources.</p></div><div className="system-clock"><span className="clock-dot" />PROVIDER <strong>SIMULATED / READY</strong></div></div><section className="research-request panel"><div className="panel-heading"><div><p className="panel-eyebrow">New operation</p><h2>Research request</h2></div><span className="timeline-status">SIMULATED</span></div><div className="research-request-form"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Enter a topic, e.g. Research asthma" aria-label="Research topic" onKeyDown={(event) => { if (event.key === "Enter") createRequest(); }} /><button className="task-action-button" onClick={createRequest}>Create research task</button></div></section><div className="research-layout"><section className="research-list panel"><div className="panel-heading"><div><p className="panel-eyebrow">Operation queue</p><h2>Research operations</h2></div><span className="patient-count">{researchTasks.length.toString().padStart(2, "0")}</span></div>{researchTasks.length ? researchTasks.map((task) => <button className={`research-list-item ${selected?.id === task.id ? "is-selected" : ""}`} key={task.id} onClick={() => setSelectedId(task.id)}><span className="task-status-dot" /><span><strong>{task.query}</strong><small>{task.status} · {task.progress}%</small></span></button>) : <p className="task-empty">No research operations yet.</p>}</section><section className="research-detail panel">{selected && plan ? <><div className="panel-heading"><div><p className="panel-eyebrow">Research operation / {selected.id}</p><h2>{selected.query}</h2></div><span className="timeline-status">{selected.status}</span></div><div className="research-detail-body"><div className="research-progress-label"><span>Progress</span><strong>{selected.progress}%</strong></div><div className="research-progress"><i style={{ width: `${selected.progress}%` }} /></div><h3>Research steps</h3><ResearchStepList plan={plan} />{result ? <div className="research-result"><strong>Research result</strong><p>{result.summary}</p><div className="research-findings">{result.findings.map((finding) => <span key={finding.id}>{finding.statement}</span>)}</div>{proposal ? <small>Knowledge update proposal: {proposal.status}</small> : null}</div> : <button className="task-action-button" onClick={executeNext}>Execute next simulated step</button>}</div></> : <p className="task-empty">Create a request to begin a research operation.</p>}</section></div></div>;
}
