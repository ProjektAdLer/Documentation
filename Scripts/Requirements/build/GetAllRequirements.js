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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllReqInfos = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const TOPICS_DIRECTORY = '../../AdLerDokumentation/Writerside/topics';
const FILENAME_REGEX = /^[a-zA-Z]{3}.*\d\.md$/;
const MARKDOWN_TITLE_PREFIX = '# ';
/**
 * Reads all Markdown files from a specific directory, filters them by a regex pattern,
 * and extracts IDs and titles from each.
 * @returns A Promise resolving to an array of RequirementInfo objects.
 */
function GetAllReqInfos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield promises_1.default.readdir(TOPICS_DIRECTORY);
            const filteredFiles = files.filter((file) => FILENAME_REGEX.test(file));
            return yield Promise.all(filteredFiles.map(readFileAndExtractInfo));
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(`Error reading the directory: ${err.message}`);
            }
            else {
                throw new Error('An unexpected error occurred');
            }
        }
    });
}
exports.GetAllReqInfos = GetAllReqInfos;
/**
 * Reads the content of a file, extracts the title based on Markdown syntax, and constructs a RequirementInfo.
 * @param file The file name of the Markdown document.
 * @returns A Promise resolving to a RequirementInfo object.
 */
function readFileAndExtractInfo(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield promises_1.default.readFile(`${TOPICS_DIRECTORY}/${file}`, 'utf8');
        const title = extractTitle(content);
        const id = file.split('.')[0];
        return { id, title };
    });
}
/**
 * Extracts the title from Markdown content.
 * @param content Markdown file content as a string.
 * @returns The title as a string.
 */
function extractTitle(content) {
    const firstLine = content.split('\n')[0];
    if (firstLine.startsWith(MARKDOWN_TITLE_PREFIX)) {
        return firstLine.substring(MARKDOWN_TITLE_PREFIX.length);
    }
    return 'No title found';
}
//# sourceMappingURL=GetAllRequirements.js.map