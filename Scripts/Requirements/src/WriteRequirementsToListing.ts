import * as fs from 'fs/promises';
import * as path from 'path';
import { OutputStructure, UnitTestInfos } from './Types';

// Generate a markdown table from the requirements and their associated tests
function generateMarkdownTable(requirementsWithTests: OutputStructure): string {
  const tableHeader = ['| Requirement | Anzahl an Tests | Dateien |', '| --- | --- | --- |'];

  const tableRows = Object.values(requirementsWithTests)
    // Sort requirements alphabetically by title
    // Remove any "\r"
    .map((req) => ({ ...req, requirementInfo: { ...req.requirementInfo, title: req.requirementInfo.title.replace(/\r/g, '') } }))
    .sort((a, b) => a.requirementInfo.title.localeCompare(b.requirementInfo.title))
    .map(({ requirementInfo: { id, title }, unitTests }) => {
      const testCount = unitTests.length;
      // Highlight test count with bold if it's zero
      const testCountDisplay = testCount === 0 ? `**${testCount}**` : `${testCount}`;
      const files = testCount === 0 ? '-' : unitTests.map((test) => formatFileLink(test)).join('<br/>');
      return `| [${title} (${id})](${id}.md) | ${testCountDisplay} | ${files} |`;
    });

  return [...tableHeader, ...tableRows].join('\n');
}

// Format a file link for the markdown table
function formatFileLink(test: UnitTestInfos & { repoName: string }): string {
  // Remove repo name and backslashes from the file path
  const filePath = test.file.substring(test.file.indexOf(test.repoName) + test.repoName.length + 1).replace(/\\/g, '/');
  const repoPath = `https://github.com/ProjektAdLer/${test.repoName}/blob/main/${filePath}#L${test.lineNumber}`;
  return `[${path.basename(test.file)}:${test.lineNumber}](${repoPath})`;
}

export async function writeRequirementsToListing(
  requirementsWithTests: OutputStructure,
  filePath: string
): Promise<void> {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    const marker = '[//]: # (Script-Start)';
    const insertPosition = content.indexOf(marker) + marker.length;

    // Generate the new content and insert it after the marker
    const updatedContent = content.slice(0, insertPosition) + '\n' + generateMarkdownTable(requirementsWithTests);

    await fs.writeFile(filePath, updatedContent);
    console.log('File written successfully');
  } catch (error) {
    console.error('Error writing requirements to file:', error);
    throw error; // Re-throw the error for better error handling in the calling function
  }
}
