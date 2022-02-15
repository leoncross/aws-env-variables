"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const writeEnvFile = (filePath, fileName, secret) => {
    const dotEnvFormattedSecret = JSON.stringify(secret)
        .replace(/:/g, '=')
        .replace(/,/g, '\n')
        .replace(/{|}|"/g, '');
    fs.writeFile(filePath + fileName, dotEnvFormattedSecret, (err) => {
        if (err) {
            throw Error(err);
        }
    });
};
exports.default = writeEnvFile;
