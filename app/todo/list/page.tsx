import { TodoListPage } from "../_components/todo-list-page";
import { TodoShell } from "../_components/todo-shell";

export default function TodoListRoute() {
  return (
    <TodoShell
      eyebrow="Todo Workspace"
      title="Review every saved task in one place."
      description="Your todo list is powered by a persisted Zustand store, so reordering, completion updates, and deletes stay saved in localStorage."
    >
      <TodoListPage />
    </TodoShell>
  );
}
