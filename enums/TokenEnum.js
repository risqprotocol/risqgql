"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const defaults = {
    ETH: 'ETH',
};
function createTokenEnum(environment) {
    const addresses = environment.deployment.tokens.addr;
    return Object.keys(addresses).reduce((carry, current) => {
        return Object.assign(Object.assign({}, carry), { [current]: addresses[current] });
    }, defaults);
}
exports.createTokenEnum = createTokenEnum;
function createTokenEnumDefinition(values) {
    const definition = Object.keys(values).join('\n');
    return graphql_tag_1.default `
    enum TokenEnum {
      ${definition}
    }
  `;
}
exports.createTokenEnumDefinition = createTokenEnumDefinition;
