import AWS from 'aws-sdk';
import secretsManager from '../secretsManager';
import { AcceptedArguments } from '../../@types/arguments';
import writeEnvFile from '../../utils/writeEnvFile';

jest.mock('aws-sdk');
jest.mock('../../utils/writeEnvFile');

const mockAwsSecretsManager = AWS.SecretsManager as unknown as jest.Mock;
const mockWriteEnvFile = writeEnvFile as jest.Mock;

describe('secretsManager', () => {
  let mockGetSecretValue: jest.Mock;

  beforeEach(() => {
    mockGetSecretValue = jest.fn();

    mockAwsSecretsManager.mockReturnValue({
      getSecretValue: mockGetSecretValue,
    });
  });

  it('does not call aws secrets manager if secretsManagerId is undefined', async () => {
    const options: AcceptedArguments = {
      filePath: './',
      fileName: '.env',
      secretsManagerId: undefined,
      paramStoreFileName: undefined,
    };

    const res = await secretsManager(options);

    expect(res).toEqual(undefined);
    expect(mockAwsSecretsManager).not.toBeCalled();
  });

  it('calls AWS SecretsManager with expected parameters', async () => {
    const options: AcceptedArguments = {
      filePath: './',
      fileName: '.env',
      secretsManagerId: 'prod/calculatorService',
      paramStoreFileName: undefined,
    };

    await secretsManager(options);

    expect(mockAwsSecretsManager).toHaveBeenCalledWith({
      region: undefined,
      accessKeyId: undefined,
      secretAccessKey: undefined,
    });
  });

  it('calls getSecretValue with SecretManagerId and callback function', async () => {
    const options: AcceptedArguments = {
      filePath: './',
      fileName: '.env',
      secretsManagerId: 'prod/calculatorService',
      paramStoreFileName: undefined,
    };

    await secretsManager(options);

    expect(mockGetSecretValue).toHaveBeenCalledWith(
      { SecretId: options.secretsManagerId },
      expect.any(Function),
    );
  });

  it('secret as string and calls writeEnvFile with filePath, fileName and secret', async () => {
    const options: AcceptedArguments = {
      filePath: './',
      fileName: '.env',
      secretsManagerId: 'prod/calculatorService',
      paramStoreFileName: undefined,
    };

    const secrets = 'I am a secret';

    mockGetSecretValue.mockImplementation((params: any, callback: any) => {
      callback(null, { SecretString: secrets });
    });

    await secretsManager(options);

    expect(mockWriteEnvFile).toHaveBeenCalledWith(
      options.filePath,
      options.fileName,
      secrets,
    );
  });

  it('secret as Buffer and calls writeEnvFile with filePath, fileName and secret', async () => {
    const options: AcceptedArguments = {
      filePath: './',
      fileName: '.env',
      secretsManagerId: 'prod/calculatorService',
      paramStoreFileName: undefined,
    };

    const secret = 'I am a secret';

    mockGetSecretValue.mockImplementation((params: any, callback: any) => {
      callback(null, { SecretBinary: Buffer.from(secret).toString('base64') });
    });

    await secretsManager(options);

    expect(mockWriteEnvFile).toHaveBeenCalledWith(
      options.filePath,
      options.fileName,
      secret,
    );
  });

  it('handles thrown error on function getSecretValue', async () => {
    const options: AcceptedArguments = {
      filePath: './',
      fileName: '.env',
      secretsManagerId: 'prod/calculatorService',
      paramStoreFileName: undefined,
    };

    const error = new Error('I am an error');

    mockGetSecretValue.mockImplementation((params: any, callback: any) => {
      callback(error, null);
    });

    await secretsManager(options).catch((err) => {
      expect(err).toEqual(error);
    });

    expect.assertions(1);
  });
});
