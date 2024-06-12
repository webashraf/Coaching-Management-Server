import { z } from "zod";

const preRequisitValidationCourses = z.object({
  course: z.string(),
  isDelted: z.boolean().optional(),
});
const preRequisitValidationCoursesForUpdate = z.object({
  course: z.string().optional(),
  isDelted: z.boolean().optional(),
});

const courseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisitCourses: z.array(preRequisitValidationCourses).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisitCourses: z
      .array(preRequisitValidationCoursesForUpdate)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const facultiesWithCourseValidation = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidations = {
  courseValidationSchema,
  updateValidationSchema,
  facultiesWithCourseValidation,
};
