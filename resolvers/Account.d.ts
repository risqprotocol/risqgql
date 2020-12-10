import { Resolver } from '../';
export declare const address: Resolver<string>;
interface BalanceArgs {
    token: string;
    account: string;
}
interface AllowanceArgs {
    token: string;
    owner: string;
    spender: string;
}
interface FundRunnerArgs {
    address: string;
}
export declare const balance: Resolver<string, BalanceArgs>;
export declare const allowance: Resolver<string, AllowanceArgs>;
export declare const fund: Resolver<string>;
export declare const participation: Resolver<string, FundRunnerArgs>;
export declare const shares: Resolver<string, FundRunnerArgs>;
export {};
