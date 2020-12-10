"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
exports.hash = (block) => block.hash;
exports.number = (block) => new bignumber_js_1.default(block.number);
exports.timestamp = (block) => new Date(block.timestamp * 1000);
