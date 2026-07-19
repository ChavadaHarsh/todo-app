import type { TodoItem } from "../_types/todo";

const DEFAULT_STORAGE_KEY = "todo-app-items";

export const STORAGE_KEY =
  process.env.NEXT_PUBLIC_TODO_STORAGE_KEY ?? DEFAULT_STORAGE_KEY;

export function sanitizeStoredTodos(storedTodos: unknown): TodoItem[] {
  if (!Array.isArray(storedTodos)) {
    return [];
  }

  try {
    return storedTodos
      .filter(
        (todo): todo is Partial<TodoItem> =>
          typeof todo === "object" && todo !== null,
      )
      .map((todo) => ({
        id:
          typeof todo.id === "string" && todo.id.length > 0
            ? todo.id
            : crypto.randomUUID(),
        name: typeof todo.name === "string" ? todo.name : "",
        description:
          typeof todo.description === "string" ? todo.description : "",
        completed: Boolean(todo.completed),
      }))
      .filter((todo) => todo.name.trim().length > 0);
  } catch {
    return [];
  }
}

export function createTodoId() {
  return crypto.randomUUID();
}
