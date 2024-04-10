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
const GetAllReqIds_1 = require("./GetAllReqIds");
const ParseUnitTests_1 = require("./ParseUnitTests");
const WriteRequirementsToListing_1 = require("./WriteRequirementsToListing");
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        const allRequirementsInfo = yield (0, GetAllReqIds_1.GetAllReqIds)();
        // const autorentoolIds = allRequirementsInfo.filter(({ id }) => id.startsWith('A'));
        // const backendIds = allRequirementsInfo.filter(({ id }) => id.startsWith('B'));
        // const generatorIds = allRequirementsInfo.filter(({ id }) => id.startsWith('G'));
        const engineIds = allRequirementsInfo.filter(({ id }) => id.startsWith('E'));
        // console.log(engineIds);
        // const backendReferences = await parseUnitTests(backendIds, '../../../AdLerBackend/', '.UnitTests', '.cs');
        // WriteRequirementsToListing(
        //   backendReferences,
        //   '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Backend.md'
        // );
        // const authoringToolReferences = await parseUnitTests(autorentoolIds, '../../../Autorentool/', 'Test', '.cs');
        // WriteRequirementsToListing(
        //   authoringToolReferences,
        //   '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Autorentool.md'
        // );
        const engineReferences = yield (0, ParseUnitTests_1.parseUnitTests)(engineIds, '../../../2D_3D_AdLer/', '', '.test.ts');
        console.log(engineReferences);
        (0, WriteRequirementsToListing_1.WriteRequirementsToListing)(engineReferences, '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Engine.md');
        // const generatorReferences = await parseUnitTests(generatorIds, '../../../Autorentool/', 'Test', '.cs');
        // WriteRequirementsToListing(
        //   generatorReferences,
        //   '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Generator.md'
        // );
    });
}
Main();
