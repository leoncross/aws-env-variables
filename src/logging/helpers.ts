/* eslint-disable no-console */
const missingArgument = '  Missing Argument:';
const unknownArgument = '  Unknown Argument:';

const missingParameters = (parameter1: string, parameter2: string) => console.log(`${missingArgument} please pass ${parameter1} or ${parameter2}`);

const unknownParameter = (key: string) => console.log(`${unknownArgument} ${key}`);

const noParameterFromSsm = (key: string) => console.log(`No parameter found in SSM Param Store for: ${key}. Setting value as null.`);

export {
  missingParameters,
  unknownParameter,
  noParameterFromSsm,
};
