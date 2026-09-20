export type SafetyAlert = {
  id: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  message: string;
  source: string;
  acknowledged: boolean;
  createdAt: string;
};
