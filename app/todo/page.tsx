import Link from "next/link";

import { TodoShell } from "./_components/todo-shell";

const quickLinks = [
  {
    href: "/todo/new",
    title: "Open the form page",
    description:
      "Create a new todo with validation, then save it into the persisted Zustand store.",
  },
  {
    href: "/todo/list",
    title: "Open the list page",
    description:
      "Review saved tasks, drag to reorder them, toggle completion, and jump to the edit page.",
  },
];

export default function TodoPage() {
  return (
    <TodoShell
      eyebrow="Todo Hub"
      title="Manage your todo app with dedicated pages."
      description="The todo feature now uses Zustand for shared state and localStorage persistence, with separate routes for creating, listing, and editing tasks."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-[2rem] border border-zinc-200 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_24px_60px_rgba(23,51,40,0.12)]"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">
              Todo Route
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-zinc-900">
              {link.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-500">
              {link.description}
            </p>
            <span className="mt-6 inline-flex text-sm font-medium text-[#173328]">
              Continue
            </span>
          </Link>
        ))}
      </div>
    </TodoShell>
  );
}
