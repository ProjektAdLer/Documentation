import { WriteRequirementsToListing } from './WriteRequirementsToListing';
import { GetAllReqIds } from './GetAllReqIds';
import { parseCsUnitTests as parseUnitTests } from './ParseUnitTests';

async function Main(): Promise<void> {
  const allRequirementsInfo = await GetAllReqIds();

  const autorentoolIds = allRequirementsInfo.filter(({ id }) => id.startsWith('A'));
  const backendIds = allRequirementsInfo.filter(({ id }) => id.startsWith('B'));
  const generatorIds = allRequirementsInfo.filter(({ id }) => id.startsWith('G'));
  const engineIds = allRequirementsInfo.filter(({ id }) => id.startsWith('E'));

  const backendReferences = await parseUnitTests(backendIds, '../../../AdLerBackend/', '.UnitTests', '.cs');
  WriteRequirementsToListing(
    backendReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Backend.md'
  );

  const authoringToolReferences = await parseUnitTests(autorentoolIds, '../../../Autorentool/', 'Test', '.cs');
  WriteRequirementsToListing(
    authoringToolReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Autorentool.md'
  );

  const engineReferences = await parseUnitTests(engineIds, '../../../2D_3D_AdLer/', '', '.test.ts');
  WriteRequirementsToListing(
    engineReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Engine.md'
  );

  const generatorReferences = await parseUnitTests(generatorIds, '../../../Autorentool/', 'Test', '.cs');
  WriteRequirementsToListing(
    generatorReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Generator.md'
  );
}

Main();
