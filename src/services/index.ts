import { AcceptedArguments } from '../@types/arguments';

import secretsManager from './secretsManager';
import ssmParamStore from './ssmParamStore';
import { missingParameters } from '../logging/helpers';

const getSecrets = async (options: AcceptedArguments) => {
  if (!options.secretsManagerId && !options.paramStoreFileName) {
    missingParameters('secretsManagerId', 'paramStoreFileName');
    return;
  }

  if (options.secretsManagerId) {
    await secretsManager(options);
    return;
  }

  if (options.paramStoreFileName) {
    await ssmParamStore(options);
  }
};

export default getSecrets;
