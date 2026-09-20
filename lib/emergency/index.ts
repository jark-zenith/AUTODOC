export type EmergencyServiceStatus = "NOT_CONFIGURED" | "SIMULATION_ONLY";

export interface EmergencyService {
  getStatus(): EmergencyServiceStatus;
  prepareEvent(eventId: string): { status: EmergencyServiceStatus; eventId: string };
}

export class StubEmergencyService implements EmergencyService {
  getStatus(): EmergencyServiceStatus { return "NOT_CONFIGURED"; }
  prepareEvent(eventId: string) { return { status: this.getStatus(), eventId }; }
}

export const emergencyService = new StubEmergencyService();
