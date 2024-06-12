import { Types } from "mongoose";

export type TSemisterRagistration = {
  academicSemister: Types.ObjectId;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
//   createdAt: Date;
//   updatedAt: Date;
};
