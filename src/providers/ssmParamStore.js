const AWS = require("aws-sdk");

const getParameter = async (client, parameter) => {
  return client.getParameter({ Name: parameter, WithDecryption: true })
    .promise()
    .then((params) => params.Value)
    .catch((err) => { throw err });
}

const ssmParamStore = async (options) => {
  const client = new AWS.SSM({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const getParams = []
  const formattedParams = {}

  for (const param of getParams) {
    const value = await getParameter(client, param)
    if (value) {
      formattedParams[param] = value
    }
  }


}

module.exports = ssmParamStore
