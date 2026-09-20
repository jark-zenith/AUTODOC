import { Panel } from "../ui/Panel";
import { StatusCard } from "./StatusCard";
import { getSystemStatus } from "@/lib/core";

const coreState = getSystemStatus();
const visibleModuleIds = ["CORE", "PATIENTS", "SYMPTOMS", "MEDICAL_KNOWLEDGE", "REASONING", "SAFETY", "ASSESSMENT", "FAMILY", "MEMORY", "IDENTITY", "PERMISSIONS", "AUDIT", "FOLLOWUPS", "NOTIFICATIONS", "SCHEDULER", "SIMULATION", "TASKS", "RESEARCH"] as const;
const systemModules = visibleModuleIds.map((id) => coreState.modules[id]);

export function Dashboard() {
  return (
    <div className="dashboard-content" id="dashboard">
      <div className="dashboard-intro">
        <div>
          <p className="page-kicker">AUTODOC / command interface</p>
          <h1>System overview</h1>
          <p className="page-description">A high-level view of the AUTODOC software environment.</p>
        </div>
        <div className="system-clock"><span className="clock-dot" />LOCAL SESSION <strong>20 SEP 2026 / 14:32:08 UTC</strong></div>
      </div>

      <Panel eyebrow="Environment status" title="System Status" className="system-status-panel">
        <div className="system-status-body">
          <div className="system-status-orbit"><span className="orbit-ring" /><span className="orbit-core">A</span></div>
          <div className="system-status-copy"><span className="system-status-label">SYSTEM {coreState.status}</span><p>Core services are being prepared for the simulation environment.</p></div>
          <div className="system-status-metrics"><div><span>UPTIME</span><strong>00:00:00</strong></div><div><span>VERSION</span><strong>0.1.0</strong></div><div><span>MODE</span><strong>LOCAL</strong></div></div>
        </div>
      </Panel>

      <Panel eyebrow="Subsystem monitor" title="AUTODOC modules" className="modules-panel">
        <div className="module-grid">
          {systemModules.map((module) => <StatusCard key={module.id} title={module.name} description={module.description} status={module.status} detail={module.detail} />)}
        </div>
      </Panel>

      <div className="dashboard-lower-grid">
        <Panel eyebrow="Environment boundary" title="Safety posture">
          <div className="safety-posture"><span className="safety-shield">◇</span><div><strong>Simulation only</strong><p>Real-world actions, patient diagnosis, prescribing, and device control are unavailable.</p></div><span className="ready-tag">ACTIVE</span></div>
        </Panel>
        <Panel eyebrow="Runtime information" title="System information">
          <dl className="system-information"><div><dt>Environment</dt><dd>Development</dd></div><div><dt>Data source</dt><dd>None connected</dd></div><div><dt>Core status</dt><dd className="text-amber">{coreState.status}</dd></div></dl>
        </Panel>
      </div>
    </div>
  );
}
