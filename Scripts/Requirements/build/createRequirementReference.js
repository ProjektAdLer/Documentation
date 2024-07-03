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
const GetAllRequirements_1 = require("./GetAllRequirements");
const ParseUnitTests_1 = require("./ParseUnitTests");
const WriteRequirementsToListing_1 = require("./WriteRequirementsToListing");
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        const allRequirementsInfos = yield (0, GetAllRequirements_1.GetAllReqInfos)();
        const autorentoolIds = allRequirementsInfos.filter(({ id }) => id.startsWith('A'));
        const backendIds = allRequirementsInfos.filter(({ id }) => id.startsWith('B'));
        const generatorIds = allRequirementsInfos.filter(({ id }) => id.startsWith('G'));
        const engineIds = allRequirementsInfos.filter(({ id }) => id.startsWith('E'));
        const authoringToolReferences = yield (0, ParseUnitTests_1.parseUnitTests)(autorentoolIds, '../../../Autorentool/', ['Test'], ['.cs']);
        const backendReferences = yield (0, ParseUnitTests_1.parseUnitTests)(backendIds, '../../../AdLerBackend/', ['.UnitTest', 'Test'], ['.cs']);
        const generatorReferences = yield (0, ParseUnitTests_1.parseUnitTests)(generatorIds, '../../../Autorentool/', ['Test'], ['.cs']);
        const engineReferences = yield (0, ParseUnitTests_1.parseUnitTests)(engineIds, '../../../2D_3D_AdLer/', ['test'], ['.test.ts', '.test.tsx']);
        (0, WriteRequirementsToListing_1.writeRequirementsToListing)(backendReferences, '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Backend.md', 'AdLerBackend');
        (0, WriteRequirementsToListing_1.writeRequirementsToListing)(authoringToolReferences, '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Autorentool.md', 'Autorentool');
        (0, WriteRequirementsToListing_1.writeRequirementsToListing)(engineReferences, '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Engine.md', '2D_3D_AdLer');
        (0, WriteRequirementsToListing_1.writeRequirementsToListing)(generatorReferences, '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Generator.md', 'Autorentool');
    });
}
Main();
