"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("./src/services"));
const getArguments_1 = __importDefault(require("./src/utils/getArguments"));
// load AWS configs
process.env.AWS_SDK_LOAD_CONFIG = 'true';
(0, services_1.default)((0, getArguments_1.default)()).catch((err) => {
    if (err) {
        throw new Error(err);
    }
});
