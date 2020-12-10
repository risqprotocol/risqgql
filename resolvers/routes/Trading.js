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
const risqjs_1 = require("@risqprotocol/risqjs");
exports.address = ([, trading]) => trading.contract.address;
exports.openMakeOrders = ([, trading], _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const openMakeOrders = yield trading.getOpenMakeOrders(context.block);
    const orders = Promise.all(openMakeOrders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
        const details = yield trading.getOrderDetails(order.orderIndex, context.block);
        return Object.assign(Object.assign({}, order), details);
    })));
    return orders;
});
exports.lockedAssets = ([routes, trading], _, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (!routes.accounting) {
        return false;
    }
    const accounting = new risqjs_1.Accounting(context.environment, routes.accounting);
    const assets = yield accounting.getOwnedAssets(context.block);
    const balances = yield Promise.all(assets.map((address) => __awaiter(void 0, void 0, void 0, function* () {
        const instance = new risqjs_1.ERC20WithFields(context.environment, address);
        return [address, yield instance.getBalanceOf(trading.contract.address, context.block)];
    })));
    return balances.filter(([_, balance]) => !balance.isZero()).map(([address]) => context.environment.getToken(address));
});
exports.exchanges = ([, trading], _, context) => {
    return trading.getExchangeInfo(context.block);
};
