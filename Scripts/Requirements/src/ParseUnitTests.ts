import * as fsPromises from 'fs/promises';
import * as path from 'path';
import { createReadStream } from 'fs';
import * as readline from 'readline';
import { OutputStructure, RequirementInfo, UnitTestInfos } from './OutputStructure';

// Finds potential test files in the directory and its subdirectories.
async function findPotentialTestFiles(dir: string, expectedFileExtension: string): Promise<string[]> {
  const entries = await fsPromises.readdir(dir, { withFileTypes: true });
  const files = entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory()
      ? findPotentialTestFiles(fullPath, expectedFileExtension)
      : fullPath.endsWith(expectedFileExtension)
      ? fullPath
      : [];
  });

  return (await Promise.all(files)).flat();
}

// Finds files with specified IDs and records their line numbers and the IDs themselves.
async function findFilesWithIds(files: string[]): Promise<UnitTestInfos[]> {
  const idRegex = /\/\/ ANF-ID: \[([A-Z0-9, ]+)\]/;
  let filesWithIds: UnitTestInfos[] = [];

  for (const file of files) {
    const fileStream = createReadStream(file);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let lineNumber = 0;
    for await (const line of rl) {
      lineNumber++;
      const match = line.match(idRegex);
      if (match) {
        // Split and trim IDs from the matched line.
        const ids = match[1].split(',').map((id) => id.trim());
        // For each ID, push a new UnitTestInfo to the array.
        ids.forEach((id) => {
          filesWithIds.push({
            id: id,
            file: file,
            lineNumber: lineNumber,
          });
        });
      }
    }
  }

  return filesWithIds;
}

async function mapFilesToRequirements(
  reqInfos: RequirementInfo[],
  unitTestInfos: UnitTestInfos[]
): Promise<OutputStructure> {
  const output: OutputStructure = {};

  reqInfos.forEach((req) => {
    const tests = unitTestInfos.filter((test) => test.id === req.id);
    // Ensure every requirement is added to the output, even if it has no associated tests.
    output[req.id] = {
      requirementInfo: req,
      unitTests: tests,
    };
  });

  return output;
}

// Parses unit tests to find specific IDs within the test files, returning the structured output.
export async function parseUnitTests(
  reqInfos: RequirementInfo[],
  unitTestFolder: string,
  unitTestEnding: string,
  expectedFileExtension: string
): Promise<OutputStructure> {
  const potentialTestFiles = await findPotentialTestFiles(unitTestFolder, expectedFileExtension);
  const filesWithIds = await findFilesWithIds(potentialTestFiles);
  return await mapFilesToRequirements(reqInfos, filesWithIds);
}
