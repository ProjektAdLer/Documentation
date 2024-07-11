import * as fsPromises from 'fs/promises';
import * as path from 'path';
import * as readline from 'readline';
import { createReadStream } from 'fs';
import { OutputStructure, RequirementInfo, UnitTestInfos } from './Types';

async function findPotentialTestFiles(dir: string, expectedFileExtensions: string[]): Promise<string[]> {
  const entries = await fsPromises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Recursively search subdirectories
        return findPotentialTestFiles(fullPath, expectedFileExtensions);
      }
      // Check if the file matches any of the identifiers and extensions
      if (expectedFileExtensions.some((ext) => fullPath.toLowerCase().endsWith(ext.toLowerCase()))) {
        return [fullPath];
      }
      return [];
    })
  );
  return files.flat();
}

async function findFilesWithIds(files: string[]): Promise<UnitTestInfos[]> {
  const idRegex = /[#\/]+\s*ANF-ID:\s*\[([A-Z0-9,\s]+)\]/;
  const filesWithIds: UnitTestInfos[] = [];

  for (const file of files) {
    const rl = readline.createInterface({
      input: createReadStream(file),
      crlfDelay: Infinity,
    });

    let lineNumber = 0;
    for await (const line of rl) {
      lineNumber++;
      const match = line.match(idRegex);
      if (match) {
        // Split multiple IDs and trim whitespace
        match[1]
          .split(',')
          .map((id) => id.trim())
          .forEach((id) => {
            filesWithIds.push({ id, file, lineNumber });
          });
      }
    }
  }

  return filesWithIds;
}

function mapFilesToRequirements(reqInfos: RequirementInfo[], unitTestInfos: UnitTestInfos[]): OutputStructure {
  // Use reduce to build the OutputStructure
  return reqInfos.reduce((output, req) => {
    output[req.id] = {
      requirementInfo: req,
      unitTests: unitTestInfos.filter((test) => test.id === req.id),
    };
    return output;
  }, {} as OutputStructure);
}

export async function parseUnitTests(
  reqInfos: RequirementInfo[],
  unitTestFolder: string,
  expectedFileExtensions: string[]
): Promise<OutputStructure> {
  const potentialTestFiles = await findPotentialTestFiles(unitTestFolder, expectedFileExtensions);
  const filesWithIds = await findFilesWithIds(potentialTestFiles);
  return mapFilesToRequirements(reqInfos, filesWithIds);
}
