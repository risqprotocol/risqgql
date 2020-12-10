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
exports.address = ([_, performanceFee]) => performanceFee.contract.address;
exports.rate = ([feeManager, performanceFee], _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const rate = yield performanceFee.getPerformanceFeeRate(feeManager.contract.address, context.block);
    return web3_utils_1.fromWei(rate.multipliedBy(100).toFixed());
});
exports.period = ([feeManager, performanceFee], _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const period = yield performanceFee.getPerformanceFeePeriod(feeManager.contract.address, context.block);
    return period ? period / (60 * 60 * 24) : 0;
});
exports.highWaterMark = ([feeManager, performanceFee], _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield performanceFee.getHighWaterMark(feeManager.contract.address, context.block);
    return web3_utils_1.fromWei(result.toFixed());
});
exports.initializeTime = ([feeManager, performanceFee], _, context) => {
    return performanceFee.getInitializeTime(feeManager.contract.address, context.block);
};
exports.lastPayoutTime = ([feeManager, performanceFee], _, context) => {
    return performanceFee.getLastPayoutTime(feeManager.contract.address, context.block);
};
exports.canUpdate = ([feeManager, performanceFee], _, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield performanceFee.canUpdate(feeManager.contract.address, context.block);
    }
    catch (e) {
        return false;
    }
});
