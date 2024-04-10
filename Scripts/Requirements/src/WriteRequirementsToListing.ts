import * as fs from 'fs/promises';
import * as path from 'path';
import { OutputStructure } from './OutputStructure';
import { IDDetail } from './ParseUnitTests';
import { json } from 'stream/consumers';

// type IDDetail = {
//   idString: string;
//   file: string;
//   lineNumber: number;
// };

// type OutputStructure = {
//   [idString: string]: IDDetail[];
// };

export async function WriteRequirementsToListing(ids: OutputStructure[], filePath: string): Promise<void> {
  var content: string = await fs.readFile(filePath, 'utf8');

  const marker = '[//]: # (Script-Start)';

  // Find the position of the marker
  const insertPosition = content.indexOf(marker) + marker.length;

  // Remove anything after the marker
  content = content.slice(0, insertPosition);

  function generateMarkdownTable(requirementInfos: OutputStructure[]): string[] {
    let table: string[] = [];

    addHeader(table);

    // Populate the table rows
    requirementInfos.forEach((outputStructure: OutputStructure) => {
      // console.log(outputStructure);
      Object.entries(outputStructure).forEach(([idString, details]: [string, IDDetail[]]) => {
        const numOfTests = details.length;
        const fileNameWithLineNumber = (detail: IDDetail): string => {
          const fileName = path.basename(detail.file);
          return `${fileName}:${detail.lineNumber}`;
        };
        const files = details.map(fileNameWithLineNumber).join(', ');
        table.push(`| ${idString} | ${numOfTests} | ${files} |`);
      });
    });

    return table;
  }
  const newContent = generateMarkdownTable(ids);

  // Insert the new content
  content = content + '\n' + newContent.join('\n');

  // Write the new content to the file
  await fs.writeFile(filePath, content).then(() => {
    console.log('File written successfully');
  });

  function addHeader(table: string[]) {
    table.push('| ID | Number of Tests | Files |');
    table.push('| --- | --- | --- |');
  }
}
