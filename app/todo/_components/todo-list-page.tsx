"use client";

import Link from "next/link";

import { useTodoStore } from "../_store/todo-store";
import { TodoList } from "./todo-list";

export function TodoListPage() {
  const hydrated = useTodoStore((state) => state.hydrated);
  const todos = useTodoStore((state) => state.todos);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleCompleted = useTodoStore((state) => state.toggleCompleted);
  const reorderTodos = useTodoStore((state) => state.reorderTodos);

  const completedCount = todos.filter((todo) => todo.completed).length;

  if (!hydrated) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white/70 p-6 text-sm text-zinc-500">
        Loading your saved todos...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-zinc-200 bg-white/80 p-5">
          <p className="text-sm text-zinc-500">Total Todos</p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {todos.length}
          </p>
        </article>
        <article className="rounded-3xl border border-zinc-200 bg-white/80 p-5">
          <p className="text-sm text-zinc-500">Completed</p>
          <p className="mt-3 text-3xl font-semibold text-emerald-700">
            {completedCount}
          </p>
        </article>
        <article className="rounded-3xl border border-zinc-200 bg-white/80 p-5">
          <p className="text-sm text-zinc-500">Pending</p>
          <p className="mt-3 text-3xl font-semibold text-amber-700">
            {todos.length - completedCount}
          </p>
        </article>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white/70 p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900">Saved List</h2>
            <p className="mt-2 text-sm leading-7 text-zinc-500">
              Drag and drop to reorder. Toggle completion, edit a task on its
              own page, or remove it from the persisted list.
            </p>
          </div>

          <Link
            href="/todo/new"
            className="inline-flex rounded-full bg-[#173328] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#214635]"
          >
            Add Todo
          </Link>
        </div>

        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onReorder={reorderTodos}
          onToggleCompleted={toggleCompleted}
        />
      </div>
    </div>
  );
}
