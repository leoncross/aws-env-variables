"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const secretsManager_1 = __importDefault(require("../../../src/services/secretsManager"));
const writeEnvFile_1 = __importDefault(require("../../../src/utils/writeEnvFile"));
jest.mock('aws-sdk');
jest.mock('../../../src/utils/writeEnvFile');
const mockAwsSecretsManager = aws_sdk_1.default.SecretsManager;
const mockWriteEnvFile = writeEnvFile_1.default;
describe('secretsManager', () => {
    let mockGetSecretValue;
    beforeEach(() => {
        mockGetSecretValue = jest.fn();
        mockAwsSecretsManager.mockReturnValue({
            getSecretValue: mockGetSecretValue,
        });
    });
    it('does not call aws secrets manager if secretsManagerId is undefined', async () => {
        const options = {
            filePath: './',
            fileName: '.env',
            secretsManagerId: undefined,
            paramStoreFileName: undefined,
            loadConfig: false,
        };
        const res = await (0, secretsManager_1.default)(options);
        expect(res).toEqual(undefined);
        expect(mockAwsSecretsManager).not.toBeCalled();
    });
    it('calls AWS SecretsManager with expected parameters', async () => {
        const options = {
            filePath: './',
            fileName: '.env',
            secretsManagerId: 'prod/calculatorService',
            paramStoreFileName: undefined,
            loadConfig: false,
        };
        await (0, secretsManager_1.default)(options);
        expect(mockAwsSecretsManager).toHaveBeenCalledWith({
            region: undefined,
            accessKeyId: undefined,
            secretAccessKey: undefined,
        });
    });
    it('calls getSecretValue with SecretManagerId and callback function', async () => {
        const options = {
            filePath: './',
            fileName: '.env',
            secretsManagerId: 'prod/calculatorService',
            paramStoreFileName: undefined,
            loadConfig: false,
        };
        await (0, secretsManager_1.default)(options);
        expect(mockGetSecretValue).toHaveBeenCalledWith({ SecretId: options.secretsManagerId }, expect.any(Function));
    });
    it('secret as string and calls writeEnvFile with filePath, fileName and secret', async () => {
        const options = {
            filePath: './',
            fileName: '.env',
            secretsManagerId: 'prod/calculatorService',
            paramStoreFileName: undefined,
            loadConfig: false,
        };
        const secrets = 'I am a secret';
        mockGetSecretValue.mockImplementation((params, callback) => {
            callback(null, { SecretString: secrets });
        });
        await (0, secretsManager_1.default)(options);
        expect(mockWriteEnvFile).toHaveBeenCalledWith(options.filePath, options.fileName, secrets);
    });
    it('secret as Buffer and calls writeEnvFile with filePath, fileName and secret', async () => {
        const options = {
            filePath: './',
            fileName: '.env',
            secretsManagerId: 'prod/calculatorService',
            paramStoreFileName: undefined,
            loadConfig: false,
        };
        const secret = 'I am a secret';
        mockGetSecretValue.mockImplementation((params, callback) => {
            callback(null, { SecretBinary: Buffer.from(secret).toString('base64') });
        });
        await (0, secretsManager_1.default)(options);
        expect(mockWriteEnvFile).toHaveBeenCalledWith(options.filePath, options.fileName, secret);
    });
    it('handles thrown error on function getSecretValue', async () => {
        const options = {
            filePath: './',
            fileName: '.env',
            secretsManagerId: 'prod/calculatorService',
            paramStoreFileName: undefined,
            loadConfig: false,
        };
        const error = new Error('I am an error');
        mockGetSecretValue.mockImplementation((params, callback) => {
            callback(error, null);
        });
        await (0, secretsManager_1.default)(options).catch((err) => {
            expect(err).toEqual(error);
        });
        expect.assertions(1);
    });
});
