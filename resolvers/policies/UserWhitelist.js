"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const risqjs_1 = require("@risqprotocol/risqjs");
exports.isWhitelisted = (policy, args, context) => {
    const userWhitelistContract = new risqjs_1.UserWhitelist(context.environment, policy.contract.address);
    return userWhitelistContract.isWhitelisted(args.address, context.block);
};
