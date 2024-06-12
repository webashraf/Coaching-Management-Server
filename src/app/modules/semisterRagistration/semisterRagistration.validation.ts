import { z } from "zod";
import { SemisterRagistrationStatusArry } from "./semisterRagistration.const";


const semisterRagistrationValidation = z.object({
  body: z.object({
    academicSemister: z.string(),
    status: z.enum([...(SemisterRagistrationStatusArry as [string, ...string[]])]),
    startDate: z.string(),
    endDate: z.string(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

const updateSemisterRagistrationValidation = z.object({
  body: z.object({
    academicSemister: z.string().optional(),
    status: z
      .enum([...(SemisterRagistrationStatusArry as [string, ...string[]])])
      .optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const semisterRagistrationValidator = {
  semisterRagistrationValidation,
  updateSemisterRagistrationValidation,
};
