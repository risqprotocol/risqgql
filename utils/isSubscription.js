"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_utilities_1 = require("apollo-utilities");
function isSubscription(query) {
    const main = apollo_utilities_1.getMainDefinition(query);
    return main.kind === 'OperationDefinition' && main.operation === 'subscription';
}
exports.isSubscription = isSubscription;
