export type OutputStructure = {
  [idString: string]: RequirementWithTests;
};

export type RequirementWithTests = {
  requirementInfo: RequirementInfo;
  unitTests: UnitTestInfos[];
};

export type RequirementInfo = {
  id: string;
  title: string;
};

export type UnitTestInfos = {
  id: string;
  file: string;
  lineNumber: number;
  repoName: string;
};
