import type { HealthFollowUp } from "@/types/family";
import { taskManager } from "@/lib/tasks";
import type { FamilyService } from "./family-service";

export class FollowUpService {
  constructor(private readonly family: FamilyService) {}
  createFollowUp(familyId: string, input: Omit<HealthFollowUp, "id" | "createdAt" | "updatedAt" | "taskId">): HealthFollowUp | undefined {
    const now = new Date().toISOString();
    if (!this.family.getMember(familyId, input.memberId)) return undefined;
    const task = taskManager.createTask({ title: input.title, description: input.description, type: "HEALTH_FOLLOWUP", priority: "NORMAL", scheduledFor: input.scheduledFor, metadata: { memberId: input.memberId, simulated: true } });
    const followUp: HealthFollowUp = { ...input, id: `FOLLOWUP-${Date.now()}`, createdAt: now, updatedAt: now, taskId: task.id };
    return this.family.saveFollowUp(followUp);
  }
  completeFollowUp(familyId: string, followUpId: string): HealthFollowUp | undefined { return this.updateFollowUp(familyId, followUpId, "COMPLETED"); }
  cancelFollowUp(familyId: string, followUpId: string): HealthFollowUp | undefined { return this.updateFollowUp(familyId, followUpId, "CANCELLED"); }
  private updateFollowUp(_familyId: string, followUpId: string, status: HealthFollowUp["status"]): HealthFollowUp | undefined { const followUp = this.family.getMembers(_familyId).flatMap((member) => this.family.listFollowUps(member.id)).find((item) => item.id === followUpId); if (!followUp) return undefined; if (followUp.taskId) taskManager.updateTaskStatus(followUp.taskId, status === "COMPLETED" ? "COMPLETED" : "CANCELLED"); return this.family.saveFollowUp({ ...followUp, status, completedAt: status === "COMPLETED" ? new Date().toISOString() : followUp.completedAt, updatedAt: new Date().toISOString() }); }
}
