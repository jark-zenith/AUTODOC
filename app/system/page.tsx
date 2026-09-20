import { AppShell } from "@/components/autodoc/AppShell";
import { getSystemStatus } from "@/lib/core";

export default function SystemPage() {
  const system = getSystemStatus();
  return <AppShell activeHref="/system"><div className="dashboard-content"><div className="dashboard-intro"><div><p className="page-kicker">AUTODOC / system</p><h1>System services</h1><p className="page-description">Read-only status for registered AUTODOC software modules.</p></div><div className="system-clock"><span className="clock-dot" />ENVIRONMENT <strong>DEVELOPMENT / SIMULATION</strong></div></div><section className="panel"><div className="panel-heading"><div><p className="panel-eyebrow">Core registry</p><h2>Registered modules</h2></div><span className="timeline-status">{system.status}</span></div><div className="admin-module-list">{Object.values(system.modules).map((module) => <div key={module.id}><span className={`status-indicator ${module.status.toLowerCase()}`} /><strong>{module.name}</strong><small>{module.status} · {module.detail}</small></div>)}</div></section></div></AppShell>;
}
