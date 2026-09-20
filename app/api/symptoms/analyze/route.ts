import { NextResponse } from "next/server";
import { symptomUnderstandingEngine } from "@/lib/medical/symptoms";
import type { SymptomInputSource } from "@/types/symptom";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { freeText?: unknown; patientId?: unknown; reportedAt?: unknown; source?: unknown } | null;
  if (!body || typeof body.freeText !== "string" || !body.freeText.trim()) return NextResponse.json({ error: "freeText is required" }, { status: 400 });
  const allowedSources: SymptomInputSource[] = ["USER_TEXT", "VOICE", "SIMULATION", "SYSTEM"];
  const source = allowedSources.includes(body.source as SymptomInputSource) ? body.source as SymptomInputSource : "USER_TEXT";
  const result = symptomUnderstandingEngine.analyze({ freeText: body.freeText, patientId: typeof body.patientId === "string" ? body.patientId : undefined, reportedAt: typeof body.reportedAt === "string" ? body.reportedAt : new Date().toISOString(), source });
  return NextResponse.json(result);
}
