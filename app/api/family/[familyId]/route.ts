import { NextResponse } from "next/server";
import { demoFamilyService } from "@/lib/family";
type Context = { params: Promise<{ familyId: string }> };
export async function GET(_request: Request, context: Context) { const { familyId } = await context.params; const family = demoFamilyService.getFamily(familyId); if (!family) return NextResponse.json({ error: "Family not found" }, { status: 404 }); return NextResponse.json({ family, members: demoFamilyService.getMembers(familyId), simulated: true }); }
