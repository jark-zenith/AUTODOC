import type { SafetyUrgency } from "@/lib/medical/safety";

type UrgencyIndicatorProps = { urgency: SafetyUrgency };

export function UrgencyIndicator({ urgency }: UrgencyIndicatorProps) {
  return <div className={`urgency-indicator ${urgency.toLowerCase()}`}><span className="urgency-indicator-icon">!</span><div><span>URGENCY CLASSIFICATION</span><strong>{urgency}</strong><small>System classification only; not a clinically validated prediction.</small></div></div>;
}
