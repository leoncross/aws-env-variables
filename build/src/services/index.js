"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secretsManager_1 = __importDefault(require("./secretsManager"));
const ssmParamStore_1 = __importDefault(require("./ssmParamStore"));
const helpers_1 = require("../logging/helpers");
const getSecrets = async (options) => {
    if (!options.secretsManagerId && !options.paramStoreFileName) {
        (0, helpers_1.missingParameters)('secretsManagerId', 'paramStoreFileName');
        return;
    }
    if (options.secretsManagerId) {
        await (0, secretsManager_1.default)(options);
        return;
    }
    if (options.paramStoreFileName) {
        await (0, ssmParamStore_1.default)(options);
    }
};
exports.default = getSecrets;
