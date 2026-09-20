import { NextResponse } from "next/server";
import { reasoningService } from "@/lib/medical/reasoning";
import type { ReasoningContext, ReasoningRequest } from "@/lib/medical/reasoning";
import type { Symptom } from "@/types/symptom";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { requestId?: unknown; patientId?: unknown; symptoms?: unknown; context?: unknown } | null;
  if (!body || !Array.isArray(body.symptoms)) return NextResponse.json({ error: "symptoms must be an array" }, { status: 400 });
  const symptoms = body.symptoms as Symptom[];
  if (symptoms.some((symptom) => !symptom || typeof symptom.normalizedName !== "string")) return NextResponse.json({ error: "symptoms must contain structured symptom records" }, { status: 400 });
  const reasoningRequest: ReasoningRequest = { requestId: typeof body.requestId === "string" ? body.requestId : `REASONING-${Date.now()}`, patientId: typeof body.patientId === "string" ? body.patientId : undefined, symptoms, context: body.context as ReasoningContext | undefined, createdAt: new Date().toISOString() };
  return NextResponse.json(reasoningService.analyze(reasoningRequest));
}
