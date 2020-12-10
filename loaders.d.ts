import BigNumber from 'bignumber.js';
import { Accounting } from '@risqprotocol/risqjs';
import { Context } from '.';
export declare const block: (context: Context) => (number: number) => Promise<import("web3-eth").Block>;
export declare const balanceOf: (context: Context) => (token: string, account: string) => Promise<BigNumber>;
export declare const allowance: (context: Context) => (token: string, owner: string, spender: string) => Promise<BigNumber>;
export declare const accountingCalculations: (context: Context) => (accounting: Accounting) => Promise<import("@risqprotocol/risqjs").FundCalculations>;
