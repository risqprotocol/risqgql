"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.address = (source) => source.contract.address;
exports.lastUpdate = (source, _, context) => {
    return source.getLastUpdate(context.block);
};
