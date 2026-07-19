"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { TodoFormValues, TodoItem } from "../_types/todo";
import {
  STORAGE_KEY,
  createTodoId,
  sanitizeStoredTodos,
} from "../_utils/todo-storage";

type TodoStore = {
  hydrated: boolean;
  todos: TodoItem[];
  markHydrated: () => void;
  addTodo: (values: TodoFormValues) => string;
  updateTodo: (todoId: string, values: TodoFormValues) => void;
  deleteTodo: (todoId: string) => void;
  toggleCompleted: (todoId: string) => void;
  reorderTodos: (activeTodoId: string, targetTodoId: string) => void;
  getTodoById: (todoId: string) => TodoItem | undefined;
};

function normalizeTodoValues(values: TodoFormValues): TodoFormValues {
  return {
    name: values.name.trim(),
    description: values.description.trim(),
  };
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      hydrated: false,
      todos: [],
      markHydrated: () => set({ hydrated: true }),
      addTodo: (values) => {
        const normalizedValues = normalizeTodoValues(values);
        const newTodo: TodoItem = {
          id: createTodoId(),
          name: normalizedValues.name,
          description: normalizedValues.description,
          completed: false,
        };

        set((state) => ({
          todos: [newTodo, ...state.todos],
        }));

        return newTodo.id;
      },
      updateTodo: (todoId, values) => {
        const normalizedValues = normalizeTodoValues(values);

        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === todoId
              ? {
                  ...todo,
                  ...normalizedValues,
                }
              : todo,
          ),
        }));
      },
      deleteTodo: (todoId) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== todoId),
        }));
      },
      toggleCompleted: (todoId) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === todoId
              ? { ...todo, completed: !todo.completed }
              : todo,
          ),
        }));
      },
      reorderTodos: (activeTodoId, targetTodoId) => {
        set((state) => {
          const activeIndex = state.todos.findIndex(
            (todo) => todo.id === activeTodoId,
          );
          const targetIndex = state.todos.findIndex(
            (todo) => todo.id === targetTodoId,
          );

          if (activeIndex === -1 || targetIndex === -1) {
            return state;
          }

          const updatedTodos = [...state.todos];
          const [movedTodo] = updatedTodos.splice(activeIndex, 1);
          updatedTodos.splice(targetIndex, 0, movedTodo);

          return {
            todos: updatedTodos,
          };
        });
      },
      getTodoById: (todoId) => get().todos.find((todo) => todo.id === todoId),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ todos: state.todos }),
      merge: (persistedState, currentState) => {
        const persistedTodos =
          persistedState &&
          typeof persistedState === "object" &&
          "todos" in persistedState
            ? (persistedState as { todos?: unknown }).todos
            : [];

        return {
          ...currentState,
          todos: sanitizeStoredTodos(persistedTodos),
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
