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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsUnitTests = void 0;
const fsPromises = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const fs_1 = require("fs");
const readline = __importStar(require("readline"));
// Parses  unit tests to find specific IDs within the test files, returning the structured output.
function parseCsUnitTests(reqInfos, unitTestFolder, unitTestEnding, expectedFileExtention) {
    return __awaiter(this, void 0, void 0, function* () {
        const potentialTestFiles = yield findFiles(unitTestFolder, expectedFileExtention);
        const filesWithIDs = yield Promise.all(potentialTestFiles.map((file) => searchFile(file, reqInfos)));
        const flatResults = flattenArray(filesWithIDs);
        // Organize results by ID.
        const resultsByIDs = reqInfos
            .map(({ id }) => id)
            .map((id) => ({ [id]: flatResults.filter((result) => result.idString === id) }));
        return resultsByIDs;
    });
}
exports.parseCsUnitTests = parseCsUnitTests;
// Searches a single file for specified  IDs, returning found search results.
function searchFile(fileName, reqInfos) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const fileStream = (0, fs_1.createReadStream)(fileName);
        const rl = readline.createInterface({ input: fileStream });
        let lineNumber = 0;
        const results = [];
        try {
            for (var _d = true, rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), _a = rl_1_1.done, !_a; _d = true) {
                _c = rl_1_1.value;
                _d = false;
                const line = _c;
                lineNumber++;
                const matchedIds = matchIdsInLine(line, reqInfos.map(({ id }) => id));
                matchedIds.forEach((idString) => {
                    var _a;
                    return results.push({
                        idString,
                        file: fileName,
                        lineNumber,
                        title: ((_a = reqInfos.find((req) => req.id === idString)) === null || _a === void 0 ? void 0 : _a.header) || '',
                    });
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = rl_1.return)) yield _b.call(rl_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return results;
    });
}
// Finds .cs files recursively in a directory.
function findFiles(dir, expectedFileExtention) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = yield fsPromises.readdir(dir, { withFileTypes: true });
        const files = entries.map((entry) => __awaiter(this, void 0, void 0, function* () {
            const fullPath = path.join(dir, entry.name);
            return entry.isDirectory()
                ? findFiles(fullPath, expectedFileExtention)
                : fullPath.endsWith(expectedFileExtention)
                    ? fullPath
                    : [];
        }));
        return flattenArray(yield Promise.all(files));
    });
}
// Utility function to flatten an array.
function flattenArray(arr) {
    return arr.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val)), []);
}
// Matches the specified  IDs within a line, considering the specific format.
function matchIdsInLine(line, ids) {
    const match = line.match(/\/\/ ANF-ID: \[([A-Z0-9, ]+)\]/);
    if (match && match[1]) {
        const idsInLine = match[1].split(',').map((id) => id.trim());
        return ids.filter((id) => idsInLine.includes(id));
    }
    return [];
}
