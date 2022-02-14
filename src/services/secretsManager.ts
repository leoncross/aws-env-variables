import AWS from 'aws-sdk';
import writeEnvFile from '../utils/writeEnvFile';
import { AcceptedArguments } from '../@types/arguments';

const secretsManager = async (options: AcceptedArguments) => {
  if (!options.secretsManagerId) {
    return;
  }
  const client = new AWS.SecretsManager({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  await client.getSecretValue({ SecretId: options.secretsManagerId }, (err, data) => {
    if (err) {
      throw err;
    }

    let secrets;
    if ('SecretString' in data) {
      secrets = data.SecretString;
    } else if (typeof data.SecretBinary === 'string') {
      const buff = Buffer.from(data.SecretBinary, 'base64');
      secrets = buff.toString('ascii');
    }

    return writeEnvFile(options.filePath, options.fileName, secrets);
  });
};

export default secretsManager;
