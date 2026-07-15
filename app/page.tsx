import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,_#f7fbf8_0%,_#d6e7da_100%)] px-4 text-zinc-900">
      <section className="w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white/80 px-8 py-14 text-center shadow-[0_24px_80px_rgba(28,57,44,0.16)] backdrop-blur sm:px-12">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-700">
          Todo App
        </p>
        <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
          Create and manage your tasks on a dedicated route.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
          Open the todo workspace to add task names, descriptions, and keep
          everything saved in localStorage with proper unique IDs.
        </p>
        <Link
          href="/todo"
          className="mt-8 inline-flex rounded-full bg-[#173328] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#214635]"
        >
          Open Todo Page
        </Link>
      </section>
    </main>
  );
}
