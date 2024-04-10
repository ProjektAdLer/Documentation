import * as fs from 'fs/promises';
import * as path from 'path';
import { OutputStructure, RequirementInfo, RequirementWithTests, UnitTestInfos } from './OutputStructure';

// Function to write requirements and their associated unit tests to a markdown listing.
export async function WriteRequirementsToListing(
  requirementsWithTests: OutputStructure,
  filePath: string
): Promise<void> {
  let content: string = await fs.readFile(filePath, 'utf8');

  const marker = '[//]: # (Script-Start)';
  const insertPosition = content.indexOf(marker) + marker.length;
  content = content.slice(0, insertPosition); // Remove anything after the marker

  function generateMarkdownTable(requirementsWithTests: OutputStructure): string[] {
    let table: string[] = [];
    addHeader(table);

    // Populate the table rows
    for (const requirementId in requirementsWithTests) {
      const requirement = requirementsWithTests[requirementId];
      const { id, title } = requirement.requirementInfo;
      const tests = requirement.unitTests.length;
      const files = requirement.unitTests.map((test) => path.basename(test.file) + `:${test.lineNumber}`).join(', ');

      table.push(`| ${title} (${id}) | ${tests} | ${files} |`);
    }

    return table;
  }

  const newContent = generateMarkdownTable(requirementsWithTests);

  // Insert the new content
  content += '\n' + newContent.join('\n');

  // Write the new content to the file
  await fs.writeFile(filePath, content);
  console.log('File written successfully');
}

function addHeader(table: string[]) {
  table.push('| Requirement ID (Title) | Number of Tests | Files |');
  table.push('| --- | --- | --- |');
}
