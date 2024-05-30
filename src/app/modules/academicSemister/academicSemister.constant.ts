import {
  TAcademicSemisterNameCodeMapper,
  TCodes,
  TMonths,
  TNames,
} from "./academicSemister.interface";

export const AcademicNames: TNames[] = ["Autum", "Summar", "Fall"];
export const AcademicCodes: TCodes[] = ["01", "02", "03"];
export const AcademicMonths: TMonths[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const academicSemisterNameCodeMapper: TAcademicSemisterNameCodeMapper = {
  Autum: "01",
  Summar: "02",
  Fall: "03",
};
