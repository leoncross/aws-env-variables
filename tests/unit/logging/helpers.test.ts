import * as helpers from '../../../src/logging/helpers';

describe('helpers', () => {
  let spyConsoleLog: jest.SpyInstance;

  beforeEach(() => {
    spyConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('missingParameters', () => {
    it('calls console.log with missing parameters', () => {
      const missingParameter1 = 'missingParam1';
      const missingParameter2 = 'missingParam2';

      helpers.missingParameters(missingParameter1, missingParameter2);

      expect(spyConsoleLog).toHaveBeenCalledTimes(1);
      expect(spyConsoleLog).toHaveBeenCalledWith(expect.stringContaining(missingParameter1));
      expect(spyConsoleLog).toHaveBeenCalledWith(expect.stringContaining(missingParameter2));
    });
  });

  describe('unknownParameter', () => {
    it('calls console.log with missing parameter', () => {
      const missingParameter = 'missingParam';

      helpers.unknownParameter(missingParameter);

      expect(spyConsoleLog).toHaveBeenCalledTimes(1);
      expect(spyConsoleLog).toHaveBeenCalledWith(expect.stringContaining(missingParameter));
    });
  });

  describe('noParameterFromSsm', () => {
    it('calls console.log with missing parameter key', () => {
      const missingParameter = 'missingParam';

      helpers.noParameterFromSsm(missingParameter);

      expect(spyConsoleLog).toHaveBeenCalledTimes(1);
      expect(spyConsoleLog).toHaveBeenCalledWith(expect.stringContaining(missingParameter));
    });
  });
});
