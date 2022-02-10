const fs = require("fs");

const writeFile = (filePath, fileName, secret) => {
  fs.writeFile(filePath + fileName, secret, (err) => {
    if (err) {
      throw Error
    }
  })
}


module.exports = writeFile
