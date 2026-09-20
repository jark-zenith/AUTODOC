import { NextResponse } from "next/server";
import { responseService } from "@/lib/medical/response";
import type { AssessmentRequest } from "@/lib/medical/response";
import type { Symptom, SymptomInputSource } from "@/types/symptom";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { assessmentId?: unknown; patientId?: unknown; originalInput?: unknown; freeText?: unknown; symptoms?: unknown; source?: unknown; context?: unknown } | null;
  if (!body || (typeof body.originalInput !== "string" && typeof body.freeText !== "string")) return NextResponse.json({ error: "originalInput or freeText is required" }, { status: 400 });
  if (body.symptoms !== undefined && !Array.isArray(body.symptoms)) return NextResponse.json({ error: "symptoms must be an array when provided" }, { status: 400 });
  const symptoms = body.symptoms as Symptom[] | undefined;
  if (symptoms?.some((symptom) => !symptom || typeof symptom.normalizedName !== "string")) return NextResponse.json({ error: "symptoms must contain structured symptom records" }, { status: 400 });
  const allowedSources: SymptomInputSource[] = ["USER_TEXT", "VOICE", "SIMULATION", "SYSTEM"];
  const source = allowedSources.includes(body.source as SymptomInputSource) ? body.source as SymptomInputSource : "USER_TEXT";
  const assessmentRequest: AssessmentRequest = { assessmentId: typeof body.assessmentId === "string" ? body.assessmentId : undefined, patientId: typeof body.patientId === "string" ? body.patientId : undefined, originalInput: typeof body.originalInput === "string" ? body.originalInput : body.freeText as string, symptoms, source, context: typeof body.context === "object" && body.context ? body.context as AssessmentRequest["context"] : undefined };
  return NextResponse.json(responseService.assess(assessmentRequest));
}
