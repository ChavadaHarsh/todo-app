import type { TodoItem } from "../_types/todo";

export const STORAGE_KEY = process.env.NEXT_PUBLIC_TODO_STORAGE_KEY ?? "";

export function loadTodos(): TodoItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedTodos = window.localStorage.getItem(STORAGE_KEY);

  if (!storedTodos) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(storedTodos) as unknown;

    if (!Array.isArray(parsedTodos)) {
      window.localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    return parsedTodos
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
    window.localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function saveTodos(todos: TodoItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function createTodoId() {
  return crypto.randomUUID();
}
