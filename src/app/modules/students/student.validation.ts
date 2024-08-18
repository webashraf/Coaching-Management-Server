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
const guardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNumber: z.string().min(1),
  email: z.string().email(),
});

// Define schema for student
const createStudentsValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6),
    student: z.object({
      id: z.string(),
      name: studentsNameValidationSchema,
      gender: z.enum(["Male", "Female"]),
      dateOfBirth: z.date().optional(),
      email: z.string().email(),
      age: z.number(),
      contactNumber: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(["A+", "A-", "AB+", "AB-", "O+", "O-", "B+", "B-"])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

const studentsNameValidationSchemaForUpdate = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[A-Z][a-zA-Z]*$/, {
      message:
        "First name must start with a capital letter and contain only letters",
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[a-zA-Z]+$/, { message: "Last name must contain only letters" })
    .optional(),
});

// Define schema for guardian
const guardianValidationSchemaForUpdate = z.object({
  name: z.string().min(1).optional(),
  occupation: z.string().min(1).optional(),
  contactNumber: z.string().min(1).optional(),
  email: z.string().email().optional(),
});

// Define schema for student
const updateStudentsValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        id: z.string(),
        name: studentsNameValidationSchemaForUpdate.optional(),
        gender: z.enum(["Male", "Female"]).optional(),
        dateOfBirth: z.date().optional(),
        email: z.string().email().optional(),
        age: z.number().optional(),
        contactNumber: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z
          .enum(["A+", "A-", "AB+", "AB-", "O+", "O-", "B+", "B-"])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: guardianValidationSchemaForUpdate.optional(),
        profileImage: z.string().optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
      })
      .optional(),
  }),
});

export const studentsValidator = {
  createStudentsValidationSchema,
  updateStudentsValidationSchema,
};
