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
const deploymentContracts_1 = require("../utils/deploymentContracts");
exports.address = (address) => address;
exports.balance = (account, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    return context.loaders.balanceOf(args.token, account);
});
exports.allowance = (account, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    return context.loaders.allowance(args.token, account, args.spender);
});
exports.fund = (account, _, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const version = deploymentContracts_1.versionContract(context.environment);
        const address = yield version.getManagersToBackOffices(account, context.block);
        const backoffice = new risqjs_1.BackOffice(context.environment, address);
        // Duck typing the backoffice contract. If we can fetch a creator for the given
        // address, we assume that it's a valida backoffice address.
        const creator = yield backoffice.getCreator(context.block);
        return creator && backoffice;
    }
    catch (e) {
        return null;
    }
});
exports.participation = (account, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const backoffice = new risqjs_1.BackOffice(context.environment, args.address);
    const routes = yield backoffice.getRoutes(context.block);
    if (!routes.participation) {
        return null;
    }
    const contract = new risqjs_1.Participation(context.environment, routes.participation);
    return [contract, account];
});
exports.shares = (account, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const backoffice = new risqjs_1.BackOffice(context.environment, args.address);
    const routes = yield backoffice.getRoutes(context.block);
    if (!routes.shares) {
        return null;
    }
    const contract = new risqjs_1.Shares(context.environment, routes.shares);
    return [contract, account];
});
