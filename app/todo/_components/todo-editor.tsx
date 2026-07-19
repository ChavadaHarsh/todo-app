"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import type { TodoFormValues } from "../_types/todo";
import { initialTodoValues } from "../_utils/todo-validation";
import { useTodoStore } from "../_store/todo-store";
import { TodoForm } from "./todo-form";

type TodoEditorProps =
  | {
      mode: "create";
    }
  | {
      mode: "edit";
      todoId: string;
    };

export function TodoEditor(props: TodoEditorProps) {
  const router = useRouter();
  const hydrated = useTodoStore((state) => state.hydrated);
  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const todo = useTodoStore((state) =>
    props.mode === "edit" ? state.getTodoById(props.todoId) : undefined,
  );

  if (!hydrated) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white/70 p-6 text-sm text-zinc-500">
        Loading your saved todos...
      </div>
    );
  }

  if (props.mode === "edit" && !todo) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-xl font-semibold text-zinc-900">Todo not found</h2>
        <p className="mt-2 text-sm leading-7 text-zinc-600">
          This task could not be loaded from localStorage. It may have been
          deleted already.
        </p>
        <Link
          href="/todo/list"
          className="mt-4 inline-flex rounded-full bg-[#173328] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#214635]"
        >
          Back to list
        </Link>
      </div>
    );
  }

  const editTodo = props.mode === "edit" ? todo : null;

  const submitLabel =
    props.mode === "create" ? "Create Todo" : "Save Changes";

  const introText =
    props.mode === "create"
      ? "Use the form below to create a new task. It will be saved to localStorage through the Zustand store."
      : "Update the selected task and keep your saved list in sync automatically.";

  const initialValues: TodoFormValues =
    props.mode === "create"
      ? initialTodoValues
      : {
          name: editTodo!.name,
          description: editTodo!.description,
        };

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white/70 p-5 sm:p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-900">
            {props.mode === "create" ? "Add a New Todo" : "Edit Todo"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-500">
            {introText}
          </p>
        </div>

        <Link
          href="/todo/list"
          className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          Back to list
        </Link>
      </div>

      <TodoForm
        submitLabel={submitLabel}
        initialValues={initialValues}
        onCancel={() => router.push("/todo/list")}
        onSubmit={(values, { resetForm }) => {
          if (props.mode === "create") {
            addTodo(values);
            resetForm();
            router.push("/todo/list");
            return;
          }

          updateTodo(props.todoId, values);
          router.push("/todo/list");
        }}
      />
    </div>
  );
}
