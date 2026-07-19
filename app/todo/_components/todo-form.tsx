"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";

import type { TodoFormValues } from "../_types/todo";
import {
  initialTodoValues,
  todoValidationSchema,
} from "../_utils/todo-validation";

type TodoFormProps = {
  submitLabel: string;
  initialValues?: TodoFormValues;
  onSubmit: (
    values: TodoFormValues,
    helpers: { resetForm: () => void },
  ) => void;
  onCancel?: () => void;
};

export function TodoForm({
  submitLabel,
  initialValues = initialTodoValues,
  onSubmit,
  onCancel,
}: TodoFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={todoValidationSchema}
      enableReinitialize
      onSubmit={(values, { resetForm }) => {
        onSubmit(values, { resetForm });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-zinc-800"
            >
              Name
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Finish landing page"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="mt-2 text-sm text-rose-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-zinc-800"
            >
              Description
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              rows={4}
              placeholder="Write a short note about what needs to be done."
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            />
            <ErrorMessage
              name="description"
              component="p"
              className="mt-2 text-sm text-rose-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex cursor-pointer rounded-full bg-[#173328] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#214635] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitLabel}
            </button>

            {onCancel ? (
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex cursor-pointer rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </Form>
      )}
    </Formik>
  );
}
