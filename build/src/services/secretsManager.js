"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const writeEnvFile_1 = __importDefault(require("../utils/writeEnvFile"));
const secretsManager = async (options) => {
    if (!options.secretsManagerId) {
        return;
    }
    const client = new aws_sdk_1.default.SecretsManager({
        region: process.env.AWS_DEFAULT_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    await client.getSecretValue({ SecretId: options.secretsManagerId }, (err, data) => {
        if (err) {
            throw err;
        }
        let secrets;
        if ('SecretString' in data) {
            secrets = data.SecretString;
        }
        else if (typeof data.SecretBinary === 'string') {
            const buff = Buffer.from(data.SecretBinary, 'base64');
            secrets = buff.toString('ascii');
        }
        return (0, writeEnvFile_1.default)(options.filePath, options.fileName, secrets);
    });
};
exports.default = secretsManager;
