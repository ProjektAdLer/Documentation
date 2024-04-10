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
exports.GetAllReqIds = void 0;
const promises_1 = __importDefault(require("fs/promises"));
function GetAllReqIds() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield promises_1.default.readdir('../../AdLerDokumentation/Writerside/topics');
            // Filter the files based on the regular expression
            const filteredFiles = files.filter((file) => /^[a-zA-Z]{3}.*\d\.md$/.test(file));
            const idsWithHeaders = yield Promise.all(filteredFiles.map((file) => __awaiter(this, void 0, void 0, function* () {
                const content = yield promises_1.default.readFile(`../../AdLerDokumentation/Writerside/topics/${file}`, 'utf8');
                const title = getTitle(content);
                const id = file.split('.')[0];
                return { id, title };
            })));
            return idsWithHeaders;
        }
        catch (err) {
            console.error('Error reading the directory:', err);
            return []; // Return an empty array in case of error
        }
        function getTitle(content) {
            var firstLine = content.split('\n')[0];
            if (firstLine.startsWith('# ')) {
                return firstLine.substring(2);
            }
            return 'No title found';
        }
    });
}
exports.GetAllReqIds = GetAllReqIds;
