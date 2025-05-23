import { GetAllReqInfos } from './GetAllRequirements';
import { parseUnitTests } from './ParseUnitTests';
import { writeRequirementsToListing } from './WriteRequirementsToListing';
import { RequirementInfo, OutputStructure } from './Types';

// Updated configuration structure to support different repos for plugins
const REPO_CONFIGS = [
  {
    idPrefix: 'H',
    outputFile: '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-H5p-Player.md',
    folders: [
      {
        repoName: 'Autorentool',
        testFolder: '../../../Autorentool/',
        fileExtensions: ['.cs'],
      },
    ],
  },
  {
    idPrefix: 'A',
    outputFile: '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Autorentool.md',
    folders: [
      {
        repoName: 'Autorentool',
        testFolder: '../../../Autorentool/',
        fileExtensions: ['.cs'],
      },
    ],
  },
  {
    idPrefix: 'B',
    outputFile: '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Backend.md',
    folders: [
      {
        repoName: 'AdLerBackend',
        testFolder: '../../../AdLerBackend/',
        fileExtensions: ['.cs'],
      },
    ],
  },
  {
    idPrefix: 'G',
    outputFile: '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Generator.md',
    folders: [
      {
        repoName: 'Autorentool',
        testFolder: '../../../Autorentool/',
        fileExtensions: ['.cs'],
      },
    ],
  },
  {
    idPrefix: 'E',
    outputFile: '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Engine.md',
    folders: [
      {
        repoName: '2D_3D_AdLer',
        testFolder: '../../../2D_3D_AdLer/',
        fileExtensions: ['.test.ts', '.test.tsx'],
      },
    ],
  },
  {
    idPrefix: 'M',
    outputFile: '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Plugins.md',
    folders: [
      {
        repoName: 'MoodlePluginAvailability',
        testFolder: '../../../plugins/MoodlePluginAvailability/',
        fileExtensions: ['.php', '.feature'],
      },
      {
        repoName: 'MoodlePluginLocal',
        testFolder: '../../../plugins/MoodlePluginLocal/',
        fileExtensions: ['.php', '.feature'],
      },
      {
        repoName: 'MoodlePluginLocalLogging',
        testFolder: '../../../plugins/MoodlePluginLocalLogging/',
        fileExtensions: ['.php', '.feature'],
      },
      {
        repoName: 'MoodlePluginModAdleradaptivity',
        testFolder: '../../../plugins/MoodlePluginModAdleradaptivity/',
        fileExtensions: ['.php', '.feature'],
      },
    ],
  },
];

// Process a single folder within a project
async function processFolder(
  filteredIds: RequirementInfo[],
  folder: (typeof REPO_CONFIGS)[0]['folders'][0]
): Promise<OutputStructure> {
  const parsedTests = await parseUnitTests(filteredIds, folder.testFolder, folder.fileExtensions);
  // Add repoName to each UnitTestInfos
  Object.values(parsedTests).forEach((req) => {
    req.unitTests = req.unitTests.map((test) => ({ ...test, repoName: folder.repoName }));
  });
  return parsedTests;
}

// Merge multiple OutputStructures into one
function mergeOutputStructures(structures: OutputStructure[]): OutputStructure {
  return structures.reduce((merged, current) => {
    Object.entries(current).forEach(([id, data]) => {
      if (!merged[id]) {
        merged[id] = { ...data };
      } else {
        merged[id].unitTests = [...merged[id].unitTests, ...data.unitTests];
      }
    });
    return merged;
  }, {} as OutputStructure);
}

// Process a single project (which may have multiple folders)
async function processProject(allRequirementsInfos: RequirementInfo[], config: (typeof REPO_CONFIGS)[0]) {
  const filteredIds = allRequirementsInfos.filter(({ id }) => id.startsWith(config.idPrefix));

  // Process each folder and collect the results
  const folderResults = await Promise.all(config.folders.map((folder) => processFolder(filteredIds, folder)));

  // Merge results from all folders
  const mergedReferences = mergeOutputStructures(folderResults);

  // Write the merged results to the output file
  await writeRequirementsToListing(mergedReferences, config.outputFile);
}

async function Main(): Promise<void> {
  try {
    const allRequirementsInfos = await GetAllReqInfos();
    // Process all projects concurrently
    await Promise.all(REPO_CONFIGS.map((config) => processProject(allRequirementsInfos, config)));
    console.log('All requirements processed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

Main();
