import fs from 'fs';
import writeEnvFile from '../../../src/utils/writeEnvFile';

jest.mock('fs');

const mockFsWriteFile = fs.writeFile as unknown as jest.Mock;

describe('writeEnvFile', () => {
  it('formats secret before writing file', () => {
    const filePath = './';
    const fileName = '.env';
    const secret = { name: 'leon' };

    writeEnvFile(filePath, fileName, secret);

    const formattedSecret = 'name=leon';

    expect(mockFsWriteFile).toHaveBeenCalledWith(
      `${filePath}${fileName}`,
      formattedSecret,
      expect.any(Function),
    );
  });

  it('throws error if error', () => {
    mockFsWriteFile.mockImplementation((_a, _b, callback) => {
      callback(new Error());
    });

    const filePath = './';
    const fileName = '.env';
    const secret = { name: 'leon' };

    expect(() => {
      writeEnvFile(filePath, fileName, secret);
    }).toThrow(Error);

    expect.assertions(1);
  });
});
