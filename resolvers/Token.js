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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_utils_1 = require("web3-utils");
const deploymentContracts_1 = require("../utils/deploymentContracts");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
exports.price = (token, _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const source = deploymentContracts_1.priceFeedContract(context.environment);
    try {
        const price = yield source.getPrice(token.address, context.block);
        return new bignumber_js_1.default(web3_utils_1.fromWei(price.price.toFixed()));
    }
    catch (e) {
        return new bignumber_js_1.default('NaN');
    }
});
exports.balance = (token, args, context) => {
    return context.loaders.balanceOf(token.address, args.account);
};
