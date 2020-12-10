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
const risqjs_1 = require("@risqprotocol/risqjs");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
exports.token = ([_, investmentAsset], __, context) => {
    return context.environment.getToken(investmentAsset.address);
};
exports.shareCostInAsset = ([participation, investmentAsset], _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const accounting = new risqjs_1.Accounting(context.environment, (yield participation.getRoutes()).accounting);
    try {
        return yield accounting.getShareCostInAsset(new bignumber_js_1.default('1e18'), investmentAsset.address, context.block);
    }
    catch (e) {
        return new bignumber_js_1.default('NaN');
    }
});
