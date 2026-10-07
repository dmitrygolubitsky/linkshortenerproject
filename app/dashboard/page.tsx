import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Link Shortener
          </p>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        <div className="rounded-full border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <UserButton />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 items-start px-6 py-20 sm:px-8 lg:px-10">
        <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
      </main>
    </div>
  );
}