"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getArguments_1 = __importDefault(require("../../../src/utils/getArguments"));
const helpers_1 = require("../../../src/logging/helpers");
jest.mock('../../../src/logging/helpers');
const mockUnknownParameter = helpers_1.unknownParameter;
describe('getArguments', () => {
    it('returns default arguments if none are passed', () => {
        process.argv.push();
        const res = (0, getArguments_1.default)();
        expect(res).toEqual({
            fileName: '.env',
            filePath: './',
            loadConfig: false,
        });
    });
    it('updates arguments with flags passed', () => {
        const serviceManager = 'prod/service';
        process.argv.push(`--secretsManagerId=${serviceManager}`, '--loadConfig=true');
        const res = (0, getArguments_1.default)();
        expect(res).toEqual({
            fileName: '.env',
            filePath: './',
            paramStoreFileName: undefined,
            secretsManagerId: serviceManager,
            loadConfig: 'true',
        });
    });
    it('calls unknownParameter if passed unknown parameter', () => {
        const unknownFlag = 'unknown';
        process.argv.push(`--${unknownFlag}=asdf`);
        (0, getArguments_1.default)();
        expect(mockUnknownParameter).toHaveBeenCalledWith(unknownFlag);
    });
    it('handles loadConfig', () => {
    });
});
