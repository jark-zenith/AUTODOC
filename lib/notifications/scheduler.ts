import { demoFamilyService } from "@/lib/family";
import type { HealthFollowUp } from "@/types/family";
import type { Notification } from "@/types/notification";
import { notificationManager } from "./notification-manager";
import { followUpNotification } from "./notification-rules";

export class NotificationScheduler {
  processOverdueFollowUps(now = new Date()): Notification[] {
    const created: Notification[] = [];
    const family = demoFamilyService.listFamilies()[0];
    if (!family) return created;

    for (const member of demoFamilyService.getMembers(family.id)) {
      for (const followUp of demoFamilyService.listFollowUps(member.id)) {
        if (
          followUp.scheduledFor &&
          new Date(followUp.scheduledFor) < now &&
          !["COMPLETED", "CANCELLED", "OVERDUE"].includes(followUp.status)
        ) {
          const overdueFollowUp: HealthFollowUp = {
            ...followUp,
            status: "OVERDUE",
            updatedAt: now.toISOString()
          };
          demoFamilyService.saveFollowUp(overdueFollowUp);
          created.push(notificationManager.create(followUpNotification(family.id, overdueFollowUp, true)));
        }
      }
    }

    return created;
  }

  processDueNotifications(now = new Date()) {
    const family = demoFamilyService.listFamilies()[0];
    if (!family) return [];
    return notificationManager
      .list(family.id)
      .filter((item) => item.status === "PENDING" && (!item.scheduledFor || new Date(item.scheduledFor) <= now))
      .map((item) => notificationManager.deliver(item.id, item.familyId, item.memberId))
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
  }
}

export const notificationScheduler = new NotificationScheduler();
