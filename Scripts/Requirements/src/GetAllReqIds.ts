import * as fs from 'fs/promises';

export async function GetAllReqIds(): Promise<string[]> {
  try {
    const files: string[] = await fs.readdir('../../AdLerDokumentation/Writerside/topics');

    // Filter the files based on the regular expression
    const filteredFiles: string[] = files.filter((file: string) => {
      return /^[a-zA-Z]{3}.*\d\.md$/.test(file);
    });

    const ids = filteredFiles.map((file: string) => {
      return file.split('.')[0];
    });

    return ids;
  } catch (err) {
    console.error('Error reading the directory:', err);
    return []; // Return an empty array in case of error
  }
}
