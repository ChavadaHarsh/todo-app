import Link from "next/link";

type TodoShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

const navItems = [
  { href: "/todo", label: "Overview" },
  { href: "/todo/new", label: "Add Todo" },
  { href: "/todo/list", label: "Todo List" },
];

export function TodoShell({
  eyebrow,
  title,
  description,
  children,
}: TodoShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff,_#e4efe7_40%,_#cddfd1_100%)] px-4 py-8 text-zinc-900 sm:px-6">
      <section className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_24px_80px_rgba(28,57,44,0.16)] backdrop-blur">
        <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
          <aside className="bg-[#173328] px-8 py-10 text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-200">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              {title}
            </h1>
            <p className="mt-4 text-sm leading-7 text-emerald-50/80">
              {description}
            </p>

            <nav className="mt-8 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-emerald-50 transition hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div className="px-6 py-8 sm:px-8 sm:py-10">{children}</div>
        </div>
      </section>
    </main>
  );
}
