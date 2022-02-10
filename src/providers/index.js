const secretsManager = require('./secretsManager')
const ssmParamStore = require('./ssmParamStore')

const {missingParameters } = require('../Logging/helpers')

const aws = async (options) => {
  if (options.service === 'secretsManager') {
    if (options.secretId) {
      return secretsManager(options)
    } else {
      missingParameters('secretId', 'secretsManager')
    }
    return
  }

  if (options.service === 'paramStore') {
    if (options.ssmFile) {
      return ssmParamStore(options)
    } else {
      missingParameters('paramFile', 'paramStore')
    }
    return
  }
  missingParameters('service')
}




module.exports = aws
