import { z } from "zod";

const academicDepertmantValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic depertmant name must be a string",
      required_error: "Academic depertmant name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic depertmant faculty must be a string",
      required_error: "Academic depertmant faculty is required",
    }),
  }),
});
const academicDepertmantValidationForUpdate = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic depertmant name must be a string",
      required_error: "Academic depertmant name is required",
    }).optional(),
    academicFaculty: z.string({
      invalid_type_error: "Academic depertmant faculty must be a string",
      required_error: "Academic depertmant faculty is required",
    }).optional(),
  }),
});

export const academicDepertmantValidators = {
  academicDepertmantValidation,
  academicDepertmantValidationForUpdate
};
