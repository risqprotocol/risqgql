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
const risqjs_1 = require("@risqprotocol/risqjs");
const bignumber_js_1 = require("bignumber.js");
const deploymentContracts_1 = require("../../utils/deploymentContracts");
exports.address = (accounting) => accounting.contract.address;
exports.denominationAsset = (accounting, _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const tokens = context.environment.tokens.filter((item) => !item.historic);
    const denominationAsset = yield accounting.getDenominationAsset(context.block);
    return tokens.find((token) => risqjs_1.sameAddress(token.address, denominationAsset));
});
exports.sharePrice = (accounting, _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const calculations = yield context.loaders.accountingCalculations(accounting);
    return (calculations === null || calculations === void 0 ? void 0 : calculations.sharePrice) ? web3_utils_1.fromWei(calculations.sharePrice.toFixed()) : new bignumber_js_1.BigNumber('NaN');
});
exports.grossAssetValue = (accounting, _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const calculations = yield context.loaders.accountingCalculations(accounting);
    return (calculations === null || calculations === void 0 ? void 0 : calculations.gav) ? web3_utils_1.fromWei(calculations.gav.toFixed()) : new bignumber_js_1.BigNumber('NaN');
});
exports.netAssetValue = (accounting, _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const calculations = yield context.loaders.accountingCalculations(accounting);
    return (calculations === null || calculations === void 0 ? void 0 : calculations.nav) ? web3_utils_1.fromWei(calculations.nav.toFixed()) : new bignumber_js_1.BigNumber('NaN');
});
exports.holdings = (accounting, _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const source = deploymentContracts_1.priceFeedContract(context.environment);
    const [holdings, asset] = yield Promise.all([
        accounting.getFundHoldings(context.block),
        accounting.getDenominationAsset(context.block),
    ]);
    const output = context.environment.tokens.reduce((carry, current) => {
        var _a;
        const holding = holdings.find((holding) => risqjs_1.sameAddress(holding.address, current.address));
        if (!holding && current.historic) {
            return carry;
        }
        const add = {
            address: current.address,
            amount: (_a = holding === null || holding === void 0 ? void 0 : holding.amount) !== null && _a !== void 0 ? _a : new bignumber_js_1.BigNumber(0),
        };
        return [...carry, add];
    }, []);
    // NOTE: This uses the current latest price source on purpose because any new assets
    // that might be added on a new release would otherwise not have a price on old
    // price feeds (e.g. if we used the price source registered in the backoffice).
    const values = yield Promise.all(output.map((holding) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield source.convertQuantity(holding.amount, holding.address, asset, context.block);
        }
        catch (e) {
            return new bignumber_js_1.BigNumber('NaN');
        }
    })));
    const merged = output
        .map((item, index) => (Object.assign(Object.assign({}, item), { value: values[index] })))
        .sort((a, b) => b.value.comparedTo(a.value));
    return merged.map((holding) => [accounting, holding]);
});
