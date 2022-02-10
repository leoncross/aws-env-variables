const defaultArguments = require('../defaultArguments')

function getArguments () {
  const passedArguments = process.argv.slice(2, process.argv.length)

  return passedArguments.reduce((acc, val) => {
    if (val.slice(0,2) === '--') {
      const [key, value] = val.replace('--', '').split('=')
      if (defaultArguments[key] || defaultArguments[key] === null) {
        acc[key] = value
      } else {
        console.log('Unknown parameter passed:', key)
        console.log('Accepted parameters: ---- TO BE IMPLEMENTED')
      }
    }
    return defaultArguments
  }, defaultArguments);
}

module.exports = getArguments
