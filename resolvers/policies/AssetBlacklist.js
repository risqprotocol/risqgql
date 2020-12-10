"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const risqjs_1 = require("@risqprotocol/risqjs");
exports.assetBlacklist = (policy, _, context) => {
    const assetBlacklistContract = new risqjs_1.AssetBlacklist(context.environment, policy.contract.address);
    return assetBlacklistContract.getMembers(context.block);
};
