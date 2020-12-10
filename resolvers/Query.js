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
const web3_utils_1 = require("web3-utils");
const deploymentContracts_1 = require("../utils/deploymentContracts");
exports.block = (_, __, context) => {
    return context.loaders.block(context.block);
};
exports.account = (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (!web3_utils_1.isAddress(args.address)) {
        throw new Error('Invalid account address.');
    }
    return args.address;
});
exports.prices = (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
    return deploymentContracts_1.priceFeedContract(context.environment);
});
exports.engine = (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
    return deploymentContracts_1.engineContract(context.environment);
});
exports.fund = (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const backoffice = new risqjs_1.BackOffice(context.environment, args.address);
        // Duck typing the backoffice contract. If we can fetch a creator for the given
        // address, we assume that it's a valida backoffice address.
        const creator = yield backoffice.getCreator(context.block);
        return creator && backoffice;
    }
    catch (e) {
        return null;
    }
});
exports.assets = (_, __, context) => {
    return context.environment.tokens.filter((item) => !item.historic);
};
exports.version = (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
    return deploymentContracts_1.versionContract(context.environment);
});
exports.registry = (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
    return deploymentContracts_1.registryContract(context.environment);
});
