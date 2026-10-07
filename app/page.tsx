import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Link Shortener
          </p>
          <h1 className="text-lg font-semibold">Clerk authentication is ready</h1>
        </div>
        <nav className="flex items-center gap-3">
          <SignInButton mode="modal">
            <Button variant="outline" size="default">
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="default">Sign up</Button>
          </SignUpButton>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 lg:grid-cols-[1.4fr_0.9fr] lg:p-12">
          <section className="space-y-6">
            <span className="inline-flex rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
              Secure sign-in, sign-up, and account controls
            </span>
            <div className="space-y-4">
              <h2 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Ship your link shortener with Clerk accounts from the start.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
                You can now sign in, sign up, and manage the current user from
                the navigation bar. The auth flow is linked to your Clerk app
                and ready for testing.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <SignUpButton mode="modal">
                <Button size="lg">Create your first account</Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button variant="outline" size="lg">
                  I already have an account
                </Button>
              </SignInButton>
            </div>
          </section>

          <aside className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              What to test
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              <li>• Open the sign-up modal from the nav.</li>
              <li>• Create a new account or sign in to an existing one.</li>
              <li>• Confirm the user avatar appears once authenticated.</li>
              <li>• Use the user menu to sign out.</li>
            </ul>
          </aside>
        </div>
      </main>
    </div>
  );
}
