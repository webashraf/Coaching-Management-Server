import { z } from "zod";

const academicSemisterValidation = z.object({
    body: z.object({
        name: z.string().array(),
        code: z.string().array(),
        year: z.date(),
        startMonth: z.string().array(),
        endMonth: z.string().array()
    })
})