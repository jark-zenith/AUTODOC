import { NextResponse } from "next/server";
import { demoFamilyService } from "@/lib/family";
const familyId = "FAMILY-DEMO-001";
export function GET() { return NextResponse.json({ followUps: demoFamilyService.getMembers(familyId).flatMap((member) => demoFamilyService.listFollowUps(member.id)), simulated: true }); }
