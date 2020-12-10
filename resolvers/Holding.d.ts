import { Resolver } from '../';
import { Accounting } from '@risqprotocol/risqjs';
import { FundHoldingWithValue } from './routes/Accounting';
export declare const token: Resolver<[Accounting, FundHoldingWithValue]>;
export declare const amount: Resolver<[Accounting, FundHoldingWithValue]>;
export declare const value: Resolver<[Accounting, FundHoldingWithValue]>;
