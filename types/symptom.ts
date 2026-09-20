export type SymptomSeverity = "MILD" | "MODERATE" | "SEVERE" | "UNKNOWN";
export type SymptomOnset = "SUDDEN" | "GRADUAL" | "UNKNOWN";
export type SymptomInputSource = "USER_TEXT" | "VOICE" | "SIMULATION" | "SYSTEM";
export type SymptomCategory = "RESPIRATORY" | "NEUROLOGICAL" | "GASTROINTESTINAL" | "CARDIOVASCULAR" | "GENERAL" | "PAIN" | "SKIN" | "MUSCULOSKELETAL" | "OTHER";

export type Symptom = {
  id: string;
  name: string;
  normalizedName: string;
  category: SymptomCategory;
  description: string;
  severity: SymptomSeverity;
  duration: string;
  onset: SymptomOnset;
  frequency: string;
  location: string;
  associatedSymptoms: string[];
  triggers: string[];
  notes: string[];
  confidence: number;
};

export type SymptomInput = {
  freeText: string;
  patientId?: string;
  reportedAt?: string;
  source: SymptomInputSource;
};

export type SymptomAnalysisResult = {
  originalInput: SymptomInput;
  extractedSymptoms: Symptom[];
  unrecognizedTerms: string[];
  confidence: number;
  analyzedAt: string;
  warnings: string[];
  relatedKnowledgeIds: string[];
};
