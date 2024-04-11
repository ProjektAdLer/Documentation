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
exports.WriteRequirementsToListing = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
// Function to write requirements and their associated unit tests to a markdown listing.
function WriteRequirementsToListing(requirementsWithTests, filePath, repoName) {
    return __awaiter(this, void 0, void 0, function* () {
        let content = yield fs.readFile(filePath, 'utf8');
        const marker = '[//]: # (Script-Start)';
        const insertPosition = content.indexOf(marker) + marker.length;
        content = content.slice(0, insertPosition); // Remove anything after the marker
        function generateMarkdownTable(requirementsWithTests) {
            let table = [];
            addHeader(table);
            // Convert to array and sort by requirement title
            const sortedRequirements = Object.values(requirementsWithTests).sort((a, b) => {
                return a.requirementInfo.title.localeCompare(b.requirementInfo.title);
            });
            // Populate the table rows based on the sorted array
            for (const requirement of sortedRequirements) {
                const { id, title } = requirement.requirementInfo;
                const tests = requirement.unitTests.length;
                // join with line break
                const files = requirement.unitTests.map((test) => getFileName(test)).join('<br>');
                table.push(`| [${title} (${id})](${id}.md) | ${tests} | ${files} |`);
            }
            return table;
        }
        function getFileName(test) {
            // Remove everything before the repo name
            var filePath = test.file.substring(test.file.indexOf(repoName));
            var repopath = filePath
                .replace(repoName, 'https://github.com/ProjektAdLer/' + repoName + '/blob/main')
                // Replace all backslashes with forward slashes
                .replace(/\\/g, '/');
            return `[${path.basename(test.file)}:${test.lineNumber}](${repopath}#L${test.lineNumber})`;
        }
        function addHeader(table) {
            table.push('| Requirement with ID | Number of Tests | Files |');
            table.push('| --- | --- | --- |');
        }
        const newContent = generateMarkdownTable(requirementsWithTests);
        // Insert the new content
        content += '\n' + newContent.join('\n');
        // Write the new content to the file
        yield fs.writeFile(filePath, content);
        console.log('File written successfully');
    });
}
exports.WriteRequirementsToListing = WriteRequirementsToListing;
function addHeader(table) {
    table.push('| Anforderung | Nummer an Tests | Testdateien mit Zeilennummer |');
    table.push('| --- | --- | --- |');
}
