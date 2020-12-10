"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const graphql_1 = require("graphql");
exports.BigNumber = new graphql_1.GraphQLScalarType({
    name: 'BigNumber',
    serialize: (value) => {
        if (bignumber_js_1.default.isBigNumber(value)) {
            return value;
        }
        return new bignumber_js_1.default(value);
    },
    parseValue: (value) => {
        if (bignumber_js_1.default.isBigNumber(value)) {
            return value;
        }
        return new bignumber_js_1.default(value);
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.INT || ast.kind === graphql_1.Kind.STRING) {
            return new bignumber_js_1.default(ast.value);
        }
        return null;
    },
});
