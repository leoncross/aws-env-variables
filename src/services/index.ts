import { AcceptedArguments } from '../@types/arguments';

const secretsManager = require('./secretsManager');
const ssmParamStore = require('./ssmParamStore');
const { missingParameters } = require('../logging/helpers');

const getSecrets = async (options: AcceptedArguments) => {
  if (!options.secretsManagerId || !options.paramStoreFileName) {
    missingParameters('service');
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
