export type TNames = "Autum" | "Summar" | "Fall";
export type TCodes = "01" | "02" | "03";
export type TMonths =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export type TAcademicSemister = {
  name: TNames;
  code: TCodes;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

export type TAcademicSemisterNameCodeMapper = {
  [key: string]: string;
};
