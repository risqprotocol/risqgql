"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const risqjs_1 = require("@risqprotocol/risqjs");
exports.maxPositions = (policy, _, context) => {
    const maxPositionsContract = new risqjs_1.MaxPositions(context.environment, policy.contract.address);
    return maxPositionsContract.getMaxPositions(context.block);
};
