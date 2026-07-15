"use client";

import { useEffect, useState } from "react";
import { TodoForm } from "./_components/todo-form";
import { TodoList } from "./_components/todo-list";
import type { TodoFormValues, TodoItem } from "./_types/todo";
import { createTodoId, loadTodos, saveTodos } from "./_utils/todo-storage";
import { initialTodoValues } from "./_utils/todo-validation";

export default function TodoPage() {
  const [todos, setTodos] = useState<TodoItem[]>(() => loadTodos());
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const editingTodo =
    todos.find((todo) => todo.id === editingTodoId) ?? null;

  const handleAddTodo = (values: TodoFormValues, resetForm: () => void) => {
    const newTodo: TodoItem = {
      id: createTodoId(),
      name: values.name.trim(),
      description: values.description.trim(),
      completed: false,
    };

    setTodos((currentTodos) => [newTodo, ...currentTodos]);
    resetForm();
  };

  const handleUpdateTodo = (
    values: TodoFormValues,
    resetForm: () => void,
  ) => {
    if (!editingTodoId) {
      return;
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === editingTodoId
          ? {
              ...todo,
              name: values.name.trim(),
              description: values.description.trim(),
            }
          : todo,
      ),
    );

    setEditingTodoId(null);
    resetForm();
  };

  const handleToggleCompleted = (todoId: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleEditTodo = (todo: TodoItem) => {
    setEditingTodoId(todo.id);
  };

  const handleDeleteTodo = (todoId: string) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== todoId),
    );

    if (editingTodoId === todoId) {
      setEditingTodoId(null);
    }
  };

  const handleReorderTodos = (activeTodoId: string, targetTodoId: string) => {
    setTodos((currentTodos) => {
      const activeIndex = currentTodos.findIndex(
        (todo) => todo.id === activeTodoId,
      );
      const targetIndex = currentTodos.findIndex(
        (todo) => todo.id === targetTodoId,
      );

      if (activeIndex === -1 || targetIndex === -1) {
        return currentTodos;
      }

      const updatedTodos = [...currentTodos];
      const [movedTodo] = updatedTodos.splice(activeIndex, 1);
      updatedTodos.splice(targetIndex, 0, movedTodo);

      return updatedTodos;
    });
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#ffffff,_#e4efe7_45%,_#cfe3d5_100%)] px-4 py-10 text-zinc-900">
      <section className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_24px_80px_rgba(28,57,44,0.16)] backdrop-blur">
        <div className="grid gap-0 lg:grid-cols-[420px_1fr]">
          <div className="bg-[#173328] px-8 py-10 text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-200">
              Daily Planner
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              Build a focused todo list that actually stays saved.
            </h1>
            <p className="mt-4 text-sm leading-7 text-emerald-50/80">
              Add a task name and a clear description. Every item gets its own
              unique ID and is stored in localStorage so it is still here when
              you come back.
            </p>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="rounded-3xl border border-zinc-200 bg-white/70 p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">
                    {editingTodo ? "Edit Task" : "Add Task"}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    {editingTodo
                      ? "Update the selected todo and save your changes."
                      : "Create a todo with a clear name and description."}
                  </p>
                </div>
              </div>

              <TodoForm
                submitLabel={editingTodo ? "Update Todo" : "Add Todo"}
                initialValues={
                  editingTodo
                    ? {
                        name: editingTodo.name,
                        description: editingTodo.description,
                      }
                    : initialTodoValues
                }
                onCancel={editingTodo ? handleCancelEdit : undefined}
                onSubmit={(values, { resetForm }) => {
                  if (editingTodo) {
                    handleUpdateTodo(values, resetForm);
                    return;
                  }

                  handleAddTodo(values, resetForm);
                }}
              />
            </div>

            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">
                    Saved Tasks
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Drag and drop cards to reorder your list.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  {todos.length} item{todos.length === 1 ? "" : "s"}
                </span>
              </div>

              <TodoList
                todos={todos}
                editingTodoId={editingTodoId}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
                onReorder={handleReorderTodos}
                onToggleCompleted={handleToggleCompleted}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
