import { TodoEditor } from "../../_components/todo-editor";
import { TodoShell } from "../../_components/todo-shell";

export default async function TodoEditRoute(
  props: PageProps<"/todo/[id]/edit">,
) {
  const { id } = await props.params;

  return (
    <TodoShell
      eyebrow="Edit Todo"
      title="Update a saved task on its own page."
      description="The editor loads the current todo from the persisted Zustand store, then saves your changes back into localStorage."
    >
      <TodoEditor mode="edit" todoId={id} />
    </TodoShell>
  );
}
