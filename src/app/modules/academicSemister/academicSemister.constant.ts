import {
  TAcademicSemisterNameCodeMapper,
  TCodes,
  TMonths,
  TNames,
} from "./academicSemister.interface";

export const AcademicNames: TNames[] = ["Autumn", "Summer", "Fall"];
export const AcademicCodes: TCodes[] = ["01", "02", "03"];
export const AcademicMonths: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const academicSemisterNameCodeMapper: TAcademicSemisterNameCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
