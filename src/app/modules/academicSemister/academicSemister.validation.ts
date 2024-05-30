import { z } from "zod";
import {
  AcademicCodes,
  AcademicMonths,
  AcademicNames,
} from "./academicSemister.constant";

const academicSemisterValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicNames] as [string, ...string[]]),
    code: z.enum([...AcademicCodes] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...AcademicMonths] as [string, ...string[]]),
    endMonth: z.enum([...AcademicMonths] as [string, ...string[]]),
  }),
});

export const academicSemisterValidators = {
  academicSemisterValidation,
};
