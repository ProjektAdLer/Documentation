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
// Generate a markdown table from the requirements and their associated tests
function generateMarkdownTable(requirementsWithTests) {
    const tableHeader = ['| Requirement | Anzahl an Tests | Dateien |', '| --- | --- | --- |'];
    const tableRows = Object.values(requirementsWithTests)
        // Sort requirements alphabetically by title
        // Remove any "\r"
        .map((req) => (Object.assign(Object.assign({}, req), { requirementInfo: Object.assign(Object.assign({}, req.requirementInfo), { title: req.requirementInfo.title.replace(/\r/g, '') }) })))
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
function formatFileLink(test) {
    // Remove repo name and backslashes from the file path
    const filePath = test.file.substring(test.file.indexOf(test.repoName) + test.repoName.length + 1).replace(/\\/g, '/');
    const repoPath = `https://github.com/ProjektAdLer/${test.repoName}/blob/main/${filePath}#L${test.lineNumber}`;
    return `[${path.basename(test.file)}:${test.lineNumber}](${repoPath})`;
}
function writeRequirementsToListing(requirementsWithTests, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let content = yield fs.readFile(filePath, 'utf8');
            const marker = '[//]: # (Script-Start)';
            const insertPosition = content.indexOf(marker) + marker.length;
            // Generate the new content and insert it after the marker
            const updatedContent = content.slice(0, insertPosition) + '\n' + generateMarkdownTable(requirementsWithTests);
            yield fs.writeFile(filePath, updatedContent);
            console.log('File written successfully');
        }
        catch (error) {
            console.error('Error writing requirements to file:', error);
            throw error; // Re-throw the error for better error handling in the calling function
        }
    });
}
exports.writeRequirementsToListing = writeRequirementsToListing;
//# sourceMappingURL=WriteRequirementsToListing.js.map