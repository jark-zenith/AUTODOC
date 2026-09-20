export type EmergencyEvent = {
  id: string;
  severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  warningState: "CLEAR" | "WARNING" | "ACTIVE" | "RESOLVED";
  description: string;
  recommendedAction?: string;
  emergencyContacts: string[];
  emergencyFacilities: string[];
  communicationActions: string[];
  createdAt: string;
};
