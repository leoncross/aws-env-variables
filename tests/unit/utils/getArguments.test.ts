import getArguments from '../../../src/utils/getArguments';
import { unknownParameter } from '../../../src/logging/helpers';

jest.mock('../../../src/logging/helpers');

const mockUnknownParameter = unknownParameter as jest.Mock;

describe('getArguments', () => {
  it('returns default arguments if none are passed', () => {
    process.argv.push();

    const res = getArguments();

    expect(res).toEqual({
      fileName: '.env',
      filePath: './',
    });
  });

  it('updates arguments with flags passed', () => {
    const serviceManager = 'prod/service';
    process.argv.push(`--secretsManagerId=${serviceManager}`);

    const res = getArguments();

    expect(res).toEqual({
      fileName: '.env',
      filePath: './',
      paramStoreFileName: undefined,
      secretsManagerId: serviceManager,
    });
  });

  it('calls unknownParameter if passed unknown parameter', () => {
    const unknownFlag = 'unknown';
    process.argv.push(`--${unknownFlag}=asdf`);

    getArguments();

    expect(mockUnknownParameter).toHaveBeenCalledWith(unknownFlag);
  });
});
