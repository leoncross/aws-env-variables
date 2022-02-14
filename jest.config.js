module.exports = {
  preset: 'ts-jest',
  roots: ["<rootDir>"],
  "testPathIgnorePatterns": ["build"],
  collectCoverage: true,
  "coverageThreshold": {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  }
};
