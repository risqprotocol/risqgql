var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (undefined && undefined.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rx = __importStar(require("rxjs"));
const operators_1 = require("rxjs/operators");
const graphql_1 = require("graphql");
const graphql_tools_1 = require("graphql-tools");
const apollo_link_1 = require("apollo-link");
const TokenEnum_1 = require("./enums/TokenEnum");
const iterall_1 = require("iterall");
const isSubscription_1 = require("./utils/isSubscription");
const ensureIterable_1 = require("./utils/ensureIterable");
const schema_1 = require("./schema");
const loaders = __importStar(require("./loaders"));
const resolvers = __importStar(require("./resolvers"));
__export(require("./types"));
exports.createSchema = (environment) => {
    const TokenEnum = TokenEnum_1.createTokenEnum(environment);
    const executable = graphql_tools_1.makeExecutableSchema({
        resolvers: Object.assign(Object.assign({}, resolvers), { TokenEnum }),
        typeDefs: [TokenEnum_1.createTokenEnumDefinition(TokenEnum), schema_1.schema],
        inheritResolversFromInterfaces: true,
    });
    return executable;
};
exports.createQueryContext = (environment) => {
    return (operation) => __awaiter(void 0, void 0, void 0, function* () {
        const current = yield environment.client.getBlockNumber();
        const block = operation.variables.block || current;
        // Wait until minimum block is reached.
        yield new Promise((resolve, reject) => {
            const block$ = Rx.of(block);
            const polling$ = block$.pipe(operators_1.expand(() => Rx.timer(1000).pipe(operators_1.switchMap(() => environment.client.getBlockNumber()))));
            const wait$ = polling$.pipe(operators_1.takeWhile((value) => value < block, true), operators_1.takeLast(1));
            return wait$.subscribe({
                next: (value) => resolve(value),
                error: (error) => reject(error),
            });
        });
        const context = {
            block,
            environment,
            loaders: {},
        };
        Object.keys(loaders).forEach((key) => {
            // @ts-ignore
            context.loaders[key] = loaders[key](context);
        });
        return context;
    });
};
exports.createSchemaLink = (options) => {
    const handleRequest = (request, observer) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const context = yield options.context(request);
            const args = {
                schema: options.schema,
                rootValue: options.root,
                contextValue: context,
                variableValues: request.variables,
                operationName: request.operationName,
                document: request.query,
            };
            const result = isSubscription_1.isSubscription(request.query) ? graphql_1.subscribe(args) : graphql_1.execute(args);
            const iterable = ensureIterable_1.ensureIterable(yield result);
            yield iterall_1.forAwaitEach(iterable, (value) => {
                if (value.errors && value.errors.length) {
                    observer.error(value.errors[0]);
                }
                else {
                    observer.next(value);
                }
            });
            observer.complete();
        }
        catch (error) {
            observer.error(error);
        }
    });
    const createObservable = (request) => {
        return new apollo_link_1.Observable((observer) => {
            handleRequest(request, observer);
        });
    };
    return new apollo_link_1.ApolloLink((request) => createObservable(request));
};
//# sourceMappingURL=bundle.esm.js.map
