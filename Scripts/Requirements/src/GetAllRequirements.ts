import fs from 'fs/promises';
import { RequirementInfo } from './OutputStructure';

const TOPICS_DIRECTORY = '../../AdLerDokumentation/Writerside/topics';
const FILENAME_REGEX = /^[a-zA-Z]{3}.*\d\.md$/;
const MARKDOWN_TITLE_PREFIX = '# ';

/**
 * Reads all Markdown files from a specific directory, filters them by a regex pattern,
 * and extracts IDs and titles from each.
 * @returns A Promise resolving to an array of RequirementInfo objects.
 */
export async function GetAllReqInfos(): Promise<RequirementInfo[]> {
  try {
    const files: string[] = await fs.readdir(TOPICS_DIRECTORY);
    const filteredFiles: string[] = files.filter((file) => FILENAME_REGEX.test(file));
    return await Promise.all(filteredFiles.map(readFileAndExtractInfo));
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error reading the directory: ${err.message}`);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

/**
 * Reads the content of a file, extracts the title based on Markdown syntax, and constructs a RequirementInfo.
 * @param file The file name of the Markdown document.
 * @returns A Promise resolving to a RequirementInfo object.
 */
async function readFileAndExtractInfo(file: string): Promise<RequirementInfo> {
  const content = await fs.readFile(`${TOPICS_DIRECTORY}/${file}`, 'utf8');
  const title = extractTitle(content);
  const id = file.split('.')[0];
  return { id, title };
}

/**
 * Extracts the title from Markdown content.
 * @param content Markdown file content as a string.
 * @returns The title as a string.
 */
function extractTitle(content: string): string {
  const firstLine = content.split('\n')[0];
  if (firstLine.startsWith(MARKDOWN_TITLE_PREFIX)) {
    return firstLine.substring(MARKDOWN_TITLE_PREFIX.length);
  }
  return 'No title found';
}
