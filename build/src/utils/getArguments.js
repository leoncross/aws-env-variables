"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../logging/helpers");
const defaultArguments = {
    filePath: "./" /* filePath */,
    fileName: ".env" /* fileName */,
    secretsManagerId: undefined,
    paramStoreFileName: undefined,
};
const getArguments = () => {
    const passedArguments = process
        .argv.slice(2, process.argv.length);
    const possibleFlags = Object.keys(defaultArguments);
    const userArguments = passedArguments.reduce((acc, val) => {
        if (val.slice(0, 2) === '--') {
            const [key, value] = val
                .replace('--', '')
                .split('=');
            if (possibleFlags.includes(key)) {
                acc[key] = value;
            }
            else {
                (0, helpers_1.unknownParameter)(key);
            }
        }
        return acc;
    }, defaultArguments);
    return Object.assign(defaultArguments, userArguments);
};
exports.default = getArguments;
