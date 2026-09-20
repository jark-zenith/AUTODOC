import type { Symptom } from "@/types/symptom";
import type { SafetyUrgency, WarningSignal } from "./types";

const source = "AUTODOC deterministic safety rule set";
const version = "1.0.0";

type RedFlagRule = { id: string; name: string; symptoms: string[]; severity: SafetyUrgency; description: string; actionGuidance: string };

export const redFlagRules: RedFlagRule[] = [
  { id: "RF-BREATHING", name: "Severe breathing difficulty", symptoms: ["shortness of breath"], severity: "HIGH", description: "Severe breathing difficulty was identified as a safety signal.", actionGuidance: "Urgent professional evaluation may be appropriate if severe symptoms are occurring." },
  { id: "RF-CHEST-PAIN", name: "Severe chest pain", symptoms: ["chest pain"], severity: "HIGH", description: "Severe chest pain was identified as a safety signal.", actionGuidance: "Urgent professional evaluation may be appropriate if severe symptoms are occurring." },
  { id: "RF-CONSCIOUSNESS", name: "Loss of consciousness", symptoms: ["loss of consciousness"], severity: "CRITICAL", description: "Loss of consciousness was identified as a safety signal.", actionGuidance: "Seek immediate professional help if this event is occurring or has just occurred." },
  { id: "RF-CONFUSION", name: "Sudden severe confusion", symptoms: ["confusion"], severity: "HIGH", description: "Confusion was identified as a safety signal; available information is incomplete.", actionGuidance: "Prompt professional evaluation may be appropriate, especially if symptoms are sudden or severe." },
  { id: "RF-BLEEDING", name: "Uncontrolled severe bleeding", symptoms: ["severe bleeding"], severity: "CRITICAL", description: "Severe bleeding was identified as a safety signal.", actionGuidance: "Seek immediate professional help if severe bleeding is occurring." },
  { id: "RF-SEIZURE", name: "Seizure-like activity", symptoms: ["seizure-like activity"], severity: "HIGH", description: "Seizure-like activity was identified as a safety signal.", actionGuidance: "Prompt professional evaluation may be appropriate." },
  { id: "RF-WEAKNESS", name: "Sudden severe weakness", symptoms: ["sudden severe weakness"], severity: "HIGH", description: "Sudden severe weakness was identified as a safety signal.", actionGuidance: "Prompt professional evaluation may be appropriate, especially if symptoms are sudden." },
  { id: "RF-ALLERGY", name: "Possible serious allergic reaction", symptoms: ["serious allergic reaction"], severity: "HIGH", description: "A possible serious allergic reaction was identified as a safety signal.", actionGuidance: "Seek immediate professional help if severe symptoms are occurring." },
  { id: "RF-TRAUMA", name: "Severe symptoms following major trauma", symptoms: ["major trauma"], severity: "HIGH", description: "Major trauma was identified as a safety signal; the available information does not establish severity.", actionGuidance: "Prompt professional evaluation may be appropriate." }
];

const severityRank: Record<SafetyUrgency, number> = { UNKNOWN: 0, LOW: 1, MODERATE: 2, HIGH: 3, CRITICAL: 4 };

export function detectRedFlags(symptoms: Symptom[]): WarningSignal[] {
  const names = new Set(symptoms.map((symptom) => symptom.normalizedName.toLowerCase()));
  return redFlagRules.filter((rule) => rule.symptoms.some((symptom) => names.has(symptom) && (symptom === "shortness of breath" || symptom === "chest pain" ? symptoms.some((item) => item.normalizedName === symptom && (item.severity === "SEVERE" || item.notes.some((note) => /severe/i.test(note)))) : true))).map((rule) => ({ id: rule.id, name: rule.name, description: rule.description, matchedSymptoms: rule.symptoms.filter((symptom) => names.has(symptom)), severity: rule.severity, explanation: rule.description, actionGuidance: rule.actionGuidance, source, version })).sort((a, b) => severityRank[b.severity] - severityRank[a.severity]);
}

export function highestUrgency(signals: WarningSignal[]): SafetyUrgency { return signals.reduce<SafetyUrgency>((highest, signal) => severityRank[signal.severity] > severityRank[highest] ? signal.severity : highest, "LOW"); }
