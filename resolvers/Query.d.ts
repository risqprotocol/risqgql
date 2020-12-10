import { Address } from '@risqprotocol/risqjs';
import { Resolver } from '../';
export declare const block: Resolver;
interface AccountArgs {
    address: Address;
}
export declare const account: Resolver<undefined, AccountArgs>;
export declare const prices: Resolver;
export declare const engine: Resolver;
export declare const fund: Resolver;
export declare const assets: Resolver;
export declare const version: Resolver;
export declare const registry: Resolver;
export {};
