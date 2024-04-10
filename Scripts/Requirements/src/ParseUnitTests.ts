import * as fsPromises from 'fs/promises';
import * as path from 'path';
import { createReadStream } from 'fs';
import * as readline from 'readline';
import { IDDetail, OutputStructure } from './OutputStructure';

// Parses  unit tests to find specific IDs within the test files, returning the structured output.
export async function parseCsUnitTests(
  reqInfos: {
    id: string;
    header: string;
  }[],
  unitTestFolder: string,
  unitTestEnding: string,
  expectedFileExtention: string
): Promise<OutputStructure[]> {
  const potentialTestFiles = await findFiles(unitTestFolder, expectedFileExtention);
  const filesWithIDs = await Promise.all(potentialTestFiles.map((file) => searchFile(file, reqInfos)));
  const flatResults = flattenArray(filesWithIDs);

  // Organize results by ID.
  const resultsByIDs = reqInfos
    .map(({ id }) => id)
    .map((id) => ({ [id]: flatResults.filter((result) => result.idString === id) }));

  return resultsByIDs;
}

// Searches a single file for specified  IDs, returning found search results.
async function searchFile(
  fileName: string,
  reqInfos: {
    id: string;
    header: string;
  }[]
): Promise<IDDetail[]> {
  const fileStream = createReadStream(fileName);
  const rl = readline.createInterface({ input: fileStream });
  let lineNumber = 0;
  const results: IDDetail[] = [];

  for await (const line of rl) {
    lineNumber++;
    const matchedIds = matchIdsInLine(
      line,
      reqInfos.map(({ id }) => id)
    );
    matchedIds.forEach((idString) =>
      results.push({
        idString,
        file: fileName,
        lineNumber,
        title: reqInfos.find((req) => req.id === idString)?.header || '',
      })
    );
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
