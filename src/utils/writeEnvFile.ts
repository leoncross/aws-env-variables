const fs = require('fs');

const writeEnvFile = (filePath: string, fileName:string, secret: any) => {
  const dotEnvFormattedSecret = JSON.stringify(secret)
    .replace(/:/g, '=')
    .replace(/,/g, '\n')
    .replace(/[{}"\\]/gm, '');

  fs.writeFile(filePath + fileName, dotEnvFormattedSecret, (err: string | undefined) => {
    if (err) {
      throw Error(err);
    }
  });
};

export default writeEnvFile;
