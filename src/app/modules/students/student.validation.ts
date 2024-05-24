import { z } from "zod";

// Define schema for student's name
const studentsNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[A-Z][a-zA-Z]*$/, {
      message:
        "First name must start with a capital letter and contain only letters",
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[a-zA-Z]+$/, { message: "Last name must contain only letters" }),
});

// Define schema for guardian
const guardianSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNumber: z.string().min(1),
  email: z.string().email(),
});

// Define schema for student
const studentsValidationSchema = z.object({
  id: z.string().min(1),
  name: studentsNameValidationSchema,
  gender: z.enum(["male", "female"]),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  age: z.number(),
  contactNumber: z.string(),
  emergencyContctNo: z.string(),
  bloodGroup: z
    .enum(["A+", "A-", "AB+", "AB-", "O+", "O-", "B+", "B-"])
    .optional(),
  prasentAddress: z.string(),
  parmanentAddress: z.string(),
  guardian: guardianSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(["active", "disabled"]),
});

export default studentsValidationSchema;
