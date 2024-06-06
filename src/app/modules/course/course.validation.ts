import { z } from "zod";

const preRequisitValidationCourses = z.object({
  course: z.string(),
  isDelted: z.boolean().optional(),
});

const courseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisitCourses: z.array(preRequisitValidationCourses),
  }),
});

export const CourseValidations = {
  courseValidationSchema,
};
