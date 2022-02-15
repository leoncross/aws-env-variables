"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers = __importStar(require("../../../src/logging/helpers"));
describe('helpers', () => {
    let spyConsoleLog;
    beforeEach(() => {
        spyConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => { });
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
