import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getLinkByShortCode } from "@/data/links";
import { LinkError } from "./link-error";

export const metadata: Metadata = {
  title: "Redirecting — Snip",
  robots: { index: false },
};

export default async function ShortLinkPage({
  params,
}: PageProps<"/l/[shortCode]">) {
  const { shortCode } = await params;
  const link = await getLinkByShortCode(shortCode);

  if (!link) {
    notFound();
  }

  let destination: URL | null = null;
  try {
    destination = new URL(link.originalUrl);
  } catch {
    destination = null;
  }

  if (
    !destination ||
    (destination.protocol !== "http:" && destination.protocol !== "https:")
  ) {
    return (
      <LinkError
        code="400"
        title="Invalid destination"
        description="This short link points to an address that can't be opened safely."
      />
    );
  }

  redirect(destination.toString());
}
