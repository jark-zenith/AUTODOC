import { AppShell } from "@/components/autodoc/AppShell";
import { MemberProfile } from "@/components/family/MemberProfile";
type Context = { params: Promise<{ memberId: string }> };
export default async function MemberPage({ params }: Context) { const { memberId } = await params; return <AppShell activeHref="/family"><MemberProfile memberId={memberId} /></AppShell>; }
