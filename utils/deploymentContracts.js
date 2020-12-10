"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const risqjs_1 = require("@risqprotocol/risqjs");
function priceFeedContract(environment) {
    const addresses = environment.deployment.risq.addr;
    if (addresses.TestingPriceFeed) {
        return new risqjs_1.KyberPriceFeed(environment, addresses.TestingPriceFeed);
    }
    if (addresses.KyberPriceFeed) {
        return new risqjs_1.KyberPriceFeed(environment, addresses.KyberPriceFeed);
    }
    throw new Error('Missing price feed address');
}
exports.priceFeedContract = priceFeedContract;
function versionContract(environment) {
    return new risqjs_1.Version(environment, environment.deployment.risq.addr.Version);
}
exports.versionContract = versionContract;
function engineContract(environment) {
    return new risqjs_1.Engine(environment, environment.deployment.risq.addr.Engine);
}
exports.engineContract = engineContract;
function registryContract(environment) {
    return new risqjs_1.Registry(environment, environment.deployment.risq.addr.Registry);
}
exports.registryContract = registryContract;
