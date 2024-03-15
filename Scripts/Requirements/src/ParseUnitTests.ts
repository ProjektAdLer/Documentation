import * as fsPromises from 'fs/promises';
import * as path from 'path';
import { createReadStream } from 'fs';
import * as readline from 'readline';
import { OutputStructure } from './OutputStructure';

// Defines a type for the detail of where the ID is found.
export type IDDetail = {
  idString: string;
  file: string;
  lineNumber: number;
};

// Parses  unit tests to find specific IDs within the test files, returning the structured output.
export async function parseCsUnitTests(
  reqIds: string[],
  unitTestFolder: string,
  unitTestEnding: string,
  expectedFileExtention: string
): Promise<OutputStructure[]> {
  const potentialTestFiles = await findFiles(unitTestFolder, expectedFileExtention);
  // Search each file for the IDs and collect results.
  const searchResults = await Promise.all(potentialTestFiles.map((file) => searchFile(file, reqIds)));
  const flatResults = flattenArray(searchResults);

  // Organize results by ID.
  const resultsByIDs = reqIds.map((id) => ({ [id]: flatResults.filter((result) => result.idString === id) }));

  return resultsByIDs;
}

// Searches a single file for specified  IDs, returning found search results.
async function searchFile(fileName: string, ids: string[]): Promise<IDDetail[]> {
  const fileStream = createReadStream(fileName);
  const rl = readline.createInterface({ input: fileStream });
  let lineNumber = 0;
  const results: IDDetail[] = [];

  for await (const line of rl) {
    lineNumber++;
    const matchedIds = matchIdsInLine(line, ids);
    matchedIds.forEach((idString) => results.push({ idString, file: fileName, lineNumber }));
  }

  return results;
}

// Finds .cs files recursively in a directory.
async function findFiles(dir: string, expectedFileExtention: string): Promise<string[]> {
  const entries = await fsPromises.readdir(dir, { withFileTypes: true });
  const files = entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory()
      ? findFiles(fullPath, expectedFileExtention)
      : fullPath.endsWith(expectedFileExtention)
      ? fullPath
      : [];
  });

  return flattenArray(await Promise.all(files));
}

// Utility function to flatten an array.
function flattenArray(arr: any[]): any[] {
  return arr.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val)), []);
}

// Matches the specified  IDs within a line, considering the specific format.
function matchIdsInLine(line: string, ids: string[]): string[] {
  const match = line.match(/\/\/ ANF-ID: \[([A-Z0-9, ]+)\]/);
  if (match && match[1]) {
    const idsInLine = match[1].split(',').map((id) => id.trim());
    return ids.filter((id) => idsInLine.includes(id));
  }
  return [];
}
