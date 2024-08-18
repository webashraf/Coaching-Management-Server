export type TNames = "Autumn" | "Summer" | "Fall";
export type TCodes = "01" | "02" | "03";
export type TMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

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
