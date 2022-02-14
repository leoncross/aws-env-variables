import * as helpers from '../helpers';

describe('helpers', () => {
  let spyConsoleLog: jest.SpyInstance;

  beforeEach(() => {
    spyConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('missingParameters', () => {
    it('calls console.log with missing parameter', () => {
      const missingParameter = 'missingParam';

      helpers.missingParameters(missingParameter);

      expect(spyConsoleLog).toHaveBeenCalledTimes(1);
      expect(spyConsoleLog).toHaveBeenCalledWith(expect.stringContaining(missingParameter));
    });
    it('calls console.log with missing parameter and type', () => {
      const missingParameter = 'missingParam';
      const missingType = 'missingType';

      helpers.missingParameters(missingParameter, missingType);

      expect(spyConsoleLog).toHaveBeenCalledTimes(1);
      expect(spyConsoleLog).toHaveBeenCalledWith(expect.stringMatching(missingParameter));
      expect(spyConsoleLog).toHaveBeenCalledWith(expect.stringMatching(missingType));
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
