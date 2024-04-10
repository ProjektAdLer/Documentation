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
// Finds potential test files in the directory and its subdirectories.
function findPotentialTestFiles(dir, expectedFileExtension) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = yield fsPromises.readdir(dir, { withFileTypes: true });
        const files = entries.map((entry) => __awaiter(this, void 0, void 0, function* () {
            const fullPath = path.join(dir, entry.name);
            return entry.isDirectory()
                ? findPotentialTestFiles(fullPath, expectedFileExtension)
                : fullPath.endsWith(expectedFileExtension)
                    ? fullPath
                    : [];
        }));
        return (yield Promise.all(files)).flat();
    });
}
// Finds files with specified IDs and records their line numbers and the IDs themselves.
function findFilesWithIds(files) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const idRegex = /\/\/ ANF-ID: \[([A-Z0-9, ]+)\]/;
        let filesWithIds = [];
        for (const file of files) {
            const fileStream = (0, fs_1.createReadStream)(file);
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });
            let lineNumber = 0;
            try {
                for (var _d = true, rl_1 = (e_1 = void 0, __asyncValues(rl)), rl_1_1; rl_1_1 = yield rl_1.next(), _a = rl_1_1.done, !_a; _d = true) {
                    _c = rl_1_1.value;
                    _d = false;
                    const line = _c;
                    lineNumber++;
                    const match = line.match(idRegex);
                    if (match) {
                        // Split and trim IDs from the matched line.
                        const ids = match[1].split(',').map((id) => id.trim());
                        // For each ID, push a new UnitTestInfo to the array.
                        ids.forEach((id) => {
                            filesWithIds.push({
                                id: id,
                                file: file,
                                lineNumber: lineNumber,
                            });
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
        return filesWithIds;
    });
}
function mapFilesToRequirements(reqInfos, unitTestInfos) {
    return __awaiter(this, void 0, void 0, function* () {
        const output = {};
        reqInfos.forEach((req) => {
            const tests = unitTestInfos.filter((test) => test.id === req.id);
            // Ensure every requirement is added to the output, even if it has no associated tests.
            output[req.id] = {
                requirementInfo: req,
                unitTests: tests,
            };
        });
        return output;
    });
}
// Parses unit tests to find specific IDs within the test files, returning the structured output.
function parseUnitTests(reqInfos, unitTestFolder, unitTestEnding, expectedFileExtension) {
    return __awaiter(this, void 0, void 0, function* () {
        const potentialTestFiles = yield findPotentialTestFiles(unitTestFolder, expectedFileExtension);
        const filesWithIds = yield findFilesWithIds(potentialTestFiles);
        return yield mapFilesToRequirements(reqInfos, filesWithIds);
    });
}
exports.parseUnitTests = parseUnitTests;
