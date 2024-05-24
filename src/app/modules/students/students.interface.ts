export type Guardian = {
  name: string;
  occupation: string;
  contactNumber: string;
  email: string;
};

export type userName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export interface Students {
  id: string;
  name: userName;
  gender: "male" | "female";
  dateOfBirth?: string;
  email: string;
  age: number;
  contactNumber: string;
  emergencyContctNo: string;
  bloodGroup?: "A+" | "A-" | "AB+" | "AB-" | "O+" | "O-" | "B+" | "B-";
  prasentAddress: string;
  parmanentAddress: string;
  guardian: Guardian;
  profileImage?: string;
  isActive: "active" | "disabled";
}
