const normalizationDictionary: Record<string, string> = {
  cough: "cough",
  coughing: "cough",
  headache: "headache",
  "head hurts": "headache",
  "pain in my head": "headache",
  tired: "fatigue",
  fatigued: "fatigue",
  "feeling tired": "fatigue",
  fatigue: "fatigue",
  weak: "weakness",
  weakness: "weakness",
  fever: "fever",
  wheezing: "wheezing",
  "shortness of breath": "shortness of breath",
  breathlessness: "shortness of breath",
  "difficulty breathing": "shortness of breath",
  "severe difficulty breathing": "shortness of breath",
  "inability to breathe normally": "shortness of breath",
  nausea: "nausea",
  dizzy: "dizziness",
  dizziness: "dizziness",
  "sore throat": "sore throat",
  "runny nose": "runny nose",
  "chest pain": "chest pain",
  "loss of consciousness": "loss of consciousness",
  unconscious: "loss of consciousness",
  fainted: "loss of consciousness",
  confusion: "confusion",
  "severe bleeding": "severe bleeding",
  "uncontrolled bleeding": "severe bleeding",
  "seizure-like activity": "seizure-like activity",
  seizure: "seizure-like activity",
  "sudden severe weakness": "sudden severe weakness",
  "allergic reaction": "serious allergic reaction",
  "major trauma": "major trauma"
};

export function normalizeSymptomPhrase(phrase: string): string | undefined {
  const normalized = phrase.trim().toLowerCase().replace(/\s+/g, " ");
  return normalizationDictionary[normalized];
}

export function getNormalizationTerms(): string[] {
  return Object.keys(normalizationDictionary);
}
