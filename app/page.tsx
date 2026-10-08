import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Link2,
  MousePointer2,
  Sparkles,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Link2,
    title: "Short links, instantly",
    description:
      "Turn long, messy URLs into short links that are easy to remember and share.",
  },
  {
    icon: BarChart3,
    title: "A clear view of your links",
    description:
      "Keep your links together in one simple dashboard, ready whenever you need them.",
  },
  {
    icon: MousePointer2,
    title: "Made for sharing",
    description:
      "Give every campaign, project, and favorite page a link that feels good to pass along.",
  },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <a href="/" className="flex items-center gap-2.5" aria-label="Link Shortener home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-lime-300 text-zinc-950">
            <Link2 className="size-5" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight">snip</span>
        </a>
        <nav aria-label="Main navigation" className="flex items-center gap-3">
          <SignInButton mode="modal">
            <Button variant="ghost">Sign in</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="bg-lime-300 text-zinc-950 hover:bg-lime-200">
              Get started
              <ArrowUpRight aria-hidden="true" />
            </Button>
          </SignUpButton>
        </nav>
      </header>

      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 pb-24 pt-16 sm:px-8 md:pb-32 md:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-lime-300" aria-hidden="true" />
            A little link goes a long way
          </div>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Make your links
            <span className="text-lime-300"> work harder.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Clean up long URLs, keep everything organized, and share links that
            are easy to remember. All from one simple place.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="h-12 rounded-xl bg-lime-300 px-6 text-zinc-950 hover:bg-lime-200"
              >
                Create your free account
                <ArrowRight aria-hidden="true" />
              </Button>
            </SignUpButton>
            <span className="text-sm text-muted-foreground">
              Simple links. Less fuss.
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div
            aria-hidden="true"
            className="absolute -inset-10 rounded-full bg-lime-300/10 blur-3xl"
          />
          <div className="relative rounded-3xl border border-border bg-card p-5 shadow-2xl shadow-black/20 sm:p-7">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div>
                <p className="text-sm font-medium">Your link, simplified</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Long URL → share-ready link
                </p>
              </div>
              <span className="rounded-full border border-lime-300/20 bg-lime-300/10 px-2.5 py-1 text-xs font-medium text-lime-300">
                READY TO SHARE
              </span>
            </div>
            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Your original link
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  example.com/articles/a-very-long-link-to-share
                </p>
              </div>
              <div className="flex justify-center text-lime-300">
                <ArrowRight className="size-4 rotate-90" aria-hidden="true" />
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-lime-300/30 bg-lime-300/5 p-4">
                <div className="min-w-0">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-lime-300">
                    Your short link
                  </p>
                  <p className="truncate text-sm font-semibold">
                    snip.link/your-link
                  </p>
                </div>
                <Link2
                  className="size-5 shrink-0 text-lime-300"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-lime-300" />
              Short, tidy, ready to go
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-y border-border bg-card/40 py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-lime-300">THE GOOD STUFF</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to make links simpler.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Spend less time wrangling URLs and more time getting your ideas
              out there.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-border bg-background p-6 sm:p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-lime-300/10 text-lime-300">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 px-6 py-20 sm:px-8 sm:py-24 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-lime-300">READY WHEN YOU ARE</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Your next great link starts here.
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Create an account and make sharing the easy part.
          </p>
        </div>
        <SignUpButton mode="modal">
          <Button
            size="lg"
            className="h-12 shrink-0 rounded-xl bg-lime-300 px-6 text-zinc-950 hover:bg-lime-200"
          >
            Get started for free
            <ArrowRight aria-hidden="true" />
          </Button>
        </SignUpButton>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <a href="/" className="font-semibold text-foreground">
            snip
          </a>
          <p>Short links for wherever life takes you.</p>
        </div>
      </footer>
    </main>
  );
}
