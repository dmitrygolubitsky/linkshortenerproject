import { ArrowLeft, Link2, LinkIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type LinkErrorProps = {
  code: string;
  title: string;
  description: string;
};

export function LinkError({ code, title, description }: LinkErrorProps) {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-6xl items-center px-6 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Link Shortener home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#38bdf8] text-slate-950">
            <Link2 className="size-5" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight">snip</span>
        </Link>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-24 text-center sm:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <LinkIcon className="size-3.5 text-[#38bdf8]" aria-hidden="true" />
          Error {code}
        </div>
        <h1 className="max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl">
          {title}
          <span className="text-[#38bdf8]">.</span>
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </p>
        <Link
          href="/"
          className={`${buttonVariants()} mt-8 bg-[#38bdf8] text-slate-950 hover:bg-[#7dd3fc]`}
        >
          <ArrowLeft aria-hidden="true" />
          Back to home
        </Link>
      </section>
    </main>
  );
}
