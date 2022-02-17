import AWS from 'aws-sdk';
import fs from 'fs';
import ssmParamStore from '../../../src/services/ssmParamStore';
import writeEnvFile from '../../../src/utils/writeEnvFile';
import { AcceptedArguments } from '../../../src/@types/arguments';

jest.mock('aws-sdk');
jest.mock('fs');
jest.mock('../../../src/logging/helpers');
jest.mock('../../../src/utils/writeEnvFile');

const mockAwsSsm = AWS.SSM as unknown as jest.Mock;
const mockFsReadFileSync = fs.readFileSync as unknown as jest.Mock;
const mockWriteEnvFile = writeEnvFile as jest.Mock;

describe('ssmParamStore', () => {
  let mockGetParameter: jest.Mock;
  let jsonFileValues: { [key: string]: string };
  let options: AcceptedArguments;

  beforeEach(() => {
    jsonFileValues = { secretKey: 'secretValue' };
    options = {
      filePath: './',
      fileName: '.env',
      secretsManagerId: undefined,
      paramStoreFileName: './params.json',
      loadConfig: false,
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
      loadConfig: false,
    };

    const res = await ssmParamStore(options);

    expect(res).toEqual(undefined);
    expect(mockAwsSsm).not.toBeCalled();
  });

  it('calls AWS SSM with expected parameters', async () => {
    await ssmParamStore(options);

    expect(mockAwsSsm).toHaveBeenCalledWith({
      region: undefined,
      accessKeyId: undefined,
      secretAccessKey: undefined,
    });
  });

  it('calls AWS getParameter with expected parameters', async () => {
    await ssmParamStore(options);

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

    await ssmParamStore(options);

    expect(mockWriteEnvFile).toHaveBeenCalledWith(
      options.filePath,
      options.fileName,
      { [key]: value },
    );
  });

  it('handles no Value on Parameter from getParameter', async () => {
    const key = 'secretKey';
    const value = 'secretValue';
    jsonFileValues = { [key]: value };

    mockFsReadFileSync.mockReturnValue(JSON.stringify(jsonFileValues));
    mockGetParameter.mockImplementation(() => ({
      promise: () => Promise.resolve({}),
    }));

    await ssmParamStore(options);

    expect(mockWriteEnvFile).toHaveBeenCalledWith(
      options.filePath,
      options.fileName,
      { [key]: 'null' },
    );
  });

  it('handles error thrown from getParameter', async () => {
    const key = 'secretKey';
    const value = 'secretValue';
    jsonFileValues = { [key]: value };

    mockFsReadFileSync.mockReturnValue(JSON.stringify(jsonFileValues));
    mockGetParameter.mockImplementation(() => ({
      promise: () => Promise.reject(new Error('errrr')),
    }));

    await ssmParamStore(options);

    expect(mockWriteEnvFile).toHaveBeenCalledWith(
      options.filePath,
      options.fileName,
      { [key]: 'null' },
    );
  });
});
