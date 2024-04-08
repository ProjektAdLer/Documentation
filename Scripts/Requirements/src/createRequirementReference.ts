import { WriteRequirementsToListing } from './WriteRequirementsToListing';
import { GetAllReqIds } from './GetAllReqIds';
import { parseCsUnitTests } from './ParseUnitTests';

async function Main(): Promise<void> {
  const allIds = await GetAllReqIds();

  const autorentoolIds = allIds.filter((id: string) => id.startsWith('A'));
  const backendIds = allIds.filter((id: string) => id.startsWith('B'));
  const generatorIds = allIds.filter((id: string) => id.startsWith('G'));
  const engineIds = allIds.filter((id: string) => id.startsWith('E'));
  const pluginIds = allIds.filter((id: string) => id.startsWith('P'));

  const backendReferences = await parseCsUnitTests(backendIds, '../../../AdLerBackend/', '.UnitTests', '.cs');
  WriteRequirementsToListing(
    backendReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Backend.md'
  );

  const authoringToolReferences = await parseCsUnitTests(autorentoolIds, '../../../Autorentool/', 'Test', '.cs');
  WriteRequirementsToListing(
    authoringToolReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Autorentool.md'
  );

  const engineReferences = await parseCsUnitTests(engineIds, '../../../2D_3D_AdLer/', '', '.test.ts');
  WriteRequirementsToListing(
    engineReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Engine.md'
  );

  const generatorReferences = await parseCsUnitTests(generatorIds, '../../../Autorentool/', 'Test', '.cs');
  WriteRequirementsToListing(
    generatorReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Generator.md'
  );
}

Main();
