import { z } from "zod";

const createUserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be string",
    })
    .max(20, { message: "password cant be more than 20 characters" })
    .optional(),
  // id: z.string(),
});

export const userValidation = {
  userValidationSchema: createUserValidationSchema,
};
