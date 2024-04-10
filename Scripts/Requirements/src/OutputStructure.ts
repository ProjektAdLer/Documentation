export type OutputStructure = {
  [idString: string]: IDDetail[];
};

export type IDDetail = {
  idString: string;
  file: string;
  lineNumber: number;
  title: string;
};
