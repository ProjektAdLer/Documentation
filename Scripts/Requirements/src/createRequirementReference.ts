import { GetAllReqInfos } from './GetAllRequirements';
import { parseUnitTests as getUnitTestsForRequirements } from './ParseUnitTests';
import { WriteRequirementsToListing } from './WriteRequirementsToListing';

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
    ['.UnitTest'],
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

  WriteRequirementsToListing(
    backendReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Backend.md',
    'AdLerBackend'
  );

  WriteRequirementsToListing(
    authoringToolReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Autorentool.md',
    'Autorentool'
  );

  WriteRequirementsToListing(
    engineReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Engine.md',
    '2D_3D_AdLer'
  );

  WriteRequirementsToListing(
    generatorReferences,
    '../../AdLerDokumentation/Writerside/topics/Auflistung-der-Anforderungen-Generator.md',
    'Autorentool'
  );
}

Main();
