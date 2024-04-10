import fs from 'fs/promises';
import { RequirementInfo } from './OutputStructure';

export async function GetAllReqIds(): Promise<RequirementInfo[]> {
  try {
    const files: string[] = await fs.readdir('../../AdLerDokumentation/Writerside/topics');

    // Filter the files based on the regular expression
    const filteredFiles: string[] = files.filter((file: string) => /^[a-zA-Z]{3}.*\d\.md$/.test(file));

    const idsWithHeaders = await Promise.all(
      filteredFiles.map(async (file: string) => {
        const content = await fs.readFile(`../../AdLerDokumentation/Writerside/topics/${file}`, 'utf8');
        const title = getTitle(content);
        const id = file.split('.')[0];
        return { id, title };
      })
    );

    return idsWithHeaders;
  } catch (err) {
    console.error('Error reading the directory:', err);
    return []; // Return an empty array in case of error
  }

  function getTitle(content: string) {
    var firstLine = content.split('\n')[0];
    if (firstLine.startsWith('# ')) {
      return firstLine.substring(2);
    }
    return 'No title found';
  }
}
