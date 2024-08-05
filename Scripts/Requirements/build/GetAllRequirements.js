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
const path_1 = __importDefault(require("path"));
const TOPICS_DIRECTORY = '../../AdLerDokumentation/Writerside/topics';
const FILENAME_REGEX = /^[A-Z]{3}\d+\.md$/;
const MARKDOWN_TITLE_PREFIX = '# ';
function GetAllReqInfos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield promises_1.default.readdir(TOPICS_DIRECTORY);
            // Filter files based on the regex pattern
            const filteredFiles = files.filter((file) => FILENAME_REGEX.test(file));
            return yield Promise.all(filteredFiles.map(readFileAndExtractInfo));
        }
        catch (err) {
            throw new Error(`Error reading the directory: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    });
}
exports.GetAllReqInfos = GetAllReqInfos;
function readFileAndExtractInfo(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(TOPICS_DIRECTORY, file);
        const content = yield promises_1.default.readFile(filePath, 'utf8');
        const title = extractTitle(content);
        // Extract the file name without extension as the ID
        const id = path_1.default.parse(file).name;
        return { id, title };
    });
}
function extractTitle(content) {
    const firstLine = content.split('\n')[0];
    // If the first line starts with the markdown title prefix, use it as the title
    return firstLine.startsWith(MARKDOWN_TITLE_PREFIX)
        ? firstLine.substring(MARKDOWN_TITLE_PREFIX.length)
        : 'No title found';
}
//# sourceMappingURL=GetAllRequirements.js.map