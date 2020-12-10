"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const risqjs_1 = require("@risqprotocol/risqjs");
exports.assetWhitelist = (policy, _, context) => {
    const assetWhitelistContract = new risqjs_1.AssetWhitelist(context.environment, policy.contract.address);
    return assetWhitelistContract.getMembers(context.block);
};
