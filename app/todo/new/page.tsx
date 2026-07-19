import { TodoEditor } from "../_components/todo-editor";
import { TodoShell } from "../_components/todo-shell";

export default function TodoCreateRoute() {
  return (
    <TodoShell
      eyebrow="Create Todo"
      title="Add a task on a dedicated form page."
      description="This form uses the existing validation rules, then writes new todos into the shared Zustand store with localStorage persistence."
    >
      <TodoEditor mode="create" />
    </TodoShell>
  );
}
