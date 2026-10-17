import { NextResponse, type NextRequest } from "next/server";
import { getLinkByShortCode } from "@/data/links";

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/l/[shortCode]">
) {
  const { shortCode } = await ctx.params;
  const link = await getLinkByShortCode(shortCode);

  if (!link) {
    return new NextResponse("Link not found", { status: 404 });
  }

  let destination: URL;
  try {
    destination = new URL(link.originalUrl);
  } catch {
    return new NextResponse("Invalid destination URL", { status: 400 });
  }

  if (destination.protocol !== "http:" && destination.protocol !== "https:") {
    return new NextResponse("Invalid destination URL", { status: 400 });
  }

  return NextResponse.redirect(destination);
}
