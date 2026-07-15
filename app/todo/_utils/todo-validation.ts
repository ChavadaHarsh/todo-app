import * as Yup from "yup";

import type { TodoFormValues } from "../_types/todo";

export const initialTodoValues: TodoFormValues = {
  name: "",
  description: "",
};

export const todoValidationSchema: Yup.ObjectSchema<TodoFormValues> = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be 50 characters or less")
    .required("Name is required"),
  description: Yup.string()
    .trim()
    .min(5, "Description must be at least 5 characters")
    .max(200, "Description must be 200 characters or less")
    .required("Description is required"),
});
