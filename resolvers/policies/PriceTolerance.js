"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const risqjs_1 = require("@risqprotocol/risqjs");
exports.priceTolerance = (policy, _, context) => {
    const priceToleranceContract = new risqjs_1.PriceTolerance(context.environment, policy.contract.address);
    return priceToleranceContract.getPriceTolerance(context.block);
};
