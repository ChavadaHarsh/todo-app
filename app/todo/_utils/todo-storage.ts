import type { TodoItem } from "../_types/todo";

const DEFAULT_STORAGE_KEY = "todo-app-items";

export const STORAGE_KEY =
  process.env.NEXT_PUBLIC_TODO_STORAGE_KEY ?? DEFAULT_STORAGE_KEY;

function getCryptoObject() {
  if (typeof globalThis === "undefined") {
    return null;
  }

  const cryptoObject = globalThis.crypto;

  if (!cryptoObject || typeof cryptoObject !== "object") {
    return null;
  }

  return cryptoObject;
}

function fallbackRandomSegment() {
  return Math.random().toString(36).slice(2, 10);
}

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
            : createTodoId(),
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
  const cryptoObject = getCryptoObject();

  if (cryptoObject && typeof cryptoObject.randomUUID === "function") {
    return cryptoObject.randomUUID();
  }

  if (cryptoObject && typeof cryptoObject.getRandomValues === "function") {
    const values = new Uint32Array(4);
    cryptoObject.getRandomValues(values);

    return Array.from(values, (value) => value.toString(16).padStart(8, "0"))
      .join("-")
      .slice(0, 35);
  }

  return `todo-${Date.now().toString(36)}-${fallbackRandomSegment()}`;
}
