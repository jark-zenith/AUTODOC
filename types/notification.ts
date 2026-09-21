export type NotificationType = "SYSTEM" | "TASK" | "FOLLOW_UP" | "HEALTH_CHECK" | "ASSESSMENT" | "SAFETY" | "RESEARCH" | "MEMORY" | "FAMILY" | "SIMULATION";
export type NotificationPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";
export type NotificationStatus = "PENDING" | "SCHEDULED" | "DELIVERED" | "READ" | "DISMISSED" | "EXPIRED" | "CANCELLED" | "FAILED";
export type NotificationSource = "SYSTEM" | "TASK_MANAGER" | "FOLLOW_UP" | "ASSESSMENT" | "SAFETY_ENGINE" | "RESEARCH" | "MEMORY" | "FAMILY" | "USER" | "SIMULATION";
export type Notification = { id: string; familyId: string; memberId?: string; type: NotificationType; title: string; message: string; priority: NotificationPriority; status: NotificationStatus; source: NotificationSource; relatedTaskId?: string; relatedFollowUpId?: string; relatedAssessmentId?: string; createdAt: string; scheduledFor?: string; deliveredAt?: string; readAt?: string; expiresAt?: string; idempotencyKey?: string };
