import AWS from 'aws-sdk';
import fs from 'fs';
import writeEnvFile from '../utils/writeEnvFile';
import { AcceptedArguments } from '../@types/arguments';
import { noParameterFromSsm } from '../logging/helpers';

const getParameter = async (client: AWS.SSM, parameter: string) => client.getParameter(
  { Name: parameter, WithDecryption: true },
)
  .promise()
  .then((params) => params.Parameter?.Value)
  .catch(() => null);

const ssmParamStore = async (options: AcceptedArguments) => {
  if (!options.paramStoreFileName) {
    return;
  }

  const client = new AWS.SSM({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const ssmFileParams = fs.readFileSync(options.paramStoreFileName, 'utf8');
  const formattedParameters: { [key: string]: string } = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const entry of Object.entries(JSON.parse(ssmFileParams))) {
    const [key, value] = entry as [string, string];
    // eslint-disable-next-line no-await-in-loop
    const parameter = await getParameter(client, value).catch((err) => {
      if (err) {
        noParameterFromSsm(key);
      }
    });

    formattedParameters[key] = parameter || 'null';
  }
  writeEnvFile(options.filePath, options.fileName, formattedParameters);
};

export default ssmParamStore;
