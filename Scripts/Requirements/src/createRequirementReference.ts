import { GetAllReqInfos } from './GetAllRequirements';
import { parseUnitTests as getUnitTestsForRequirements } from './ParseUnitTests';
import { writeRequirementsToListing } from './WriteRequirementsToListing';

async function Main(): Promise<void> {
  const allRequirementsInfos = await GetAllReqInfos();

  const autorentoolIds = allRequirementsInfos.filter(({ id }) => id.startsWith('A'));
  const backendIds = allRequirementsInfos.filter(({ id }) => id.startsWith('B'));
  const generatorIds = allRequirementsInfos.filter(({ id }) => id.startsWith('G'));
  const engineIds = allRequirementsInfos.filter(({ id }) => id.startsWith('E'));

  const authoringToolReferences = await getUnitTestsForRequirements(
    autorentoolIds,
    '../../../Autorentool/',
    ['Test'],
    ['.cs']
  );
  const backendReferences = await getUnitTestsForRequirements(
    backendIds,
    '../../../AdLerBackend/',
    ['.UnitTest', 'Test'],
    ['.cs']
  );
  const generatorReferences = await getUnitTestsForRequirements(
    generatorIds,
    '../../../Autorentool/',
    ['Test'],
    ['.cs']
  );
  const engineReferences = await getUnitTestsForRequirements(
    engineIds,
    '../../../2D_3D_AdLer/',
    ['test'],
    ['.test.ts', '.test.tsx']
  );

  writeRequirementsToListing(
    backendReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Backend.md',
    'AdLerBackend'
  );

  writeRequirementsToListing(
    authoringToolReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Autorentool.md',
    'Autorentool'
  );

  writeRequirementsToListing(
    engineReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Engine.md',
    '2D_3D_AdLer'
  );

  writeRequirementsToListing(
    generatorReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Generator.md',
    'Autorentool'
  );
}

Main();
