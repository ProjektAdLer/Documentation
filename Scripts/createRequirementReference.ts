import * as fs from 'fs/promises';

async function Main(): Promise<void> {
  const allIds = await GetAllReqIds();

  const autorentoolIds = allIds.filter((id: string) => id.startsWith('A'));
  const backendIds = allIds.filter((id: string) => id.startsWith('B'));
  const generatorIds = allIds.filter((id: string) => id.startsWith('G'));
  const engineIds = allIds.filter((id: string) => id.startsWith('E'));
  const pluginIds = allIds.filter((id: string) => id.startsWith('P'));

  await WriteRequirementsToListing(
    backendIds,
    '../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Backend.md'
  );
}

async function WriteRequirementsToListing(ids: string[], filePath: string): Promise<void> {
  var content: string = await fs.readFile(filePath, 'utf8');

  const marker = '[//]: # (Script-Start)';

  // Find the position of the marker
  const insertPosition = content.indexOf(marker) + marker.length;

  // Remove anything after the marker
  content = content.slice(0, insertPosition);

  // Insert the new content
  content = content.slice(0, insertPosition) + '\n' + ids.join('\n') + content.slice(insertPosition);

  // Write the new content to the file
  await fs.writeFile(filePath, content).then(() => {
    console.log('File written successfully');
  });
}

async function GetAllReqIds(): Promise<string[]> {
  try {
    const files: string[] = await fs.readdir('../AdLerDokumentation/Writerside/topics');

    // Filter the files based on the regular expression
    const filteredFiles: string[] = files.filter((file: string) => {
      return /^[a-zA-Z]{3}.*\d\.md$/.test(file);
    });

    return filteredFiles;
  } catch (err) {
    console.error('Error reading the directory:', err);
    return []; // Return an empty array in case of error
  }
}

Main();
