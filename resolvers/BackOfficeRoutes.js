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
exports.accounting = ([_, routes], __, context) => {
    if (routes.accounting && !risqjs_1.isZeroAddress(routes.accounting)) {
        return new risqjs_1.Accounting(context.environment, routes.accounting);
    }
    return null;
};
exports.feeManager = ([_, routes], __, context) => {
    if (routes.feeManager && !risqjs_1.isZeroAddress(routes.feeManager)) {
        return new risqjs_1.FeeManager(context.environment, routes.feeManager);
    }
    return null;
};
exports.participation = ([_, routes], __, context) => {
    if (routes.participation && !risqjs_1.isZeroAddress(routes.participation)) {
        return new risqjs_1.Participation(context.environment, routes.participation);
    }
    return null;
};
exports.policyManager = ([_, routes], __, context) => {
    if (routes.policyManager && !risqjs_1.isZeroAddress(routes.policyManager)) {
        return new risqjs_1.PolicyManager(context.environment, routes.policyManager);
    }
    return null;
};
exports.shares = ([_, routes], __, context) => {
    if (routes.shares && !risqjs_1.isZeroAddress(routes.shares)) {
        return new risqjs_1.Shares(context.environment, routes.shares);
    }
    return null;
};
exports.trading = ([_, routes], __, context) => {
    if (routes.accounting && !risqjs_1.isZeroAddress(routes.accounting)) {
        return [routes, new risqjs_1.Trading(context.environment, routes.trading)];
    }
    return null;
};
exports.vault = ([_, routes], __, context) => {
    if (routes.vault && !risqjs_1.isZeroAddress(routes.vault)) {
        return new risqjs_1.Vault(context.environment, routes.vault);
    }
    return null;
};
exports.registry = ([backoffice], __, context) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield backoffice.getRegistry(context.block);
    if (address && !risqjs_1.isZeroAddress(address)) {
        return new risqjs_1.Registry(context.environment, address);
    }
    return null;
});
exports.version = ([backoffice], __, context) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield backoffice.getVersion(context.block);
    if (address && !risqjs_1.isZeroAddress(address)) {
        return new risqjs_1.Version(context.environment, address);
    }
    return null;
});
