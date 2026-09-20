import type { FamilyHealthProfile, FamilyMember, FamilyMemberPreferences } from "@/types/family";
import { InMemoryFamilyStore } from "./family-store";
import { FamilyService } from "./family-service";
import { FollowUpService } from "./follow-up-service";

const now = "2026-09-20T00:00:00.000Z";
const familyId = "FAMILY-DEMO-001";
const members: FamilyMember[] = [
  { id: "FAMILY-DEMO-001-MEMBER-001", familyId, name: "Morgan Vale", preferredName: "Morgan", age: 38, dateOfBirth: "1988-04-12", sex: "Unspecified", relationship: "OWNER", profileStatus: "ACTIVE", createdAt: now, updatedAt: now },
  { id: "FAMILY-DEMO-001-MEMBER-002", familyId, name: "Riley Vale", preferredName: "Riley", age: 12, dateOfBirth: "2014-08-19", sex: "Unspecified", relationship: "CHILD", profileStatus: "ACTIVE", createdAt: now, updatedAt: now },
  { id: "FAMILY-DEMO-001-MEMBER-003", familyId, name: "Avery Vale", preferredName: "Avery", age: 67, dateOfBirth: "1959-01-30", sex: "Unspecified", relationship: "PARENT", profileStatus: "ACTIVE", createdAt: now, updatedAt: now }
];
const health: FamilyHealthProfile[] = members.map((member) => ({ memberId: member.id, bloodType: "UNKNOWN", allergies: [], medicalHistory: [], currentConditions: [], previousProcedures: [], familyHistory: [], importantNotes: ["Fictional demo profile; no real patient information."], createdAt: now, updatedAt: now }));
const preferences: FamilyMemberPreferences[] = members.map((member) => ({ memberId: member.id, preferredName: member.preferredName, preferredLanguage: "en", communicationStyle: "STANDARD", reminderPreferences: [], explanationPreferences: [], accessibilityPreferences: [], notificationsEnabled: true, followUpNotifications: true, taskNotifications: true, safetyNotifications: true, systemNotifications: true, preferredNotificationChannel: "IN_APP" }));

export function createDemoFamilyStore() { const store = new InMemoryFamilyStore(); store.saveFamily({ id: familyId, name: "Vale Household / Demo", createdAt: now, updatedAt: now, ownerMemberId: members[0].id, settings: { memoryEnabled: true, healthFollowupsEnabled: true, notificationsEnabled: true, safetyNotificationsEnabled: true, followUpNotificationsEnabled: true, taskNotificationsEnabled: true, identityVerificationEnabled: false, defaultLanguage: "en", timezone: "UTC" }, status: "ACTIVE", memberIds: members.map((member) => member.id) }); members.forEach((member) => store.saveMember(member)); health.forEach((profile) => store.saveHealthProfile(profile)); preferences.forEach((preference) => store.savePreferences(preference)); return store; }

export { familyId, members };
export const demoFamilyService = new FamilyService(createDemoFamilyStore());
export const demoFollowUpService = new FollowUpService(demoFamilyService);
