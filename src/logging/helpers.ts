/* eslint-disable no-console */

const missingArgument = '  Missing Argument:';
const unknownArgument = '  Unknown Argument:';

const missingParameters = (parameter: string, type?: string) => {
  if (parameter && type) {
    return console.log(`${missingArgument} please pass ${parameter} value if using ${type}`);
  }
  return console.log(`${missingArgument} please pass ${parameter}`);
};

const unknownParameter = (key: string) => {
  console.log(`${unknownArgument} ${key}`);
};

const noParameterFromSsm = (key: string) => {
  console.log(`No parameter found in SSM Param Store for: ${key}. Setting value as null.`);
};

export {
  missingParameters,
  unknownParameter,
  noParameterFromSsm,
};
