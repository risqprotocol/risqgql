import { DeployedEnvironment } from '@risqprotocol/risqjs';
export declare function createTokenEnum(environment: DeployedEnvironment): {
    [key: string]: string;
};
export declare function createTokenEnumDefinition(values: {
    [key: string]: string;
}): import("graphql").DocumentNode;
