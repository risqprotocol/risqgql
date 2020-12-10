"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.schema = graphql_tag_1.default `
  scalar Address
  scalar DateTime
  scalar BigNumber

  enum SetupProgressEnum {
    BEGIN
    ACCOUNTING
    FEE_MANAGER
    PARTICIPATION
    POLICY_MANAGER
    SHARES
    TRADING
    VAULT
    COMPLETE
  }

  enum InvestmentRequestStateEnum {
    VALID
    EXPIRED
    WAITING
    NONE
  }

  type Block {
    hash: String!
    number: BigNumber!
    timestamp: DateTime!
  }

  type Account {
    address: Address!
    balance(token: TokenEnum!): BigNumber
    fund: BackOffice
    allowance(token: Address!, spender: Address!): BigNumber!
    participation(address: Address!): AccountParticipation
    shares(address: Address!): AccountShares
  }

  type AccountParticipation {
    address: Address!
    hasInvested: Boolean!
    hasRequest: Boolean!
    hasValidRequest: Boolean!
    hasExpiredRequest: Boolean!
    investmentRequestState: InvestmentRequestStateEnum!
    request: Request
    canCancelRequest: Boolean!
  }

  type AccountShares {
    address: Address!
    balanceOf: BigNumber!
  }

  type Request {
    investmentAsset: Address!
    investmentAmount: BigNumber!
    requestedShares: BigNumber!
    timestamp: DateTime
  }

  type TokenBalance {
    token: Token!
    balance: BigNumber!
  }

  type Token {
    address: Address!
    name: String
    symbol: String!
    decimals: Int!
    price: BigNumber!
    balance(account: Address!): BigNumber!
  }

  type Exchange {
    exchange: Address!
    adapter: Address!
    takesCustody: Boolean!
  }

  type Holding {
    token: Token
    amount: BigNumber!
    value: BigNumber
  }

  type BackOfficeRoutes {
    accounting: Accounting
    participation: Participation
    shares: Shares
    trading: Trading
    vault: Vault
    feeManager: FeeManager
    policyManager: PolicyManager
    priceSource: PriceSource
    registry: Registry
    version: Version
  }

  type BackOffice {
    address: Address!
    name: String!
    routes: BackOfficeRoutes!
    priceSource: PriceSource!
    manager: String!
    creator: String!
    creationTime: DateTime!
    isShutDown: Boolean!
    progress: SetupProgressEnum!
  }

  type Engine {
    address: Address!
    liquidEther: BigNumber!
    enginePrice: BigNumber!
  }

  type Accounting {
    address: Address!
    denominationAsset: Token!
    holdings: [Holding]!
    grossAssetValue: BigNumber!
    netAssetValue: BigNumber!
    sharePrice: BigNumber!
  }

  type Participation {
    address: Address!
    historicalInvestors: [Address!]!
    allowedAssets: [AllowedInvestmentAsset]!
  }

  type AllowedInvestmentAsset {
    token: Token!
    shareCostInAsset: BigNumber!
  }

  type Shares {
    address: Address!
    balanceOf(owner: Address!): BigNumber!
    totalSupply: BigNumber!
  }

  type Trading {
    address: Address!
    openMakeOrders: [OpenMakeOrder!]!
    lockedAssets: [Token!]!
    exchanges: [Exchange!]!
  }

  type OpenMakeOrder {
    id: BigNumber!
    expiresAt: DateTime!
    orderIndex: BigNumber!
    buyAsset: Address!
    makerAsset: Address!
    takerAsset: Address!
    makerQuantity: BigNumber!
    takerQuantity: BigNumber!
    exchange: Address!
  }

  type Vault {
    address: Address!
  }

  type PolicyManager {
    address: Address!
    policies: [Policy!]!
  }

  interface Policy {
    address: Address!
    identifier: String!
  }

  type MaxConcentration implements Policy {
    address: Address!
    identifier: String!
    maxConcentration: BigNumber!
  }

  type MaxPositions implements Policy {
    address: Address!
    identifier: String!
    maxPositions: Int!
  }

  type PriceTolerance implements Policy {
    address: Address!
    identifier: String!
    priceTolerance: BigNumber!
  }

  type AssetWhitelist implements Policy {
    address: Address!
    identifier: String!
    assetWhitelist: [Address!]!
  }

  type AssetBlacklist implements Policy {
    address: Address!
    identifier: String!
    assetBlacklist: [Address!]!
  }

  type UserWhitelist implements Policy {
    address: Address!
    identifier: String!
    isWhitelisted(address: Address!): Boolean!
  }

  type CustomPolicy implements Policy {
    address: Address!
    identifier: String!
  }

  type FeeManager {
    address: Address!
    managementFeeAmount: BigNumber
    performanceFeeAmount: BigNumber
    performanceFee: PerformanceFee
    managementFee: ManagementFee
  }

  type PerformanceFee {
    address: Address!
    rate: Float!
    period: Float!
    highWaterMark: Float!
    initializeTime: DateTime!
    lastPayoutTime: DateTime!
    canUpdate: Boolean!
  }

  type ManagementFee {
    address: Address!
    rate: Float!
  }

  type Version {
    address: Address!
    name: String!
  }

  type PriceSource {
    address: Address!
    lastUpdate: DateTime
  }

  type Registry {
    address: Address!
  }

  type Query {
    block: Block!
    prices: PriceSource!
    account(address: Address!): Account
    fund(address: Address!): BackOffice
    assets: [Token]!
    engine: Engine!
    version: Version!
    registry: Registry!
  }

  type Schema {
    query: Query
  }
`;
