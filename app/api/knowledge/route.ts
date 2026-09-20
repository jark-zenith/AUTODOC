import { NextResponse } from "next/server";
import { knowledgeService } from "@/lib/medical";
import type { KnowledgeCategory } from "@/types/medical";

export function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";
  const category = url.searchParams.get("category") as KnowledgeCategory | null;
  const entries = category ? knowledgeService.getKnowledgeByCategory(category) : knowledgeService.searchKnowledge(query);
  return NextResponse.json({ entries, count: entries.length, simulated: true });
}
