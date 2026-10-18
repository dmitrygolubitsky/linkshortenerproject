import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { ExternalLink, Link2 } from "lucide-react";
import { redirect } from "next/navigation";
import { getLinksByUser } from "@/data/links";
import { CopyLinkButton } from "./copy-link-button/copy-link-button";
import { CreateLinkDialog } from "./create-link-dialog/create-link-dialog";
import { DeleteLinkDialog } from "./delete-link-dialog/delete-link-dialog";
import { EditLinkDialog } from "./edit-link-dialog/edit-link-dialog";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const links = await getLinksByUser(userId);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <a href="/" className="flex items-center gap-2.5" aria-label="Snip home">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Link2 className="size-5" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold">snip</span>
          </a>
          <UserButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
        <section aria-labelledby="links-heading">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Your workspace</p>
              <h1 id="links-heading" className="mt-2 text-3xl font-semibold tracking-tight">
                Your links
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                {links.length} {links.length === 1 ? "link" : "links"}
              </p>
              <CreateLinkDialog />
            </div>
          </div>

          {links.length > 0 ? (
            <ul className="divide-y divide-border">
              {links.map((link) => (
                <li key={link.id} className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="flex items-center gap-1 text-sm font-semibold">
                      <CopyLinkButton shortCode={link.shortCode} />
                      <span className="truncate">{link.shortCode}</span>
                    </p>
                    <a
                      href={link.originalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <span className="truncate">{link.originalUrl}</span>
                      <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <time
                      dateTime={link.createdAt.toISOString()}
                      className="mr-2 text-xs text-muted-foreground"
                    >
                      Created {link.createdAt.toLocaleDateString()}
                    </time>
                    <EditLinkDialog
                      id={link.id}
                      originalUrl={link.originalUrl}
                      shortCode={link.shortCode}
                    />
                    <DeleteLinkDialog id={link.id} shortCode={link.shortCode} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-16 text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <Link2 className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-base font-semibold">No links yet</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your saved links will appear here.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}