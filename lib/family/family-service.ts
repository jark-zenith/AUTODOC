import type { Family, FamilyHealthProfile, FamilyMember, FamilyMemberPreferences, FamilySettings, HealthFollowUp, HealthHistoryEvent } from "@/types/family";
import type { Patient } from "@/types/patient";
import { InMemoryFamilyStore, type FamilyStore } from "./family-store";

const defaultSettings: FamilySettings = { memoryEnabled: true, healthFollowupsEnabled: true, notificationsEnabled: true, safetyNotificationsEnabled: true, followUpNotificationsEnabled: true, taskNotificationsEnabled: true, identityVerificationEnabled: false, defaultLanguage: "en", timezone: "UTC" };

export class FamilyService {
  constructor(private readonly store: FamilyStore = new InMemoryFamilyStore()) {}
  listFamilies() { return this.store.listFamilies(); }
  getFamily(id: string) { return this.store.getFamily(id); }
  createFamily(name: string, owner: Omit<FamilyMember, "id" | "familyId" | "createdAt" | "updatedAt">): Family { const now = new Date().toISOString(); const familyId = `FAMILY-${Date.now()}`; const memberId = `${familyId}-MEMBER-001`; const family: Family = { id: familyId, name, createdAt: now, updatedAt: now, ownerMemberId: memberId, settings: { ...defaultSettings }, status: "ACTIVE", memberIds: [memberId] }; this.store.saveFamily(family); this.store.saveMember({ ...owner, id: memberId, familyId, relationship: "OWNER", createdAt: now, updatedAt: now }); return family; }
  getMembers(familyId: string) { return this.store.listMembers(familyId); }
  getMember(familyId: string, memberId: string) { return this.store.getMember(familyId, memberId); }
  addMember(familyId: string, member: Omit<FamilyMember, "id" | "familyId" | "createdAt" | "updatedAt">) { const family = this.getFamily(familyId); if (!family) return undefined; const now = new Date().toISOString(); const created = { ...member, id: `${familyId}-MEMBER-${String(family.memberIds.length + 1).padStart(3, "0")}`, familyId, createdAt: now, updatedAt: now }; this.store.saveMember(created); this.store.saveFamily({ ...family, memberIds: [...family.memberIds, created.id], updatedAt: now }); return created; }
  updateMember(familyId: string, memberId: string, patch: Partial<FamilyMember>) { const member = this.getMember(familyId, memberId); if (!member) return undefined; return this.store.saveMember({ ...member, ...patch, id: member.id, familyId: member.familyId, updatedAt: new Date().toISOString() }); }
  archiveMember(familyId: string, memberId: string) { return this.updateMember(familyId, memberId, { profileStatus: "ARCHIVED" }); }
  getHealthProfile(memberId: string) { return this.store.getHealthProfile(memberId); }
  saveHealthProfile(profile: FamilyHealthProfile) { return this.store.saveHealthProfile(profile); }
  getPreferences(memberId: string) { return this.store.getPreferences(memberId); }
  savePreferences(preferences: FamilyMemberPreferences) { return this.store.savePreferences(preferences); }
  listHistory(memberId: string) { return this.store.listHistory(memberId); }
  recordHistory(event: HealthHistoryEvent) { return this.store.saveHistory(event); }
  listFollowUps(memberId: string) { return this.store.listFollowUps(memberId); }
  saveFollowUp(followUp: HealthFollowUp) { return this.store.saveFollowUp(followUp); }
  toPatient(member: FamilyMember, profile: FamilyHealthProfile): Patient { return { id: member.id, name: member.name, age: member.age, sex: member.sex, dateOfBirth: member.dateOfBirth, bloodType: profile.bloodType ?? "UNKNOWN", allergies: [...profile.allergies], medicalHistory: [...profile.medicalHistory], currentSymptoms: [], createdAt: member.createdAt, updatedAt: member.updatedAt }; }
}

export { defaultSettings };
