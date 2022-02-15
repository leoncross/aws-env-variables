"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const writeEnvFile_1 = __importDefault(require("../../../src/utils/writeEnvFile"));
jest.mock('fs');
const mockFsWriteFile = fs_1.default.writeFile;
describe('writeEnvFile', () => {
    it('formats secret', () => {
        const filePath = './';
        const fileName = '.env';
        const secret = { name: 'leon' };
        (0, writeEnvFile_1.default)(filePath, fileName, secret);
        const formattedSecret = 'name=leon';
        expect(mockFsWriteFile).toHaveBeenCalledWith(`${filePath}${fileName}`, formattedSecret, expect.any(Function));
    });
    it('formats json stringed multi-line secret', () => {
        const filePath = './';
        const fileName = '.env';
        // eslint-disable-next-line
        const secret = JSON.stringify({ name: "leon", db_name: "test" });
        (0, writeEnvFile_1.default)(filePath, fileName, secret);
        const formattedSecret = 'name=leon\ndb_name=test';
        expect(mockFsWriteFile).toHaveBeenCalledWith(`${filePath}${fileName}`, formattedSecret, expect.any(Function));
    });
    it('throws error if error', () => {
        mockFsWriteFile.mockImplementation((_a, _b, callback) => {
            callback(new Error());
        });
        const filePath = './';
        const fileName = '.env';
        const secret = { name: 'leon' };
        expect(() => {
            (0, writeEnvFile_1.default)(filePath, fileName, secret);
        }).toThrow(Error);
        expect.assertions(1);
    });
});
