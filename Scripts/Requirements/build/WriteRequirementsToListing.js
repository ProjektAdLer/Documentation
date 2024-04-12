"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.writeRequirementsToListing = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
// Function to generate the markdown table for requirements with tests.
function generateMarkdownTable(requirementsWithTests, repoName) {
    let table = [];
    addTableHeader(table);
    // Convert to array and sort by requirement title
    const sortedRequirements = Object.values(requirementsWithTests).sort((a, b) => a.requirementInfo.title.localeCompare(b.requirementInfo.title));
    // Populate the table rows based on the sorted array
    sortedRequirements.forEach((requirement) => {
        const { id, title } = requirement.requirementInfo;
        const tests = requirement.unitTests.length;
        const testCountDisplay = tests === 0 ? `<span style="color: red;">${tests}</span>` : `${tests}`;
        const files = requirement.unitTests.map((test) => formatFileLink(test, repoName)).join('<br/>');
        const filesDisplay = tests === 0 ? `<span style="color: red;">(noch) keine Tests vorhanden</span>` : files;
        table.push(`| [${title} (${id})](${id}.md) | ${testCountDisplay} | ${filesDisplay} |`);
    });
    return table.join('\n');
}
// Adds the header row to the markdown table.
function addTableHeader(table) {
    table.push('| Requirement | Anzahl an Tests | Dateien |');
    table.push('| --- | --- | --- |');
}
// Formats the link to a file for inclusion in the markdown.
function formatFileLink(test, repoName) {
    // remove repo name and the backslashes from the file path
    const filePath = test.file.substring(test.file.indexOf(repoName) + repoName.length + 1).replace(/\\/g, '/');
    const repoPath = `https://github.com/ProjektAdLer/${repoName}/blob/main/${filePath}#L${test.lineNumber}`;
    return `[${path.basename(test.file)}:${test.lineNumber}](${repoPath})`;
}
function writeRequirementsToListing(requirementsWithTests, filePath, repoName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let content = yield fs.readFile(filePath, 'utf8');
            const marker = '[//]: # (Script-Start)';
            const insertPosition = content.indexOf(marker) + marker.length;
            content = content.slice(0, insertPosition); // Retain content before marker
            const markdownTable = generateMarkdownTable(requirementsWithTests, repoName);
            content += '\n' + markdownTable;
            yield fs.writeFile(filePath, content);
            console.log('File written successfully');
        }
        catch (error) {
            console.error('Error writing requirements to file:', error);
        }
    });
}
exports.writeRequirementsToListing = writeRequirementsToListing;
