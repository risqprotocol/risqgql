import { DeployedEnvironment } from '@risqprotocol/risqjs';
import { GraphQLSchema } from 'graphql';
import { ApolloLink, Operation } from 'apollo-link';
import * as loaders from './loaders';
export * from './types';
export declare type Resolver<TParent = any, TArgs = any> = (parent: TParent, args: TArgs, context: Context) => any;
export declare type ContextCreator = (request: Operation) => Promise<Context> | Context;
export declare type Loaders = {
    [K in keyof typeof loaders]: ReturnType<typeof loaders[K]>;
};
export interface Context {
    environment: DeployedEnvironment;
    loaders: Loaders;
    block: number;
}
export declare const createSchema: (environment: DeployedEnvironment) => GraphQLSchema;
export declare const createQueryContext: (environment: DeployedEnvironment) => ContextCreator;
export interface SchemaLinkOptions<TRoot = any, TContext = any> {
    schema: GraphQLSchema;
    context: TContext;
    root?: TRoot;
}
export declare const createSchemaLink: <TRoot = any>(options: SchemaLinkOptions<TRoot, ContextCreator>) => ApolloLink;
