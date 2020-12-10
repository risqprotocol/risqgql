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
exports.address = (shares) => shares.contract.address;
exports.historicalInvestors = (participation, _, context) => __awaiter(void 0, void 0, void 0, function* () {
    return participation.getHistoricalInvestors(context.block);
});
exports.allowedAssets = (participation, _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const tokens = context.environment.tokens.filter((item) => !item.historic);
    const resolved = yield Promise.all(tokens.map((token) => __awaiter(void 0, void 0, void 0, function* () {
        return ({
            token,
            allowed: yield participation.canInvestWithAsset(token.address, context.block),
        });
    })));
    return resolved.filter((item) => item.allowed).map((item) => [participation, item.token]);
});
