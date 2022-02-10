const AWS = require('aws-sdk')
const writeFile = require('../utils/writeEnvFile')

const secretsManager = async (options) => {
  const client = new AWS.SecretsManager({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  await client.getSecretValue({SecretId: options.secretId}, (err, data) => {
    if (err) {
      throw err
    }

    let secret

    if ('SecretString' in data) {
      secret = data.SecretString;
    } else {
      let buff = new Buffer(data.SecretBinary, 'base64');
      secret = buff.toString('ascii');
    }

    const dotEnvFormattedSecret = secret
      .replace(/:/g, "=" )
      .replace(/,/g, "\n" )
      .replace(/{|}|"/g, "" )

    return writeFile(options.filePath, options.fileName, dotEnvFormattedSecret)
  });
}

module.exports = secretsManager



