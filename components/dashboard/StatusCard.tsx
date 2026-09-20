import type { SystemModuleStatus } from "@/lib/core";

type StatusTone = Lowercase<SystemModuleStatus>;

type StatusCardProps = {
  title: string;
  description: string;
  status: SystemModuleStatus;
  detail: string;
};

const statusLabels: Record<SystemModuleStatus, string> = {
  INITIALIZING: "INITIALIZING",
  OFFLINE: "OFFLINE",
  READY: "READY",
  ERROR: "ERROR"
};

export function StatusCard({ title, description, status, detail }: StatusCardProps) {
  const statusTone = status.toLowerCase() as StatusTone;

  return (
    <article className="status-card">
      <div className="status-card-topline">
        <span className={`status-indicator ${statusTone}`} aria-hidden="true" />
        <span className={`status-label ${statusTone}`}>{statusLabels[status]}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="status-card-detail"><span>{detail}</span><span aria-hidden="true">↗</span></div>
    </article>
  );
}
