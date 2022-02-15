"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const writeEnvFile_1 = __importDefault(require("../utils/writeEnvFile"));
const helpers_1 = require("../logging/helpers");
const getParameter = async (client, parameter) => client.getParameter({ Name: parameter, WithDecryption: true })
    .promise()
    .then((params) => { var _a; return (_a = params.Parameter) === null || _a === void 0 ? void 0 : _a.Value; })
    .catch(() => null);
const ssmParamStore = async (options) => {
    if (!options.paramStoreFileName) {
        return;
    }
    const client = new aws_sdk_1.default.SSM({
        region: process.env.AWS_DEFAULT_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const ssmFileParams = fs_1.default.readFileSync(options.paramStoreFileName, 'utf8');
    const formattedParameters = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of Object.entries(JSON.parse(ssmFileParams))) {
        const [key, value] = entry;
        // eslint-disable-next-line no-await-in-loop
        const parameter = await getParameter(client, value).catch((err) => {
            if (err) {
                (0, helpers_1.noParameterFromSsm)(key);
            }
        });
        formattedParameters[key] = parameter || 'null';
    }
    (0, writeEnvFile_1.default)(options.filePath, options.fileName, formattedParameters);
};
exports.default = ssmParamStore;
