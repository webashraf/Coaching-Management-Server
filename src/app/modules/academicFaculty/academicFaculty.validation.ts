import { string, z } from "zod";

const academicFacultyValidation = z.object({
  body: z.object({
    name: string({ invalid_type_error: "Academy faculty must be a string" }),
  }),
});

export const academicFacultyValidators = {
  academicFacultyValidation,
};
