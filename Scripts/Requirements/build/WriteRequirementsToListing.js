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
// type IDDetail = {
//   idString: string;
//   file: string;
//   lineNumber: number;
// };
// type OutputStructure = {
//   [idString: string]: IDDetail[];
// };
function WriteRequirementsToListing(ids, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        var content = yield fs.readFile(filePath, 'utf8');
        const marker = '[//]: # (Script-Start)';
        // Find the position of the marker
        const insertPosition = content.indexOf(marker) + marker.length;
        // Remove anything after the marker
        content = content.slice(0, insertPosition);
        function generateMarkdownTable(requirementInfos) {
            let table = [];
            addHeader(table);
            // Populate the table rows
            requirementInfos.forEach((outputStructure) => {
                console.log(outputStructure);
                Object.entries(outputStructure).forEach(([idString, details]) => {
                    const numOfTests = details.length;
                    const fileNameWithLineNumber = (detail) => {
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
        yield fs.writeFile(filePath, content).then(() => {
            console.log('File written successfully');
        });
        function addHeader(table) {
            table.push('| ID | Number of Tests | Files |');
            table.push('| --- | --- | --- |');
        }
    });
}
exports.WriteRequirementsToListing = WriteRequirementsToListing;
