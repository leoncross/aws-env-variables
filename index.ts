import getSecrets from './src/services';
import getArguments from './src/utils/getArguments';

// load AWS configs
process.env.AWS_SDK_LOAD_CONFIG = 'true';

getSecrets(getArguments()).catch((err) => {
  if (err) {
    throw new Error(err);
  }
});
