import { AcceptedArguments, DefaultArguments } from '../@types/arguments';
import { unknownParameter } from '../logging/helpers';

const defaultArguments: AcceptedArguments = {
  filePath: DefaultArguments.filePath,
  fileName: DefaultArguments.fileName,
  secretsManagerId: undefined,
  paramStoreFileName: undefined,
};

const getArguments = () => {
  const passedArguments: Array<string> = process
    .argv.slice(2, process.argv.length);

  const possibleFlags = Object.keys(defaultArguments);

  const userArguments = passedArguments.reduce((acc: any, val) => {
    if (val.slice(0, 2) === '--') {
      const [key, value] = val
        .replace('--', '')
        .split('=') as [keyof AcceptedArguments, string];
      if (possibleFlags.includes(key)) {
        acc[key] = value;
      } else {
        unknownParameter(key);
      }
    }
    return acc;
  }, defaultArguments);

  return Object.assign(defaultArguments, userArguments);
};

export default getArguments;
