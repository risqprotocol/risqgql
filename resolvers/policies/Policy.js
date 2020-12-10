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
exports.address = (policy) => policy.contract.address;
exports.identifier = (policy) => policy.getIdentifier();
exports.__resolveType = (policy, _, context) => __awaiter(void 0, void 0, void 0, function* () {
    const identifier = yield policy.getIdentifier(context.block);
    switch (identifier) {
        case 'MaxConcentration':
        case 'Max concentration':
            return 'MaxConcentration';
        case 'MaxPositions':
        case 'Max position':
            return 'MaxPositions';
        case 'PriceTolerance':
        case 'Price tolerance':
            return 'PriceTolerance';
        case 'AssetWhitelist':
        case 'Asset whitelist':
            return 'AssetWhitelist';
        case 'AssetBlacklist':
        case 'Asset blacklist':
            return 'AssetBlacklist';
        case 'UserWhitelist':
        case 'User whitelist':
            return 'UserWhitelist';
        default:
            return 'CustomPolicy';
    }
});
