import { Accounting, FundHolding } from '@risqprotocol/risqjs';
import { Resolver } from '../../';
import { BigNumber } from 'bignumber.js';
export declare const address: Resolver<Accounting>;
export declare const denominationAsset: Resolver<Accounting>;
export declare const sharePrice: Resolver<Accounting>;
export declare const grossAssetValue: Resolver<Accounting>;
export declare const netAssetValue: Resolver<Accounting>;
export interface FundHoldingWithValue extends FundHolding {
    value: BigNumber;
}
export declare const holdings: Resolver<Accounting>;
