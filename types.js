"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetworkEnum;
(function (NetworkEnum) {
    NetworkEnum["MAINNET"] = "MAINNET";
    NetworkEnum["KOVAN"] = "KOVAN";
    NetworkEnum["TESTNET"] = "TESTNET";
    NetworkEnum["OFFLINE"] = "OFFLINE";
    NetworkEnum["INVALID"] = "INVALID";
})(NetworkEnum = exports.NetworkEnum || (exports.NetworkEnum = {}));
var SetupProgressEnum;
(function (SetupProgressEnum) {
    SetupProgressEnum["BEGIN"] = "BEGIN";
    SetupProgressEnum["ACCOUNTING"] = "ACCOUNTING";
    SetupProgressEnum["FEE_MANAGER"] = "FEE_MANAGER";
    SetupProgressEnum["PARTICIPATION"] = "PARTICIPATION";
    SetupProgressEnum["POLICY_MANAGER"] = "POLICY_MANAGER";
    SetupProgressEnum["SHARES"] = "SHARES";
    SetupProgressEnum["TRADING"] = "TRADING";
    SetupProgressEnum["VAULT"] = "VAULT";
    SetupProgressEnum["COMPLETE"] = "COMPLETE";
})(SetupProgressEnum = exports.SetupProgressEnum || (exports.SetupProgressEnum = {}));
var InvestmentRequestStateEnum;
(function (InvestmentRequestStateEnum) {
    InvestmentRequestStateEnum["VALID"] = "VALID";
    InvestmentRequestStateEnum["EXPIRED"] = "EXPIRED";
    InvestmentRequestStateEnum["WAITING"] = "WAITING";
    InvestmentRequestStateEnum["NONE"] = "NONE";
})(InvestmentRequestStateEnum = exports.InvestmentRequestStateEnum || (exports.InvestmentRequestStateEnum = {}));
