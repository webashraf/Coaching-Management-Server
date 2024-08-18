import { Types } from "mongoose";

export type TGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
  email: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export interface TStudents {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: "Male" | "Female" | "Other";
  dateOfBirth?: Date;
  email: string;
  age: number;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "AB+" | "AB-" | "O+" | "O-" | "B+" | "B-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  profileImage?: string;
  admissionSemester: Types.ObjectId;
  isDeleted?: boolean;
  academicDepartment: Types.ObjectId;
}
