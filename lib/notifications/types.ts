import type { Notification } from "@/types/notification";
export type NotificationDeliveryResult = { status: "DELIVERED" | "NOT_CONFIGURED" | "FAILED"; notificationId: string; reason: string };
export interface NotificationProvider { send(notification: Notification): NotificationDeliveryResult; cancel(notificationId: string): NotificationDeliveryResult; getStatus(): "READY" | "NOT_CONFIGURED"; }
