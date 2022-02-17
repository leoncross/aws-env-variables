const enum DefaultArguments {
  filePath = './',
  fileName = '.env',
}

type AcceptedArguments = {
  filePath: string
  fileName: string
  secretsManagerId: undefined | string
  paramStoreFileName: undefined | string
  loadConfig: string | boolean
};

export {
  DefaultArguments,
  AcceptedArguments,
};
