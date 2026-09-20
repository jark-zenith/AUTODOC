import { NextResponse } from "next/server";
import { knowledgeService } from "@/lib/medical";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const entry = knowledgeService.getKnowledgeBySlug(slug);
  if (!entry) return NextResponse.json({ error: "Knowledge entry not found" }, { status: 404 });
  return NextResponse.json({ entry, related: knowledgeService.getRelatedKnowledge(entry.id), versions: knowledgeService.getVersions(entry.id), simulated: true });
}
