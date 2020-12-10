"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const risqjs_1 = require("@risqprotocol/risqjs");
exports.maxConcentration = (policy, _, context) => {
    const maxConcentrationContract = new risqjs_1.MaxConcentration(context.environment, policy.contract.address);
    return maxConcentrationContract.getMaxConcentration(context.block);
};
