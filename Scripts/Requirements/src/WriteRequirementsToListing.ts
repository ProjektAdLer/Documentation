import * as fs from 'fs/promises';
import * as path from 'path';
import { OutputStructure, UnitTestInfos } from './Types';

// Function to generate the markdown table for requirements with tests.
function generateMarkdownTable(requirementsWithTests: OutputStructure, repoName: string): string {
  let table: string[] = [];
  addTableHeader(table);

  // Convert to array and sort by requirement title
  const sortedRequirements = Object.values(requirementsWithTests).sort((a, b) =>
    a.requirementInfo.title.localeCompare(b.requirementInfo.title)
  );

  // Populate the table rows based on the sorted array
  sortedRequirements.forEach((requirement) => {
    const { id, title } = requirement.requirementInfo;
    const tests = requirement.unitTests.length;
    const files = requirement.unitTests.map((test) => formatFileLink(test, repoName)).join('<br/>');
    table.push(`| [${title} (${id})](${id}.md) | ${tests} | ${files} |`);
  });

  return table.join('\n');
}

// Adds the header row to the markdown table.
function addTableHeader(table: string[]): void {
  table.push('| Requirement | Anzahl an Tests | Dateien |');
  table.push('| --- | --- | --- |');
}

// Formats the link to a file for inclusion in the markdown.
function formatFileLink(test: UnitTestInfos, repoName: string): string {
  // remove repo name and the backslashes from the file path
  const filePath = test.file.substring(test.file.indexOf(repoName) + repoName.length + 1).replace(/\\/g, '/');
  const repoPath = `https://github.com/ProjektAdLer/${repoName}/blob/main/${filePath}#L${test.lineNumber}`;
  return `[${path.basename(test.file)}:${test.lineNumber}](${repoPath})`;
}

export async function writeRequirementsToListing(
  requirementsWithTests: OutputStructure,
  filePath: string,
  repoName: string
): Promise<void> {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    const marker = '[//]: # (Script-Start)';
    const insertPosition = content.indexOf(marker) + marker.length;
    content = content.slice(0, insertPosition); // Retain content before marker

    const markdownTable = generateMarkdownTable(requirementsWithTests, repoName);
    content += '\n' + markdownTable;

    await fs.writeFile(filePath, content);
    console.log('File written successfully');
  } catch (error) {
    console.error('Error writing requirements to file:', error);
  }
}
