export type PatientProfile = {
  id: string;
  familyMemberId?: string;
  displayName: string;
  photographRef?: string;
  healthInformation: string[];
  medicalHistory: string[];
  allergies: string[];
  preferences: string[];
  emergencyInformation?: string;
  permissionIds: string[];
};
