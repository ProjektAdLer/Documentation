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
exports.parseUnitTests = void 0;
const fsPromises = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const fs_1 = require("fs");
const readline = __importStar(require("readline"));
// Finds potential test files in the directory and its subdirectories that match any of the identifiers or extensions.
function findPotentialTestFiles(dir, testFileIdentifiers, expectedFileExtensions) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entries = yield fsPromises.readdir(dir, { withFileTypes: true });
            const files = yield Promise.all(entries.map((entry) => {
                const fullPath = path.join(dir, entry.name);
                const fullPathLower = fullPath.toLowerCase(); // Use a lowercased version for matching
                return entry.isDirectory()
                    ? findPotentialTestFiles(fullPath, testFileIdentifiers, expectedFileExtensions)
                    : testFileIdentifiers.some((id) => fullPathLower.includes(id.toLowerCase())) &&
                        expectedFileExtensions.some((ext) => fullPathLower.endsWith(ext.toLowerCase()))
                        ? [fullPath] // Use the original fullPath in output
                        : [];
            }));
            return files.flat();
        }
        catch (error) {
            console.error('Error reading directory:', error);
            throw error;
        }
    });
}
// Finds files with specified IDs and records their line numbers and the IDs themselves.
function findFilesWithIds(files) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        // Updated regex to allow optional spaces around 'ANF-ID' and inside the brackets
        const idRegex = /\/\/\s*ANF-ID:\s*\[([A-Z0-9,\s]+)\]/;
        let filesWithIds = [];
        for (const file of files) {
            try {
                const fileStream = (0, fs_1.createReadStream)(file);
                const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
                let lineNumber = 0;
                try {
                    for (var _d = true, rl_1 = (e_1 = void 0, __asyncValues(rl)), rl_1_1; rl_1_1 = yield rl_1.next(), _a = rl_1_1.done, !_a; _d = true) {
                        _c = rl_1_1.value;
                        _d = false;
                        const line = _c;
                        lineNumber++;
                        const match = line.match(idRegex);
                        if (match) {
                            // Split on comma and then trim spaces from each ID
                            const ids = match[1].split(',').map((id) => id.trim());
                            ids.forEach((id) => {
                                filesWithIds.push({ id, file, lineNumber });
                            });
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = rl_1.return)) yield _b.call(rl_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            catch (error) {
                console.error('Error processing file:', file, error);
                throw error;
            }
        }
        return filesWithIds;
    });
}
function mapFilesToRequirements(reqInfos, unitTestInfos) {
    return __awaiter(this, void 0, void 0, function* () {
        const output = {};
        reqInfos.forEach((req) => {
            const tests = unitTestInfos.filter((test) => test.id === req.id);
            output[req.id] = { requirementInfo: req, unitTests: tests };
        });
        return output;
    });
}
// Parses unit tests to find specific IDs within the test files, returning the structured output.
function parseUnitTests(reqInfos, unitTestFolder, testFileIdentifiers, expectedFileExtensions) {
    return __awaiter(this, void 0, void 0, function* () {
        const potentialTestFiles = yield findPotentialTestFiles(unitTestFolder, testFileIdentifiers, expectedFileExtensions);
        const filesWithIds = yield findFilesWithIds(potentialTestFiles);
        return mapFilesToRequirements(reqInfos, filesWithIds);
    });
}
exports.parseUnitTests = parseUnitTests;
