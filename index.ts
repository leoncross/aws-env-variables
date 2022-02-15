import getSecrets from './src/services';
import getArguments from './src/utils/getArguments';

getSecrets(getArguments()).catch((err) => {
  if (err) {
    throw new Error(err);
  }
});
