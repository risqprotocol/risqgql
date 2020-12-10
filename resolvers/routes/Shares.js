"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_utils_1 = require("web3-utils");
exports.address = (shares) => shares.contract.address;
exports.balanceOf = (shares, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const balanceOf = yield shares.getBalanceOf(args.owner, context.block);
    return web3_utils_1.fromWei(balanceOf.toFixed());
});
exports.totalSupply = (shares, _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const totalSupply = yield shares.getTotalSupply(context.block);
    return web3_utils_1.fromWei(totalSupply.toFixed());
});
