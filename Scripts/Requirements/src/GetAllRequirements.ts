import fs from 'fs/promises';
import path from 'path';
import { RequirementInfo } from './Types';

const TOPICS_DIRECTORY = '../../AdLerDokumentation/Writerside/topics';
const FILENAME_REGEX = /^[a-zA-Z]{3}.*\d\.md$/;
const MARKDOWN_TITLE_PREFIX = '# ';

export async function GetAllReqInfos(): Promise<RequirementInfo[]> {
  try {
    const files = await fs.readdir(TOPICS_DIRECTORY);
    // Filter files based on the regex pattern
    const filteredFiles = files.filter((file) => FILENAME_REGEX.test(file));
    return await Promise.all(filteredFiles.map(readFileAndExtractInfo));
  } catch (err) {
    throw new Error(`Error reading the directory: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}

async function readFileAndExtractInfo(file: string): Promise<RequirementInfo> {
  const filePath = path.join(TOPICS_DIRECTORY, file);
  const content = await fs.readFile(filePath, 'utf8');
  const title = extractTitle(content);
  // Extract the file name without extension as the ID
  const id = path.parse(file).name;
  return { id, title };
}

function extractTitle(content: string): string {
  const firstLine = content.split('\n')[0];
  // If the first line starts with the markdown title prefix, use it as the title
  return firstLine.startsWith(MARKDOWN_TITLE_PREFIX)
    ? firstLine.substring(MARKDOWN_TITLE_PREFIX.length)
    : 'No title found';
}
