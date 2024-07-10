import * as fsPromises from 'fs/promises';
import * as path from 'path';
import { createReadStream } from 'fs';
import * as readline from 'readline';
import { OutputStructure, RequirementInfo, UnitTestInfos } from './Types';

// Finds potential test files in the directory and its subdirectories that match any of the identifiers or extensions.
async function findPotentialTestFiles(
  dir: string,
  testFileIdentifiers: string[],
  expectedFileExtensions: string[]
): Promise<string[]> {
  try {
    const entries = await fsPromises.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map((entry) => {
        const fullPath = path.join(dir, entry.name);
        const fullPathLower = fullPath.toLowerCase(); // Use a lowercased version for matching
        return entry.isDirectory()
          ? findPotentialTestFiles(fullPath, testFileIdentifiers, expectedFileExtensions)
          : testFileIdentifiers.some((id) => fullPathLower.includes(id.toLowerCase())) &&
            expectedFileExtensions.some((ext) => fullPathLower.endsWith(ext.toLowerCase()))
          ? [fullPath] // Use the original fullPath in output
          : [];
      })
    );
    return files.flat();
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error;
  }
}

// Finds files with specified IDs and records their line numbers and the IDs themselves.
async function findFilesWithIds(files: string[]): Promise<UnitTestInfos[]> {
  // Updated regex to allow optional spaces around 'ANF-ID' and inside the brackets
  const idRegex = /[#\/]+\s*ANF-ID:\s*\[([A-Z0-9,\s]+)\]/;
  let filesWithIds: UnitTestInfos[] = [];

  for (const file of files) {
    try {
      const fileStream = createReadStream(file);
      const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
      let lineNumber = 0;

      for await (const line of rl) {
        lineNumber++;
        const match = line.match(idRegex);
        if (match) {
          // Split on comma and then trim spaces from each ID
          const ids = match[1].split(',').map((id) => id.trim());
          ids.forEach((id) => {
            filesWithIds.push({ id, file, lineNumber });
          });
        }
      }
    } catch (error) {
      console.error('Error processing file:', file, error);
      throw error;
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
    output[req.id] = { requirementInfo: req, unitTests: tests };
  });

  return output;
}

// Parses unit tests to find specific IDs within the test files, returning the structured output.
export async function parseUnitTests(
  reqInfos: RequirementInfo[],
  unitTestFolder: string,
  testFileIdentifiers: string[],
  expectedFileExtensions: string[]
): Promise<OutputStructure> {
  const potentialTestFiles = await findPotentialTestFiles(unitTestFolder, testFileIdentifiers, expectedFileExtensions);
  const filesWithIds = await findFilesWithIds(potentialTestFiles);
  return mapFilesToRequirements(reqInfos, filesWithIds);
}
