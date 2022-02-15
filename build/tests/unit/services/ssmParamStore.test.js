"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const ssmParamStore_1 = __importDefault(require("../../../src/services/ssmParamStore"));
const writeEnvFile_1 = __importDefault(require("../../../src/utils/writeEnvFile"));
jest.mock('aws-sdk');
jest.mock('fs');
jest.mock('../../../src/logging/helpers');
jest.mock('../../../src/utils/writeEnvFile');
const mockAwsSsm = aws_sdk_1.default.SSM;
const mockFsReadFileSync = fs_1.default.readFileSync;
const mockWriteEnvFile = writeEnvFile_1.default;
describe('ssmParamStore', () => {
    let mockGetParameter;
    let jsonFileValues;
    let options;
    beforeEach(() => {
        jsonFileValues = { secretKey: 'secretValue' };
        options = {
            filePath: './',
            fileName: '.env',
            secretsManagerId: undefined,
            paramStoreFileName: './params.json',
        };
        mockGetParameter = jest.fn();
        mockAwsSsm.mockReturnValue({
            getParameter: mockGetParameter,
        });
        mockFsReadFileSync.mockReturnValue(JSON.stringify(jsonFileValues));
    });
    it('does not call aws getParameter if paramStoreFileName is undefined', async () => {
        options = {
            filePath: './',
            fileName: '.env',
            secretsManagerId: undefined,
            paramStoreFileName: undefined,
        };
        const res = await (0, ssmParamStore_1.default)(options);
        expect(res).toEqual(undefined);
        expect(mockAwsSsm).not.toBeCalled();
    });
    it('calls AWS SSM with expected parameters', async () => {
        await (0, ssmParamStore_1.default)(options);
        expect(mockAwsSsm).toHaveBeenCalledWith({
            region: undefined,
            accessKeyId: undefined,
            secretAccessKey: undefined,
        });
    });
    it('calls AWS getParameter with expected parameters', async () => {
        await (0, ssmParamStore_1.default)(options);
        expect(mockGetParameter).toHaveBeenCalledWith({
            Name: jsonFileValues.secretKey, WithDecryption: true,
        });
    });
    it('calls writeEnvFile with filePath, fileName and secret', async () => {
        const key = 'secretKey';
        const value = 'secretValue';
        jsonFileValues = { [key]: value };
        mockFsReadFileSync.mockReturnValue(JSON.stringify(jsonFileValues));
        mockGetParameter.mockImplementation(() => ({
            promise: () => Promise.resolve({ Parameter: { Value: value } }),
        }));
        await (0, ssmParamStore_1.default)(options);
        expect(mockWriteEnvFile).toHaveBeenCalledWith(options.filePath, options.fileName, { [key]: value });
    });
    it('handles no Value on Parameter from getParameter', async () => {
        const key = 'secretKey';
        const value = 'secretValue';
        jsonFileValues = { [key]: value };
        mockFsReadFileSync.mockReturnValue(JSON.stringify(jsonFileValues));
        mockGetParameter.mockImplementation(() => ({
            promise: () => Promise.resolve({}),
        }));
        await (0, ssmParamStore_1.default)(options);
        expect(mockWriteEnvFile).toHaveBeenCalledWith(options.filePath, options.fileName, { [key]: 'null' });
    });
    it('handles error thrown from getParameter', async () => {
        const key = 'secretKey';
        const value = 'secretValue';
        jsonFileValues = { [key]: value };
        mockFsReadFileSync.mockReturnValue(JSON.stringify(jsonFileValues));
        mockGetParameter.mockImplementation(() => ({
            promise: () => Promise.reject(new Error('errrr')),
        }));
        await (0, ssmParamStore_1.default)(options);
        expect(mockWriteEnvFile).toHaveBeenCalledWith(options.filePath, options.fileName, { [key]: 'null' });
    });
});
