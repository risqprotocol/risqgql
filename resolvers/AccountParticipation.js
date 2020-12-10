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
var InvestmentRequestState;
(function (InvestmentRequestState) {
    InvestmentRequestState["VALID"] = "VALID";
    InvestmentRequestState["EXPIRED"] = "EXPIRED";
    InvestmentRequestState["WAITING"] = "WAITING";
    InvestmentRequestState["NONE"] = "NONE";
})(InvestmentRequestState || (InvestmentRequestState = {}));
exports.address = ([participation, _]) => participation.contract.address;
exports.hasInvested = ([participation, account], _, context) => {
    return participation.hasInvested(account, context.block);
};
exports.hasRequest = ([participation, account], _, context) => {
    return participation.hasRequest(account, context.block);
};
exports.hasValidRequest = ([participation, account], _, context) => {
    return participation.hasValidRequest(account, context.block);
};
exports.hasExpiredRequest = ([participation, account], _, context) => {
    return participation.hasExpiredRequest(account, context.block);
};
exports.investmentRequestState = ([participation, account], _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const hasValidRequest = yield participation.hasValidRequest(account, context.block);
    if (hasValidRequest) {
        return InvestmentRequestState.VALID;
    }
    const hasRequest = yield participation.hasRequest(account, context.block);
    if (hasRequest) {
        return InvestmentRequestState.WAITING;
    }
    const hasExpiredRequest = yield participation.hasExpiredRequest(account, context.block);
    if (hasRequest && hasExpiredRequest) {
        return InvestmentRequestState.EXPIRED;
    }
    return InvestmentRequestState.NONE;
});
exports.request = ([participation, account], _, context) => {
    return participation.getRequest(account, context.block);
};
exports.canCancelRequest = ([participation, account], _, context) => {
    return participation.canCancelRequest(account, context.block);
};
