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
var SetupProgress;
(function (SetupProgress) {
    SetupProgress["BEGIN"] = "BEGIN";
    SetupProgress["ACCOUNTING"] = "ACCOUNTING";
    SetupProgress["FEE_MANAGER"] = "FEE_MANAGER";
    SetupProgress["PARTICIPATION"] = "PARTICIPATION";
    SetupProgress["POLICY_MANAGER"] = "POLICY_MANAGER";
    SetupProgress["SHARES"] = "SHARES";
    SetupProgress["TRADING"] = "TRADING";
    SetupProgress["VAULT"] = "VAULT";
    SetupProgress["COMPLETE"] = "COMPLETE";
})(SetupProgress || (SetupProgress = {}));
exports.address = (backoffice) => backoffice.contract.address;
exports.name = (backoffice, _, context) => backoffice.getName(context.block);
exports.manager = (backoffice, _, context) => backoffice.getManager(context.block);
exports.creator = (backoffice, _, context) => backoffice.getCreator(context.block);
exports.creationTime = (backoffice, _, context) => backoffice.getCreationTime(context.block);
exports.isShutDown = (backoffice, _, context) => backoffice.isShutDown(context.block);
exports.routes = (backoffice, _, context) => __awaiter(void 0, void 0, void 0, function* () { return [backoffice, yield backoffice.getRoutes(context.block)]; });
exports.progress = (backoffice, _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const creator = yield backoffice.getCreator();
    const version = creator && new risqjs_1.Version(context.environment, creator);
    if (version && (yield version.isInstance(backoffice.contract.address, context.block))) {
        return SetupProgress.COMPLETE;
    }
    const manager = yield backoffice.getManager(context.block);
    const routes = yield version.getManagersToRoutes(manager, context.block);
    if (routes.vault) {
        return SetupProgress.VAULT;
    }
    if (routes.trading) {
        return SetupProgress.TRADING;
    }
    if (routes.shares) {
        return SetupProgress.SHARES;
    }
    if (routes.policyManager) {
        return SetupProgress.POLICY_MANAGER;
    }
    if (routes.participation) {
        return SetupProgress.PARTICIPATION;
    }
    if (routes.feeManager) {
        return SetupProgress.FEE_MANAGER;
    }
    if (routes.accounting) {
        return SetupProgress.ACCOUNTING;
    }
    return SetupProgress.BEGIN;
});
