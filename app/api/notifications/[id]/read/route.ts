import { NextResponse } from "next/server";
import { notificationManager } from "@/lib/notifications";
const familyId = "FAMILY-DEMO-001"; type Context = { params: Promise<{ id: string }> };
export async function POST(_request: Request, context: Context) { const { id } = await context.params; const notification = notificationManager.get(id, familyId); if (!notification) return NextResponse.json({ error: "Notification not found" }, { status: 404 }); return NextResponse.json({ notification: notificationManager.read(id, familyId, notification.memberId) }); }
