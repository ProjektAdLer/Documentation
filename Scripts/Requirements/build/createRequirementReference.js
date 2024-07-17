"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetAllRequirements_1 = require("./GetAllRequirements");
const ParseUnitTests_1 = require("./ParseUnitTests");
const WriteRequirementsToListing_1 = require("./WriteRequirementsToListing");
// Updated configuration structure to support different repos for plugins
const REPO_CONFIGS = [
    // {
    //   idPrefix: 'A',
    //   outputFile: '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Autorentool.md',
    //   folders: [
    //     {
    //       repoName: 'Autorentool',
    //       testFolder: '../../../Autorentool/',
    //       fileExtensions: ['.cs'],
    //     },
    //   ],
    // },
    // {
    //   idPrefix: 'B',
    //   outputFile: '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Backend.md',
    //   folders: [
    //     {
    //       repoName: 'AdLerBackend',
    //       testFolder: '../../../AdLerBackend/',
    //       fileExtensions: ['.cs'],
    //     },
    //   ],
    // },
    // {
    //   idPrefix: 'G',
    //   outputFile: '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Generator.md',
    //   folders: [
    //     {
    //       repoName: 'Autorentool',
    //       testFolder: '../../../Autorentool/',
    //       fileExtensions: ['.cs'],
    //     },
    //   ],
    // },
    // {
    //   idPrefix: 'E',
    //   outputFile: '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Engine.md',
    //   folders: [
    //     {
    //       repoName: '2D_3D_AdLer',
    //       testFolder: '../../../2D_3D_AdLer/',
    //       fileExtensions: ['.test.ts', '.test.tsx'],
    //     },
    //   ],
    // },
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
function processFolder(filteredIds, folder) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsedTests = yield (0, ParseUnitTests_1.parseUnitTests)(filteredIds, folder.testFolder, folder.fileExtensions);
        // Add repoName to each UnitTestInfos
        Object.values(parsedTests).forEach((req) => {
            req.unitTests = req.unitTests.map((test) => (Object.assign(Object.assign({}, test), { repoName: folder.repoName })));
        });
        return parsedTests;
    });
}
// Merge multiple OutputStructures into one
function mergeOutputStructures(structures) {
    return structures.reduce((merged, current) => {
        Object.entries(current).forEach(([id, data]) => {
            if (!merged[id]) {
                merged[id] = Object.assign({}, data);
            }
            else {
                merged[id].unitTests = [...merged[id].unitTests, ...data.unitTests];
            }
        });
        return merged;
    }, {});
}
// Process a single project (which may have multiple folders)
function processProject(allRequirementsInfos, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const filteredIds = allRequirementsInfos.filter(({ id }) => id.startsWith(config.idPrefix));
        // Process each folder and collect the results
        const folderResults = yield Promise.all(config.folders.map((folder) => processFolder(filteredIds, folder)));
        // Merge results from all folders
        const mergedReferences = mergeOutputStructures(folderResults);
        // Write the merged results to the output file
        yield (0, WriteRequirementsToListing_1.writeRequirementsToListing)(mergedReferences, config.outputFile);
    });
}
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allRequirementsInfos = yield (0, GetAllRequirements_1.GetAllReqInfos)();
            // Process all projects concurrently
            yield Promise.all(REPO_CONFIGS.map((config) => processProject(allRequirementsInfos, config)));
            console.log('All requirements processed successfully.');
        }
        catch (error) {
            console.error('An error occurred:', error);
        }
    });
}
Main();
//# sourceMappingURL=createRequirementReference.js.map