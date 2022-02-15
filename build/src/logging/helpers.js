"use strict";
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noParameterFromSsm = exports.unknownParameter = exports.missingParameters = void 0;
const missingArgument = '  Missing Argument:';
const unknownArgument = '  Unknown Argument:';
const missingParameters = (parameter1, parameter2) => console.log(`${missingArgument} please pass ${parameter1} or ${parameter2}`);
exports.missingParameters = missingParameters;
const unknownParameter = (key) => {
    console.log(`${unknownArgument} ${key}`);
};
exports.unknownParameter = unknownParameter;
const noParameterFromSsm = (key) => {
    console.log(`No parameter found in SSM Param Store for: ${key}. Setting value as null.`);
};
exports.noParameterFromSsm = noParameterFromSsm;
