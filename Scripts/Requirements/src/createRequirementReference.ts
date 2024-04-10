import { GetAllReqIds as GetAllReqInfos } from './GetAllReqIds';
import { parseUnitTests } from './ParseUnitTests';
import { WriteRequirementsToListing } from './WriteRequirementsToListing';

async function Main(): Promise<void> {
  const allRequirementsInfo = await GetAllReqInfos();

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

  const engineReferences = await parseUnitTests(engineIds, '../../../2D_3D_AdLer/', '', '.test.ts');
  console.log(engineReferences);
  WriteRequirementsToListing(
    engineReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Engine.md'
  );

  // const generatorReferences = await parseUnitTests(generatorIds, '../../../Autorentool/', 'Test', '.cs');
  // WriteRequirementsToListing(
  //   generatorReferences,
  //   '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Generator.md'
  // );
}

Main();
