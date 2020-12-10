"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.DateTime = new graphql_1.GraphQLScalarType({
    name: 'DateTime',
    serialize: (value) => {
        if (value instanceof Date) {
            return value;
        }
        return new Date(value);
    },
    parseValue: (value) => {
        if (value instanceof Date) {
            return value;
        }
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.INT || ast.kind === graphql_1.Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    },
});
