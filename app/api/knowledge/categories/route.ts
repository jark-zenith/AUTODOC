import { NextResponse } from "next/server";
import { knowledgeService } from "@/lib/medical";

export function GET() {
  return NextResponse.json({ categories: knowledgeService.getCategories(), simulated: true });
}
