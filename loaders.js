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
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const ramda_1 = require("ramda");
const risqjs_1 = require("@risqprotocol/risqjs");
exports.block = (context) => (number) => {
    const eth = context.environment.client;
    return eth.getBlock(number);
};
exports.balanceOf = (context) => {
    return (token, account) => __awaiter(void 0, void 0, void 0, function* () {
        if (token === 'ETH') {
            const balance = yield context.environment.client.getBalance(account, context.block);
            return new bignumber_js_1.default(balance);
        }
        const instance = new risqjs_1.ERC20WithFields(context.environment, token);
        return instance.getBalanceOf(account, context.block);
    });
};
exports.allowance = (context) => {
    return (token, owner, spender) => {
        const instance = new risqjs_1.ERC20WithFields(context.environment, token);
        return instance.getAllowance(owner, spender, context.block);
    };
};
exports.accountingCalculations = (context) => {
    return ramda_1.memoizeWith((accounting) => accounting.contract.address, (accounting) => __awaiter(void 0, void 0, void 0, function* () {
        const fundPriceSource = yield accounting.getPriceSource(context.block);
        const deploymentPriceSource = context.environment.deployment.risq.addr.KyberPriceFeed;
        try {
            if (!risqjs_1.sameAddress(fundPriceSource, deploymentPriceSource)) {
                return yield accounting.getManualCalculationResults(context.block);
            }
            return yield accounting.getCalculationResults(context.block);
        }
        catch (e) {
            return null;
        }
    }));
};
