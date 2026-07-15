"use client";

import { useState } from "react";
import type { DragEvent } from "react";
import { FiCheck, FiEdit3, FiTrash2 } from "react-icons/fi";
import { LuGripVertical } from "react-icons/lu";

import type { TodoItem } from "../_types/todo";

type TodoListProps = {
  todos: TodoItem[];
  editingTodoId: string | null;
  onEdit: (todo: TodoItem) => void;
  onDelete: (todoId: string) => void;
  onToggleCompleted: (todoId: string) => void;
  onReorder: (activeTodoId: string, targetTodoId: string) => void;
};

export function TodoList({
  todos,
  editingTodoId,
  onEdit,
  onDelete,
  onToggleCompleted,
  onReorder,
}: TodoListProps) {
  const [draggingTodoId, setDraggingTodoId] = useState<string | null>(null);
  const [dropTargetTodoId, setDropTargetTodoId] = useState<string | null>(null);

  const handleDragStart = (event: DragEvent<HTMLElement>, todoId: string) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", todoId);
    setDraggingTodoId(todoId);
  };

  const handleDragOver = (event: DragEvent<HTMLElement>, todoId: string) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    if (draggingTodoId !== todoId) {
      setDropTargetTodoId(todoId);
    }
  };

  const handleDrop = (event: DragEvent<HTMLElement>, targetTodoId: string) => {
    event.preventDefault();

    const activeTodoId = event.dataTransfer.getData("text/plain");

    if (activeTodoId && activeTodoId !== targetTodoId) {
      onReorder(activeTodoId, targetTodoId);
    }

    setDraggingTodoId(null);
    setDropTargetTodoId(null);
  };

  const handleDragEnd = () => {
    setDraggingTodoId(null);
    setDropTargetTodoId(null);
  };

  if (todos.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-5 py-10 text-center text-sm text-zinc-500">
        No todos yet. Add your first task above.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <article
          key={todo.id}
          draggable
          onDragStart={(event) => handleDragStart(event, todo.id)}
          onDragOver={(event) => handleDragOver(event, todo.id)}
          onDrop={(event) => handleDrop(event, todo.id)}
          onDragEnd={handleDragEnd}
          className={`rounded-[2rem] border bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition sm:p-5 ${
            draggingTodoId === todo.id
              ? "scale-[0.98] border-emerald-300 opacity-75"
              : dropTargetTodoId === todo.id
                ? "border-emerald-400 ring-4 ring-emerald-100"
                : "border-zinc-200/80"
          }`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 flex-1 gap-4">
              <div className="flex w-16 shrink-0 flex-col items-center gap-3 rounded-[1.5rem] border border-emerald-100 bg-gradient-to-b from-emerald-50 to-white px-2 py-3">
                <button
                  type="button"
                  aria-label={`Drag to reorder ${todo.name}`}
                  className="inline-flex h-10 w-10 cursor-grab items-center justify-center rounded-2xl text-emerald-700 transition hover:bg-emerald-100 active:cursor-grabbing"
                >
                  <LuGripVertical className="text-2xl" />
                </button>

                <label className="inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleCompleted(todo.id)}
                    className="peer sr-only"
                  />
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-transparent shadow-sm transition peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-emerald-100">
                    <FiCheck className="text-base" />
                  </span>
                </label>
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`text-2xl font-semibold leading-tight ${
                          todo.completed
                            ? "text-zinc-500 line-through"
                            : "text-zinc-900"
                        }`}
                      >
                        {todo.name}
                      </h3>
                      {todo.completed ? (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                          Completed
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                          In Progress
                        </span>
                      )}
                    </div>

                    <p
                      className={`mt-3 max-w-2xl text-base leading-8 ${
                        todo.completed
                          ? "text-zinc-400 line-through"
                          : "text-zinc-600"
                      }`}
                    >
                      {todo.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                    <span className="rounded-full bg-zinc-100 px-3 py-1.5 font-mono text-xs text-zinc-500">
                      ID: {todo.id.slice(0, 8)}
                    </span>
                    <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white p-1 shadow-sm">
                      <button
                        type="button"
                        onClick={() => onEdit(todo)}
                        className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition ${
                          editingTodoId === todo.id
                            ? "bg-[#173328] text-white"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-[#173328]"
                        }`}
                        aria-label={
                          editingTodoId === todo.id
                            ? `Editing ${todo.name}`
                            : `Edit ${todo.name}`
                        }
                      >
                        <FiEdit3 className="text-base" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(todo.id)}
                        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
                        aria-label={`Delete ${todo.name}`}
                      >
                        <FiTrash2 className="text-base" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
