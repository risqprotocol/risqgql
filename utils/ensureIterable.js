"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterall_1 = require("iterall");
exports.ensureIterable = (data) => {
    if (iterall_1.isAsyncIterable(data)) {
        return data;
    }
    return iterall_1.createAsyncIterator([data]);
};
