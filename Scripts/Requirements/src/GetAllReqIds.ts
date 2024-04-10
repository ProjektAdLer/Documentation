import fs from 'fs/promises';

export async function GetAllReqIds(): Promise<{ id: string; header: string }[]> {
  try {
    const files: string[] = await fs.readdir('../../AdLerDokumentation/Writerside/topics');

    // Filter the files based on the regular expression
    const filteredFiles: string[] = files.filter((file: string) => /^[a-zA-Z]{3}.*\d\.md$/.test(file));

    const idsWithHeaders = await Promise.all(
      filteredFiles.map(async (file: string) => {
        const content = await fs.readFile(`../../AdLerDokumentation/Writerside/topics/${file}`, 'utf8');
        const header = content.split('\n')[0]; // Assumes the first line is the header
        const id = file.split('.')[0];
        return { id, header };
      })
    );

    return idsWithHeaders;
  } catch (err) {
    console.error('Error reading the directory:', err);
    return []; // Return an empty array in case of error
  }
}
