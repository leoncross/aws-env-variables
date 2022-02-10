const useProvider = require('./src/providers')
const getArguments = require('./src/utils/getArguments')

const options = getArguments()
useProvider(options).catch((err) => {
  if (err) {
    throw new Error(err)
  }
})


// node . --service=secretsManager --secretId=prod/tamagotchi --filePath=./src//
