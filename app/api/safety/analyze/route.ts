import { NextResponse } from "next/server";
import { safetyService } from "@/lib/medical/safety";
import type { SafetyRequest } from "@/lib/medical/safety";
import type { Symptom } from "@/types/symptom";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { requestId?: unknown; patientId?: unknown; symptoms?: unknown; context?: unknown; source?: unknown } | null;
  if (!body || !Array.isArray(body.symptoms)) return NextResponse.json({ error: "symptoms must be an array" }, { status: 400 });
  const symptoms = body.symptoms as Symptom[];
  if (symptoms.some((symptom) => !symptom || typeof symptom.normalizedName !== "string")) return NextResponse.json({ error: "symptoms must contain structured symptom records" }, { status: 400 });
  const allowedSources = ["USER_TEXT", "VOICE", "SIMULATION", "SYSTEM"] as const;
  const source = allowedSources.includes(body.source as typeof allowedSources[number]) ? body.source as typeof allowedSources[number] : "USER_TEXT";
  const safetyRequest: SafetyRequest = { requestId: typeof body.requestId === "string" ? body.requestId : `SAFETY-${Date.now()}`, patientId: typeof body.patientId === "string" ? body.patientId : undefined, symptoms, context: typeof body.context === "object" && body.context ? body.context as SafetyRequest["context"] : undefined, source, createdAt: new Date().toISOString() };
  return NextResponse.json(safetyService.analyze(safetyRequest));
}
