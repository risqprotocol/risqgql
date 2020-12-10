import { Address } from '@risqprotocol/risqjs';
import BigNumber from 'bignumber.js';
export declare enum NetworkEnum {
    MAINNET = "MAINNET",
    KOVAN = "KOVAN",
    TESTNET = "TESTNET",
    OFFLINE = "OFFLINE",
    INVALID = "INVALID"
}
export declare enum SetupProgressEnum {
    BEGIN = "BEGIN",
    ACCOUNTING = "ACCOUNTING",
    FEE_MANAGER = "FEE_MANAGER",
    PARTICIPATION = "PARTICIPATION",
    POLICY_MANAGER = "POLICY_MANAGER",
    SHARES = "SHARES",
    TRADING = "TRADING",
    VAULT = "VAULT",
    COMPLETE = "COMPLETE"
}
export declare enum InvestmentRequestStateEnum {
    VALID = "VALID",
    EXPIRED = "EXPIRED",
    WAITING = "WAITING",
    NONE = "NONE"
}
export interface Block {
    hash?: string;
    number?: BigNumber;
    timestamp?: Date;
}
export interface Account {
    address?: Address;
    balance?: BigNumber;
    fund?: BackOffice;
    allowance?: BigNumber;
    participation?: AccountParticipation;
    shares?: AccountShares;
}
export interface AccountParticipation {
    address?: Address;
    hasInvested?: boolean;
    hasRequest?: boolean;
    hasValidRequest?: boolean;
    hasExpiredRequest?: boolean;
    investmentRequestState?: InvestmentRequestStateEnum;
    request?: InvestmentRequest;
    canCancelRequest?: boolean;
}
export interface AccountShares {
    address?: Address;
    balanceOf?: BigNumber;
}
export interface InvestmentRequest {
    investmentAsset?: Address;
    investmentAmount?: BigNumber;
    requestedShares?: BigNumber;
    timestamp?: Date;
}
export interface TokenBalance {
    token?: Token;
    balance?: BigNumber;
}
export interface Token {
    address?: Address;
    name?: string;
    symbol?: string;
    decimals?: number;
    price?: BigNumber;
    balance?: BigNumber;
}
export interface Holding {
    token?: Token;
    amount?: BigNumber;
    value?: BigNumber;
}
export interface BackOfficeRoutes {
    accounting?: Accounting;
    participation?: Participation;
    shares?: Shares;
    trading?: Trading;
    vault?: Vault;
    policyManager?: PolicyManager;
    feeManager?: FeeManager;
    priceSource?: PriceSource;
    registry?: Registry;
    version?: Version;
}
export interface Engine {
    address?: Address;
    liquidEther?: BigNumber;
    enginePrice?: BigNumber;
}
export interface BackOffice {
    address?: Address;
    name?: string;
    routes?: BackOfficeRoutes;
    manager?: string;
    creator?: string;
    creationTime?: Date;
    isShutDown?: boolean;
    progress?: SetupProgressEnum;
}
export interface Exchange {
    exchange?: Address;
    adapter?: Address;
    takesCustody?: boolean;
}
export interface Accounting {
    address?: Address;
    denominationAsset?: Token;
    holdings?: Holding[];
    grossAssetValue?: BigNumber;
    netAssetValue?: BigNumber;
    sharePrice?: BigNumber;
}
export interface AllowedInvestmentAsset {
    token?: Token;
    shareCostInAsset?: BigNumber;
}
export interface Participation {
    address?: Address;
    historicalInvestors?: Address[];
    allowedAssets?: AllowedInvestmentAsset[];
}
export interface Shares {
    address?: Address;
    balanceOf?: BigNumber;
    totalSupply?: BigNumber;
}
export interface Trading {
    address?: Address;
    openMakeOrders?: OpenMakeOrder[];
    exchanges?: Exchange[];
    lockedAssets?: Token[];
}
export interface OpenMakeOrder {
    id?: BigNumber;
    expiresAt?: Date;
    orderIndex?: BigNumber;
    buyAsset?: Address;
    makerAsset?: Address;
    takerAsset?: Address;
    makerQuantity?: BigNumber;
    takerQuantity?: BigNumber;
    exchange?: Address;
}
export interface Vault {
    address?: Address;
}
export interface PolicyManager {
    address?: Address;
    policies?: Policy[];
}
export interface Policy {
    address?: Address;
    identifier?: string;
}
export interface MaxConcentration {
    address?: Address;
    identifier?: string;
    maxConcentration?: BigNumber;
}
export interface MaxPositions {
    address?: Address;
    identifier?: string;
    maxPositions?: number;
}
export interface PriceTolerance {
    address?: Address;
    identifier?: string;
    priceTolerance?: BigNumber;
}
export interface AssetWhitelist {
    address?: Address;
    identifier?: string;
    assetWhitelist?: Address[];
}
export interface AssetBlacklist {
    address?: Address;
    identifier?: string;
    assetBlacklist?: Address[];
}
export interface UserWhitelist {
    address?: Address;
    identifier?: string;
    isWhitelisted?: boolean;
}
export interface CustomPolicy {
    address?: Address;
    identifier?: string;
}
export interface FeeManager {
    address?: Address;
    managementFeeAmount?: BigNumber;
    performanceFeeAmount?: BigNumber;
    performanceFee?: PerformanceFee;
    managementFee?: ManagementFee;
}
export interface PerformanceFee {
    address?: Address;
    rate?: number;
    period?: number;
    highWaterMark?: number;
    initializeTime?: Date;
    canUpdate?: boolean;
}
export interface ManagementFee {
    address?: Address;
    rate?: number;
}
export interface Version {
    address?: Address;
    name?: string;
}
export interface PriceSource {
    address?: Address;
    lastUpdate?: Date;
}
export interface Registry {
    address?: Address;
}
export interface Schema {
    network?: NetworkEnum;
    block?: Block;
    prices?: PriceSource;
    account?: Account;
    accounts?: Account[];
    fund?: BackOffice;
    assets?: Token[];
    engine?: Engine;
    version?: Version;
    registry?: Registry;
}
