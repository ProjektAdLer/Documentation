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
Object.defineProperty(exports, "__esModule", { value: true });
const WriteRequirementsToListing_1 = require("./WriteRequirementsToListing");
const GetAllReqIds_1 = require("./GetAllReqIds");
const ParseUnitTests_1 = require("./ParseUnitTests");
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        const allIds = yield (0, GetAllReqIds_1.GetAllReqIds)();
        const autorentoolIds = allIds.filter((id) => id.startsWith('A'));
        const backendIds = allIds.filter((id) => id.startsWith('B'));
        const generatorIds = allIds.filter((id) => id.startsWith('G'));
        const engineIds = allIds.filter((id) => id.startsWith('E'));
        const pluginIds = allIds.filter((id) => id.startsWith('P'));
        const backendReferences = yield (0, ParseUnitTests_1.parseCsUnitTests)(backendIds, '../../../AdLerBackend/', '.UnitTests', '.cs');
        (0, WriteRequirementsToListing_1.WriteRequirementsToListing)(backendReferences, '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Backend.md');
        const authoringToolReferences = yield (0, ParseUnitTests_1.parseCsUnitTests)(autorentoolIds, '../../../Autorentool/', 'Test', '.cs');
        (0, WriteRequirementsToListing_1.WriteRequirementsToListing)(authoringToolReferences, '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Autorentool.md');
        const engineReferences = yield (0, ParseUnitTests_1.parseCsUnitTests)(engineIds, '../../../2D_3D_AdLer/', '', '.test.ts');
        (0, WriteRequirementsToListing_1.WriteRequirementsToListing)(engineReferences, '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Engine.md');
        const generatorReferences = yield (0, ParseUnitTests_1.parseCsUnitTests)(generatorIds, '../../../Autorentool/', 'Test', '.cs');
        (0, WriteRequirementsToListing_1.WriteRequirementsToListing)(generatorReferences, '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Generator.md');
    });
}
Main();
