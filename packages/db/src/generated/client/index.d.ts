
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model AuthLink
 * 
 */
export type AuthLink = $Result.DefaultSelection<Prisma.$AuthLinkPayload>
/**
 * Model Token
 * 
 */
export type Token = $Result.DefaultSelection<Prisma.$TokenPayload>
/**
 * Model Pair
 * 
 */
export type Pair = $Result.DefaultSelection<Prisma.$PairPayload>
/**
 * Model WatchlistItem
 * 
 */
export type WatchlistItem = $Result.DefaultSelection<Prisma.$WatchlistItemPayload>
/**
 * Model SignalEvent
 * 
 */
export type SignalEvent = $Result.DefaultSelection<Prisma.$SignalEventPayload>
/**
 * Model SignalScore
 * 
 */
export type SignalScore = $Result.DefaultSelection<Prisma.$SignalScorePayload>
/**
 * Model AnalystReport
 * 
 */
export type AnalystReport = $Result.DefaultSelection<Prisma.$AnalystReportPayload>
/**
 * Model SocialMention
 * 
 */
export type SocialMention = $Result.DefaultSelection<Prisma.$SocialMentionPayload>
/**
 * Model UserAlertLog
 * 
 */
export type UserAlertLog = $Result.DefaultSelection<Prisma.$UserAlertLogPayload>
/**
 * Model ApiKey
 * 
 */
export type ApiKey = $Result.DefaultSelection<Prisma.$ApiKeyPayload>
/**
 * Model JobCursor
 * 
 */
export type JobCursor = $Result.DefaultSelection<Prisma.$JobCursorPayload>
/**
 * Model VectorDoc
 * 
 */
export type VectorDoc = $Result.DefaultSelection<Prisma.$VectorDocPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  FREE: 'FREE',
  PRO: 'PRO',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const UserStatus: {
  ACTIVE: 'ACTIVE',
  BANNED: 'BANNED'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.authLink`: Exposes CRUD operations for the **AuthLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthLinks
    * const authLinks = await prisma.authLink.findMany()
    * ```
    */
  get authLink(): Prisma.AuthLinkDelegate<ExtArgs>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<ExtArgs>;

  /**
   * `prisma.pair`: Exposes CRUD operations for the **Pair** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pairs
    * const pairs = await prisma.pair.findMany()
    * ```
    */
  get pair(): Prisma.PairDelegate<ExtArgs>;

  /**
   * `prisma.watchlistItem`: Exposes CRUD operations for the **WatchlistItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WatchlistItems
    * const watchlistItems = await prisma.watchlistItem.findMany()
    * ```
    */
  get watchlistItem(): Prisma.WatchlistItemDelegate<ExtArgs>;

  /**
   * `prisma.signalEvent`: Exposes CRUD operations for the **SignalEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SignalEvents
    * const signalEvents = await prisma.signalEvent.findMany()
    * ```
    */
  get signalEvent(): Prisma.SignalEventDelegate<ExtArgs>;

  /**
   * `prisma.signalScore`: Exposes CRUD operations for the **SignalScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SignalScores
    * const signalScores = await prisma.signalScore.findMany()
    * ```
    */
  get signalScore(): Prisma.SignalScoreDelegate<ExtArgs>;

  /**
   * `prisma.analystReport`: Exposes CRUD operations for the **AnalystReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnalystReports
    * const analystReports = await prisma.analystReport.findMany()
    * ```
    */
  get analystReport(): Prisma.AnalystReportDelegate<ExtArgs>;

  /**
   * `prisma.socialMention`: Exposes CRUD operations for the **SocialMention** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SocialMentions
    * const socialMentions = await prisma.socialMention.findMany()
    * ```
    */
  get socialMention(): Prisma.SocialMentionDelegate<ExtArgs>;

  /**
   * `prisma.userAlertLog`: Exposes CRUD operations for the **UserAlertLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAlertLogs
    * const userAlertLogs = await prisma.userAlertLog.findMany()
    * ```
    */
  get userAlertLog(): Prisma.UserAlertLogDelegate<ExtArgs>;

  /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<ExtArgs>;

  /**
   * `prisma.jobCursor`: Exposes CRUD operations for the **JobCursor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobCursors
    * const jobCursors = await prisma.jobCursor.findMany()
    * ```
    */
  get jobCursor(): Prisma.JobCursorDelegate<ExtArgs>;

  /**
   * `prisma.vectorDoc`: Exposes CRUD operations for the **VectorDoc** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VectorDocs
    * const vectorDocs = await prisma.vectorDoc.findMany()
    * ```
    */
  get vectorDoc(): Prisma.VectorDocDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    AuthLink: 'AuthLink',
    Token: 'Token',
    Pair: 'Pair',
    WatchlistItem: 'WatchlistItem',
    SignalEvent: 'SignalEvent',
    SignalScore: 'SignalScore',
    AnalystReport: 'AnalystReport',
    SocialMention: 'SocialMention',
    UserAlertLog: 'UserAlertLog',
    ApiKey: 'ApiKey',
    JobCursor: 'JobCursor',
    VectorDoc: 'VectorDoc'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "authLink" | "token" | "pair" | "watchlistItem" | "signalEvent" | "signalScore" | "analystReport" | "socialMention" | "userAlertLog" | "apiKey" | "jobCursor" | "vectorDoc"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      AuthLink: {
        payload: Prisma.$AuthLinkPayload<ExtArgs>
        fields: Prisma.AuthLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLinkPayload>
          }
          findFirst: {
            args: Prisma.AuthLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLinkPayload>
          }
          findMany: {
            args: Prisma.AuthLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLinkPayload>[]
          }
          create: {
            args: Prisma.AuthLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLinkPayload>
          }
          createMany: {
            args: Prisma.AuthLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLinkPayload>[]
          }
          delete: {
            args: Prisma.AuthLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLinkPayload>
          }
          update: {
            args: Prisma.AuthLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLinkPayload>
          }
          deleteMany: {
            args: Prisma.AuthLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuthLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthLinkPayload>
          }
          aggregate: {
            args: Prisma.AuthLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthLink>
          }
          groupBy: {
            args: Prisma.AuthLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthLinkCountArgs<ExtArgs>
            result: $Utils.Optional<AuthLinkCountAggregateOutputType> | number
          }
        }
      }
      Token: {
        payload: Prisma.$TokenPayload<ExtArgs>
        fields: Prisma.TokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findFirst: {
            args: Prisma.TokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findMany: {
            args: Prisma.TokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          create: {
            args: Prisma.TokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          createMany: {
            args: Prisma.TokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          delete: {
            args: Prisma.TokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          update: {
            args: Prisma.TokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          deleteMany: {
            args: Prisma.TokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          aggregate: {
            args: Prisma.TokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToken>
          }
          groupBy: {
            args: Prisma.TokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenCountAggregateOutputType> | number
          }
        }
      }
      Pair: {
        payload: Prisma.$PairPayload<ExtArgs>
        fields: Prisma.PairFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PairFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PairFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          findFirst: {
            args: Prisma.PairFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PairFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          findMany: {
            args: Prisma.PairFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>[]
          }
          create: {
            args: Prisma.PairCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          createMany: {
            args: Prisma.PairCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PairCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>[]
          }
          delete: {
            args: Prisma.PairDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          update: {
            args: Prisma.PairUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          deleteMany: {
            args: Prisma.PairDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PairUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PairUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          aggregate: {
            args: Prisma.PairAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePair>
          }
          groupBy: {
            args: Prisma.PairGroupByArgs<ExtArgs>
            result: $Utils.Optional<PairGroupByOutputType>[]
          }
          count: {
            args: Prisma.PairCountArgs<ExtArgs>
            result: $Utils.Optional<PairCountAggregateOutputType> | number
          }
        }
      }
      WatchlistItem: {
        payload: Prisma.$WatchlistItemPayload<ExtArgs>
        fields: Prisma.WatchlistItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WatchlistItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WatchlistItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistItemPayload>
          }
          findFirst: {
            args: Prisma.WatchlistItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WatchlistItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistItemPayload>
          }
          findMany: {
            args: Prisma.WatchlistItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistItemPayload>[]
          }
          create: {
            args: Prisma.WatchlistItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistItemPayload>
          }
          createMany: {
            args: Prisma.WatchlistItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WatchlistItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistItemPayload>[]
          }
          delete: {
            args: Prisma.WatchlistItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistItemPayload>
          }
          update: {
            args: Prisma.WatchlistItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistItemPayload>
          }
          deleteMany: {
            args: Prisma.WatchlistItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WatchlistItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WatchlistItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistItemPayload>
          }
          aggregate: {
            args: Prisma.WatchlistItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWatchlistItem>
          }
          groupBy: {
            args: Prisma.WatchlistItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<WatchlistItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.WatchlistItemCountArgs<ExtArgs>
            result: $Utils.Optional<WatchlistItemCountAggregateOutputType> | number
          }
        }
      }
      SignalEvent: {
        payload: Prisma.$SignalEventPayload<ExtArgs>
        fields: Prisma.SignalEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SignalEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SignalEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalEventPayload>
          }
          findFirst: {
            args: Prisma.SignalEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SignalEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalEventPayload>
          }
          findMany: {
            args: Prisma.SignalEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalEventPayload>[]
          }
          create: {
            args: Prisma.SignalEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalEventPayload>
          }
          createMany: {
            args: Prisma.SignalEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SignalEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalEventPayload>[]
          }
          delete: {
            args: Prisma.SignalEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalEventPayload>
          }
          update: {
            args: Prisma.SignalEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalEventPayload>
          }
          deleteMany: {
            args: Prisma.SignalEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SignalEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SignalEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalEventPayload>
          }
          aggregate: {
            args: Prisma.SignalEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSignalEvent>
          }
          groupBy: {
            args: Prisma.SignalEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<SignalEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.SignalEventCountArgs<ExtArgs>
            result: $Utils.Optional<SignalEventCountAggregateOutputType> | number
          }
        }
      }
      SignalScore: {
        payload: Prisma.$SignalScorePayload<ExtArgs>
        fields: Prisma.SignalScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SignalScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SignalScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalScorePayload>
          }
          findFirst: {
            args: Prisma.SignalScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SignalScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalScorePayload>
          }
          findMany: {
            args: Prisma.SignalScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalScorePayload>[]
          }
          create: {
            args: Prisma.SignalScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalScorePayload>
          }
          createMany: {
            args: Prisma.SignalScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SignalScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalScorePayload>[]
          }
          delete: {
            args: Prisma.SignalScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalScorePayload>
          }
          update: {
            args: Prisma.SignalScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalScorePayload>
          }
          deleteMany: {
            args: Prisma.SignalScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SignalScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SignalScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalScorePayload>
          }
          aggregate: {
            args: Prisma.SignalScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSignalScore>
          }
          groupBy: {
            args: Prisma.SignalScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<SignalScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.SignalScoreCountArgs<ExtArgs>
            result: $Utils.Optional<SignalScoreCountAggregateOutputType> | number
          }
        }
      }
      AnalystReport: {
        payload: Prisma.$AnalystReportPayload<ExtArgs>
        fields: Prisma.AnalystReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalystReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalystReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalystReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalystReportPayload>
          }
          findFirst: {
            args: Prisma.AnalystReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalystReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalystReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalystReportPayload>
          }
          findMany: {
            args: Prisma.AnalystReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalystReportPayload>[]
          }
          create: {
            args: Prisma.AnalystReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalystReportPayload>
          }
          createMany: {
            args: Prisma.AnalystReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalystReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalystReportPayload>[]
          }
          delete: {
            args: Prisma.AnalystReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalystReportPayload>
          }
          update: {
            args: Prisma.AnalystReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalystReportPayload>
          }
          deleteMany: {
            args: Prisma.AnalystReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalystReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnalystReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalystReportPayload>
          }
          aggregate: {
            args: Prisma.AnalystReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalystReport>
          }
          groupBy: {
            args: Prisma.AnalystReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalystReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalystReportCountArgs<ExtArgs>
            result: $Utils.Optional<AnalystReportCountAggregateOutputType> | number
          }
        }
      }
      SocialMention: {
        payload: Prisma.$SocialMentionPayload<ExtArgs>
        fields: Prisma.SocialMentionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SocialMentionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialMentionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SocialMentionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialMentionPayload>
          }
          findFirst: {
            args: Prisma.SocialMentionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialMentionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SocialMentionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialMentionPayload>
          }
          findMany: {
            args: Prisma.SocialMentionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialMentionPayload>[]
          }
          create: {
            args: Prisma.SocialMentionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialMentionPayload>
          }
          createMany: {
            args: Prisma.SocialMentionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SocialMentionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialMentionPayload>[]
          }
          delete: {
            args: Prisma.SocialMentionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialMentionPayload>
          }
          update: {
            args: Prisma.SocialMentionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialMentionPayload>
          }
          deleteMany: {
            args: Prisma.SocialMentionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SocialMentionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SocialMentionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialMentionPayload>
          }
          aggregate: {
            args: Prisma.SocialMentionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSocialMention>
          }
          groupBy: {
            args: Prisma.SocialMentionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SocialMentionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SocialMentionCountArgs<ExtArgs>
            result: $Utils.Optional<SocialMentionCountAggregateOutputType> | number
          }
        }
      }
      UserAlertLog: {
        payload: Prisma.$UserAlertLogPayload<ExtArgs>
        fields: Prisma.UserAlertLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAlertLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAlertLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAlertLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAlertLogPayload>
          }
          findFirst: {
            args: Prisma.UserAlertLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAlertLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAlertLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAlertLogPayload>
          }
          findMany: {
            args: Prisma.UserAlertLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAlertLogPayload>[]
          }
          create: {
            args: Prisma.UserAlertLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAlertLogPayload>
          }
          createMany: {
            args: Prisma.UserAlertLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserAlertLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAlertLogPayload>[]
          }
          delete: {
            args: Prisma.UserAlertLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAlertLogPayload>
          }
          update: {
            args: Prisma.UserAlertLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAlertLogPayload>
          }
          deleteMany: {
            args: Prisma.UserAlertLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAlertLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserAlertLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAlertLogPayload>
          }
          aggregate: {
            args: Prisma.UserAlertLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAlertLog>
          }
          groupBy: {
            args: Prisma.UserAlertLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAlertLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAlertLogCountArgs<ExtArgs>
            result: $Utils.Optional<UserAlertLogCountAggregateOutputType> | number
          }
        }
      }
      ApiKey: {
        payload: Prisma.$ApiKeyPayload<ExtArgs>
        fields: Prisma.ApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findMany: {
            args: Prisma.ApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          create: {
            args: Prisma.ApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          createMany: {
            args: Prisma.ApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          delete: {
            args: Prisma.ApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          update: {
            args: Prisma.ApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKey>
          }
          groupBy: {
            args: Prisma.ApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyCountAggregateOutputType> | number
          }
        }
      }
      JobCursor: {
        payload: Prisma.$JobCursorPayload<ExtArgs>
        fields: Prisma.JobCursorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobCursorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCursorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobCursorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCursorPayload>
          }
          findFirst: {
            args: Prisma.JobCursorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCursorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobCursorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCursorPayload>
          }
          findMany: {
            args: Prisma.JobCursorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCursorPayload>[]
          }
          create: {
            args: Prisma.JobCursorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCursorPayload>
          }
          createMany: {
            args: Prisma.JobCursorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobCursorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCursorPayload>[]
          }
          delete: {
            args: Prisma.JobCursorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCursorPayload>
          }
          update: {
            args: Prisma.JobCursorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCursorPayload>
          }
          deleteMany: {
            args: Prisma.JobCursorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobCursorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobCursorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobCursorPayload>
          }
          aggregate: {
            args: Prisma.JobCursorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobCursor>
          }
          groupBy: {
            args: Prisma.JobCursorGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobCursorGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCursorCountArgs<ExtArgs>
            result: $Utils.Optional<JobCursorCountAggregateOutputType> | number
          }
        }
      }
      VectorDoc: {
        payload: Prisma.$VectorDocPayload<ExtArgs>
        fields: Prisma.VectorDocFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VectorDocFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorDocPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VectorDocFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorDocPayload>
          }
          findFirst: {
            args: Prisma.VectorDocFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorDocPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VectorDocFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorDocPayload>
          }
          findMany: {
            args: Prisma.VectorDocFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorDocPayload>[]
          }
          delete: {
            args: Prisma.VectorDocDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorDocPayload>
          }
          update: {
            args: Prisma.VectorDocUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorDocPayload>
          }
          deleteMany: {
            args: Prisma.VectorDocDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VectorDocUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          aggregate: {
            args: Prisma.VectorDocAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVectorDoc>
          }
          groupBy: {
            args: Prisma.VectorDocGroupByArgs<ExtArgs>
            result: $Utils.Optional<VectorDocGroupByOutputType>[]
          }
          count: {
            args: Prisma.VectorDocCountArgs<ExtArgs>
            result: $Utils.Optional<VectorDocCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    watchlist: number
    apiKeys: number
    alerts: number
    authLinks: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watchlist?: boolean | UserCountOutputTypeCountWatchlistArgs
    apiKeys?: boolean | UserCountOutputTypeCountApiKeysArgs
    alerts?: boolean | UserCountOutputTypeCountAlertsArgs
    authLinks?: boolean | UserCountOutputTypeCountAuthLinksArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWatchlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAlertLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthLinkWhereInput
  }


  /**
   * Count Type TokenCountOutputType
   */

  export type TokenCountOutputType = {
    pairs: number
    reports: number
    vectors: number
    mentions: number
    watchlist: number
  }

  export type TokenCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pairs?: boolean | TokenCountOutputTypeCountPairsArgs
    reports?: boolean | TokenCountOutputTypeCountReportsArgs
    vectors?: boolean | TokenCountOutputTypeCountVectorsArgs
    mentions?: boolean | TokenCountOutputTypeCountMentionsArgs
    watchlist?: boolean | TokenCountOutputTypeCountWatchlistArgs
  }

  // Custom InputTypes
  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenCountOutputType
     */
    select?: TokenCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeCountPairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairWhereInput
  }

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalystReportWhereInput
  }

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeCountVectorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VectorDocWhereInput
  }

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeCountMentionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocialMentionWhereInput
  }

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeCountWatchlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistItemWhereInput
  }


  /**
   * Count Type SignalEventCountOutputType
   */

  export type SignalEventCountOutputType = {
    scores: number
    alerts: number
  }

  export type SignalEventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scores?: boolean | SignalEventCountOutputTypeCountScoresArgs
    alerts?: boolean | SignalEventCountOutputTypeCountAlertsArgs
  }

  // Custom InputTypes
  /**
   * SignalEventCountOutputType without action
   */
  export type SignalEventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalEventCountOutputType
     */
    select?: SignalEventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SignalEventCountOutputType without action
   */
  export type SignalEventCountOutputTypeCountScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignalScoreWhereInput
  }

  /**
   * SignalEventCountOutputType without action
   */
  export type SignalEventCountOutputTypeCountAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAlertLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    telegramUserId: string | null
    handle: string | null
    role: $Enums.Role | null
    status: $Enums.UserStatus | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    telegramUserId: string | null
    handle: string | null
    role: $Enums.Role | null
    status: $Enums.UserStatus | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    telegramUserId: number
    handle: number
    role: number
    status: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    telegramUserId?: true
    handle?: true
    role?: true
    status?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    telegramUserId?: true
    handle?: true
    role?: true
    status?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    telegramUserId?: true
    handle?: true
    role?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    telegramUserId: string
    handle: string | null
    role: $Enums.Role
    status: $Enums.UserStatus
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramUserId?: boolean
    handle?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    watchlist?: boolean | User$watchlistArgs<ExtArgs>
    apiKeys?: boolean | User$apiKeysArgs<ExtArgs>
    alerts?: boolean | User$alertsArgs<ExtArgs>
    authLinks?: boolean | User$authLinksArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramUserId?: boolean
    handle?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    telegramUserId?: boolean
    handle?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watchlist?: boolean | User$watchlistArgs<ExtArgs>
    apiKeys?: boolean | User$apiKeysArgs<ExtArgs>
    alerts?: boolean | User$alertsArgs<ExtArgs>
    authLinks?: boolean | User$authLinksArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      watchlist: Prisma.$WatchlistItemPayload<ExtArgs>[]
      apiKeys: Prisma.$ApiKeyPayload<ExtArgs>[]
      alerts: Prisma.$UserAlertLogPayload<ExtArgs>[]
      authLinks: Prisma.$AuthLinkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      telegramUserId: string
      handle: string | null
      role: $Enums.Role
      status: $Enums.UserStatus
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    watchlist<T extends User$watchlistArgs<ExtArgs> = {}>(args?: Subset<T, User$watchlistArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistItemPayload<ExtArgs>, T, "findMany"> | Null>
    apiKeys<T extends User$apiKeysArgs<ExtArgs> = {}>(args?: Subset<T, User$apiKeysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany"> | Null>
    alerts<T extends User$alertsArgs<ExtArgs> = {}>(args?: Subset<T, User$alertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAlertLogPayload<ExtArgs>, T, "findMany"> | Null>
    authLinks<T extends User$authLinksArgs<ExtArgs> = {}>(args?: Subset<T, User$authLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthLinkPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly telegramUserId: FieldRef<"User", 'String'>
    readonly handle: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly status: FieldRef<"User", 'UserStatus'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.watchlist
   */
  export type User$watchlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemInclude<ExtArgs> | null
    where?: WatchlistItemWhereInput
    orderBy?: WatchlistItemOrderByWithRelationInput | WatchlistItemOrderByWithRelationInput[]
    cursor?: WatchlistItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchlistItemScalarFieldEnum | WatchlistItemScalarFieldEnum[]
  }

  /**
   * User.apiKeys
   */
  export type User$apiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    cursor?: ApiKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * User.alerts
   */
  export type User$alertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogInclude<ExtArgs> | null
    where?: UserAlertLogWhereInput
    orderBy?: UserAlertLogOrderByWithRelationInput | UserAlertLogOrderByWithRelationInput[]
    cursor?: UserAlertLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAlertLogScalarFieldEnum | UserAlertLogScalarFieldEnum[]
  }

  /**
   * User.authLinks
   */
  export type User$authLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLink
     */
    select?: AuthLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLinkInclude<ExtArgs> | null
    where?: AuthLinkWhereInput
    orderBy?: AuthLinkOrderByWithRelationInput | AuthLinkOrderByWithRelationInput[]
    cursor?: AuthLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthLinkScalarFieldEnum | AuthLinkScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model AuthLink
   */

  export type AggregateAuthLink = {
    _count: AuthLinkCountAggregateOutputType | null
    _min: AuthLinkMinAggregateOutputType | null
    _max: AuthLinkMaxAggregateOutputType | null
  }

  export type AuthLinkMinAggregateOutputType = {
    id: string | null
    userId: string | null
    nonce: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type AuthLinkMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    nonce: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type AuthLinkCountAggregateOutputType = {
    id: number
    userId: number
    nonce: number
    expiresAt: number
    usedAt: number
    createdAt: number
    _all: number
  }


  export type AuthLinkMinAggregateInputType = {
    id?: true
    userId?: true
    nonce?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type AuthLinkMaxAggregateInputType = {
    id?: true
    userId?: true
    nonce?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type AuthLinkCountAggregateInputType = {
    id?: true
    userId?: true
    nonce?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
    _all?: true
  }

  export type AuthLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthLink to aggregate.
     */
    where?: AuthLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthLinks to fetch.
     */
    orderBy?: AuthLinkOrderByWithRelationInput | AuthLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthLinks
    **/
    _count?: true | AuthLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthLinkMaxAggregateInputType
  }

  export type GetAuthLinkAggregateType<T extends AuthLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthLink[P]>
      : GetScalarType<T[P], AggregateAuthLink[P]>
  }




  export type AuthLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthLinkWhereInput
    orderBy?: AuthLinkOrderByWithAggregationInput | AuthLinkOrderByWithAggregationInput[]
    by: AuthLinkScalarFieldEnum[] | AuthLinkScalarFieldEnum
    having?: AuthLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthLinkCountAggregateInputType | true
    _min?: AuthLinkMinAggregateInputType
    _max?: AuthLinkMaxAggregateInputType
  }

  export type AuthLinkGroupByOutputType = {
    id: string
    userId: string
    nonce: string
    expiresAt: Date
    usedAt: Date | null
    createdAt: Date
    _count: AuthLinkCountAggregateOutputType | null
    _min: AuthLinkMinAggregateOutputType | null
    _max: AuthLinkMaxAggregateOutputType | null
  }

  type GetAuthLinkGroupByPayload<T extends AuthLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthLinkGroupByOutputType[P]>
            : GetScalarType<T[P], AuthLinkGroupByOutputType[P]>
        }
      >
    >


  export type AuthLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    nonce?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authLink"]>

  export type AuthLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    nonce?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authLink"]>

  export type AuthLinkSelectScalar = {
    id?: boolean
    userId?: boolean
    nonce?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }

  export type AuthLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuthLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthLink"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      nonce: string
      expiresAt: Date
      usedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["authLink"]>
    composites: {}
  }

  type AuthLinkGetPayload<S extends boolean | null | undefined | AuthLinkDefaultArgs> = $Result.GetResult<Prisma.$AuthLinkPayload, S>

  type AuthLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuthLinkFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuthLinkCountAggregateInputType | true
    }

  export interface AuthLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthLink'], meta: { name: 'AuthLink' } }
    /**
     * Find zero or one AuthLink that matches the filter.
     * @param {AuthLinkFindUniqueArgs} args - Arguments to find a AuthLink
     * @example
     * // Get one AuthLink
     * const authLink = await prisma.authLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthLinkFindUniqueArgs>(args: SelectSubset<T, AuthLinkFindUniqueArgs<ExtArgs>>): Prisma__AuthLinkClient<$Result.GetResult<Prisma.$AuthLinkPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuthLink that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuthLinkFindUniqueOrThrowArgs} args - Arguments to find a AuthLink
     * @example
     * // Get one AuthLink
     * const authLink = await prisma.authLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthLinkClient<$Result.GetResult<Prisma.$AuthLinkPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuthLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLinkFindFirstArgs} args - Arguments to find a AuthLink
     * @example
     * // Get one AuthLink
     * const authLink = await prisma.authLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthLinkFindFirstArgs>(args?: SelectSubset<T, AuthLinkFindFirstArgs<ExtArgs>>): Prisma__AuthLinkClient<$Result.GetResult<Prisma.$AuthLinkPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuthLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLinkFindFirstOrThrowArgs} args - Arguments to find a AuthLink
     * @example
     * // Get one AuthLink
     * const authLink = await prisma.authLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthLinkClient<$Result.GetResult<Prisma.$AuthLinkPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuthLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthLinks
     * const authLinks = await prisma.authLink.findMany()
     * 
     * // Get first 10 AuthLinks
     * const authLinks = await prisma.authLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authLinkWithIdOnly = await prisma.authLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthLinkFindManyArgs>(args?: SelectSubset<T, AuthLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthLinkPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuthLink.
     * @param {AuthLinkCreateArgs} args - Arguments to create a AuthLink.
     * @example
     * // Create one AuthLink
     * const AuthLink = await prisma.authLink.create({
     *   data: {
     *     // ... data to create a AuthLink
     *   }
     * })
     * 
     */
    create<T extends AuthLinkCreateArgs>(args: SelectSubset<T, AuthLinkCreateArgs<ExtArgs>>): Prisma__AuthLinkClient<$Result.GetResult<Prisma.$AuthLinkPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuthLinks.
     * @param {AuthLinkCreateManyArgs} args - Arguments to create many AuthLinks.
     * @example
     * // Create many AuthLinks
     * const authLink = await prisma.authLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthLinkCreateManyArgs>(args?: SelectSubset<T, AuthLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthLinks and returns the data saved in the database.
     * @param {AuthLinkCreateManyAndReturnArgs} args - Arguments to create many AuthLinks.
     * @example
     * // Create many AuthLinks
     * const authLink = await prisma.authLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthLinks and only return the `id`
     * const authLinkWithIdOnly = await prisma.authLink.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthLinkPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuthLink.
     * @param {AuthLinkDeleteArgs} args - Arguments to delete one AuthLink.
     * @example
     * // Delete one AuthLink
     * const AuthLink = await prisma.authLink.delete({
     *   where: {
     *     // ... filter to delete one AuthLink
     *   }
     * })
     * 
     */
    delete<T extends AuthLinkDeleteArgs>(args: SelectSubset<T, AuthLinkDeleteArgs<ExtArgs>>): Prisma__AuthLinkClient<$Result.GetResult<Prisma.$AuthLinkPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuthLink.
     * @param {AuthLinkUpdateArgs} args - Arguments to update one AuthLink.
     * @example
     * // Update one AuthLink
     * const authLink = await prisma.authLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthLinkUpdateArgs>(args: SelectSubset<T, AuthLinkUpdateArgs<ExtArgs>>): Prisma__AuthLinkClient<$Result.GetResult<Prisma.$AuthLinkPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuthLinks.
     * @param {AuthLinkDeleteManyArgs} args - Arguments to filter AuthLinks to delete.
     * @example
     * // Delete a few AuthLinks
     * const { count } = await prisma.authLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthLinkDeleteManyArgs>(args?: SelectSubset<T, AuthLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthLinks
     * const authLink = await prisma.authLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthLinkUpdateManyArgs>(args: SelectSubset<T, AuthLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthLink.
     * @param {AuthLinkUpsertArgs} args - Arguments to update or create a AuthLink.
     * @example
     * // Update or create a AuthLink
     * const authLink = await prisma.authLink.upsert({
     *   create: {
     *     // ... data to create a AuthLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthLink we want to update
     *   }
     * })
     */
    upsert<T extends AuthLinkUpsertArgs>(args: SelectSubset<T, AuthLinkUpsertArgs<ExtArgs>>): Prisma__AuthLinkClient<$Result.GetResult<Prisma.$AuthLinkPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuthLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLinkCountArgs} args - Arguments to filter AuthLinks to count.
     * @example
     * // Count the number of AuthLinks
     * const count = await prisma.authLink.count({
     *   where: {
     *     // ... the filter for the AuthLinks we want to count
     *   }
     * })
    **/
    count<T extends AuthLinkCountArgs>(
      args?: Subset<T, AuthLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthLinkAggregateArgs>(args: Subset<T, AuthLinkAggregateArgs>): Prisma.PrismaPromise<GetAuthLinkAggregateType<T>>

    /**
     * Group by AuthLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthLinkGroupByArgs['orderBy'] }
        : { orderBy?: AuthLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthLink model
   */
  readonly fields: AuthLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthLink model
   */ 
  interface AuthLinkFieldRefs {
    readonly id: FieldRef<"AuthLink", 'String'>
    readonly userId: FieldRef<"AuthLink", 'String'>
    readonly nonce: FieldRef<"AuthLink", 'String'>
    readonly expiresAt: FieldRef<"AuthLink", 'DateTime'>
    readonly usedAt: FieldRef<"AuthLink", 'DateTime'>
    readonly createdAt: FieldRef<"AuthLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthLink findUnique
   */
  export type AuthLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLink
     */
    select?: AuthLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLinkInclude<ExtArgs> | null
    /**
     * Filter, which AuthLink to fetch.
     */
    where: AuthLinkWhereUniqueInput
  }

  /**
   * AuthLink findUniqueOrThrow
   */
  export type AuthLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLink
     */
    select?: AuthLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLinkInclude<ExtArgs> | null
    /**
     * Filter, which AuthLink to fetch.
     */
    where: AuthLinkWhereUniqueInput
  }

  /**
   * AuthLink findFirst
   */
  export type AuthLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLink
     */
    select?: AuthLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLinkInclude<ExtArgs> | null
    /**
     * Filter, which AuthLink to fetch.
     */
    where?: AuthLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthLinks to fetch.
     */
    orderBy?: AuthLinkOrderByWithRelationInput | AuthLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthLinks.
     */
    cursor?: AuthLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthLinks.
     */
    distinct?: AuthLinkScalarFieldEnum | AuthLinkScalarFieldEnum[]
  }

  /**
   * AuthLink findFirstOrThrow
   */
  export type AuthLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLink
     */
    select?: AuthLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLinkInclude<ExtArgs> | null
    /**
     * Filter, which AuthLink to fetch.
     */
    where?: AuthLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthLinks to fetch.
     */
    orderBy?: AuthLinkOrderByWithRelationInput | AuthLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthLinks.
     */
    cursor?: AuthLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthLinks.
     */
    distinct?: AuthLinkScalarFieldEnum | AuthLinkScalarFieldEnum[]
  }

  /**
   * AuthLink findMany
   */
  export type AuthLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLink
     */
    select?: AuthLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLinkInclude<ExtArgs> | null
    /**
     * Filter, which AuthLinks to fetch.
     */
    where?: AuthLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthLinks to fetch.
     */
    orderBy?: AuthLinkOrderByWithRelationInput | AuthLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthLinks.
     */
    cursor?: AuthLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthLinks.
     */
    skip?: number
    distinct?: AuthLinkScalarFieldEnum | AuthLinkScalarFieldEnum[]
  }

  /**
   * AuthLink create
   */
  export type AuthLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLink
     */
    select?: AuthLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthLink.
     */
    data: XOR<AuthLinkCreateInput, AuthLinkUncheckedCreateInput>
  }

  /**
   * AuthLink createMany
   */
  export type AuthLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthLinks.
     */
    data: AuthLinkCreateManyInput | AuthLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthLink createManyAndReturn
   */
  export type AuthLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLink
     */
    select?: AuthLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuthLinks.
     */
    data: AuthLinkCreateManyInput | AuthLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthLink update
   */
  export type AuthLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLink
     */
    select?: AuthLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthLink.
     */
    data: XOR<AuthLinkUpdateInput, AuthLinkUncheckedUpdateInput>
    /**
     * Choose, which AuthLink to update.
     */
    where: AuthLinkWhereUniqueInput
  }

  /**
   * AuthLink updateMany
   */
  export type AuthLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthLinks.
     */
    data: XOR<AuthLinkUpdateManyMutationInput, AuthLinkUncheckedUpdateManyInput>
    /**
     * Filter which AuthLinks to update
     */
    where?: AuthLinkWhereInput
  }

  /**
   * AuthLink upsert
   */
  export type AuthLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLink
     */
    select?: AuthLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthLink to update in case it exists.
     */
    where: AuthLinkWhereUniqueInput
    /**
     * In case the AuthLink found by the `where` argument doesn't exist, create a new AuthLink with this data.
     */
    create: XOR<AuthLinkCreateInput, AuthLinkUncheckedCreateInput>
    /**
     * In case the AuthLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthLinkUpdateInput, AuthLinkUncheckedUpdateInput>
  }

  /**
   * AuthLink delete
   */
  export type AuthLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLink
     */
    select?: AuthLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLinkInclude<ExtArgs> | null
    /**
     * Filter which AuthLink to delete.
     */
    where: AuthLinkWhereUniqueInput
  }

  /**
   * AuthLink deleteMany
   */
  export type AuthLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthLinks to delete
     */
    where?: AuthLinkWhereInput
  }

  /**
   * AuthLink without action
   */
  export type AuthLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthLink
     */
    select?: AuthLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthLinkInclude<ExtArgs> | null
  }


  /**
   * Model Token
   */

  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenMinAggregateOutputType = {
    id: string | null
    chain: string | null
    mint: string | null
    symbol: string | null
    name: string | null
    discoveredAt: Date | null
    lastSeenAt: Date | null
  }

  export type TokenMaxAggregateOutputType = {
    id: string | null
    chain: string | null
    mint: string | null
    symbol: string | null
    name: string | null
    discoveredAt: Date | null
    lastSeenAt: Date | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    chain: number
    mint: number
    symbol: number
    name: number
    discoveredAt: number
    lastSeenAt: number
    _all: number
  }


  export type TokenMinAggregateInputType = {
    id?: true
    chain?: true
    mint?: true
    symbol?: true
    name?: true
    discoveredAt?: true
    lastSeenAt?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    chain?: true
    mint?: true
    symbol?: true
    name?: true
    discoveredAt?: true
    lastSeenAt?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    chain?: true
    mint?: true
    symbol?: true
    name?: true
    discoveredAt?: true
    lastSeenAt?: true
    _all?: true
  }

  export type TokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Token to aggregate.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithAggregationInput | TokenOrderByWithAggregationInput[]
    by: TokenScalarFieldEnum[] | TokenScalarFieldEnum
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }

  export type TokenGroupByOutputType = {
    id: string
    chain: string
    mint: string
    symbol: string | null
    name: string | null
    discoveredAt: Date
    lastSeenAt: Date
    _count: TokenCountAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    mint?: boolean
    symbol?: boolean
    name?: boolean
    discoveredAt?: boolean
    lastSeenAt?: boolean
    pairs?: boolean | Token$pairsArgs<ExtArgs>
    reports?: boolean | Token$reportsArgs<ExtArgs>
    vectors?: boolean | Token$vectorsArgs<ExtArgs>
    mentions?: boolean | Token$mentionsArgs<ExtArgs>
    watchlist?: boolean | Token$watchlistArgs<ExtArgs>
    _count?: boolean | TokenCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    mint?: boolean
    symbol?: boolean
    name?: boolean
    discoveredAt?: boolean
    lastSeenAt?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectScalar = {
    id?: boolean
    chain?: boolean
    mint?: boolean
    symbol?: boolean
    name?: boolean
    discoveredAt?: boolean
    lastSeenAt?: boolean
  }

  export type TokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pairs?: boolean | Token$pairsArgs<ExtArgs>
    reports?: boolean | Token$reportsArgs<ExtArgs>
    vectors?: boolean | Token$vectorsArgs<ExtArgs>
    mentions?: boolean | Token$mentionsArgs<ExtArgs>
    watchlist?: boolean | Token$watchlistArgs<ExtArgs>
    _count?: boolean | TokenCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Token"
    objects: {
      pairs: Prisma.$PairPayload<ExtArgs>[]
      reports: Prisma.$AnalystReportPayload<ExtArgs>[]
      vectors: Prisma.$VectorDocPayload<ExtArgs>[]
      mentions: Prisma.$SocialMentionPayload<ExtArgs>[]
      watchlist: Prisma.$WatchlistItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chain: string
      mint: string
      symbol: string | null
      name: string | null
      discoveredAt: Date
      lastSeenAt: Date
    }, ExtArgs["result"]["token"]>
    composites: {}
  }

  type TokenGetPayload<S extends boolean | null | undefined | TokenDefaultArgs> = $Result.GetResult<Prisma.$TokenPayload, S>

  type TokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TokenCountAggregateInputType | true
    }

  export interface TokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Token'], meta: { name: 'Token' } }
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenFindUniqueArgs>(args: SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Token that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenFindFirstArgs>(args?: SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenFindManyArgs>(args?: SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
     */
    create<T extends TokenCreateArgs>(args: SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tokens.
     * @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenCreateManyArgs>(args?: SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tokens and returns the data saved in the database.
     * @param {TokenCreateManyAndReturnArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
     */
    delete<T extends TokenDeleteArgs>(args: SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUpdateArgs>(args: SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenDeleteManyArgs>(args?: SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUpdateManyArgs>(args: SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
     */
    upsert<T extends TokenUpsertArgs>(args: SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Token model
   */
  readonly fields: TokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pairs<T extends Token$pairsArgs<ExtArgs> = {}>(args?: Subset<T, Token$pairsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findMany"> | Null>
    reports<T extends Token$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Token$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalystReportPayload<ExtArgs>, T, "findMany"> | Null>
    vectors<T extends Token$vectorsArgs<ExtArgs> = {}>(args?: Subset<T, Token$vectorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VectorDocPayload<ExtArgs>, T, "findMany"> | Null>
    mentions<T extends Token$mentionsArgs<ExtArgs> = {}>(args?: Subset<T, Token$mentionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialMentionPayload<ExtArgs>, T, "findMany"> | Null>
    watchlist<T extends Token$watchlistArgs<ExtArgs> = {}>(args?: Subset<T, Token$watchlistArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Token model
   */ 
  interface TokenFieldRefs {
    readonly id: FieldRef<"Token", 'String'>
    readonly chain: FieldRef<"Token", 'String'>
    readonly mint: FieldRef<"Token", 'String'>
    readonly symbol: FieldRef<"Token", 'String'>
    readonly name: FieldRef<"Token", 'String'>
    readonly discoveredAt: FieldRef<"Token", 'DateTime'>
    readonly lastSeenAt: FieldRef<"Token", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findMany
   */
  export type TokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token create
   */
  export type TokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to create a Token.
     */
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }

  /**
   * Token createMany
   */
  export type TokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token createManyAndReturn
   */
  export type TokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token update
   */
  export type TokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to update a Token.
     */
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
  }

  /**
   * Token upsert
   */
  export type TokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The filter to search for the Token to update in case it exists.
     */
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     */
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }

  /**
   * Token delete
   */
  export type TokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter which Token to delete.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokenWhereInput
  }

  /**
   * Token.pairs
   */
  export type Token$pairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    where?: PairWhereInput
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    cursor?: PairWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * Token.reports
   */
  export type Token$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalystReport
     */
    select?: AnalystReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalystReportInclude<ExtArgs> | null
    where?: AnalystReportWhereInput
    orderBy?: AnalystReportOrderByWithRelationInput | AnalystReportOrderByWithRelationInput[]
    cursor?: AnalystReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalystReportScalarFieldEnum | AnalystReportScalarFieldEnum[]
  }

  /**
   * Token.vectors
   */
  export type Token$vectorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorDoc
     */
    select?: VectorDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VectorDocInclude<ExtArgs> | null
    where?: VectorDocWhereInput
    orderBy?: VectorDocOrderByWithRelationInput | VectorDocOrderByWithRelationInput[]
    cursor?: VectorDocWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VectorDocScalarFieldEnum | VectorDocScalarFieldEnum[]
  }

  /**
   * Token.mentions
   */
  export type Token$mentionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialMention
     */
    select?: SocialMentionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialMentionInclude<ExtArgs> | null
    where?: SocialMentionWhereInput
    orderBy?: SocialMentionOrderByWithRelationInput | SocialMentionOrderByWithRelationInput[]
    cursor?: SocialMentionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SocialMentionScalarFieldEnum | SocialMentionScalarFieldEnum[]
  }

  /**
   * Token.watchlist
   */
  export type Token$watchlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemInclude<ExtArgs> | null
    where?: WatchlistItemWhereInput
    orderBy?: WatchlistItemOrderByWithRelationInput | WatchlistItemOrderByWithRelationInput[]
    cursor?: WatchlistItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchlistItemScalarFieldEnum | WatchlistItemScalarFieldEnum[]
  }

  /**
   * Token without action
   */
  export type TokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
  }


  /**
   * Model Pair
   */

  export type AggregatePair = {
    _count: PairCountAggregateOutputType | null
    _avg: PairAvgAggregateOutputType | null
    _sum: PairSumAggregateOutputType | null
    _min: PairMinAggregateOutputType | null
    _max: PairMaxAggregateOutputType | null
  }

  export type PairAvgAggregateOutputType = {
    liqUsd: Decimal | null
    price: Decimal | null
    vol5m: Decimal | null
    vol1h: Decimal | null
    vol24h: Decimal | null
  }

  export type PairSumAggregateOutputType = {
    liqUsd: Decimal | null
    price: Decimal | null
    vol5m: Decimal | null
    vol1h: Decimal | null
    vol24h: Decimal | null
  }

  export type PairMinAggregateOutputType = {
    id: string | null
    tokenId: string | null
    dexId: string | null
    base: string | null
    quote: string | null
    liqUsd: Decimal | null
    price: Decimal | null
    vol5m: Decimal | null
    vol1h: Decimal | null
    vol24h: Decimal | null
    updatedAt: Date | null
  }

  export type PairMaxAggregateOutputType = {
    id: string | null
    tokenId: string | null
    dexId: string | null
    base: string | null
    quote: string | null
    liqUsd: Decimal | null
    price: Decimal | null
    vol5m: Decimal | null
    vol1h: Decimal | null
    vol24h: Decimal | null
    updatedAt: Date | null
  }

  export type PairCountAggregateOutputType = {
    id: number
    tokenId: number
    dexId: number
    base: number
    quote: number
    liqUsd: number
    price: number
    vol5m: number
    vol1h: number
    vol24h: number
    updatedAt: number
    _all: number
  }


  export type PairAvgAggregateInputType = {
    liqUsd?: true
    price?: true
    vol5m?: true
    vol1h?: true
    vol24h?: true
  }

  export type PairSumAggregateInputType = {
    liqUsd?: true
    price?: true
    vol5m?: true
    vol1h?: true
    vol24h?: true
  }

  export type PairMinAggregateInputType = {
    id?: true
    tokenId?: true
    dexId?: true
    base?: true
    quote?: true
    liqUsd?: true
    price?: true
    vol5m?: true
    vol1h?: true
    vol24h?: true
    updatedAt?: true
  }

  export type PairMaxAggregateInputType = {
    id?: true
    tokenId?: true
    dexId?: true
    base?: true
    quote?: true
    liqUsd?: true
    price?: true
    vol5m?: true
    vol1h?: true
    vol24h?: true
    updatedAt?: true
  }

  export type PairCountAggregateInputType = {
    id?: true
    tokenId?: true
    dexId?: true
    base?: true
    quote?: true
    liqUsd?: true
    price?: true
    vol5m?: true
    vol1h?: true
    vol24h?: true
    updatedAt?: true
    _all?: true
  }

  export type PairAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pair to aggregate.
     */
    where?: PairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairs to fetch.
     */
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pairs
    **/
    _count?: true | PairCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PairAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PairSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PairMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PairMaxAggregateInputType
  }

  export type GetPairAggregateType<T extends PairAggregateArgs> = {
        [P in keyof T & keyof AggregatePair]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePair[P]>
      : GetScalarType<T[P], AggregatePair[P]>
  }




  export type PairGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairWhereInput
    orderBy?: PairOrderByWithAggregationInput | PairOrderByWithAggregationInput[]
    by: PairScalarFieldEnum[] | PairScalarFieldEnum
    having?: PairScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PairCountAggregateInputType | true
    _avg?: PairAvgAggregateInputType
    _sum?: PairSumAggregateInputType
    _min?: PairMinAggregateInputType
    _max?: PairMaxAggregateInputType
  }

  export type PairGroupByOutputType = {
    id: string
    tokenId: string
    dexId: string
    base: string
    quote: string
    liqUsd: Decimal
    price: Decimal
    vol5m: Decimal
    vol1h: Decimal
    vol24h: Decimal
    updatedAt: Date
    _count: PairCountAggregateOutputType | null
    _avg: PairAvgAggregateOutputType | null
    _sum: PairSumAggregateOutputType | null
    _min: PairMinAggregateOutputType | null
    _max: PairMaxAggregateOutputType | null
  }

  type GetPairGroupByPayload<T extends PairGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PairGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PairGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PairGroupByOutputType[P]>
            : GetScalarType<T[P], PairGroupByOutputType[P]>
        }
      >
    >


  export type PairSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenId?: boolean
    dexId?: boolean
    base?: boolean
    quote?: boolean
    liqUsd?: boolean
    price?: boolean
    vol5m?: boolean
    vol1h?: boolean
    vol24h?: boolean
    updatedAt?: boolean
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pair"]>

  export type PairSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenId?: boolean
    dexId?: boolean
    base?: boolean
    quote?: boolean
    liqUsd?: boolean
    price?: boolean
    vol5m?: boolean
    vol1h?: boolean
    vol24h?: boolean
    updatedAt?: boolean
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pair"]>

  export type PairSelectScalar = {
    id?: boolean
    tokenId?: boolean
    dexId?: boolean
    base?: boolean
    quote?: boolean
    liqUsd?: boolean
    price?: boolean
    vol5m?: boolean
    vol1h?: boolean
    vol24h?: boolean
    updatedAt?: boolean
  }

  export type PairInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }
  export type PairIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }

  export type $PairPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pair"
    objects: {
      token: Prisma.$TokenPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tokenId: string
      dexId: string
      base: string
      quote: string
      liqUsd: Prisma.Decimal
      price: Prisma.Decimal
      vol5m: Prisma.Decimal
      vol1h: Prisma.Decimal
      vol24h: Prisma.Decimal
      updatedAt: Date
    }, ExtArgs["result"]["pair"]>
    composites: {}
  }

  type PairGetPayload<S extends boolean | null | undefined | PairDefaultArgs> = $Result.GetResult<Prisma.$PairPayload, S>

  type PairCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PairFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PairCountAggregateInputType | true
    }

  export interface PairDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pair'], meta: { name: 'Pair' } }
    /**
     * Find zero or one Pair that matches the filter.
     * @param {PairFindUniqueArgs} args - Arguments to find a Pair
     * @example
     * // Get one Pair
     * const pair = await prisma.pair.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PairFindUniqueArgs>(args: SelectSubset<T, PairFindUniqueArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Pair that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PairFindUniqueOrThrowArgs} args - Arguments to find a Pair
     * @example
     * // Get one Pair
     * const pair = await prisma.pair.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PairFindUniqueOrThrowArgs>(args: SelectSubset<T, PairFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Pair that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairFindFirstArgs} args - Arguments to find a Pair
     * @example
     * // Get one Pair
     * const pair = await prisma.pair.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PairFindFirstArgs>(args?: SelectSubset<T, PairFindFirstArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Pair that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairFindFirstOrThrowArgs} args - Arguments to find a Pair
     * @example
     * // Get one Pair
     * const pair = await prisma.pair.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PairFindFirstOrThrowArgs>(args?: SelectSubset<T, PairFindFirstOrThrowArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Pairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pairs
     * const pairs = await prisma.pair.findMany()
     * 
     * // Get first 10 Pairs
     * const pairs = await prisma.pair.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pairWithIdOnly = await prisma.pair.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PairFindManyArgs>(args?: SelectSubset<T, PairFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Pair.
     * @param {PairCreateArgs} args - Arguments to create a Pair.
     * @example
     * // Create one Pair
     * const Pair = await prisma.pair.create({
     *   data: {
     *     // ... data to create a Pair
     *   }
     * })
     * 
     */
    create<T extends PairCreateArgs>(args: SelectSubset<T, PairCreateArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Pairs.
     * @param {PairCreateManyArgs} args - Arguments to create many Pairs.
     * @example
     * // Create many Pairs
     * const pair = await prisma.pair.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PairCreateManyArgs>(args?: SelectSubset<T, PairCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pairs and returns the data saved in the database.
     * @param {PairCreateManyAndReturnArgs} args - Arguments to create many Pairs.
     * @example
     * // Create many Pairs
     * const pair = await prisma.pair.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pairs and only return the `id`
     * const pairWithIdOnly = await prisma.pair.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PairCreateManyAndReturnArgs>(args?: SelectSubset<T, PairCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Pair.
     * @param {PairDeleteArgs} args - Arguments to delete one Pair.
     * @example
     * // Delete one Pair
     * const Pair = await prisma.pair.delete({
     *   where: {
     *     // ... filter to delete one Pair
     *   }
     * })
     * 
     */
    delete<T extends PairDeleteArgs>(args: SelectSubset<T, PairDeleteArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Pair.
     * @param {PairUpdateArgs} args - Arguments to update one Pair.
     * @example
     * // Update one Pair
     * const pair = await prisma.pair.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PairUpdateArgs>(args: SelectSubset<T, PairUpdateArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Pairs.
     * @param {PairDeleteManyArgs} args - Arguments to filter Pairs to delete.
     * @example
     * // Delete a few Pairs
     * const { count } = await prisma.pair.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PairDeleteManyArgs>(args?: SelectSubset<T, PairDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pairs
     * const pair = await prisma.pair.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PairUpdateManyArgs>(args: SelectSubset<T, PairUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pair.
     * @param {PairUpsertArgs} args - Arguments to update or create a Pair.
     * @example
     * // Update or create a Pair
     * const pair = await prisma.pair.upsert({
     *   create: {
     *     // ... data to create a Pair
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pair we want to update
     *   }
     * })
     */
    upsert<T extends PairUpsertArgs>(args: SelectSubset<T, PairUpsertArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Pairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairCountArgs} args - Arguments to filter Pairs to count.
     * @example
     * // Count the number of Pairs
     * const count = await prisma.pair.count({
     *   where: {
     *     // ... the filter for the Pairs we want to count
     *   }
     * })
    **/
    count<T extends PairCountArgs>(
      args?: Subset<T, PairCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PairCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PairAggregateArgs>(args: Subset<T, PairAggregateArgs>): Prisma.PrismaPromise<GetPairAggregateType<T>>

    /**
     * Group by Pair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PairGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PairGroupByArgs['orderBy'] }
        : { orderBy?: PairGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PairGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPairGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pair model
   */
  readonly fields: PairFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pair.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PairClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    token<T extends TokenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TokenDefaultArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pair model
   */ 
  interface PairFieldRefs {
    readonly id: FieldRef<"Pair", 'String'>
    readonly tokenId: FieldRef<"Pair", 'String'>
    readonly dexId: FieldRef<"Pair", 'String'>
    readonly base: FieldRef<"Pair", 'String'>
    readonly quote: FieldRef<"Pair", 'String'>
    readonly liqUsd: FieldRef<"Pair", 'Decimal'>
    readonly price: FieldRef<"Pair", 'Decimal'>
    readonly vol5m: FieldRef<"Pair", 'Decimal'>
    readonly vol1h: FieldRef<"Pair", 'Decimal'>
    readonly vol24h: FieldRef<"Pair", 'Decimal'>
    readonly updatedAt: FieldRef<"Pair", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pair findUnique
   */
  export type PairFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pair to fetch.
     */
    where: PairWhereUniqueInput
  }

  /**
   * Pair findUniqueOrThrow
   */
  export type PairFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pair to fetch.
     */
    where: PairWhereUniqueInput
  }

  /**
   * Pair findFirst
   */
  export type PairFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pair to fetch.
     */
    where?: PairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairs to fetch.
     */
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pairs.
     */
    cursor?: PairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pairs.
     */
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * Pair findFirstOrThrow
   */
  export type PairFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pair to fetch.
     */
    where?: PairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairs to fetch.
     */
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pairs.
     */
    cursor?: PairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pairs.
     */
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * Pair findMany
   */
  export type PairFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pairs to fetch.
     */
    where?: PairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairs to fetch.
     */
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pairs.
     */
    cursor?: PairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairs.
     */
    skip?: number
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * Pair create
   */
  export type PairCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * The data needed to create a Pair.
     */
    data: XOR<PairCreateInput, PairUncheckedCreateInput>
  }

  /**
   * Pair createMany
   */
  export type PairCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pairs.
     */
    data: PairCreateManyInput | PairCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pair createManyAndReturn
   */
  export type PairCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Pairs.
     */
    data: PairCreateManyInput | PairCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pair update
   */
  export type PairUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * The data needed to update a Pair.
     */
    data: XOR<PairUpdateInput, PairUncheckedUpdateInput>
    /**
     * Choose, which Pair to update.
     */
    where: PairWhereUniqueInput
  }

  /**
   * Pair updateMany
   */
  export type PairUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pairs.
     */
    data: XOR<PairUpdateManyMutationInput, PairUncheckedUpdateManyInput>
    /**
     * Filter which Pairs to update
     */
    where?: PairWhereInput
  }

  /**
   * Pair upsert
   */
  export type PairUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * The filter to search for the Pair to update in case it exists.
     */
    where: PairWhereUniqueInput
    /**
     * In case the Pair found by the `where` argument doesn't exist, create a new Pair with this data.
     */
    create: XOR<PairCreateInput, PairUncheckedCreateInput>
    /**
     * In case the Pair was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PairUpdateInput, PairUncheckedUpdateInput>
  }

  /**
   * Pair delete
   */
  export type PairDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter which Pair to delete.
     */
    where: PairWhereUniqueInput
  }

  /**
   * Pair deleteMany
   */
  export type PairDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pairs to delete
     */
    where?: PairWhereInput
  }

  /**
   * Pair without action
   */
  export type PairDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
  }


  /**
   * Model WatchlistItem
   */

  export type AggregateWatchlistItem = {
    _count: WatchlistItemCountAggregateOutputType | null
    _min: WatchlistItemMinAggregateOutputType | null
    _max: WatchlistItemMaxAggregateOutputType | null
  }

  export type WatchlistItemMinAggregateOutputType = {
    id: string | null
    userId: string | null
    tokenId: string | null
    createdAt: Date | null
  }

  export type WatchlistItemMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    tokenId: string | null
    createdAt: Date | null
  }

  export type WatchlistItemCountAggregateOutputType = {
    id: number
    userId: number
    tokenId: number
    alertPrefs: number
    createdAt: number
    _all: number
  }


  export type WatchlistItemMinAggregateInputType = {
    id?: true
    userId?: true
    tokenId?: true
    createdAt?: true
  }

  export type WatchlistItemMaxAggregateInputType = {
    id?: true
    userId?: true
    tokenId?: true
    createdAt?: true
  }

  export type WatchlistItemCountAggregateInputType = {
    id?: true
    userId?: true
    tokenId?: true
    alertPrefs?: true
    createdAt?: true
    _all?: true
  }

  export type WatchlistItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WatchlistItem to aggregate.
     */
    where?: WatchlistItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchlistItems to fetch.
     */
    orderBy?: WatchlistItemOrderByWithRelationInput | WatchlistItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WatchlistItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchlistItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchlistItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WatchlistItems
    **/
    _count?: true | WatchlistItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WatchlistItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WatchlistItemMaxAggregateInputType
  }

  export type GetWatchlistItemAggregateType<T extends WatchlistItemAggregateArgs> = {
        [P in keyof T & keyof AggregateWatchlistItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatchlistItem[P]>
      : GetScalarType<T[P], AggregateWatchlistItem[P]>
  }




  export type WatchlistItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistItemWhereInput
    orderBy?: WatchlistItemOrderByWithAggregationInput | WatchlistItemOrderByWithAggregationInput[]
    by: WatchlistItemScalarFieldEnum[] | WatchlistItemScalarFieldEnum
    having?: WatchlistItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WatchlistItemCountAggregateInputType | true
    _min?: WatchlistItemMinAggregateInputType
    _max?: WatchlistItemMaxAggregateInputType
  }

  export type WatchlistItemGroupByOutputType = {
    id: string
    userId: string
    tokenId: string
    alertPrefs: JsonValue
    createdAt: Date
    _count: WatchlistItemCountAggregateOutputType | null
    _min: WatchlistItemMinAggregateOutputType | null
    _max: WatchlistItemMaxAggregateOutputType | null
  }

  type GetWatchlistItemGroupByPayload<T extends WatchlistItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WatchlistItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WatchlistItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatchlistItemGroupByOutputType[P]>
            : GetScalarType<T[P], WatchlistItemGroupByOutputType[P]>
        }
      >
    >


  export type WatchlistItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenId?: boolean
    alertPrefs?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchlistItem"]>

  export type WatchlistItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenId?: boolean
    alertPrefs?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchlistItem"]>

  export type WatchlistItemSelectScalar = {
    id?: boolean
    userId?: boolean
    tokenId?: boolean
    alertPrefs?: boolean
    createdAt?: boolean
  }

  export type WatchlistItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }
  export type WatchlistItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }

  export type $WatchlistItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WatchlistItem"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      token: Prisma.$TokenPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      tokenId: string
      alertPrefs: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["watchlistItem"]>
    composites: {}
  }

  type WatchlistItemGetPayload<S extends boolean | null | undefined | WatchlistItemDefaultArgs> = $Result.GetResult<Prisma.$WatchlistItemPayload, S>

  type WatchlistItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WatchlistItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WatchlistItemCountAggregateInputType | true
    }

  export interface WatchlistItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WatchlistItem'], meta: { name: 'WatchlistItem' } }
    /**
     * Find zero or one WatchlistItem that matches the filter.
     * @param {WatchlistItemFindUniqueArgs} args - Arguments to find a WatchlistItem
     * @example
     * // Get one WatchlistItem
     * const watchlistItem = await prisma.watchlistItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WatchlistItemFindUniqueArgs>(args: SelectSubset<T, WatchlistItemFindUniqueArgs<ExtArgs>>): Prisma__WatchlistItemClient<$Result.GetResult<Prisma.$WatchlistItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WatchlistItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WatchlistItemFindUniqueOrThrowArgs} args - Arguments to find a WatchlistItem
     * @example
     * // Get one WatchlistItem
     * const watchlistItem = await prisma.watchlistItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WatchlistItemFindUniqueOrThrowArgs>(args: SelectSubset<T, WatchlistItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WatchlistItemClient<$Result.GetResult<Prisma.$WatchlistItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WatchlistItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistItemFindFirstArgs} args - Arguments to find a WatchlistItem
     * @example
     * // Get one WatchlistItem
     * const watchlistItem = await prisma.watchlistItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WatchlistItemFindFirstArgs>(args?: SelectSubset<T, WatchlistItemFindFirstArgs<ExtArgs>>): Prisma__WatchlistItemClient<$Result.GetResult<Prisma.$WatchlistItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WatchlistItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistItemFindFirstOrThrowArgs} args - Arguments to find a WatchlistItem
     * @example
     * // Get one WatchlistItem
     * const watchlistItem = await prisma.watchlistItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WatchlistItemFindFirstOrThrowArgs>(args?: SelectSubset<T, WatchlistItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__WatchlistItemClient<$Result.GetResult<Prisma.$WatchlistItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WatchlistItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WatchlistItems
     * const watchlistItems = await prisma.watchlistItem.findMany()
     * 
     * // Get first 10 WatchlistItems
     * const watchlistItems = await prisma.watchlistItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const watchlistItemWithIdOnly = await prisma.watchlistItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WatchlistItemFindManyArgs>(args?: SelectSubset<T, WatchlistItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WatchlistItem.
     * @param {WatchlistItemCreateArgs} args - Arguments to create a WatchlistItem.
     * @example
     * // Create one WatchlistItem
     * const WatchlistItem = await prisma.watchlistItem.create({
     *   data: {
     *     // ... data to create a WatchlistItem
     *   }
     * })
     * 
     */
    create<T extends WatchlistItemCreateArgs>(args: SelectSubset<T, WatchlistItemCreateArgs<ExtArgs>>): Prisma__WatchlistItemClient<$Result.GetResult<Prisma.$WatchlistItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WatchlistItems.
     * @param {WatchlistItemCreateManyArgs} args - Arguments to create many WatchlistItems.
     * @example
     * // Create many WatchlistItems
     * const watchlistItem = await prisma.watchlistItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WatchlistItemCreateManyArgs>(args?: SelectSubset<T, WatchlistItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WatchlistItems and returns the data saved in the database.
     * @param {WatchlistItemCreateManyAndReturnArgs} args - Arguments to create many WatchlistItems.
     * @example
     * // Create many WatchlistItems
     * const watchlistItem = await prisma.watchlistItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WatchlistItems and only return the `id`
     * const watchlistItemWithIdOnly = await prisma.watchlistItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WatchlistItemCreateManyAndReturnArgs>(args?: SelectSubset<T, WatchlistItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WatchlistItem.
     * @param {WatchlistItemDeleteArgs} args - Arguments to delete one WatchlistItem.
     * @example
     * // Delete one WatchlistItem
     * const WatchlistItem = await prisma.watchlistItem.delete({
     *   where: {
     *     // ... filter to delete one WatchlistItem
     *   }
     * })
     * 
     */
    delete<T extends WatchlistItemDeleteArgs>(args: SelectSubset<T, WatchlistItemDeleteArgs<ExtArgs>>): Prisma__WatchlistItemClient<$Result.GetResult<Prisma.$WatchlistItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WatchlistItem.
     * @param {WatchlistItemUpdateArgs} args - Arguments to update one WatchlistItem.
     * @example
     * // Update one WatchlistItem
     * const watchlistItem = await prisma.watchlistItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WatchlistItemUpdateArgs>(args: SelectSubset<T, WatchlistItemUpdateArgs<ExtArgs>>): Prisma__WatchlistItemClient<$Result.GetResult<Prisma.$WatchlistItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WatchlistItems.
     * @param {WatchlistItemDeleteManyArgs} args - Arguments to filter WatchlistItems to delete.
     * @example
     * // Delete a few WatchlistItems
     * const { count } = await prisma.watchlistItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WatchlistItemDeleteManyArgs>(args?: SelectSubset<T, WatchlistItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WatchlistItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WatchlistItems
     * const watchlistItem = await prisma.watchlistItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WatchlistItemUpdateManyArgs>(args: SelectSubset<T, WatchlistItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WatchlistItem.
     * @param {WatchlistItemUpsertArgs} args - Arguments to update or create a WatchlistItem.
     * @example
     * // Update or create a WatchlistItem
     * const watchlistItem = await prisma.watchlistItem.upsert({
     *   create: {
     *     // ... data to create a WatchlistItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WatchlistItem we want to update
     *   }
     * })
     */
    upsert<T extends WatchlistItemUpsertArgs>(args: SelectSubset<T, WatchlistItemUpsertArgs<ExtArgs>>): Prisma__WatchlistItemClient<$Result.GetResult<Prisma.$WatchlistItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WatchlistItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistItemCountArgs} args - Arguments to filter WatchlistItems to count.
     * @example
     * // Count the number of WatchlistItems
     * const count = await prisma.watchlistItem.count({
     *   where: {
     *     // ... the filter for the WatchlistItems we want to count
     *   }
     * })
    **/
    count<T extends WatchlistItemCountArgs>(
      args?: Subset<T, WatchlistItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatchlistItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WatchlistItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WatchlistItemAggregateArgs>(args: Subset<T, WatchlistItemAggregateArgs>): Prisma.PrismaPromise<GetWatchlistItemAggregateType<T>>

    /**
     * Group by WatchlistItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WatchlistItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WatchlistItemGroupByArgs['orderBy'] }
        : { orderBy?: WatchlistItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WatchlistItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWatchlistItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WatchlistItem model
   */
  readonly fields: WatchlistItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WatchlistItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WatchlistItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    token<T extends TokenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TokenDefaultArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WatchlistItem model
   */ 
  interface WatchlistItemFieldRefs {
    readonly id: FieldRef<"WatchlistItem", 'String'>
    readonly userId: FieldRef<"WatchlistItem", 'String'>
    readonly tokenId: FieldRef<"WatchlistItem", 'String'>
    readonly alertPrefs: FieldRef<"WatchlistItem", 'Json'>
    readonly createdAt: FieldRef<"WatchlistItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WatchlistItem findUnique
   */
  export type WatchlistItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemInclude<ExtArgs> | null
    /**
     * Filter, which WatchlistItem to fetch.
     */
    where: WatchlistItemWhereUniqueInput
  }

  /**
   * WatchlistItem findUniqueOrThrow
   */
  export type WatchlistItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemInclude<ExtArgs> | null
    /**
     * Filter, which WatchlistItem to fetch.
     */
    where: WatchlistItemWhereUniqueInput
  }

  /**
   * WatchlistItem findFirst
   */
  export type WatchlistItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemInclude<ExtArgs> | null
    /**
     * Filter, which WatchlistItem to fetch.
     */
    where?: WatchlistItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchlistItems to fetch.
     */
    orderBy?: WatchlistItemOrderByWithRelationInput | WatchlistItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WatchlistItems.
     */
    cursor?: WatchlistItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchlistItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchlistItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchlistItems.
     */
    distinct?: WatchlistItemScalarFieldEnum | WatchlistItemScalarFieldEnum[]
  }

  /**
   * WatchlistItem findFirstOrThrow
   */
  export type WatchlistItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemInclude<ExtArgs> | null
    /**
     * Filter, which WatchlistItem to fetch.
     */
    where?: WatchlistItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchlistItems to fetch.
     */
    orderBy?: WatchlistItemOrderByWithRelationInput | WatchlistItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WatchlistItems.
     */
    cursor?: WatchlistItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchlistItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchlistItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchlistItems.
     */
    distinct?: WatchlistItemScalarFieldEnum | WatchlistItemScalarFieldEnum[]
  }

  /**
   * WatchlistItem findMany
   */
  export type WatchlistItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemInclude<ExtArgs> | null
    /**
     * Filter, which WatchlistItems to fetch.
     */
    where?: WatchlistItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchlistItems to fetch.
     */
    orderBy?: WatchlistItemOrderByWithRelationInput | WatchlistItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WatchlistItems.
     */
    cursor?: WatchlistItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchlistItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchlistItems.
     */
    skip?: number
    distinct?: WatchlistItemScalarFieldEnum | WatchlistItemScalarFieldEnum[]
  }

  /**
   * WatchlistItem create
   */
  export type WatchlistItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemInclude<ExtArgs> | null
    /**
     * The data needed to create a WatchlistItem.
     */
    data: XOR<WatchlistItemCreateInput, WatchlistItemUncheckedCreateInput>
  }

  /**
   * WatchlistItem createMany
   */
  export type WatchlistItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WatchlistItems.
     */
    data: WatchlistItemCreateManyInput | WatchlistItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WatchlistItem createManyAndReturn
   */
  export type WatchlistItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WatchlistItems.
     */
    data: WatchlistItemCreateManyInput | WatchlistItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WatchlistItem update
   */
  export type WatchlistItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemInclude<ExtArgs> | null
    /**
     * The data needed to update a WatchlistItem.
     */
    data: XOR<WatchlistItemUpdateInput, WatchlistItemUncheckedUpdateInput>
    /**
     * Choose, which WatchlistItem to update.
     */
    where: WatchlistItemWhereUniqueInput
  }

  /**
   * WatchlistItem updateMany
   */
  export type WatchlistItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WatchlistItems.
     */
    data: XOR<WatchlistItemUpdateManyMutationInput, WatchlistItemUncheckedUpdateManyInput>
    /**
     * Filter which WatchlistItems to update
     */
    where?: WatchlistItemWhereInput
  }

  /**
   * WatchlistItem upsert
   */
  export type WatchlistItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemInclude<ExtArgs> | null
    /**
     * The filter to search for the WatchlistItem to update in case it exists.
     */
    where: WatchlistItemWhereUniqueInput
    /**
     * In case the WatchlistItem found by the `where` argument doesn't exist, create a new WatchlistItem with this data.
     */
    create: XOR<WatchlistItemCreateInput, WatchlistItemUncheckedCreateInput>
    /**
     * In case the WatchlistItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WatchlistItemUpdateInput, WatchlistItemUncheckedUpdateInput>
  }

  /**
   * WatchlistItem delete
   */
  export type WatchlistItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemInclude<ExtArgs> | null
    /**
     * Filter which WatchlistItem to delete.
     */
    where: WatchlistItemWhereUniqueInput
  }

  /**
   * WatchlistItem deleteMany
   */
  export type WatchlistItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WatchlistItems to delete
     */
    where?: WatchlistItemWhereInput
  }

  /**
   * WatchlistItem without action
   */
  export type WatchlistItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistItem
     */
    select?: WatchlistItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistItemInclude<ExtArgs> | null
  }


  /**
   * Model SignalEvent
   */

  export type AggregateSignalEvent = {
    _count: SignalEventCountAggregateOutputType | null
    _min: SignalEventMinAggregateOutputType | null
    _max: SignalEventMaxAggregateOutputType | null
  }

  export type SignalEventMinAggregateOutputType = {
    id: string | null
    tokenId: string | null
    pairId: string | null
    kind: string | null
    occurredAt: Date | null
  }

  export type SignalEventMaxAggregateOutputType = {
    id: string | null
    tokenId: string | null
    pairId: string | null
    kind: string | null
    occurredAt: Date | null
  }

  export type SignalEventCountAggregateOutputType = {
    id: number
    tokenId: number
    pairId: number
    kind: number
    metrics: number
    occurredAt: number
    _all: number
  }


  export type SignalEventMinAggregateInputType = {
    id?: true
    tokenId?: true
    pairId?: true
    kind?: true
    occurredAt?: true
  }

  export type SignalEventMaxAggregateInputType = {
    id?: true
    tokenId?: true
    pairId?: true
    kind?: true
    occurredAt?: true
  }

  export type SignalEventCountAggregateInputType = {
    id?: true
    tokenId?: true
    pairId?: true
    kind?: true
    metrics?: true
    occurredAt?: true
    _all?: true
  }

  export type SignalEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SignalEvent to aggregate.
     */
    where?: SignalEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignalEvents to fetch.
     */
    orderBy?: SignalEventOrderByWithRelationInput | SignalEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SignalEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignalEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignalEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SignalEvents
    **/
    _count?: true | SignalEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SignalEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SignalEventMaxAggregateInputType
  }

  export type GetSignalEventAggregateType<T extends SignalEventAggregateArgs> = {
        [P in keyof T & keyof AggregateSignalEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSignalEvent[P]>
      : GetScalarType<T[P], AggregateSignalEvent[P]>
  }




  export type SignalEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignalEventWhereInput
    orderBy?: SignalEventOrderByWithAggregationInput | SignalEventOrderByWithAggregationInput[]
    by: SignalEventScalarFieldEnum[] | SignalEventScalarFieldEnum
    having?: SignalEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SignalEventCountAggregateInputType | true
    _min?: SignalEventMinAggregateInputType
    _max?: SignalEventMaxAggregateInputType
  }

  export type SignalEventGroupByOutputType = {
    id: string
    tokenId: string
    pairId: string | null
    kind: string
    metrics: JsonValue
    occurredAt: Date
    _count: SignalEventCountAggregateOutputType | null
    _min: SignalEventMinAggregateOutputType | null
    _max: SignalEventMaxAggregateOutputType | null
  }

  type GetSignalEventGroupByPayload<T extends SignalEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SignalEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SignalEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SignalEventGroupByOutputType[P]>
            : GetScalarType<T[P], SignalEventGroupByOutputType[P]>
        }
      >
    >


  export type SignalEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenId?: boolean
    pairId?: boolean
    kind?: boolean
    metrics?: boolean
    occurredAt?: boolean
    scores?: boolean | SignalEvent$scoresArgs<ExtArgs>
    alerts?: boolean | SignalEvent$alertsArgs<ExtArgs>
    _count?: boolean | SignalEventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signalEvent"]>

  export type SignalEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenId?: boolean
    pairId?: boolean
    kind?: boolean
    metrics?: boolean
    occurredAt?: boolean
  }, ExtArgs["result"]["signalEvent"]>

  export type SignalEventSelectScalar = {
    id?: boolean
    tokenId?: boolean
    pairId?: boolean
    kind?: boolean
    metrics?: boolean
    occurredAt?: boolean
  }

  export type SignalEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scores?: boolean | SignalEvent$scoresArgs<ExtArgs>
    alerts?: boolean | SignalEvent$alertsArgs<ExtArgs>
    _count?: boolean | SignalEventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SignalEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SignalEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SignalEvent"
    objects: {
      scores: Prisma.$SignalScorePayload<ExtArgs>[]
      alerts: Prisma.$UserAlertLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tokenId: string
      pairId: string | null
      kind: string
      metrics: Prisma.JsonValue
      occurredAt: Date
    }, ExtArgs["result"]["signalEvent"]>
    composites: {}
  }

  type SignalEventGetPayload<S extends boolean | null | undefined | SignalEventDefaultArgs> = $Result.GetResult<Prisma.$SignalEventPayload, S>

  type SignalEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SignalEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SignalEventCountAggregateInputType | true
    }

  export interface SignalEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SignalEvent'], meta: { name: 'SignalEvent' } }
    /**
     * Find zero or one SignalEvent that matches the filter.
     * @param {SignalEventFindUniqueArgs} args - Arguments to find a SignalEvent
     * @example
     * // Get one SignalEvent
     * const signalEvent = await prisma.signalEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SignalEventFindUniqueArgs>(args: SelectSubset<T, SignalEventFindUniqueArgs<ExtArgs>>): Prisma__SignalEventClient<$Result.GetResult<Prisma.$SignalEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SignalEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SignalEventFindUniqueOrThrowArgs} args - Arguments to find a SignalEvent
     * @example
     * // Get one SignalEvent
     * const signalEvent = await prisma.signalEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SignalEventFindUniqueOrThrowArgs>(args: SelectSubset<T, SignalEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SignalEventClient<$Result.GetResult<Prisma.$SignalEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SignalEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalEventFindFirstArgs} args - Arguments to find a SignalEvent
     * @example
     * // Get one SignalEvent
     * const signalEvent = await prisma.signalEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SignalEventFindFirstArgs>(args?: SelectSubset<T, SignalEventFindFirstArgs<ExtArgs>>): Prisma__SignalEventClient<$Result.GetResult<Prisma.$SignalEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SignalEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalEventFindFirstOrThrowArgs} args - Arguments to find a SignalEvent
     * @example
     * // Get one SignalEvent
     * const signalEvent = await prisma.signalEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SignalEventFindFirstOrThrowArgs>(args?: SelectSubset<T, SignalEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__SignalEventClient<$Result.GetResult<Prisma.$SignalEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SignalEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SignalEvents
     * const signalEvents = await prisma.signalEvent.findMany()
     * 
     * // Get first 10 SignalEvents
     * const signalEvents = await prisma.signalEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const signalEventWithIdOnly = await prisma.signalEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SignalEventFindManyArgs>(args?: SelectSubset<T, SignalEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SignalEvent.
     * @param {SignalEventCreateArgs} args - Arguments to create a SignalEvent.
     * @example
     * // Create one SignalEvent
     * const SignalEvent = await prisma.signalEvent.create({
     *   data: {
     *     // ... data to create a SignalEvent
     *   }
     * })
     * 
     */
    create<T extends SignalEventCreateArgs>(args: SelectSubset<T, SignalEventCreateArgs<ExtArgs>>): Prisma__SignalEventClient<$Result.GetResult<Prisma.$SignalEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SignalEvents.
     * @param {SignalEventCreateManyArgs} args - Arguments to create many SignalEvents.
     * @example
     * // Create many SignalEvents
     * const signalEvent = await prisma.signalEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SignalEventCreateManyArgs>(args?: SelectSubset<T, SignalEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SignalEvents and returns the data saved in the database.
     * @param {SignalEventCreateManyAndReturnArgs} args - Arguments to create many SignalEvents.
     * @example
     * // Create many SignalEvents
     * const signalEvent = await prisma.signalEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SignalEvents and only return the `id`
     * const signalEventWithIdOnly = await prisma.signalEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SignalEventCreateManyAndReturnArgs>(args?: SelectSubset<T, SignalEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SignalEvent.
     * @param {SignalEventDeleteArgs} args - Arguments to delete one SignalEvent.
     * @example
     * // Delete one SignalEvent
     * const SignalEvent = await prisma.signalEvent.delete({
     *   where: {
     *     // ... filter to delete one SignalEvent
     *   }
     * })
     * 
     */
    delete<T extends SignalEventDeleteArgs>(args: SelectSubset<T, SignalEventDeleteArgs<ExtArgs>>): Prisma__SignalEventClient<$Result.GetResult<Prisma.$SignalEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SignalEvent.
     * @param {SignalEventUpdateArgs} args - Arguments to update one SignalEvent.
     * @example
     * // Update one SignalEvent
     * const signalEvent = await prisma.signalEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SignalEventUpdateArgs>(args: SelectSubset<T, SignalEventUpdateArgs<ExtArgs>>): Prisma__SignalEventClient<$Result.GetResult<Prisma.$SignalEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SignalEvents.
     * @param {SignalEventDeleteManyArgs} args - Arguments to filter SignalEvents to delete.
     * @example
     * // Delete a few SignalEvents
     * const { count } = await prisma.signalEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SignalEventDeleteManyArgs>(args?: SelectSubset<T, SignalEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SignalEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SignalEvents
     * const signalEvent = await prisma.signalEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SignalEventUpdateManyArgs>(args: SelectSubset<T, SignalEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SignalEvent.
     * @param {SignalEventUpsertArgs} args - Arguments to update or create a SignalEvent.
     * @example
     * // Update or create a SignalEvent
     * const signalEvent = await prisma.signalEvent.upsert({
     *   create: {
     *     // ... data to create a SignalEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SignalEvent we want to update
     *   }
     * })
     */
    upsert<T extends SignalEventUpsertArgs>(args: SelectSubset<T, SignalEventUpsertArgs<ExtArgs>>): Prisma__SignalEventClient<$Result.GetResult<Prisma.$SignalEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SignalEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalEventCountArgs} args - Arguments to filter SignalEvents to count.
     * @example
     * // Count the number of SignalEvents
     * const count = await prisma.signalEvent.count({
     *   where: {
     *     // ... the filter for the SignalEvents we want to count
     *   }
     * })
    **/
    count<T extends SignalEventCountArgs>(
      args?: Subset<T, SignalEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SignalEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SignalEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SignalEventAggregateArgs>(args: Subset<T, SignalEventAggregateArgs>): Prisma.PrismaPromise<GetSignalEventAggregateType<T>>

    /**
     * Group by SignalEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SignalEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SignalEventGroupByArgs['orderBy'] }
        : { orderBy?: SignalEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SignalEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSignalEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SignalEvent model
   */
  readonly fields: SignalEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SignalEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SignalEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scores<T extends SignalEvent$scoresArgs<ExtArgs> = {}>(args?: Subset<T, SignalEvent$scoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalScorePayload<ExtArgs>, T, "findMany"> | Null>
    alerts<T extends SignalEvent$alertsArgs<ExtArgs> = {}>(args?: Subset<T, SignalEvent$alertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAlertLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SignalEvent model
   */ 
  interface SignalEventFieldRefs {
    readonly id: FieldRef<"SignalEvent", 'String'>
    readonly tokenId: FieldRef<"SignalEvent", 'String'>
    readonly pairId: FieldRef<"SignalEvent", 'String'>
    readonly kind: FieldRef<"SignalEvent", 'String'>
    readonly metrics: FieldRef<"SignalEvent", 'Json'>
    readonly occurredAt: FieldRef<"SignalEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SignalEvent findUnique
   */
  export type SignalEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalEvent
     */
    select?: SignalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalEventInclude<ExtArgs> | null
    /**
     * Filter, which SignalEvent to fetch.
     */
    where: SignalEventWhereUniqueInput
  }

  /**
   * SignalEvent findUniqueOrThrow
   */
  export type SignalEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalEvent
     */
    select?: SignalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalEventInclude<ExtArgs> | null
    /**
     * Filter, which SignalEvent to fetch.
     */
    where: SignalEventWhereUniqueInput
  }

  /**
   * SignalEvent findFirst
   */
  export type SignalEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalEvent
     */
    select?: SignalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalEventInclude<ExtArgs> | null
    /**
     * Filter, which SignalEvent to fetch.
     */
    where?: SignalEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignalEvents to fetch.
     */
    orderBy?: SignalEventOrderByWithRelationInput | SignalEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SignalEvents.
     */
    cursor?: SignalEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignalEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignalEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SignalEvents.
     */
    distinct?: SignalEventScalarFieldEnum | SignalEventScalarFieldEnum[]
  }

  /**
   * SignalEvent findFirstOrThrow
   */
  export type SignalEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalEvent
     */
    select?: SignalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalEventInclude<ExtArgs> | null
    /**
     * Filter, which SignalEvent to fetch.
     */
    where?: SignalEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignalEvents to fetch.
     */
    orderBy?: SignalEventOrderByWithRelationInput | SignalEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SignalEvents.
     */
    cursor?: SignalEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignalEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignalEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SignalEvents.
     */
    distinct?: SignalEventScalarFieldEnum | SignalEventScalarFieldEnum[]
  }

  /**
   * SignalEvent findMany
   */
  export type SignalEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalEvent
     */
    select?: SignalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalEventInclude<ExtArgs> | null
    /**
     * Filter, which SignalEvents to fetch.
     */
    where?: SignalEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignalEvents to fetch.
     */
    orderBy?: SignalEventOrderByWithRelationInput | SignalEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SignalEvents.
     */
    cursor?: SignalEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignalEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignalEvents.
     */
    skip?: number
    distinct?: SignalEventScalarFieldEnum | SignalEventScalarFieldEnum[]
  }

  /**
   * SignalEvent create
   */
  export type SignalEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalEvent
     */
    select?: SignalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalEventInclude<ExtArgs> | null
    /**
     * The data needed to create a SignalEvent.
     */
    data: XOR<SignalEventCreateInput, SignalEventUncheckedCreateInput>
  }

  /**
   * SignalEvent createMany
   */
  export type SignalEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SignalEvents.
     */
    data: SignalEventCreateManyInput | SignalEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SignalEvent createManyAndReturn
   */
  export type SignalEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalEvent
     */
    select?: SignalEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SignalEvents.
     */
    data: SignalEventCreateManyInput | SignalEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SignalEvent update
   */
  export type SignalEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalEvent
     */
    select?: SignalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalEventInclude<ExtArgs> | null
    /**
     * The data needed to update a SignalEvent.
     */
    data: XOR<SignalEventUpdateInput, SignalEventUncheckedUpdateInput>
    /**
     * Choose, which SignalEvent to update.
     */
    where: SignalEventWhereUniqueInput
  }

  /**
   * SignalEvent updateMany
   */
  export type SignalEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SignalEvents.
     */
    data: XOR<SignalEventUpdateManyMutationInput, SignalEventUncheckedUpdateManyInput>
    /**
     * Filter which SignalEvents to update
     */
    where?: SignalEventWhereInput
  }

  /**
   * SignalEvent upsert
   */
  export type SignalEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalEvent
     */
    select?: SignalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalEventInclude<ExtArgs> | null
    /**
     * The filter to search for the SignalEvent to update in case it exists.
     */
    where: SignalEventWhereUniqueInput
    /**
     * In case the SignalEvent found by the `where` argument doesn't exist, create a new SignalEvent with this data.
     */
    create: XOR<SignalEventCreateInput, SignalEventUncheckedCreateInput>
    /**
     * In case the SignalEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SignalEventUpdateInput, SignalEventUncheckedUpdateInput>
  }

  /**
   * SignalEvent delete
   */
  export type SignalEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalEvent
     */
    select?: SignalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalEventInclude<ExtArgs> | null
    /**
     * Filter which SignalEvent to delete.
     */
    where: SignalEventWhereUniqueInput
  }

  /**
   * SignalEvent deleteMany
   */
  export type SignalEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SignalEvents to delete
     */
    where?: SignalEventWhereInput
  }

  /**
   * SignalEvent.scores
   */
  export type SignalEvent$scoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalScore
     */
    select?: SignalScoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalScoreInclude<ExtArgs> | null
    where?: SignalScoreWhereInput
    orderBy?: SignalScoreOrderByWithRelationInput | SignalScoreOrderByWithRelationInput[]
    cursor?: SignalScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SignalScoreScalarFieldEnum | SignalScoreScalarFieldEnum[]
  }

  /**
   * SignalEvent.alerts
   */
  export type SignalEvent$alertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogInclude<ExtArgs> | null
    where?: UserAlertLogWhereInput
    orderBy?: UserAlertLogOrderByWithRelationInput | UserAlertLogOrderByWithRelationInput[]
    cursor?: UserAlertLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAlertLogScalarFieldEnum | UserAlertLogScalarFieldEnum[]
  }

  /**
   * SignalEvent without action
   */
  export type SignalEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalEvent
     */
    select?: SignalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalEventInclude<ExtArgs> | null
  }


  /**
   * Model SignalScore
   */

  export type AggregateSignalScore = {
    _count: SignalScoreCountAggregateOutputType | null
    _avg: SignalScoreAvgAggregateOutputType | null
    _sum: SignalScoreSumAggregateOutputType | null
    _min: SignalScoreMinAggregateOutputType | null
    _max: SignalScoreMaxAggregateOutputType | null
  }

  export type SignalScoreAvgAggregateOutputType = {
    score: Decimal | null
  }

  export type SignalScoreSumAggregateOutputType = {
    score: Decimal | null
  }

  export type SignalScoreMinAggregateOutputType = {
    id: string | null
    signalEventId: string | null
    score: Decimal | null
    label: string | null
    model: string | null
    createdAt: Date | null
  }

  export type SignalScoreMaxAggregateOutputType = {
    id: string | null
    signalEventId: string | null
    score: Decimal | null
    label: string | null
    model: string | null
    createdAt: Date | null
  }

  export type SignalScoreCountAggregateOutputType = {
    id: number
    signalEventId: number
    score: number
    label: number
    model: number
    features: number
    createdAt: number
    _all: number
  }


  export type SignalScoreAvgAggregateInputType = {
    score?: true
  }

  export type SignalScoreSumAggregateInputType = {
    score?: true
  }

  export type SignalScoreMinAggregateInputType = {
    id?: true
    signalEventId?: true
    score?: true
    label?: true
    model?: true
    createdAt?: true
  }

  export type SignalScoreMaxAggregateInputType = {
    id?: true
    signalEventId?: true
    score?: true
    label?: true
    model?: true
    createdAt?: true
  }

  export type SignalScoreCountAggregateInputType = {
    id?: true
    signalEventId?: true
    score?: true
    label?: true
    model?: true
    features?: true
    createdAt?: true
    _all?: true
  }

  export type SignalScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SignalScore to aggregate.
     */
    where?: SignalScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignalScores to fetch.
     */
    orderBy?: SignalScoreOrderByWithRelationInput | SignalScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SignalScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignalScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignalScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SignalScores
    **/
    _count?: true | SignalScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SignalScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SignalScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SignalScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SignalScoreMaxAggregateInputType
  }

  export type GetSignalScoreAggregateType<T extends SignalScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateSignalScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSignalScore[P]>
      : GetScalarType<T[P], AggregateSignalScore[P]>
  }




  export type SignalScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignalScoreWhereInput
    orderBy?: SignalScoreOrderByWithAggregationInput | SignalScoreOrderByWithAggregationInput[]
    by: SignalScoreScalarFieldEnum[] | SignalScoreScalarFieldEnum
    having?: SignalScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SignalScoreCountAggregateInputType | true
    _avg?: SignalScoreAvgAggregateInputType
    _sum?: SignalScoreSumAggregateInputType
    _min?: SignalScoreMinAggregateInputType
    _max?: SignalScoreMaxAggregateInputType
  }

  export type SignalScoreGroupByOutputType = {
    id: string
    signalEventId: string
    score: Decimal
    label: string
    model: string
    features: JsonValue
    createdAt: Date
    _count: SignalScoreCountAggregateOutputType | null
    _avg: SignalScoreAvgAggregateOutputType | null
    _sum: SignalScoreSumAggregateOutputType | null
    _min: SignalScoreMinAggregateOutputType | null
    _max: SignalScoreMaxAggregateOutputType | null
  }

  type GetSignalScoreGroupByPayload<T extends SignalScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SignalScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SignalScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SignalScoreGroupByOutputType[P]>
            : GetScalarType<T[P], SignalScoreGroupByOutputType[P]>
        }
      >
    >


  export type SignalScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    signalEventId?: boolean
    score?: boolean
    label?: boolean
    model?: boolean
    features?: boolean
    createdAt?: boolean
    signalEvent?: boolean | SignalEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signalScore"]>

  export type SignalScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    signalEventId?: boolean
    score?: boolean
    label?: boolean
    model?: boolean
    features?: boolean
    createdAt?: boolean
    signalEvent?: boolean | SignalEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signalScore"]>

  export type SignalScoreSelectScalar = {
    id?: boolean
    signalEventId?: boolean
    score?: boolean
    label?: boolean
    model?: boolean
    features?: boolean
    createdAt?: boolean
  }

  export type SignalScoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    signalEvent?: boolean | SignalEventDefaultArgs<ExtArgs>
  }
  export type SignalScoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    signalEvent?: boolean | SignalEventDefaultArgs<ExtArgs>
  }

  export type $SignalScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SignalScore"
    objects: {
      signalEvent: Prisma.$SignalEventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      signalEventId: string
      score: Prisma.Decimal
      label: string
      model: string
      features: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["signalScore"]>
    composites: {}
  }

  type SignalScoreGetPayload<S extends boolean | null | undefined | SignalScoreDefaultArgs> = $Result.GetResult<Prisma.$SignalScorePayload, S>

  type SignalScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SignalScoreFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SignalScoreCountAggregateInputType | true
    }

  export interface SignalScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SignalScore'], meta: { name: 'SignalScore' } }
    /**
     * Find zero or one SignalScore that matches the filter.
     * @param {SignalScoreFindUniqueArgs} args - Arguments to find a SignalScore
     * @example
     * // Get one SignalScore
     * const signalScore = await prisma.signalScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SignalScoreFindUniqueArgs>(args: SelectSubset<T, SignalScoreFindUniqueArgs<ExtArgs>>): Prisma__SignalScoreClient<$Result.GetResult<Prisma.$SignalScorePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SignalScore that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SignalScoreFindUniqueOrThrowArgs} args - Arguments to find a SignalScore
     * @example
     * // Get one SignalScore
     * const signalScore = await prisma.signalScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SignalScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, SignalScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SignalScoreClient<$Result.GetResult<Prisma.$SignalScorePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SignalScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalScoreFindFirstArgs} args - Arguments to find a SignalScore
     * @example
     * // Get one SignalScore
     * const signalScore = await prisma.signalScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SignalScoreFindFirstArgs>(args?: SelectSubset<T, SignalScoreFindFirstArgs<ExtArgs>>): Prisma__SignalScoreClient<$Result.GetResult<Prisma.$SignalScorePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SignalScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalScoreFindFirstOrThrowArgs} args - Arguments to find a SignalScore
     * @example
     * // Get one SignalScore
     * const signalScore = await prisma.signalScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SignalScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, SignalScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__SignalScoreClient<$Result.GetResult<Prisma.$SignalScorePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SignalScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SignalScores
     * const signalScores = await prisma.signalScore.findMany()
     * 
     * // Get first 10 SignalScores
     * const signalScores = await prisma.signalScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const signalScoreWithIdOnly = await prisma.signalScore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SignalScoreFindManyArgs>(args?: SelectSubset<T, SignalScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalScorePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SignalScore.
     * @param {SignalScoreCreateArgs} args - Arguments to create a SignalScore.
     * @example
     * // Create one SignalScore
     * const SignalScore = await prisma.signalScore.create({
     *   data: {
     *     // ... data to create a SignalScore
     *   }
     * })
     * 
     */
    create<T extends SignalScoreCreateArgs>(args: SelectSubset<T, SignalScoreCreateArgs<ExtArgs>>): Prisma__SignalScoreClient<$Result.GetResult<Prisma.$SignalScorePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SignalScores.
     * @param {SignalScoreCreateManyArgs} args - Arguments to create many SignalScores.
     * @example
     * // Create many SignalScores
     * const signalScore = await prisma.signalScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SignalScoreCreateManyArgs>(args?: SelectSubset<T, SignalScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SignalScores and returns the data saved in the database.
     * @param {SignalScoreCreateManyAndReturnArgs} args - Arguments to create many SignalScores.
     * @example
     * // Create many SignalScores
     * const signalScore = await prisma.signalScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SignalScores and only return the `id`
     * const signalScoreWithIdOnly = await prisma.signalScore.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SignalScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, SignalScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalScorePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SignalScore.
     * @param {SignalScoreDeleteArgs} args - Arguments to delete one SignalScore.
     * @example
     * // Delete one SignalScore
     * const SignalScore = await prisma.signalScore.delete({
     *   where: {
     *     // ... filter to delete one SignalScore
     *   }
     * })
     * 
     */
    delete<T extends SignalScoreDeleteArgs>(args: SelectSubset<T, SignalScoreDeleteArgs<ExtArgs>>): Prisma__SignalScoreClient<$Result.GetResult<Prisma.$SignalScorePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SignalScore.
     * @param {SignalScoreUpdateArgs} args - Arguments to update one SignalScore.
     * @example
     * // Update one SignalScore
     * const signalScore = await prisma.signalScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SignalScoreUpdateArgs>(args: SelectSubset<T, SignalScoreUpdateArgs<ExtArgs>>): Prisma__SignalScoreClient<$Result.GetResult<Prisma.$SignalScorePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SignalScores.
     * @param {SignalScoreDeleteManyArgs} args - Arguments to filter SignalScores to delete.
     * @example
     * // Delete a few SignalScores
     * const { count } = await prisma.signalScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SignalScoreDeleteManyArgs>(args?: SelectSubset<T, SignalScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SignalScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SignalScores
     * const signalScore = await prisma.signalScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SignalScoreUpdateManyArgs>(args: SelectSubset<T, SignalScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SignalScore.
     * @param {SignalScoreUpsertArgs} args - Arguments to update or create a SignalScore.
     * @example
     * // Update or create a SignalScore
     * const signalScore = await prisma.signalScore.upsert({
     *   create: {
     *     // ... data to create a SignalScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SignalScore we want to update
     *   }
     * })
     */
    upsert<T extends SignalScoreUpsertArgs>(args: SelectSubset<T, SignalScoreUpsertArgs<ExtArgs>>): Prisma__SignalScoreClient<$Result.GetResult<Prisma.$SignalScorePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SignalScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalScoreCountArgs} args - Arguments to filter SignalScores to count.
     * @example
     * // Count the number of SignalScores
     * const count = await prisma.signalScore.count({
     *   where: {
     *     // ... the filter for the SignalScores we want to count
     *   }
     * })
    **/
    count<T extends SignalScoreCountArgs>(
      args?: Subset<T, SignalScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SignalScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SignalScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SignalScoreAggregateArgs>(args: Subset<T, SignalScoreAggregateArgs>): Prisma.PrismaPromise<GetSignalScoreAggregateType<T>>

    /**
     * Group by SignalScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SignalScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SignalScoreGroupByArgs['orderBy'] }
        : { orderBy?: SignalScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SignalScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSignalScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SignalScore model
   */
  readonly fields: SignalScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SignalScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SignalScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    signalEvent<T extends SignalEventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SignalEventDefaultArgs<ExtArgs>>): Prisma__SignalEventClient<$Result.GetResult<Prisma.$SignalEventPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SignalScore model
   */ 
  interface SignalScoreFieldRefs {
    readonly id: FieldRef<"SignalScore", 'String'>
    readonly signalEventId: FieldRef<"SignalScore", 'String'>
    readonly score: FieldRef<"SignalScore", 'Decimal'>
    readonly label: FieldRef<"SignalScore", 'String'>
    readonly model: FieldRef<"SignalScore", 'String'>
    readonly features: FieldRef<"SignalScore", 'Json'>
    readonly createdAt: FieldRef<"SignalScore", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SignalScore findUnique
   */
  export type SignalScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalScore
     */
    select?: SignalScoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalScoreInclude<ExtArgs> | null
    /**
     * Filter, which SignalScore to fetch.
     */
    where: SignalScoreWhereUniqueInput
  }

  /**
   * SignalScore findUniqueOrThrow
   */
  export type SignalScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalScore
     */
    select?: SignalScoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalScoreInclude<ExtArgs> | null
    /**
     * Filter, which SignalScore to fetch.
     */
    where: SignalScoreWhereUniqueInput
  }

  /**
   * SignalScore findFirst
   */
  export type SignalScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalScore
     */
    select?: SignalScoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalScoreInclude<ExtArgs> | null
    /**
     * Filter, which SignalScore to fetch.
     */
    where?: SignalScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignalScores to fetch.
     */
    orderBy?: SignalScoreOrderByWithRelationInput | SignalScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SignalScores.
     */
    cursor?: SignalScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignalScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignalScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SignalScores.
     */
    distinct?: SignalScoreScalarFieldEnum | SignalScoreScalarFieldEnum[]
  }

  /**
   * SignalScore findFirstOrThrow
   */
  export type SignalScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalScore
     */
    select?: SignalScoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalScoreInclude<ExtArgs> | null
    /**
     * Filter, which SignalScore to fetch.
     */
    where?: SignalScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignalScores to fetch.
     */
    orderBy?: SignalScoreOrderByWithRelationInput | SignalScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SignalScores.
     */
    cursor?: SignalScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignalScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignalScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SignalScores.
     */
    distinct?: SignalScoreScalarFieldEnum | SignalScoreScalarFieldEnum[]
  }

  /**
   * SignalScore findMany
   */
  export type SignalScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalScore
     */
    select?: SignalScoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalScoreInclude<ExtArgs> | null
    /**
     * Filter, which SignalScores to fetch.
     */
    where?: SignalScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignalScores to fetch.
     */
    orderBy?: SignalScoreOrderByWithRelationInput | SignalScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SignalScores.
     */
    cursor?: SignalScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignalScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignalScores.
     */
    skip?: number
    distinct?: SignalScoreScalarFieldEnum | SignalScoreScalarFieldEnum[]
  }

  /**
   * SignalScore create
   */
  export type SignalScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalScore
     */
    select?: SignalScoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalScoreInclude<ExtArgs> | null
    /**
     * The data needed to create a SignalScore.
     */
    data: XOR<SignalScoreCreateInput, SignalScoreUncheckedCreateInput>
  }

  /**
   * SignalScore createMany
   */
  export type SignalScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SignalScores.
     */
    data: SignalScoreCreateManyInput | SignalScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SignalScore createManyAndReturn
   */
  export type SignalScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalScore
     */
    select?: SignalScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SignalScores.
     */
    data: SignalScoreCreateManyInput | SignalScoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalScoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SignalScore update
   */
  export type SignalScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalScore
     */
    select?: SignalScoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalScoreInclude<ExtArgs> | null
    /**
     * The data needed to update a SignalScore.
     */
    data: XOR<SignalScoreUpdateInput, SignalScoreUncheckedUpdateInput>
    /**
     * Choose, which SignalScore to update.
     */
    where: SignalScoreWhereUniqueInput
  }

  /**
   * SignalScore updateMany
   */
  export type SignalScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SignalScores.
     */
    data: XOR<SignalScoreUpdateManyMutationInput, SignalScoreUncheckedUpdateManyInput>
    /**
     * Filter which SignalScores to update
     */
    where?: SignalScoreWhereInput
  }

  /**
   * SignalScore upsert
   */
  export type SignalScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalScore
     */
    select?: SignalScoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalScoreInclude<ExtArgs> | null
    /**
     * The filter to search for the SignalScore to update in case it exists.
     */
    where: SignalScoreWhereUniqueInput
    /**
     * In case the SignalScore found by the `where` argument doesn't exist, create a new SignalScore with this data.
     */
    create: XOR<SignalScoreCreateInput, SignalScoreUncheckedCreateInput>
    /**
     * In case the SignalScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SignalScoreUpdateInput, SignalScoreUncheckedUpdateInput>
  }

  /**
   * SignalScore delete
   */
  export type SignalScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalScore
     */
    select?: SignalScoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalScoreInclude<ExtArgs> | null
    /**
     * Filter which SignalScore to delete.
     */
    where: SignalScoreWhereUniqueInput
  }

  /**
   * SignalScore deleteMany
   */
  export type SignalScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SignalScores to delete
     */
    where?: SignalScoreWhereInput
  }

  /**
   * SignalScore without action
   */
  export type SignalScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignalScore
     */
    select?: SignalScoreSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalScoreInclude<ExtArgs> | null
  }


  /**
   * Model AnalystReport
   */

  export type AggregateAnalystReport = {
    _count: AnalystReportCountAggregateOutputType | null
    _min: AnalystReportMinAggregateOutputType | null
    _max: AnalystReportMaxAggregateOutputType | null
  }

  export type AnalystReportMinAggregateOutputType = {
    id: string | null
    tokenId: string | null
    signalEventId: string | null
    summaryShort: string | null
    summaryLong: string | null
    riskSummary: string | null
    model: string | null
    createdAt: Date | null
  }

  export type AnalystReportMaxAggregateOutputType = {
    id: string | null
    tokenId: string | null
    signalEventId: string | null
    summaryShort: string | null
    summaryLong: string | null
    riskSummary: string | null
    model: string | null
    createdAt: Date | null
  }

  export type AnalystReportCountAggregateOutputType = {
    id: number
    tokenId: number
    signalEventId: number
    summaryShort: number
    summaryLong: number
    riskSummary: number
    model: number
    createdAt: number
    _all: number
  }


  export type AnalystReportMinAggregateInputType = {
    id?: true
    tokenId?: true
    signalEventId?: true
    summaryShort?: true
    summaryLong?: true
    riskSummary?: true
    model?: true
    createdAt?: true
  }

  export type AnalystReportMaxAggregateInputType = {
    id?: true
    tokenId?: true
    signalEventId?: true
    summaryShort?: true
    summaryLong?: true
    riskSummary?: true
    model?: true
    createdAt?: true
  }

  export type AnalystReportCountAggregateInputType = {
    id?: true
    tokenId?: true
    signalEventId?: true
    summaryShort?: true
    summaryLong?: true
    riskSummary?: true
    model?: true
    createdAt?: true
    _all?: true
  }

  export type AnalystReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalystReport to aggregate.
     */
    where?: AnalystReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalystReports to fetch.
     */
    orderBy?: AnalystReportOrderByWithRelationInput | AnalystReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalystReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalystReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalystReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnalystReports
    **/
    _count?: true | AnalystReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalystReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalystReportMaxAggregateInputType
  }

  export type GetAnalystReportAggregateType<T extends AnalystReportAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalystReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalystReport[P]>
      : GetScalarType<T[P], AggregateAnalystReport[P]>
  }




  export type AnalystReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalystReportWhereInput
    orderBy?: AnalystReportOrderByWithAggregationInput | AnalystReportOrderByWithAggregationInput[]
    by: AnalystReportScalarFieldEnum[] | AnalystReportScalarFieldEnum
    having?: AnalystReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalystReportCountAggregateInputType | true
    _min?: AnalystReportMinAggregateInputType
    _max?: AnalystReportMaxAggregateInputType
  }

  export type AnalystReportGroupByOutputType = {
    id: string
    tokenId: string
    signalEventId: string | null
    summaryShort: string
    summaryLong: string
    riskSummary: string
    model: string
    createdAt: Date
    _count: AnalystReportCountAggregateOutputType | null
    _min: AnalystReportMinAggregateOutputType | null
    _max: AnalystReportMaxAggregateOutputType | null
  }

  type GetAnalystReportGroupByPayload<T extends AnalystReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalystReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalystReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalystReportGroupByOutputType[P]>
            : GetScalarType<T[P], AnalystReportGroupByOutputType[P]>
        }
      >
    >


  export type AnalystReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenId?: boolean
    signalEventId?: boolean
    summaryShort?: boolean
    summaryLong?: boolean
    riskSummary?: boolean
    model?: boolean
    createdAt?: boolean
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analystReport"]>

  export type AnalystReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenId?: boolean
    signalEventId?: boolean
    summaryShort?: boolean
    summaryLong?: boolean
    riskSummary?: boolean
    model?: boolean
    createdAt?: boolean
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analystReport"]>

  export type AnalystReportSelectScalar = {
    id?: boolean
    tokenId?: boolean
    signalEventId?: boolean
    summaryShort?: boolean
    summaryLong?: boolean
    riskSummary?: boolean
    model?: boolean
    createdAt?: boolean
  }

  export type AnalystReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }
  export type AnalystReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }

  export type $AnalystReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnalystReport"
    objects: {
      token: Prisma.$TokenPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tokenId: string
      signalEventId: string | null
      summaryShort: string
      summaryLong: string
      riskSummary: string
      model: string
      createdAt: Date
    }, ExtArgs["result"]["analystReport"]>
    composites: {}
  }

  type AnalystReportGetPayload<S extends boolean | null | undefined | AnalystReportDefaultArgs> = $Result.GetResult<Prisma.$AnalystReportPayload, S>

  type AnalystReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AnalystReportFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AnalystReportCountAggregateInputType | true
    }

  export interface AnalystReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnalystReport'], meta: { name: 'AnalystReport' } }
    /**
     * Find zero or one AnalystReport that matches the filter.
     * @param {AnalystReportFindUniqueArgs} args - Arguments to find a AnalystReport
     * @example
     * // Get one AnalystReport
     * const analystReport = await prisma.analystReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalystReportFindUniqueArgs>(args: SelectSubset<T, AnalystReportFindUniqueArgs<ExtArgs>>): Prisma__AnalystReportClient<$Result.GetResult<Prisma.$AnalystReportPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AnalystReport that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AnalystReportFindUniqueOrThrowArgs} args - Arguments to find a AnalystReport
     * @example
     * // Get one AnalystReport
     * const analystReport = await prisma.analystReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalystReportFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalystReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalystReportClient<$Result.GetResult<Prisma.$AnalystReportPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AnalystReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalystReportFindFirstArgs} args - Arguments to find a AnalystReport
     * @example
     * // Get one AnalystReport
     * const analystReport = await prisma.analystReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalystReportFindFirstArgs>(args?: SelectSubset<T, AnalystReportFindFirstArgs<ExtArgs>>): Prisma__AnalystReportClient<$Result.GetResult<Prisma.$AnalystReportPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AnalystReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalystReportFindFirstOrThrowArgs} args - Arguments to find a AnalystReport
     * @example
     * // Get one AnalystReport
     * const analystReport = await prisma.analystReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalystReportFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalystReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalystReportClient<$Result.GetResult<Prisma.$AnalystReportPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AnalystReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalystReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnalystReports
     * const analystReports = await prisma.analystReport.findMany()
     * 
     * // Get first 10 AnalystReports
     * const analystReports = await prisma.analystReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analystReportWithIdOnly = await prisma.analystReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalystReportFindManyArgs>(args?: SelectSubset<T, AnalystReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalystReportPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AnalystReport.
     * @param {AnalystReportCreateArgs} args - Arguments to create a AnalystReport.
     * @example
     * // Create one AnalystReport
     * const AnalystReport = await prisma.analystReport.create({
     *   data: {
     *     // ... data to create a AnalystReport
     *   }
     * })
     * 
     */
    create<T extends AnalystReportCreateArgs>(args: SelectSubset<T, AnalystReportCreateArgs<ExtArgs>>): Prisma__AnalystReportClient<$Result.GetResult<Prisma.$AnalystReportPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AnalystReports.
     * @param {AnalystReportCreateManyArgs} args - Arguments to create many AnalystReports.
     * @example
     * // Create many AnalystReports
     * const analystReport = await prisma.analystReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalystReportCreateManyArgs>(args?: SelectSubset<T, AnalystReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnalystReports and returns the data saved in the database.
     * @param {AnalystReportCreateManyAndReturnArgs} args - Arguments to create many AnalystReports.
     * @example
     * // Create many AnalystReports
     * const analystReport = await prisma.analystReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnalystReports and only return the `id`
     * const analystReportWithIdOnly = await prisma.analystReport.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalystReportCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalystReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalystReportPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AnalystReport.
     * @param {AnalystReportDeleteArgs} args - Arguments to delete one AnalystReport.
     * @example
     * // Delete one AnalystReport
     * const AnalystReport = await prisma.analystReport.delete({
     *   where: {
     *     // ... filter to delete one AnalystReport
     *   }
     * })
     * 
     */
    delete<T extends AnalystReportDeleteArgs>(args: SelectSubset<T, AnalystReportDeleteArgs<ExtArgs>>): Prisma__AnalystReportClient<$Result.GetResult<Prisma.$AnalystReportPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AnalystReport.
     * @param {AnalystReportUpdateArgs} args - Arguments to update one AnalystReport.
     * @example
     * // Update one AnalystReport
     * const analystReport = await prisma.analystReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalystReportUpdateArgs>(args: SelectSubset<T, AnalystReportUpdateArgs<ExtArgs>>): Prisma__AnalystReportClient<$Result.GetResult<Prisma.$AnalystReportPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AnalystReports.
     * @param {AnalystReportDeleteManyArgs} args - Arguments to filter AnalystReports to delete.
     * @example
     * // Delete a few AnalystReports
     * const { count } = await prisma.analystReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalystReportDeleteManyArgs>(args?: SelectSubset<T, AnalystReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalystReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalystReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnalystReports
     * const analystReport = await prisma.analystReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalystReportUpdateManyArgs>(args: SelectSubset<T, AnalystReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AnalystReport.
     * @param {AnalystReportUpsertArgs} args - Arguments to update or create a AnalystReport.
     * @example
     * // Update or create a AnalystReport
     * const analystReport = await prisma.analystReport.upsert({
     *   create: {
     *     // ... data to create a AnalystReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnalystReport we want to update
     *   }
     * })
     */
    upsert<T extends AnalystReportUpsertArgs>(args: SelectSubset<T, AnalystReportUpsertArgs<ExtArgs>>): Prisma__AnalystReportClient<$Result.GetResult<Prisma.$AnalystReportPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AnalystReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalystReportCountArgs} args - Arguments to filter AnalystReports to count.
     * @example
     * // Count the number of AnalystReports
     * const count = await prisma.analystReport.count({
     *   where: {
     *     // ... the filter for the AnalystReports we want to count
     *   }
     * })
    **/
    count<T extends AnalystReportCountArgs>(
      args?: Subset<T, AnalystReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalystReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnalystReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalystReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalystReportAggregateArgs>(args: Subset<T, AnalystReportAggregateArgs>): Prisma.PrismaPromise<GetAnalystReportAggregateType<T>>

    /**
     * Group by AnalystReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalystReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalystReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalystReportGroupByArgs['orderBy'] }
        : { orderBy?: AnalystReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalystReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalystReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnalystReport model
   */
  readonly fields: AnalystReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnalystReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalystReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    token<T extends TokenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TokenDefaultArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnalystReport model
   */ 
  interface AnalystReportFieldRefs {
    readonly id: FieldRef<"AnalystReport", 'String'>
    readonly tokenId: FieldRef<"AnalystReport", 'String'>
    readonly signalEventId: FieldRef<"AnalystReport", 'String'>
    readonly summaryShort: FieldRef<"AnalystReport", 'String'>
    readonly summaryLong: FieldRef<"AnalystReport", 'String'>
    readonly riskSummary: FieldRef<"AnalystReport", 'String'>
    readonly model: FieldRef<"AnalystReport", 'String'>
    readonly createdAt: FieldRef<"AnalystReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnalystReport findUnique
   */
  export type AnalystReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalystReport
     */
    select?: AnalystReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalystReportInclude<ExtArgs> | null
    /**
     * Filter, which AnalystReport to fetch.
     */
    where: AnalystReportWhereUniqueInput
  }

  /**
   * AnalystReport findUniqueOrThrow
   */
  export type AnalystReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalystReport
     */
    select?: AnalystReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalystReportInclude<ExtArgs> | null
    /**
     * Filter, which AnalystReport to fetch.
     */
    where: AnalystReportWhereUniqueInput
  }

  /**
   * AnalystReport findFirst
   */
  export type AnalystReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalystReport
     */
    select?: AnalystReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalystReportInclude<ExtArgs> | null
    /**
     * Filter, which AnalystReport to fetch.
     */
    where?: AnalystReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalystReports to fetch.
     */
    orderBy?: AnalystReportOrderByWithRelationInput | AnalystReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalystReports.
     */
    cursor?: AnalystReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalystReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalystReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalystReports.
     */
    distinct?: AnalystReportScalarFieldEnum | AnalystReportScalarFieldEnum[]
  }

  /**
   * AnalystReport findFirstOrThrow
   */
  export type AnalystReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalystReport
     */
    select?: AnalystReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalystReportInclude<ExtArgs> | null
    /**
     * Filter, which AnalystReport to fetch.
     */
    where?: AnalystReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalystReports to fetch.
     */
    orderBy?: AnalystReportOrderByWithRelationInput | AnalystReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalystReports.
     */
    cursor?: AnalystReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalystReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalystReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalystReports.
     */
    distinct?: AnalystReportScalarFieldEnum | AnalystReportScalarFieldEnum[]
  }

  /**
   * AnalystReport findMany
   */
  export type AnalystReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalystReport
     */
    select?: AnalystReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalystReportInclude<ExtArgs> | null
    /**
     * Filter, which AnalystReports to fetch.
     */
    where?: AnalystReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalystReports to fetch.
     */
    orderBy?: AnalystReportOrderByWithRelationInput | AnalystReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnalystReports.
     */
    cursor?: AnalystReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalystReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalystReports.
     */
    skip?: number
    distinct?: AnalystReportScalarFieldEnum | AnalystReportScalarFieldEnum[]
  }

  /**
   * AnalystReport create
   */
  export type AnalystReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalystReport
     */
    select?: AnalystReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalystReportInclude<ExtArgs> | null
    /**
     * The data needed to create a AnalystReport.
     */
    data: XOR<AnalystReportCreateInput, AnalystReportUncheckedCreateInput>
  }

  /**
   * AnalystReport createMany
   */
  export type AnalystReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnalystReports.
     */
    data: AnalystReportCreateManyInput | AnalystReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalystReport createManyAndReturn
   */
  export type AnalystReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalystReport
     */
    select?: AnalystReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AnalystReports.
     */
    data: AnalystReportCreateManyInput | AnalystReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalystReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalystReport update
   */
  export type AnalystReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalystReport
     */
    select?: AnalystReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalystReportInclude<ExtArgs> | null
    /**
     * The data needed to update a AnalystReport.
     */
    data: XOR<AnalystReportUpdateInput, AnalystReportUncheckedUpdateInput>
    /**
     * Choose, which AnalystReport to update.
     */
    where: AnalystReportWhereUniqueInput
  }

  /**
   * AnalystReport updateMany
   */
  export type AnalystReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnalystReports.
     */
    data: XOR<AnalystReportUpdateManyMutationInput, AnalystReportUncheckedUpdateManyInput>
    /**
     * Filter which AnalystReports to update
     */
    where?: AnalystReportWhereInput
  }

  /**
   * AnalystReport upsert
   */
  export type AnalystReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalystReport
     */
    select?: AnalystReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalystReportInclude<ExtArgs> | null
    /**
     * The filter to search for the AnalystReport to update in case it exists.
     */
    where: AnalystReportWhereUniqueInput
    /**
     * In case the AnalystReport found by the `where` argument doesn't exist, create a new AnalystReport with this data.
     */
    create: XOR<AnalystReportCreateInput, AnalystReportUncheckedCreateInput>
    /**
     * In case the AnalystReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalystReportUpdateInput, AnalystReportUncheckedUpdateInput>
  }

  /**
   * AnalystReport delete
   */
  export type AnalystReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalystReport
     */
    select?: AnalystReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalystReportInclude<ExtArgs> | null
    /**
     * Filter which AnalystReport to delete.
     */
    where: AnalystReportWhereUniqueInput
  }

  /**
   * AnalystReport deleteMany
   */
  export type AnalystReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalystReports to delete
     */
    where?: AnalystReportWhereInput
  }

  /**
   * AnalystReport without action
   */
  export type AnalystReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalystReport
     */
    select?: AnalystReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalystReportInclude<ExtArgs> | null
  }


  /**
   * Model SocialMention
   */

  export type AggregateSocialMention = {
    _count: SocialMentionCountAggregateOutputType | null
    _avg: SocialMentionAvgAggregateOutputType | null
    _sum: SocialMentionSumAggregateOutputType | null
    _min: SocialMentionMinAggregateOutputType | null
    _max: SocialMentionMaxAggregateOutputType | null
  }

  export type SocialMentionAvgAggregateOutputType = {
    followers: number | null
  }

  export type SocialMentionSumAggregateOutputType = {
    followers: number | null
  }

  export type SocialMentionMinAggregateOutputType = {
    id: string | null
    tokenId: string | null
    tweetId: string | null
    author: string | null
    followers: number | null
    createdAt: Date | null
  }

  export type SocialMentionMaxAggregateOutputType = {
    id: string | null
    tokenId: string | null
    tweetId: string | null
    author: string | null
    followers: number | null
    createdAt: Date | null
  }

  export type SocialMentionCountAggregateOutputType = {
    id: number
    tokenId: number
    tweetId: number
    author: number
    followers: number
    engagement: number
    createdAt: number
    _all: number
  }


  export type SocialMentionAvgAggregateInputType = {
    followers?: true
  }

  export type SocialMentionSumAggregateInputType = {
    followers?: true
  }

  export type SocialMentionMinAggregateInputType = {
    id?: true
    tokenId?: true
    tweetId?: true
    author?: true
    followers?: true
    createdAt?: true
  }

  export type SocialMentionMaxAggregateInputType = {
    id?: true
    tokenId?: true
    tweetId?: true
    author?: true
    followers?: true
    createdAt?: true
  }

  export type SocialMentionCountAggregateInputType = {
    id?: true
    tokenId?: true
    tweetId?: true
    author?: true
    followers?: true
    engagement?: true
    createdAt?: true
    _all?: true
  }

  export type SocialMentionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SocialMention to aggregate.
     */
    where?: SocialMentionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialMentions to fetch.
     */
    orderBy?: SocialMentionOrderByWithRelationInput | SocialMentionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SocialMentionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialMentions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialMentions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SocialMentions
    **/
    _count?: true | SocialMentionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SocialMentionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SocialMentionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SocialMentionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SocialMentionMaxAggregateInputType
  }

  export type GetSocialMentionAggregateType<T extends SocialMentionAggregateArgs> = {
        [P in keyof T & keyof AggregateSocialMention]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSocialMention[P]>
      : GetScalarType<T[P], AggregateSocialMention[P]>
  }




  export type SocialMentionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocialMentionWhereInput
    orderBy?: SocialMentionOrderByWithAggregationInput | SocialMentionOrderByWithAggregationInput[]
    by: SocialMentionScalarFieldEnum[] | SocialMentionScalarFieldEnum
    having?: SocialMentionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SocialMentionCountAggregateInputType | true
    _avg?: SocialMentionAvgAggregateInputType
    _sum?: SocialMentionSumAggregateInputType
    _min?: SocialMentionMinAggregateInputType
    _max?: SocialMentionMaxAggregateInputType
  }

  export type SocialMentionGroupByOutputType = {
    id: string
    tokenId: string
    tweetId: string
    author: string
    followers: number
    engagement: JsonValue
    createdAt: Date
    _count: SocialMentionCountAggregateOutputType | null
    _avg: SocialMentionAvgAggregateOutputType | null
    _sum: SocialMentionSumAggregateOutputType | null
    _min: SocialMentionMinAggregateOutputType | null
    _max: SocialMentionMaxAggregateOutputType | null
  }

  type GetSocialMentionGroupByPayload<T extends SocialMentionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SocialMentionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SocialMentionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SocialMentionGroupByOutputType[P]>
            : GetScalarType<T[P], SocialMentionGroupByOutputType[P]>
        }
      >
    >


  export type SocialMentionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenId?: boolean
    tweetId?: boolean
    author?: boolean
    followers?: boolean
    engagement?: boolean
    createdAt?: boolean
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["socialMention"]>

  export type SocialMentionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenId?: boolean
    tweetId?: boolean
    author?: boolean
    followers?: boolean
    engagement?: boolean
    createdAt?: boolean
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["socialMention"]>

  export type SocialMentionSelectScalar = {
    id?: boolean
    tokenId?: boolean
    tweetId?: boolean
    author?: boolean
    followers?: boolean
    engagement?: boolean
    createdAt?: boolean
  }

  export type SocialMentionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }
  export type SocialMentionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }

  export type $SocialMentionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SocialMention"
    objects: {
      token: Prisma.$TokenPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tokenId: string
      tweetId: string
      author: string
      followers: number
      engagement: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["socialMention"]>
    composites: {}
  }

  type SocialMentionGetPayload<S extends boolean | null | undefined | SocialMentionDefaultArgs> = $Result.GetResult<Prisma.$SocialMentionPayload, S>

  type SocialMentionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SocialMentionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SocialMentionCountAggregateInputType | true
    }

  export interface SocialMentionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SocialMention'], meta: { name: 'SocialMention' } }
    /**
     * Find zero or one SocialMention that matches the filter.
     * @param {SocialMentionFindUniqueArgs} args - Arguments to find a SocialMention
     * @example
     * // Get one SocialMention
     * const socialMention = await prisma.socialMention.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SocialMentionFindUniqueArgs>(args: SelectSubset<T, SocialMentionFindUniqueArgs<ExtArgs>>): Prisma__SocialMentionClient<$Result.GetResult<Prisma.$SocialMentionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SocialMention that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SocialMentionFindUniqueOrThrowArgs} args - Arguments to find a SocialMention
     * @example
     * // Get one SocialMention
     * const socialMention = await prisma.socialMention.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SocialMentionFindUniqueOrThrowArgs>(args: SelectSubset<T, SocialMentionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SocialMentionClient<$Result.GetResult<Prisma.$SocialMentionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SocialMention that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialMentionFindFirstArgs} args - Arguments to find a SocialMention
     * @example
     * // Get one SocialMention
     * const socialMention = await prisma.socialMention.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SocialMentionFindFirstArgs>(args?: SelectSubset<T, SocialMentionFindFirstArgs<ExtArgs>>): Prisma__SocialMentionClient<$Result.GetResult<Prisma.$SocialMentionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SocialMention that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialMentionFindFirstOrThrowArgs} args - Arguments to find a SocialMention
     * @example
     * // Get one SocialMention
     * const socialMention = await prisma.socialMention.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SocialMentionFindFirstOrThrowArgs>(args?: SelectSubset<T, SocialMentionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SocialMentionClient<$Result.GetResult<Prisma.$SocialMentionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SocialMentions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialMentionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SocialMentions
     * const socialMentions = await prisma.socialMention.findMany()
     * 
     * // Get first 10 SocialMentions
     * const socialMentions = await prisma.socialMention.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const socialMentionWithIdOnly = await prisma.socialMention.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SocialMentionFindManyArgs>(args?: SelectSubset<T, SocialMentionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialMentionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SocialMention.
     * @param {SocialMentionCreateArgs} args - Arguments to create a SocialMention.
     * @example
     * // Create one SocialMention
     * const SocialMention = await prisma.socialMention.create({
     *   data: {
     *     // ... data to create a SocialMention
     *   }
     * })
     * 
     */
    create<T extends SocialMentionCreateArgs>(args: SelectSubset<T, SocialMentionCreateArgs<ExtArgs>>): Prisma__SocialMentionClient<$Result.GetResult<Prisma.$SocialMentionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SocialMentions.
     * @param {SocialMentionCreateManyArgs} args - Arguments to create many SocialMentions.
     * @example
     * // Create many SocialMentions
     * const socialMention = await prisma.socialMention.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SocialMentionCreateManyArgs>(args?: SelectSubset<T, SocialMentionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SocialMentions and returns the data saved in the database.
     * @param {SocialMentionCreateManyAndReturnArgs} args - Arguments to create many SocialMentions.
     * @example
     * // Create many SocialMentions
     * const socialMention = await prisma.socialMention.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SocialMentions and only return the `id`
     * const socialMentionWithIdOnly = await prisma.socialMention.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SocialMentionCreateManyAndReturnArgs>(args?: SelectSubset<T, SocialMentionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialMentionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SocialMention.
     * @param {SocialMentionDeleteArgs} args - Arguments to delete one SocialMention.
     * @example
     * // Delete one SocialMention
     * const SocialMention = await prisma.socialMention.delete({
     *   where: {
     *     // ... filter to delete one SocialMention
     *   }
     * })
     * 
     */
    delete<T extends SocialMentionDeleteArgs>(args: SelectSubset<T, SocialMentionDeleteArgs<ExtArgs>>): Prisma__SocialMentionClient<$Result.GetResult<Prisma.$SocialMentionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SocialMention.
     * @param {SocialMentionUpdateArgs} args - Arguments to update one SocialMention.
     * @example
     * // Update one SocialMention
     * const socialMention = await prisma.socialMention.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SocialMentionUpdateArgs>(args: SelectSubset<T, SocialMentionUpdateArgs<ExtArgs>>): Prisma__SocialMentionClient<$Result.GetResult<Prisma.$SocialMentionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SocialMentions.
     * @param {SocialMentionDeleteManyArgs} args - Arguments to filter SocialMentions to delete.
     * @example
     * // Delete a few SocialMentions
     * const { count } = await prisma.socialMention.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SocialMentionDeleteManyArgs>(args?: SelectSubset<T, SocialMentionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SocialMentions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialMentionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SocialMentions
     * const socialMention = await prisma.socialMention.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SocialMentionUpdateManyArgs>(args: SelectSubset<T, SocialMentionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SocialMention.
     * @param {SocialMentionUpsertArgs} args - Arguments to update or create a SocialMention.
     * @example
     * // Update or create a SocialMention
     * const socialMention = await prisma.socialMention.upsert({
     *   create: {
     *     // ... data to create a SocialMention
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SocialMention we want to update
     *   }
     * })
     */
    upsert<T extends SocialMentionUpsertArgs>(args: SelectSubset<T, SocialMentionUpsertArgs<ExtArgs>>): Prisma__SocialMentionClient<$Result.GetResult<Prisma.$SocialMentionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SocialMentions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialMentionCountArgs} args - Arguments to filter SocialMentions to count.
     * @example
     * // Count the number of SocialMentions
     * const count = await prisma.socialMention.count({
     *   where: {
     *     // ... the filter for the SocialMentions we want to count
     *   }
     * })
    **/
    count<T extends SocialMentionCountArgs>(
      args?: Subset<T, SocialMentionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SocialMentionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SocialMention.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialMentionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SocialMentionAggregateArgs>(args: Subset<T, SocialMentionAggregateArgs>): Prisma.PrismaPromise<GetSocialMentionAggregateType<T>>

    /**
     * Group by SocialMention.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialMentionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SocialMentionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SocialMentionGroupByArgs['orderBy'] }
        : { orderBy?: SocialMentionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SocialMentionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocialMentionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SocialMention model
   */
  readonly fields: SocialMentionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SocialMention.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SocialMentionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    token<T extends TokenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TokenDefaultArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SocialMention model
   */ 
  interface SocialMentionFieldRefs {
    readonly id: FieldRef<"SocialMention", 'String'>
    readonly tokenId: FieldRef<"SocialMention", 'String'>
    readonly tweetId: FieldRef<"SocialMention", 'String'>
    readonly author: FieldRef<"SocialMention", 'String'>
    readonly followers: FieldRef<"SocialMention", 'Int'>
    readonly engagement: FieldRef<"SocialMention", 'Json'>
    readonly createdAt: FieldRef<"SocialMention", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SocialMention findUnique
   */
  export type SocialMentionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialMention
     */
    select?: SocialMentionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialMentionInclude<ExtArgs> | null
    /**
     * Filter, which SocialMention to fetch.
     */
    where: SocialMentionWhereUniqueInput
  }

  /**
   * SocialMention findUniqueOrThrow
   */
  export type SocialMentionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialMention
     */
    select?: SocialMentionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialMentionInclude<ExtArgs> | null
    /**
     * Filter, which SocialMention to fetch.
     */
    where: SocialMentionWhereUniqueInput
  }

  /**
   * SocialMention findFirst
   */
  export type SocialMentionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialMention
     */
    select?: SocialMentionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialMentionInclude<ExtArgs> | null
    /**
     * Filter, which SocialMention to fetch.
     */
    where?: SocialMentionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialMentions to fetch.
     */
    orderBy?: SocialMentionOrderByWithRelationInput | SocialMentionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SocialMentions.
     */
    cursor?: SocialMentionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialMentions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialMentions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SocialMentions.
     */
    distinct?: SocialMentionScalarFieldEnum | SocialMentionScalarFieldEnum[]
  }

  /**
   * SocialMention findFirstOrThrow
   */
  export type SocialMentionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialMention
     */
    select?: SocialMentionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialMentionInclude<ExtArgs> | null
    /**
     * Filter, which SocialMention to fetch.
     */
    where?: SocialMentionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialMentions to fetch.
     */
    orderBy?: SocialMentionOrderByWithRelationInput | SocialMentionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SocialMentions.
     */
    cursor?: SocialMentionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialMentions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialMentions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SocialMentions.
     */
    distinct?: SocialMentionScalarFieldEnum | SocialMentionScalarFieldEnum[]
  }

  /**
   * SocialMention findMany
   */
  export type SocialMentionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialMention
     */
    select?: SocialMentionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialMentionInclude<ExtArgs> | null
    /**
     * Filter, which SocialMentions to fetch.
     */
    where?: SocialMentionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialMentions to fetch.
     */
    orderBy?: SocialMentionOrderByWithRelationInput | SocialMentionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SocialMentions.
     */
    cursor?: SocialMentionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialMentions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialMentions.
     */
    skip?: number
    distinct?: SocialMentionScalarFieldEnum | SocialMentionScalarFieldEnum[]
  }

  /**
   * SocialMention create
   */
  export type SocialMentionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialMention
     */
    select?: SocialMentionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialMentionInclude<ExtArgs> | null
    /**
     * The data needed to create a SocialMention.
     */
    data: XOR<SocialMentionCreateInput, SocialMentionUncheckedCreateInput>
  }

  /**
   * SocialMention createMany
   */
  export type SocialMentionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SocialMentions.
     */
    data: SocialMentionCreateManyInput | SocialMentionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SocialMention createManyAndReturn
   */
  export type SocialMentionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialMention
     */
    select?: SocialMentionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SocialMentions.
     */
    data: SocialMentionCreateManyInput | SocialMentionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialMentionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SocialMention update
   */
  export type SocialMentionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialMention
     */
    select?: SocialMentionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialMentionInclude<ExtArgs> | null
    /**
     * The data needed to update a SocialMention.
     */
    data: XOR<SocialMentionUpdateInput, SocialMentionUncheckedUpdateInput>
    /**
     * Choose, which SocialMention to update.
     */
    where: SocialMentionWhereUniqueInput
  }

  /**
   * SocialMention updateMany
   */
  export type SocialMentionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SocialMentions.
     */
    data: XOR<SocialMentionUpdateManyMutationInput, SocialMentionUncheckedUpdateManyInput>
    /**
     * Filter which SocialMentions to update
     */
    where?: SocialMentionWhereInput
  }

  /**
   * SocialMention upsert
   */
  export type SocialMentionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialMention
     */
    select?: SocialMentionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialMentionInclude<ExtArgs> | null
    /**
     * The filter to search for the SocialMention to update in case it exists.
     */
    where: SocialMentionWhereUniqueInput
    /**
     * In case the SocialMention found by the `where` argument doesn't exist, create a new SocialMention with this data.
     */
    create: XOR<SocialMentionCreateInput, SocialMentionUncheckedCreateInput>
    /**
     * In case the SocialMention was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SocialMentionUpdateInput, SocialMentionUncheckedUpdateInput>
  }

  /**
   * SocialMention delete
   */
  export type SocialMentionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialMention
     */
    select?: SocialMentionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialMentionInclude<ExtArgs> | null
    /**
     * Filter which SocialMention to delete.
     */
    where: SocialMentionWhereUniqueInput
  }

  /**
   * SocialMention deleteMany
   */
  export type SocialMentionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SocialMentions to delete
     */
    where?: SocialMentionWhereInput
  }

  /**
   * SocialMention without action
   */
  export type SocialMentionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialMention
     */
    select?: SocialMentionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialMentionInclude<ExtArgs> | null
  }


  /**
   * Model UserAlertLog
   */

  export type AggregateUserAlertLog = {
    _count: UserAlertLogCountAggregateOutputType | null
    _min: UserAlertLogMinAggregateOutputType | null
    _max: UserAlertLogMaxAggregateOutputType | null
  }

  export type UserAlertLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    signalEventId: string | null
    channel: string | null
    deliveredAt: Date | null
    status: string | null
    failReason: string | null
  }

  export type UserAlertLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    signalEventId: string | null
    channel: string | null
    deliveredAt: Date | null
    status: string | null
    failReason: string | null
  }

  export type UserAlertLogCountAggregateOutputType = {
    id: number
    userId: number
    signalEventId: number
    channel: number
    deliveredAt: number
    status: number
    failReason: number
    _all: number
  }


  export type UserAlertLogMinAggregateInputType = {
    id?: true
    userId?: true
    signalEventId?: true
    channel?: true
    deliveredAt?: true
    status?: true
    failReason?: true
  }

  export type UserAlertLogMaxAggregateInputType = {
    id?: true
    userId?: true
    signalEventId?: true
    channel?: true
    deliveredAt?: true
    status?: true
    failReason?: true
  }

  export type UserAlertLogCountAggregateInputType = {
    id?: true
    userId?: true
    signalEventId?: true
    channel?: true
    deliveredAt?: true
    status?: true
    failReason?: true
    _all?: true
  }

  export type UserAlertLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAlertLog to aggregate.
     */
    where?: UserAlertLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAlertLogs to fetch.
     */
    orderBy?: UserAlertLogOrderByWithRelationInput | UserAlertLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAlertLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAlertLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAlertLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAlertLogs
    **/
    _count?: true | UserAlertLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAlertLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAlertLogMaxAggregateInputType
  }

  export type GetUserAlertLogAggregateType<T extends UserAlertLogAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAlertLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAlertLog[P]>
      : GetScalarType<T[P], AggregateUserAlertLog[P]>
  }




  export type UserAlertLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAlertLogWhereInput
    orderBy?: UserAlertLogOrderByWithAggregationInput | UserAlertLogOrderByWithAggregationInput[]
    by: UserAlertLogScalarFieldEnum[] | UserAlertLogScalarFieldEnum
    having?: UserAlertLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAlertLogCountAggregateInputType | true
    _min?: UserAlertLogMinAggregateInputType
    _max?: UserAlertLogMaxAggregateInputType
  }

  export type UserAlertLogGroupByOutputType = {
    id: string
    userId: string
    signalEventId: string
    channel: string
    deliveredAt: Date
    status: string
    failReason: string | null
    _count: UserAlertLogCountAggregateOutputType | null
    _min: UserAlertLogMinAggregateOutputType | null
    _max: UserAlertLogMaxAggregateOutputType | null
  }

  type GetUserAlertLogGroupByPayload<T extends UserAlertLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAlertLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAlertLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAlertLogGroupByOutputType[P]>
            : GetScalarType<T[P], UserAlertLogGroupByOutputType[P]>
        }
      >
    >


  export type UserAlertLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    signalEventId?: boolean
    channel?: boolean
    deliveredAt?: boolean
    status?: boolean
    failReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    signalEvent?: boolean | SignalEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAlertLog"]>

  export type UserAlertLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    signalEventId?: boolean
    channel?: boolean
    deliveredAt?: boolean
    status?: boolean
    failReason?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    signalEvent?: boolean | SignalEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAlertLog"]>

  export type UserAlertLogSelectScalar = {
    id?: boolean
    userId?: boolean
    signalEventId?: boolean
    channel?: boolean
    deliveredAt?: boolean
    status?: boolean
    failReason?: boolean
  }

  export type UserAlertLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    signalEvent?: boolean | SignalEventDefaultArgs<ExtArgs>
  }
  export type UserAlertLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    signalEvent?: boolean | SignalEventDefaultArgs<ExtArgs>
  }

  export type $UserAlertLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAlertLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      signalEvent: Prisma.$SignalEventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      signalEventId: string
      channel: string
      deliveredAt: Date
      status: string
      failReason: string | null
    }, ExtArgs["result"]["userAlertLog"]>
    composites: {}
  }

  type UserAlertLogGetPayload<S extends boolean | null | undefined | UserAlertLogDefaultArgs> = $Result.GetResult<Prisma.$UserAlertLogPayload, S>

  type UserAlertLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserAlertLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserAlertLogCountAggregateInputType | true
    }

  export interface UserAlertLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAlertLog'], meta: { name: 'UserAlertLog' } }
    /**
     * Find zero or one UserAlertLog that matches the filter.
     * @param {UserAlertLogFindUniqueArgs} args - Arguments to find a UserAlertLog
     * @example
     * // Get one UserAlertLog
     * const userAlertLog = await prisma.userAlertLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAlertLogFindUniqueArgs>(args: SelectSubset<T, UserAlertLogFindUniqueArgs<ExtArgs>>): Prisma__UserAlertLogClient<$Result.GetResult<Prisma.$UserAlertLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserAlertLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserAlertLogFindUniqueOrThrowArgs} args - Arguments to find a UserAlertLog
     * @example
     * // Get one UserAlertLog
     * const userAlertLog = await prisma.userAlertLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAlertLogFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAlertLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAlertLogClient<$Result.GetResult<Prisma.$UserAlertLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserAlertLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAlertLogFindFirstArgs} args - Arguments to find a UserAlertLog
     * @example
     * // Get one UserAlertLog
     * const userAlertLog = await prisma.userAlertLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAlertLogFindFirstArgs>(args?: SelectSubset<T, UserAlertLogFindFirstArgs<ExtArgs>>): Prisma__UserAlertLogClient<$Result.GetResult<Prisma.$UserAlertLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserAlertLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAlertLogFindFirstOrThrowArgs} args - Arguments to find a UserAlertLog
     * @example
     * // Get one UserAlertLog
     * const userAlertLog = await prisma.userAlertLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAlertLogFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAlertLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAlertLogClient<$Result.GetResult<Prisma.$UserAlertLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserAlertLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAlertLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAlertLogs
     * const userAlertLogs = await prisma.userAlertLog.findMany()
     * 
     * // Get first 10 UserAlertLogs
     * const userAlertLogs = await prisma.userAlertLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAlertLogWithIdOnly = await prisma.userAlertLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAlertLogFindManyArgs>(args?: SelectSubset<T, UserAlertLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAlertLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserAlertLog.
     * @param {UserAlertLogCreateArgs} args - Arguments to create a UserAlertLog.
     * @example
     * // Create one UserAlertLog
     * const UserAlertLog = await prisma.userAlertLog.create({
     *   data: {
     *     // ... data to create a UserAlertLog
     *   }
     * })
     * 
     */
    create<T extends UserAlertLogCreateArgs>(args: SelectSubset<T, UserAlertLogCreateArgs<ExtArgs>>): Prisma__UserAlertLogClient<$Result.GetResult<Prisma.$UserAlertLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserAlertLogs.
     * @param {UserAlertLogCreateManyArgs} args - Arguments to create many UserAlertLogs.
     * @example
     * // Create many UserAlertLogs
     * const userAlertLog = await prisma.userAlertLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAlertLogCreateManyArgs>(args?: SelectSubset<T, UserAlertLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserAlertLogs and returns the data saved in the database.
     * @param {UserAlertLogCreateManyAndReturnArgs} args - Arguments to create many UserAlertLogs.
     * @example
     * // Create many UserAlertLogs
     * const userAlertLog = await prisma.userAlertLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserAlertLogs and only return the `id`
     * const userAlertLogWithIdOnly = await prisma.userAlertLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserAlertLogCreateManyAndReturnArgs>(args?: SelectSubset<T, UserAlertLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAlertLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserAlertLog.
     * @param {UserAlertLogDeleteArgs} args - Arguments to delete one UserAlertLog.
     * @example
     * // Delete one UserAlertLog
     * const UserAlertLog = await prisma.userAlertLog.delete({
     *   where: {
     *     // ... filter to delete one UserAlertLog
     *   }
     * })
     * 
     */
    delete<T extends UserAlertLogDeleteArgs>(args: SelectSubset<T, UserAlertLogDeleteArgs<ExtArgs>>): Prisma__UserAlertLogClient<$Result.GetResult<Prisma.$UserAlertLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserAlertLog.
     * @param {UserAlertLogUpdateArgs} args - Arguments to update one UserAlertLog.
     * @example
     * // Update one UserAlertLog
     * const userAlertLog = await prisma.userAlertLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAlertLogUpdateArgs>(args: SelectSubset<T, UserAlertLogUpdateArgs<ExtArgs>>): Prisma__UserAlertLogClient<$Result.GetResult<Prisma.$UserAlertLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserAlertLogs.
     * @param {UserAlertLogDeleteManyArgs} args - Arguments to filter UserAlertLogs to delete.
     * @example
     * // Delete a few UserAlertLogs
     * const { count } = await prisma.userAlertLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAlertLogDeleteManyArgs>(args?: SelectSubset<T, UserAlertLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAlertLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAlertLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAlertLogs
     * const userAlertLog = await prisma.userAlertLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAlertLogUpdateManyArgs>(args: SelectSubset<T, UserAlertLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserAlertLog.
     * @param {UserAlertLogUpsertArgs} args - Arguments to update or create a UserAlertLog.
     * @example
     * // Update or create a UserAlertLog
     * const userAlertLog = await prisma.userAlertLog.upsert({
     *   create: {
     *     // ... data to create a UserAlertLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAlertLog we want to update
     *   }
     * })
     */
    upsert<T extends UserAlertLogUpsertArgs>(args: SelectSubset<T, UserAlertLogUpsertArgs<ExtArgs>>): Prisma__UserAlertLogClient<$Result.GetResult<Prisma.$UserAlertLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserAlertLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAlertLogCountArgs} args - Arguments to filter UserAlertLogs to count.
     * @example
     * // Count the number of UserAlertLogs
     * const count = await prisma.userAlertLog.count({
     *   where: {
     *     // ... the filter for the UserAlertLogs we want to count
     *   }
     * })
    **/
    count<T extends UserAlertLogCountArgs>(
      args?: Subset<T, UserAlertLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAlertLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAlertLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAlertLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAlertLogAggregateArgs>(args: Subset<T, UserAlertLogAggregateArgs>): Prisma.PrismaPromise<GetUserAlertLogAggregateType<T>>

    /**
     * Group by UserAlertLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAlertLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserAlertLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAlertLogGroupByArgs['orderBy'] }
        : { orderBy?: UserAlertLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserAlertLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAlertLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAlertLog model
   */
  readonly fields: UserAlertLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAlertLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAlertLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    signalEvent<T extends SignalEventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SignalEventDefaultArgs<ExtArgs>>): Prisma__SignalEventClient<$Result.GetResult<Prisma.$SignalEventPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserAlertLog model
   */ 
  interface UserAlertLogFieldRefs {
    readonly id: FieldRef<"UserAlertLog", 'String'>
    readonly userId: FieldRef<"UserAlertLog", 'String'>
    readonly signalEventId: FieldRef<"UserAlertLog", 'String'>
    readonly channel: FieldRef<"UserAlertLog", 'String'>
    readonly deliveredAt: FieldRef<"UserAlertLog", 'DateTime'>
    readonly status: FieldRef<"UserAlertLog", 'String'>
    readonly failReason: FieldRef<"UserAlertLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserAlertLog findUnique
   */
  export type UserAlertLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogInclude<ExtArgs> | null
    /**
     * Filter, which UserAlertLog to fetch.
     */
    where: UserAlertLogWhereUniqueInput
  }

  /**
   * UserAlertLog findUniqueOrThrow
   */
  export type UserAlertLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogInclude<ExtArgs> | null
    /**
     * Filter, which UserAlertLog to fetch.
     */
    where: UserAlertLogWhereUniqueInput
  }

  /**
   * UserAlertLog findFirst
   */
  export type UserAlertLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogInclude<ExtArgs> | null
    /**
     * Filter, which UserAlertLog to fetch.
     */
    where?: UserAlertLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAlertLogs to fetch.
     */
    orderBy?: UserAlertLogOrderByWithRelationInput | UserAlertLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAlertLogs.
     */
    cursor?: UserAlertLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAlertLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAlertLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAlertLogs.
     */
    distinct?: UserAlertLogScalarFieldEnum | UserAlertLogScalarFieldEnum[]
  }

  /**
   * UserAlertLog findFirstOrThrow
   */
  export type UserAlertLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogInclude<ExtArgs> | null
    /**
     * Filter, which UserAlertLog to fetch.
     */
    where?: UserAlertLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAlertLogs to fetch.
     */
    orderBy?: UserAlertLogOrderByWithRelationInput | UserAlertLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAlertLogs.
     */
    cursor?: UserAlertLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAlertLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAlertLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAlertLogs.
     */
    distinct?: UserAlertLogScalarFieldEnum | UserAlertLogScalarFieldEnum[]
  }

  /**
   * UserAlertLog findMany
   */
  export type UserAlertLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogInclude<ExtArgs> | null
    /**
     * Filter, which UserAlertLogs to fetch.
     */
    where?: UserAlertLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAlertLogs to fetch.
     */
    orderBy?: UserAlertLogOrderByWithRelationInput | UserAlertLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAlertLogs.
     */
    cursor?: UserAlertLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAlertLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAlertLogs.
     */
    skip?: number
    distinct?: UserAlertLogScalarFieldEnum | UserAlertLogScalarFieldEnum[]
  }

  /**
   * UserAlertLog create
   */
  export type UserAlertLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAlertLog.
     */
    data: XOR<UserAlertLogCreateInput, UserAlertLogUncheckedCreateInput>
  }

  /**
   * UserAlertLog createMany
   */
  export type UserAlertLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAlertLogs.
     */
    data: UserAlertLogCreateManyInput | UserAlertLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAlertLog createManyAndReturn
   */
  export type UserAlertLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserAlertLogs.
     */
    data: UserAlertLogCreateManyInput | UserAlertLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAlertLog update
   */
  export type UserAlertLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAlertLog.
     */
    data: XOR<UserAlertLogUpdateInput, UserAlertLogUncheckedUpdateInput>
    /**
     * Choose, which UserAlertLog to update.
     */
    where: UserAlertLogWhereUniqueInput
  }

  /**
   * UserAlertLog updateMany
   */
  export type UserAlertLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAlertLogs.
     */
    data: XOR<UserAlertLogUpdateManyMutationInput, UserAlertLogUncheckedUpdateManyInput>
    /**
     * Filter which UserAlertLogs to update
     */
    where?: UserAlertLogWhereInput
  }

  /**
   * UserAlertLog upsert
   */
  export type UserAlertLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAlertLog to update in case it exists.
     */
    where: UserAlertLogWhereUniqueInput
    /**
     * In case the UserAlertLog found by the `where` argument doesn't exist, create a new UserAlertLog with this data.
     */
    create: XOR<UserAlertLogCreateInput, UserAlertLogUncheckedCreateInput>
    /**
     * In case the UserAlertLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAlertLogUpdateInput, UserAlertLogUncheckedUpdateInput>
  }

  /**
   * UserAlertLog delete
   */
  export type UserAlertLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogInclude<ExtArgs> | null
    /**
     * Filter which UserAlertLog to delete.
     */
    where: UserAlertLogWhereUniqueInput
  }

  /**
   * UserAlertLog deleteMany
   */
  export type UserAlertLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAlertLogs to delete
     */
    where?: UserAlertLogWhereInput
  }

  /**
   * UserAlertLog without action
   */
  export type UserAlertLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlertLog
     */
    select?: UserAlertLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAlertLogInclude<ExtArgs> | null
  }


  /**
   * Model ApiKey
   */

  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    userId: string | null
    label: string | null
    hashedKey: string | null
    createdAt: Date | null
    revokedAt: Date | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    label: string | null
    hashedKey: string | null
    createdAt: Date | null
    revokedAt: Date | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    userId: number
    label: number
    hashedKey: number
    scopes: number
    createdAt: number
    revokedAt: number
    _all: number
  }


  export type ApiKeyMinAggregateInputType = {
    id?: true
    userId?: true
    label?: true
    hashedKey?: true
    createdAt?: true
    revokedAt?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    userId?: true
    label?: true
    hashedKey?: true
    createdAt?: true
    revokedAt?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    userId?: true
    label?: true
    hashedKey?: true
    scopes?: true
    createdAt?: true
    revokedAt?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithAggregationInput | ApiKeyOrderByWithAggregationInput[]
    by: ApiKeyScalarFieldEnum[] | ApiKeyScalarFieldEnum
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }

  export type ApiKeyGroupByOutputType = {
    id: string
    userId: string
    label: string
    hashedKey: string
    scopes: string[]
    createdAt: Date
    revokedAt: Date | null
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    label?: boolean
    hashedKey?: boolean
    scopes?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    label?: boolean
    hashedKey?: boolean
    scopes?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectScalar = {
    id?: boolean
    userId?: boolean
    label?: boolean
    hashedKey?: boolean
    scopes?: boolean
    createdAt?: boolean
    revokedAt?: boolean
  }

  export type ApiKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKey"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      label: string
      hashedKey: string
      scopes: string[]
      createdAt: Date
      revokedAt: Date | null
    }, ExtArgs["result"]["apiKey"]>
    composites: {}
  }

  type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyPayload, S>

  type ApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ApiKeyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKey'], meta: { name: 'ApiKey' } }
    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyFindUniqueArgs>(args: SelectSubset<T, ApiKeyFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ApiKey that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyFindFirstArgs>(args?: SelectSubset<T, ApiKeyFindFirstArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyFindManyArgs>(args?: SelectSubset<T, ApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
     */
    create<T extends ApiKeyCreateArgs>(args: SelectSubset<T, ApiKeyCreateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ApiKeys.
     * @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyCreateManyArgs>(args?: SelectSubset<T, ApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiKeys and returns the data saved in the database.
     * @param {ApiKeyCreateManyAndReturnArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyDeleteArgs>(args: SelectSubset<T, ApiKeyDeleteArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUpdateArgs>(args: SelectSubset<T, ApiKeyUpdateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyDeleteManyArgs>(args?: SelectSubset<T, ApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUpdateManyArgs>(args: SelectSubset<T, ApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUpsertArgs>(args: SelectSubset<T, ApiKeyUpsertArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKey model
   */
  readonly fields: ApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiKey model
   */ 
  interface ApiKeyFieldRefs {
    readonly id: FieldRef<"ApiKey", 'String'>
    readonly userId: FieldRef<"ApiKey", 'String'>
    readonly label: FieldRef<"ApiKey", 'String'>
    readonly hashedKey: FieldRef<"ApiKey", 'String'>
    readonly scopes: FieldRef<"ApiKey", 'String[]'>
    readonly createdAt: FieldRef<"ApiKey", 'DateTime'>
    readonly revokedAt: FieldRef<"ApiKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiKey findUnique
   */
  export type ApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findFirst
   */
  export type ApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }

  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey createManyAndReturn
   */
  export type ApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
  }

  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }

  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
  }

  /**
   * ApiKey without action
   */
  export type ApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
  }


  /**
   * Model JobCursor
   */

  export type AggregateJobCursor = {
    _count: JobCursorCountAggregateOutputType | null
    _min: JobCursorMinAggregateOutputType | null
    _max: JobCursorMaxAggregateOutputType | null
  }

  export type JobCursorMinAggregateOutputType = {
    id: string | null
    source: string | null
    updatedAt: Date | null
  }

  export type JobCursorMaxAggregateOutputType = {
    id: string | null
    source: string | null
    updatedAt: Date | null
  }

  export type JobCursorCountAggregateOutputType = {
    id: number
    source: number
    cursor: number
    updatedAt: number
    _all: number
  }


  export type JobCursorMinAggregateInputType = {
    id?: true
    source?: true
    updatedAt?: true
  }

  export type JobCursorMaxAggregateInputType = {
    id?: true
    source?: true
    updatedAt?: true
  }

  export type JobCursorCountAggregateInputType = {
    id?: true
    source?: true
    cursor?: true
    updatedAt?: true
    _all?: true
  }

  export type JobCursorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobCursor to aggregate.
     */
    where?: JobCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobCursors to fetch.
     */
    orderBy?: JobCursorOrderByWithRelationInput | JobCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobCursors
    **/
    _count?: true | JobCursorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobCursorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobCursorMaxAggregateInputType
  }

  export type GetJobCursorAggregateType<T extends JobCursorAggregateArgs> = {
        [P in keyof T & keyof AggregateJobCursor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobCursor[P]>
      : GetScalarType<T[P], AggregateJobCursor[P]>
  }




  export type JobCursorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobCursorWhereInput
    orderBy?: JobCursorOrderByWithAggregationInput | JobCursorOrderByWithAggregationInput[]
    by: JobCursorScalarFieldEnum[] | JobCursorScalarFieldEnum
    having?: JobCursorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCursorCountAggregateInputType | true
    _min?: JobCursorMinAggregateInputType
    _max?: JobCursorMaxAggregateInputType
  }

  export type JobCursorGroupByOutputType = {
    id: string
    source: string
    cursor: JsonValue
    updatedAt: Date
    _count: JobCursorCountAggregateOutputType | null
    _min: JobCursorMinAggregateOutputType | null
    _max: JobCursorMaxAggregateOutputType | null
  }

  type GetJobCursorGroupByPayload<T extends JobCursorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobCursorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobCursorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobCursorGroupByOutputType[P]>
            : GetScalarType<T[P], JobCursorGroupByOutputType[P]>
        }
      >
    >


  export type JobCursorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    cursor?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["jobCursor"]>

  export type JobCursorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    cursor?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["jobCursor"]>

  export type JobCursorSelectScalar = {
    id?: boolean
    source?: boolean
    cursor?: boolean
    updatedAt?: boolean
  }


  export type $JobCursorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobCursor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      source: string
      cursor: Prisma.JsonValue
      updatedAt: Date
    }, ExtArgs["result"]["jobCursor"]>
    composites: {}
  }

  type JobCursorGetPayload<S extends boolean | null | undefined | JobCursorDefaultArgs> = $Result.GetResult<Prisma.$JobCursorPayload, S>

  type JobCursorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JobCursorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JobCursorCountAggregateInputType | true
    }

  export interface JobCursorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobCursor'], meta: { name: 'JobCursor' } }
    /**
     * Find zero or one JobCursor that matches the filter.
     * @param {JobCursorFindUniqueArgs} args - Arguments to find a JobCursor
     * @example
     * // Get one JobCursor
     * const jobCursor = await prisma.jobCursor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobCursorFindUniqueArgs>(args: SelectSubset<T, JobCursorFindUniqueArgs<ExtArgs>>): Prisma__JobCursorClient<$Result.GetResult<Prisma.$JobCursorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one JobCursor that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JobCursorFindUniqueOrThrowArgs} args - Arguments to find a JobCursor
     * @example
     * // Get one JobCursor
     * const jobCursor = await prisma.jobCursor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobCursorFindUniqueOrThrowArgs>(args: SelectSubset<T, JobCursorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobCursorClient<$Result.GetResult<Prisma.$JobCursorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first JobCursor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCursorFindFirstArgs} args - Arguments to find a JobCursor
     * @example
     * // Get one JobCursor
     * const jobCursor = await prisma.jobCursor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobCursorFindFirstArgs>(args?: SelectSubset<T, JobCursorFindFirstArgs<ExtArgs>>): Prisma__JobCursorClient<$Result.GetResult<Prisma.$JobCursorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first JobCursor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCursorFindFirstOrThrowArgs} args - Arguments to find a JobCursor
     * @example
     * // Get one JobCursor
     * const jobCursor = await prisma.jobCursor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobCursorFindFirstOrThrowArgs>(args?: SelectSubset<T, JobCursorFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobCursorClient<$Result.GetResult<Prisma.$JobCursorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more JobCursors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCursorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobCursors
     * const jobCursors = await prisma.jobCursor.findMany()
     * 
     * // Get first 10 JobCursors
     * const jobCursors = await prisma.jobCursor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobCursorWithIdOnly = await prisma.jobCursor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobCursorFindManyArgs>(args?: SelectSubset<T, JobCursorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobCursorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a JobCursor.
     * @param {JobCursorCreateArgs} args - Arguments to create a JobCursor.
     * @example
     * // Create one JobCursor
     * const JobCursor = await prisma.jobCursor.create({
     *   data: {
     *     // ... data to create a JobCursor
     *   }
     * })
     * 
     */
    create<T extends JobCursorCreateArgs>(args: SelectSubset<T, JobCursorCreateArgs<ExtArgs>>): Prisma__JobCursorClient<$Result.GetResult<Prisma.$JobCursorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many JobCursors.
     * @param {JobCursorCreateManyArgs} args - Arguments to create many JobCursors.
     * @example
     * // Create many JobCursors
     * const jobCursor = await prisma.jobCursor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCursorCreateManyArgs>(args?: SelectSubset<T, JobCursorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobCursors and returns the data saved in the database.
     * @param {JobCursorCreateManyAndReturnArgs} args - Arguments to create many JobCursors.
     * @example
     * // Create many JobCursors
     * const jobCursor = await prisma.jobCursor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobCursors and only return the `id`
     * const jobCursorWithIdOnly = await prisma.jobCursor.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobCursorCreateManyAndReturnArgs>(args?: SelectSubset<T, JobCursorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobCursorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a JobCursor.
     * @param {JobCursorDeleteArgs} args - Arguments to delete one JobCursor.
     * @example
     * // Delete one JobCursor
     * const JobCursor = await prisma.jobCursor.delete({
     *   where: {
     *     // ... filter to delete one JobCursor
     *   }
     * })
     * 
     */
    delete<T extends JobCursorDeleteArgs>(args: SelectSubset<T, JobCursorDeleteArgs<ExtArgs>>): Prisma__JobCursorClient<$Result.GetResult<Prisma.$JobCursorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one JobCursor.
     * @param {JobCursorUpdateArgs} args - Arguments to update one JobCursor.
     * @example
     * // Update one JobCursor
     * const jobCursor = await prisma.jobCursor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobCursorUpdateArgs>(args: SelectSubset<T, JobCursorUpdateArgs<ExtArgs>>): Prisma__JobCursorClient<$Result.GetResult<Prisma.$JobCursorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more JobCursors.
     * @param {JobCursorDeleteManyArgs} args - Arguments to filter JobCursors to delete.
     * @example
     * // Delete a few JobCursors
     * const { count } = await prisma.jobCursor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobCursorDeleteManyArgs>(args?: SelectSubset<T, JobCursorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobCursors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCursorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobCursors
     * const jobCursor = await prisma.jobCursor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobCursorUpdateManyArgs>(args: SelectSubset<T, JobCursorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobCursor.
     * @param {JobCursorUpsertArgs} args - Arguments to update or create a JobCursor.
     * @example
     * // Update or create a JobCursor
     * const jobCursor = await prisma.jobCursor.upsert({
     *   create: {
     *     // ... data to create a JobCursor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobCursor we want to update
     *   }
     * })
     */
    upsert<T extends JobCursorUpsertArgs>(args: SelectSubset<T, JobCursorUpsertArgs<ExtArgs>>): Prisma__JobCursorClient<$Result.GetResult<Prisma.$JobCursorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of JobCursors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCursorCountArgs} args - Arguments to filter JobCursors to count.
     * @example
     * // Count the number of JobCursors
     * const count = await prisma.jobCursor.count({
     *   where: {
     *     // ... the filter for the JobCursors we want to count
     *   }
     * })
    **/
    count<T extends JobCursorCountArgs>(
      args?: Subset<T, JobCursorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCursorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobCursor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCursorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobCursorAggregateArgs>(args: Subset<T, JobCursorAggregateArgs>): Prisma.PrismaPromise<GetJobCursorAggregateType<T>>

    /**
     * Group by JobCursor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCursorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobCursorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobCursorGroupByArgs['orderBy'] }
        : { orderBy?: JobCursorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobCursorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobCursorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobCursor model
   */
  readonly fields: JobCursorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobCursor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobCursorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobCursor model
   */ 
  interface JobCursorFieldRefs {
    readonly id: FieldRef<"JobCursor", 'String'>
    readonly source: FieldRef<"JobCursor", 'String'>
    readonly cursor: FieldRef<"JobCursor", 'Json'>
    readonly updatedAt: FieldRef<"JobCursor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobCursor findUnique
   */
  export type JobCursorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCursor
     */
    select?: JobCursorSelect<ExtArgs> | null
    /**
     * Filter, which JobCursor to fetch.
     */
    where: JobCursorWhereUniqueInput
  }

  /**
   * JobCursor findUniqueOrThrow
   */
  export type JobCursorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCursor
     */
    select?: JobCursorSelect<ExtArgs> | null
    /**
     * Filter, which JobCursor to fetch.
     */
    where: JobCursorWhereUniqueInput
  }

  /**
   * JobCursor findFirst
   */
  export type JobCursorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCursor
     */
    select?: JobCursorSelect<ExtArgs> | null
    /**
     * Filter, which JobCursor to fetch.
     */
    where?: JobCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobCursors to fetch.
     */
    orderBy?: JobCursorOrderByWithRelationInput | JobCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobCursors.
     */
    cursor?: JobCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobCursors.
     */
    distinct?: JobCursorScalarFieldEnum | JobCursorScalarFieldEnum[]
  }

  /**
   * JobCursor findFirstOrThrow
   */
  export type JobCursorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCursor
     */
    select?: JobCursorSelect<ExtArgs> | null
    /**
     * Filter, which JobCursor to fetch.
     */
    where?: JobCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobCursors to fetch.
     */
    orderBy?: JobCursorOrderByWithRelationInput | JobCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobCursors.
     */
    cursor?: JobCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobCursors.
     */
    distinct?: JobCursorScalarFieldEnum | JobCursorScalarFieldEnum[]
  }

  /**
   * JobCursor findMany
   */
  export type JobCursorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCursor
     */
    select?: JobCursorSelect<ExtArgs> | null
    /**
     * Filter, which JobCursors to fetch.
     */
    where?: JobCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobCursors to fetch.
     */
    orderBy?: JobCursorOrderByWithRelationInput | JobCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobCursors.
     */
    cursor?: JobCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobCursors.
     */
    skip?: number
    distinct?: JobCursorScalarFieldEnum | JobCursorScalarFieldEnum[]
  }

  /**
   * JobCursor create
   */
  export type JobCursorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCursor
     */
    select?: JobCursorSelect<ExtArgs> | null
    /**
     * The data needed to create a JobCursor.
     */
    data: XOR<JobCursorCreateInput, JobCursorUncheckedCreateInput>
  }

  /**
   * JobCursor createMany
   */
  export type JobCursorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobCursors.
     */
    data: JobCursorCreateManyInput | JobCursorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobCursor createManyAndReturn
   */
  export type JobCursorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCursor
     */
    select?: JobCursorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many JobCursors.
     */
    data: JobCursorCreateManyInput | JobCursorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobCursor update
   */
  export type JobCursorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCursor
     */
    select?: JobCursorSelect<ExtArgs> | null
    /**
     * The data needed to update a JobCursor.
     */
    data: XOR<JobCursorUpdateInput, JobCursorUncheckedUpdateInput>
    /**
     * Choose, which JobCursor to update.
     */
    where: JobCursorWhereUniqueInput
  }

  /**
   * JobCursor updateMany
   */
  export type JobCursorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobCursors.
     */
    data: XOR<JobCursorUpdateManyMutationInput, JobCursorUncheckedUpdateManyInput>
    /**
     * Filter which JobCursors to update
     */
    where?: JobCursorWhereInput
  }

  /**
   * JobCursor upsert
   */
  export type JobCursorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCursor
     */
    select?: JobCursorSelect<ExtArgs> | null
    /**
     * The filter to search for the JobCursor to update in case it exists.
     */
    where: JobCursorWhereUniqueInput
    /**
     * In case the JobCursor found by the `where` argument doesn't exist, create a new JobCursor with this data.
     */
    create: XOR<JobCursorCreateInput, JobCursorUncheckedCreateInput>
    /**
     * In case the JobCursor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobCursorUpdateInput, JobCursorUncheckedUpdateInput>
  }

  /**
   * JobCursor delete
   */
  export type JobCursorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCursor
     */
    select?: JobCursorSelect<ExtArgs> | null
    /**
     * Filter which JobCursor to delete.
     */
    where: JobCursorWhereUniqueInput
  }

  /**
   * JobCursor deleteMany
   */
  export type JobCursorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobCursors to delete
     */
    where?: JobCursorWhereInput
  }

  /**
   * JobCursor without action
   */
  export type JobCursorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCursor
     */
    select?: JobCursorSelect<ExtArgs> | null
  }


  /**
   * Model VectorDoc
   */

  export type AggregateVectorDoc = {
    _count: VectorDocCountAggregateOutputType | null
    _min: VectorDocMinAggregateOutputType | null
    _max: VectorDocMaxAggregateOutputType | null
  }

  export type VectorDocMinAggregateOutputType = {
    id: string | null
    tokenId: string | null
    kind: string | null
    content: string | null
  }

  export type VectorDocMaxAggregateOutputType = {
    id: string | null
    tokenId: string | null
    kind: string | null
    content: string | null
  }

  export type VectorDocCountAggregateOutputType = {
    id: number
    tokenId: number
    kind: number
    content: number
    _all: number
  }


  export type VectorDocMinAggregateInputType = {
    id?: true
    tokenId?: true
    kind?: true
    content?: true
  }

  export type VectorDocMaxAggregateInputType = {
    id?: true
    tokenId?: true
    kind?: true
    content?: true
  }

  export type VectorDocCountAggregateInputType = {
    id?: true
    tokenId?: true
    kind?: true
    content?: true
    _all?: true
  }

  export type VectorDocAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VectorDoc to aggregate.
     */
    where?: VectorDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VectorDocs to fetch.
     */
    orderBy?: VectorDocOrderByWithRelationInput | VectorDocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VectorDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VectorDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VectorDocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VectorDocs
    **/
    _count?: true | VectorDocCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VectorDocMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VectorDocMaxAggregateInputType
  }

  export type GetVectorDocAggregateType<T extends VectorDocAggregateArgs> = {
        [P in keyof T & keyof AggregateVectorDoc]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVectorDoc[P]>
      : GetScalarType<T[P], AggregateVectorDoc[P]>
  }




  export type VectorDocGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VectorDocWhereInput
    orderBy?: VectorDocOrderByWithAggregationInput | VectorDocOrderByWithAggregationInput[]
    by: VectorDocScalarFieldEnum[] | VectorDocScalarFieldEnum
    having?: VectorDocScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VectorDocCountAggregateInputType | true
    _min?: VectorDocMinAggregateInputType
    _max?: VectorDocMaxAggregateInputType
  }

  export type VectorDocGroupByOutputType = {
    id: string
    tokenId: string | null
    kind: string
    content: string
    _count: VectorDocCountAggregateOutputType | null
    _min: VectorDocMinAggregateOutputType | null
    _max: VectorDocMaxAggregateOutputType | null
  }

  type GetVectorDocGroupByPayload<T extends VectorDocGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VectorDocGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VectorDocGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VectorDocGroupByOutputType[P]>
            : GetScalarType<T[P], VectorDocGroupByOutputType[P]>
        }
      >
    >


  export type VectorDocSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenId?: boolean
    kind?: boolean
    content?: boolean
    token?: boolean | VectorDoc$tokenArgs<ExtArgs>
  }, ExtArgs["result"]["vectorDoc"]>


  export type VectorDocSelectScalar = {
    id?: boolean
    tokenId?: boolean
    kind?: boolean
    content?: boolean
  }

  export type VectorDocInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | VectorDoc$tokenArgs<ExtArgs>
  }

  export type $VectorDocPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VectorDoc"
    objects: {
      token: Prisma.$TokenPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tokenId: string | null
      kind: string
      content: string
    }, ExtArgs["result"]["vectorDoc"]>
    composites: {}
  }

  type VectorDocGetPayload<S extends boolean | null | undefined | VectorDocDefaultArgs> = $Result.GetResult<Prisma.$VectorDocPayload, S>

  type VectorDocCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VectorDocFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VectorDocCountAggregateInputType | true
    }

  export interface VectorDocDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VectorDoc'], meta: { name: 'VectorDoc' } }
    /**
     * Find zero or one VectorDoc that matches the filter.
     * @param {VectorDocFindUniqueArgs} args - Arguments to find a VectorDoc
     * @example
     * // Get one VectorDoc
     * const vectorDoc = await prisma.vectorDoc.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VectorDocFindUniqueArgs>(args: SelectSubset<T, VectorDocFindUniqueArgs<ExtArgs>>): Prisma__VectorDocClient<$Result.GetResult<Prisma.$VectorDocPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VectorDoc that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VectorDocFindUniqueOrThrowArgs} args - Arguments to find a VectorDoc
     * @example
     * // Get one VectorDoc
     * const vectorDoc = await prisma.vectorDoc.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VectorDocFindUniqueOrThrowArgs>(args: SelectSubset<T, VectorDocFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VectorDocClient<$Result.GetResult<Prisma.$VectorDocPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VectorDoc that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorDocFindFirstArgs} args - Arguments to find a VectorDoc
     * @example
     * // Get one VectorDoc
     * const vectorDoc = await prisma.vectorDoc.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VectorDocFindFirstArgs>(args?: SelectSubset<T, VectorDocFindFirstArgs<ExtArgs>>): Prisma__VectorDocClient<$Result.GetResult<Prisma.$VectorDocPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VectorDoc that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorDocFindFirstOrThrowArgs} args - Arguments to find a VectorDoc
     * @example
     * // Get one VectorDoc
     * const vectorDoc = await prisma.vectorDoc.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VectorDocFindFirstOrThrowArgs>(args?: SelectSubset<T, VectorDocFindFirstOrThrowArgs<ExtArgs>>): Prisma__VectorDocClient<$Result.GetResult<Prisma.$VectorDocPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VectorDocs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorDocFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VectorDocs
     * const vectorDocs = await prisma.vectorDoc.findMany()
     * 
     * // Get first 10 VectorDocs
     * const vectorDocs = await prisma.vectorDoc.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vectorDocWithIdOnly = await prisma.vectorDoc.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VectorDocFindManyArgs>(args?: SelectSubset<T, VectorDocFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VectorDocPayload<ExtArgs>, T, "findMany">>

    /**
     * Delete a VectorDoc.
     * @param {VectorDocDeleteArgs} args - Arguments to delete one VectorDoc.
     * @example
     * // Delete one VectorDoc
     * const VectorDoc = await prisma.vectorDoc.delete({
     *   where: {
     *     // ... filter to delete one VectorDoc
     *   }
     * })
     * 
     */
    delete<T extends VectorDocDeleteArgs>(args: SelectSubset<T, VectorDocDeleteArgs<ExtArgs>>): Prisma__VectorDocClient<$Result.GetResult<Prisma.$VectorDocPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VectorDoc.
     * @param {VectorDocUpdateArgs} args - Arguments to update one VectorDoc.
     * @example
     * // Update one VectorDoc
     * const vectorDoc = await prisma.vectorDoc.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VectorDocUpdateArgs>(args: SelectSubset<T, VectorDocUpdateArgs<ExtArgs>>): Prisma__VectorDocClient<$Result.GetResult<Prisma.$VectorDocPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VectorDocs.
     * @param {VectorDocDeleteManyArgs} args - Arguments to filter VectorDocs to delete.
     * @example
     * // Delete a few VectorDocs
     * const { count } = await prisma.vectorDoc.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VectorDocDeleteManyArgs>(args?: SelectSubset<T, VectorDocDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VectorDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorDocUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VectorDocs
     * const vectorDoc = await prisma.vectorDoc.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VectorDocUpdateManyArgs>(args: SelectSubset<T, VectorDocUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>


    /**
     * Count the number of VectorDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorDocCountArgs} args - Arguments to filter VectorDocs to count.
     * @example
     * // Count the number of VectorDocs
     * const count = await prisma.vectorDoc.count({
     *   where: {
     *     // ... the filter for the VectorDocs we want to count
     *   }
     * })
    **/
    count<T extends VectorDocCountArgs>(
      args?: Subset<T, VectorDocCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VectorDocCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VectorDoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorDocAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VectorDocAggregateArgs>(args: Subset<T, VectorDocAggregateArgs>): Prisma.PrismaPromise<GetVectorDocAggregateType<T>>

    /**
     * Group by VectorDoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorDocGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VectorDocGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VectorDocGroupByArgs['orderBy'] }
        : { orderBy?: VectorDocGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VectorDocGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVectorDocGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VectorDoc model
   */
  readonly fields: VectorDocFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VectorDoc.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VectorDocClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    token<T extends VectorDoc$tokenArgs<ExtArgs> = {}>(args?: Subset<T, VectorDoc$tokenArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VectorDoc model
   */ 
  interface VectorDocFieldRefs {
    readonly id: FieldRef<"VectorDoc", 'String'>
    readonly tokenId: FieldRef<"VectorDoc", 'String'>
    readonly kind: FieldRef<"VectorDoc", 'String'>
    readonly content: FieldRef<"VectorDoc", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VectorDoc findUnique
   */
  export type VectorDocFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorDoc
     */
    select?: VectorDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VectorDocInclude<ExtArgs> | null
    /**
     * Filter, which VectorDoc to fetch.
     */
    where: VectorDocWhereUniqueInput
  }

  /**
   * VectorDoc findUniqueOrThrow
   */
  export type VectorDocFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorDoc
     */
    select?: VectorDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VectorDocInclude<ExtArgs> | null
    /**
     * Filter, which VectorDoc to fetch.
     */
    where: VectorDocWhereUniqueInput
  }

  /**
   * VectorDoc findFirst
   */
  export type VectorDocFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorDoc
     */
    select?: VectorDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VectorDocInclude<ExtArgs> | null
    /**
     * Filter, which VectorDoc to fetch.
     */
    where?: VectorDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VectorDocs to fetch.
     */
    orderBy?: VectorDocOrderByWithRelationInput | VectorDocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VectorDocs.
     */
    cursor?: VectorDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VectorDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VectorDocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VectorDocs.
     */
    distinct?: VectorDocScalarFieldEnum | VectorDocScalarFieldEnum[]
  }

  /**
   * VectorDoc findFirstOrThrow
   */
  export type VectorDocFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorDoc
     */
    select?: VectorDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VectorDocInclude<ExtArgs> | null
    /**
     * Filter, which VectorDoc to fetch.
     */
    where?: VectorDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VectorDocs to fetch.
     */
    orderBy?: VectorDocOrderByWithRelationInput | VectorDocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VectorDocs.
     */
    cursor?: VectorDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VectorDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VectorDocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VectorDocs.
     */
    distinct?: VectorDocScalarFieldEnum | VectorDocScalarFieldEnum[]
  }

  /**
   * VectorDoc findMany
   */
  export type VectorDocFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorDoc
     */
    select?: VectorDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VectorDocInclude<ExtArgs> | null
    /**
     * Filter, which VectorDocs to fetch.
     */
    where?: VectorDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VectorDocs to fetch.
     */
    orderBy?: VectorDocOrderByWithRelationInput | VectorDocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VectorDocs.
     */
    cursor?: VectorDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VectorDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VectorDocs.
     */
    skip?: number
    distinct?: VectorDocScalarFieldEnum | VectorDocScalarFieldEnum[]
  }

  /**
   * VectorDoc update
   */
  export type VectorDocUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorDoc
     */
    select?: VectorDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VectorDocInclude<ExtArgs> | null
    /**
     * The data needed to update a VectorDoc.
     */
    data: XOR<VectorDocUpdateInput, VectorDocUncheckedUpdateInput>
    /**
     * Choose, which VectorDoc to update.
     */
    where: VectorDocWhereUniqueInput
  }

  /**
   * VectorDoc updateMany
   */
  export type VectorDocUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VectorDocs.
     */
    data: XOR<VectorDocUpdateManyMutationInput, VectorDocUncheckedUpdateManyInput>
    /**
     * Filter which VectorDocs to update
     */
    where?: VectorDocWhereInput
  }

  /**
   * VectorDoc delete
   */
  export type VectorDocDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorDoc
     */
    select?: VectorDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VectorDocInclude<ExtArgs> | null
    /**
     * Filter which VectorDoc to delete.
     */
    where: VectorDocWhereUniqueInput
  }

  /**
   * VectorDoc deleteMany
   */
  export type VectorDocDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VectorDocs to delete
     */
    where?: VectorDocWhereInput
  }

  /**
   * VectorDoc.token
   */
  export type VectorDoc$tokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    where?: TokenWhereInput
  }

  /**
   * VectorDoc without action
   */
  export type VectorDocDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorDoc
     */
    select?: VectorDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VectorDocInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    telegramUserId: 'telegramUserId',
    handle: 'handle',
    role: 'role',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AuthLinkScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    nonce: 'nonce',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
  };

  export type AuthLinkScalarFieldEnum = (typeof AuthLinkScalarFieldEnum)[keyof typeof AuthLinkScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    id: 'id',
    chain: 'chain',
    mint: 'mint',
    symbol: 'symbol',
    name: 'name',
    discoveredAt: 'discoveredAt',
    lastSeenAt: 'lastSeenAt'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const PairScalarFieldEnum: {
    id: 'id',
    tokenId: 'tokenId',
    dexId: 'dexId',
    base: 'base',
    quote: 'quote',
    liqUsd: 'liqUsd',
    price: 'price',
    vol5m: 'vol5m',
    vol1h: 'vol1h',
    vol24h: 'vol24h',
    updatedAt: 'updatedAt'
  };

  export type PairScalarFieldEnum = (typeof PairScalarFieldEnum)[keyof typeof PairScalarFieldEnum]


  export const WatchlistItemScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tokenId: 'tokenId',
    alertPrefs: 'alertPrefs',
    createdAt: 'createdAt'
  };

  export type WatchlistItemScalarFieldEnum = (typeof WatchlistItemScalarFieldEnum)[keyof typeof WatchlistItemScalarFieldEnum]


  export const SignalEventScalarFieldEnum: {
    id: 'id',
    tokenId: 'tokenId',
    pairId: 'pairId',
    kind: 'kind',
    metrics: 'metrics',
    occurredAt: 'occurredAt'
  };

  export type SignalEventScalarFieldEnum = (typeof SignalEventScalarFieldEnum)[keyof typeof SignalEventScalarFieldEnum]


  export const SignalScoreScalarFieldEnum: {
    id: 'id',
    signalEventId: 'signalEventId',
    score: 'score',
    label: 'label',
    model: 'model',
    features: 'features',
    createdAt: 'createdAt'
  };

  export type SignalScoreScalarFieldEnum = (typeof SignalScoreScalarFieldEnum)[keyof typeof SignalScoreScalarFieldEnum]


  export const AnalystReportScalarFieldEnum: {
    id: 'id',
    tokenId: 'tokenId',
    signalEventId: 'signalEventId',
    summaryShort: 'summaryShort',
    summaryLong: 'summaryLong',
    riskSummary: 'riskSummary',
    model: 'model',
    createdAt: 'createdAt'
  };

  export type AnalystReportScalarFieldEnum = (typeof AnalystReportScalarFieldEnum)[keyof typeof AnalystReportScalarFieldEnum]


  export const SocialMentionScalarFieldEnum: {
    id: 'id',
    tokenId: 'tokenId',
    tweetId: 'tweetId',
    author: 'author',
    followers: 'followers',
    engagement: 'engagement',
    createdAt: 'createdAt'
  };

  export type SocialMentionScalarFieldEnum = (typeof SocialMentionScalarFieldEnum)[keyof typeof SocialMentionScalarFieldEnum]


  export const UserAlertLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    signalEventId: 'signalEventId',
    channel: 'channel',
    deliveredAt: 'deliveredAt',
    status: 'status',
    failReason: 'failReason'
  };

  export type UserAlertLogScalarFieldEnum = (typeof UserAlertLogScalarFieldEnum)[keyof typeof UserAlertLogScalarFieldEnum]


  export const ApiKeyScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    label: 'label',
    hashedKey: 'hashedKey',
    scopes: 'scopes',
    createdAt: 'createdAt',
    revokedAt: 'revokedAt'
  };

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


  export const JobCursorScalarFieldEnum: {
    id: 'id',
    source: 'source',
    cursor: 'cursor',
    updatedAt: 'updatedAt'
  };

  export type JobCursorScalarFieldEnum = (typeof JobCursorScalarFieldEnum)[keyof typeof JobCursorScalarFieldEnum]


  export const VectorDocScalarFieldEnum: {
    id: 'id',
    tokenId: 'tokenId',
    kind: 'kind',
    content: 'content'
  };

  export type VectorDocScalarFieldEnum = (typeof VectorDocScalarFieldEnum)[keyof typeof VectorDocScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    telegramUserId?: StringFilter<"User"> | string
    handle?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    createdAt?: DateTimeFilter<"User"> | Date | string
    watchlist?: WatchlistItemListRelationFilter
    apiKeys?: ApiKeyListRelationFilter
    alerts?: UserAlertLogListRelationFilter
    authLinks?: AuthLinkListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    telegramUserId?: SortOrder
    handle?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    watchlist?: WatchlistItemOrderByRelationAggregateInput
    apiKeys?: ApiKeyOrderByRelationAggregateInput
    alerts?: UserAlertLogOrderByRelationAggregateInput
    authLinks?: AuthLinkOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    telegramUserId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    handle?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    createdAt?: DateTimeFilter<"User"> | Date | string
    watchlist?: WatchlistItemListRelationFilter
    apiKeys?: ApiKeyListRelationFilter
    alerts?: UserAlertLogListRelationFilter
    authLinks?: AuthLinkListRelationFilter
  }, "id" | "telegramUserId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    telegramUserId?: SortOrder
    handle?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    telegramUserId?: StringWithAggregatesFilter<"User"> | string
    handle?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AuthLinkWhereInput = {
    AND?: AuthLinkWhereInput | AuthLinkWhereInput[]
    OR?: AuthLinkWhereInput[]
    NOT?: AuthLinkWhereInput | AuthLinkWhereInput[]
    id?: StringFilter<"AuthLink"> | string
    userId?: StringFilter<"AuthLink"> | string
    nonce?: StringFilter<"AuthLink"> | string
    expiresAt?: DateTimeFilter<"AuthLink"> | Date | string
    usedAt?: DateTimeNullableFilter<"AuthLink"> | Date | string | null
    createdAt?: DateTimeFilter<"AuthLink"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AuthLinkOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    nonce?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuthLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nonce?: string
    AND?: AuthLinkWhereInput | AuthLinkWhereInput[]
    OR?: AuthLinkWhereInput[]
    NOT?: AuthLinkWhereInput | AuthLinkWhereInput[]
    userId?: StringFilter<"AuthLink"> | string
    expiresAt?: DateTimeFilter<"AuthLink"> | Date | string
    usedAt?: DateTimeNullableFilter<"AuthLink"> | Date | string | null
    createdAt?: DateTimeFilter<"AuthLink"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "nonce">

  export type AuthLinkOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    nonce?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuthLinkCountOrderByAggregateInput
    _max?: AuthLinkMaxOrderByAggregateInput
    _min?: AuthLinkMinOrderByAggregateInput
  }

  export type AuthLinkScalarWhereWithAggregatesInput = {
    AND?: AuthLinkScalarWhereWithAggregatesInput | AuthLinkScalarWhereWithAggregatesInput[]
    OR?: AuthLinkScalarWhereWithAggregatesInput[]
    NOT?: AuthLinkScalarWhereWithAggregatesInput | AuthLinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthLink"> | string
    userId?: StringWithAggregatesFilter<"AuthLink"> | string
    nonce?: StringWithAggregatesFilter<"AuthLink"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"AuthLink"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"AuthLink"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuthLink"> | Date | string
  }

  export type TokenWhereInput = {
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    id?: StringFilter<"Token"> | string
    chain?: StringFilter<"Token"> | string
    mint?: StringFilter<"Token"> | string
    symbol?: StringNullableFilter<"Token"> | string | null
    name?: StringNullableFilter<"Token"> | string | null
    discoveredAt?: DateTimeFilter<"Token"> | Date | string
    lastSeenAt?: DateTimeFilter<"Token"> | Date | string
    pairs?: PairListRelationFilter
    reports?: AnalystReportListRelationFilter
    vectors?: VectorDocListRelationFilter
    mentions?: SocialMentionListRelationFilter
    watchlist?: WatchlistItemListRelationFilter
  }

  export type TokenOrderByWithRelationInput = {
    id?: SortOrder
    chain?: SortOrder
    mint?: SortOrder
    symbol?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    discoveredAt?: SortOrder
    lastSeenAt?: SortOrder
    pairs?: PairOrderByRelationAggregateInput
    reports?: AnalystReportOrderByRelationAggregateInput
    vectors?: VectorDocOrderByRelationAggregateInput
    mentions?: SocialMentionOrderByRelationAggregateInput
    watchlist?: WatchlistItemOrderByRelationAggregateInput
  }

  export type TokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    mint?: string
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    chain?: StringFilter<"Token"> | string
    symbol?: StringNullableFilter<"Token"> | string | null
    name?: StringNullableFilter<"Token"> | string | null
    discoveredAt?: DateTimeFilter<"Token"> | Date | string
    lastSeenAt?: DateTimeFilter<"Token"> | Date | string
    pairs?: PairListRelationFilter
    reports?: AnalystReportListRelationFilter
    vectors?: VectorDocListRelationFilter
    mentions?: SocialMentionListRelationFilter
    watchlist?: WatchlistItemListRelationFilter
  }, "id" | "mint">

  export type TokenOrderByWithAggregationInput = {
    id?: SortOrder
    chain?: SortOrder
    mint?: SortOrder
    symbol?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    discoveredAt?: SortOrder
    lastSeenAt?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    OR?: TokenScalarWhereWithAggregatesInput[]
    NOT?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Token"> | string
    chain?: StringWithAggregatesFilter<"Token"> | string
    mint?: StringWithAggregatesFilter<"Token"> | string
    symbol?: StringNullableWithAggregatesFilter<"Token"> | string | null
    name?: StringNullableWithAggregatesFilter<"Token"> | string | null
    discoveredAt?: DateTimeWithAggregatesFilter<"Token"> | Date | string
    lastSeenAt?: DateTimeWithAggregatesFilter<"Token"> | Date | string
  }

  export type PairWhereInput = {
    AND?: PairWhereInput | PairWhereInput[]
    OR?: PairWhereInput[]
    NOT?: PairWhereInput | PairWhereInput[]
    id?: StringFilter<"Pair"> | string
    tokenId?: StringFilter<"Pair"> | string
    dexId?: StringFilter<"Pair"> | string
    base?: StringFilter<"Pair"> | string
    quote?: StringFilter<"Pair"> | string
    liqUsd?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    price?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    vol5m?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    vol1h?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    vol24h?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFilter<"Pair"> | Date | string
    token?: XOR<TokenRelationFilter, TokenWhereInput>
  }

  export type PairOrderByWithRelationInput = {
    id?: SortOrder
    tokenId?: SortOrder
    dexId?: SortOrder
    base?: SortOrder
    quote?: SortOrder
    liqUsd?: SortOrder
    price?: SortOrder
    vol5m?: SortOrder
    vol1h?: SortOrder
    vol24h?: SortOrder
    updatedAt?: SortOrder
    token?: TokenOrderByWithRelationInput
  }

  export type PairWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PairWhereInput | PairWhereInput[]
    OR?: PairWhereInput[]
    NOT?: PairWhereInput | PairWhereInput[]
    tokenId?: StringFilter<"Pair"> | string
    dexId?: StringFilter<"Pair"> | string
    base?: StringFilter<"Pair"> | string
    quote?: StringFilter<"Pair"> | string
    liqUsd?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    price?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    vol5m?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    vol1h?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    vol24h?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFilter<"Pair"> | Date | string
    token?: XOR<TokenRelationFilter, TokenWhereInput>
  }, "id">

  export type PairOrderByWithAggregationInput = {
    id?: SortOrder
    tokenId?: SortOrder
    dexId?: SortOrder
    base?: SortOrder
    quote?: SortOrder
    liqUsd?: SortOrder
    price?: SortOrder
    vol5m?: SortOrder
    vol1h?: SortOrder
    vol24h?: SortOrder
    updatedAt?: SortOrder
    _count?: PairCountOrderByAggregateInput
    _avg?: PairAvgOrderByAggregateInput
    _max?: PairMaxOrderByAggregateInput
    _min?: PairMinOrderByAggregateInput
    _sum?: PairSumOrderByAggregateInput
  }

  export type PairScalarWhereWithAggregatesInput = {
    AND?: PairScalarWhereWithAggregatesInput | PairScalarWhereWithAggregatesInput[]
    OR?: PairScalarWhereWithAggregatesInput[]
    NOT?: PairScalarWhereWithAggregatesInput | PairScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pair"> | string
    tokenId?: StringWithAggregatesFilter<"Pair"> | string
    dexId?: StringWithAggregatesFilter<"Pair"> | string
    base?: StringWithAggregatesFilter<"Pair"> | string
    quote?: StringWithAggregatesFilter<"Pair"> | string
    liqUsd?: DecimalWithAggregatesFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    price?: DecimalWithAggregatesFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    vol5m?: DecimalWithAggregatesFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    vol1h?: DecimalWithAggregatesFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    vol24h?: DecimalWithAggregatesFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pair"> | Date | string
  }

  export type WatchlistItemWhereInput = {
    AND?: WatchlistItemWhereInput | WatchlistItemWhereInput[]
    OR?: WatchlistItemWhereInput[]
    NOT?: WatchlistItemWhereInput | WatchlistItemWhereInput[]
    id?: StringFilter<"WatchlistItem"> | string
    userId?: StringFilter<"WatchlistItem"> | string
    tokenId?: StringFilter<"WatchlistItem"> | string
    alertPrefs?: JsonFilter<"WatchlistItem">
    createdAt?: DateTimeFilter<"WatchlistItem"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    token?: XOR<TokenRelationFilter, TokenWhereInput>
  }

  export type WatchlistItemOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenId?: SortOrder
    alertPrefs?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    token?: TokenOrderByWithRelationInput
  }

  export type WatchlistItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_tokenId?: WatchlistItemUserIdTokenIdCompoundUniqueInput
    AND?: WatchlistItemWhereInput | WatchlistItemWhereInput[]
    OR?: WatchlistItemWhereInput[]
    NOT?: WatchlistItemWhereInput | WatchlistItemWhereInput[]
    userId?: StringFilter<"WatchlistItem"> | string
    tokenId?: StringFilter<"WatchlistItem"> | string
    alertPrefs?: JsonFilter<"WatchlistItem">
    createdAt?: DateTimeFilter<"WatchlistItem"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    token?: XOR<TokenRelationFilter, TokenWhereInput>
  }, "id" | "userId_tokenId">

  export type WatchlistItemOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenId?: SortOrder
    alertPrefs?: SortOrder
    createdAt?: SortOrder
    _count?: WatchlistItemCountOrderByAggregateInput
    _max?: WatchlistItemMaxOrderByAggregateInput
    _min?: WatchlistItemMinOrderByAggregateInput
  }

  export type WatchlistItemScalarWhereWithAggregatesInput = {
    AND?: WatchlistItemScalarWhereWithAggregatesInput | WatchlistItemScalarWhereWithAggregatesInput[]
    OR?: WatchlistItemScalarWhereWithAggregatesInput[]
    NOT?: WatchlistItemScalarWhereWithAggregatesInput | WatchlistItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WatchlistItem"> | string
    userId?: StringWithAggregatesFilter<"WatchlistItem"> | string
    tokenId?: StringWithAggregatesFilter<"WatchlistItem"> | string
    alertPrefs?: JsonWithAggregatesFilter<"WatchlistItem">
    createdAt?: DateTimeWithAggregatesFilter<"WatchlistItem"> | Date | string
  }

  export type SignalEventWhereInput = {
    AND?: SignalEventWhereInput | SignalEventWhereInput[]
    OR?: SignalEventWhereInput[]
    NOT?: SignalEventWhereInput | SignalEventWhereInput[]
    id?: StringFilter<"SignalEvent"> | string
    tokenId?: StringFilter<"SignalEvent"> | string
    pairId?: StringNullableFilter<"SignalEvent"> | string | null
    kind?: StringFilter<"SignalEvent"> | string
    metrics?: JsonFilter<"SignalEvent">
    occurredAt?: DateTimeFilter<"SignalEvent"> | Date | string
    scores?: SignalScoreListRelationFilter
    alerts?: UserAlertLogListRelationFilter
  }

  export type SignalEventOrderByWithRelationInput = {
    id?: SortOrder
    tokenId?: SortOrder
    pairId?: SortOrderInput | SortOrder
    kind?: SortOrder
    metrics?: SortOrder
    occurredAt?: SortOrder
    scores?: SignalScoreOrderByRelationAggregateInput
    alerts?: UserAlertLogOrderByRelationAggregateInput
  }

  export type SignalEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SignalEventWhereInput | SignalEventWhereInput[]
    OR?: SignalEventWhereInput[]
    NOT?: SignalEventWhereInput | SignalEventWhereInput[]
    tokenId?: StringFilter<"SignalEvent"> | string
    pairId?: StringNullableFilter<"SignalEvent"> | string | null
    kind?: StringFilter<"SignalEvent"> | string
    metrics?: JsonFilter<"SignalEvent">
    occurredAt?: DateTimeFilter<"SignalEvent"> | Date | string
    scores?: SignalScoreListRelationFilter
    alerts?: UserAlertLogListRelationFilter
  }, "id">

  export type SignalEventOrderByWithAggregationInput = {
    id?: SortOrder
    tokenId?: SortOrder
    pairId?: SortOrderInput | SortOrder
    kind?: SortOrder
    metrics?: SortOrder
    occurredAt?: SortOrder
    _count?: SignalEventCountOrderByAggregateInput
    _max?: SignalEventMaxOrderByAggregateInput
    _min?: SignalEventMinOrderByAggregateInput
  }

  export type SignalEventScalarWhereWithAggregatesInput = {
    AND?: SignalEventScalarWhereWithAggregatesInput | SignalEventScalarWhereWithAggregatesInput[]
    OR?: SignalEventScalarWhereWithAggregatesInput[]
    NOT?: SignalEventScalarWhereWithAggregatesInput | SignalEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SignalEvent"> | string
    tokenId?: StringWithAggregatesFilter<"SignalEvent"> | string
    pairId?: StringNullableWithAggregatesFilter<"SignalEvent"> | string | null
    kind?: StringWithAggregatesFilter<"SignalEvent"> | string
    metrics?: JsonWithAggregatesFilter<"SignalEvent">
    occurredAt?: DateTimeWithAggregatesFilter<"SignalEvent"> | Date | string
  }

  export type SignalScoreWhereInput = {
    AND?: SignalScoreWhereInput | SignalScoreWhereInput[]
    OR?: SignalScoreWhereInput[]
    NOT?: SignalScoreWhereInput | SignalScoreWhereInput[]
    id?: StringFilter<"SignalScore"> | string
    signalEventId?: StringFilter<"SignalScore"> | string
    score?: DecimalFilter<"SignalScore"> | Decimal | DecimalJsLike | number | string
    label?: StringFilter<"SignalScore"> | string
    model?: StringFilter<"SignalScore"> | string
    features?: JsonFilter<"SignalScore">
    createdAt?: DateTimeFilter<"SignalScore"> | Date | string
    signalEvent?: XOR<SignalEventRelationFilter, SignalEventWhereInput>
  }

  export type SignalScoreOrderByWithRelationInput = {
    id?: SortOrder
    signalEventId?: SortOrder
    score?: SortOrder
    label?: SortOrder
    model?: SortOrder
    features?: SortOrder
    createdAt?: SortOrder
    signalEvent?: SignalEventOrderByWithRelationInput
  }

  export type SignalScoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SignalScoreWhereInput | SignalScoreWhereInput[]
    OR?: SignalScoreWhereInput[]
    NOT?: SignalScoreWhereInput | SignalScoreWhereInput[]
    signalEventId?: StringFilter<"SignalScore"> | string
    score?: DecimalFilter<"SignalScore"> | Decimal | DecimalJsLike | number | string
    label?: StringFilter<"SignalScore"> | string
    model?: StringFilter<"SignalScore"> | string
    features?: JsonFilter<"SignalScore">
    createdAt?: DateTimeFilter<"SignalScore"> | Date | string
    signalEvent?: XOR<SignalEventRelationFilter, SignalEventWhereInput>
  }, "id">

  export type SignalScoreOrderByWithAggregationInput = {
    id?: SortOrder
    signalEventId?: SortOrder
    score?: SortOrder
    label?: SortOrder
    model?: SortOrder
    features?: SortOrder
    createdAt?: SortOrder
    _count?: SignalScoreCountOrderByAggregateInput
    _avg?: SignalScoreAvgOrderByAggregateInput
    _max?: SignalScoreMaxOrderByAggregateInput
    _min?: SignalScoreMinOrderByAggregateInput
    _sum?: SignalScoreSumOrderByAggregateInput
  }

  export type SignalScoreScalarWhereWithAggregatesInput = {
    AND?: SignalScoreScalarWhereWithAggregatesInput | SignalScoreScalarWhereWithAggregatesInput[]
    OR?: SignalScoreScalarWhereWithAggregatesInput[]
    NOT?: SignalScoreScalarWhereWithAggregatesInput | SignalScoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SignalScore"> | string
    signalEventId?: StringWithAggregatesFilter<"SignalScore"> | string
    score?: DecimalWithAggregatesFilter<"SignalScore"> | Decimal | DecimalJsLike | number | string
    label?: StringWithAggregatesFilter<"SignalScore"> | string
    model?: StringWithAggregatesFilter<"SignalScore"> | string
    features?: JsonWithAggregatesFilter<"SignalScore">
    createdAt?: DateTimeWithAggregatesFilter<"SignalScore"> | Date | string
  }

  export type AnalystReportWhereInput = {
    AND?: AnalystReportWhereInput | AnalystReportWhereInput[]
    OR?: AnalystReportWhereInput[]
    NOT?: AnalystReportWhereInput | AnalystReportWhereInput[]
    id?: StringFilter<"AnalystReport"> | string
    tokenId?: StringFilter<"AnalystReport"> | string
    signalEventId?: StringNullableFilter<"AnalystReport"> | string | null
    summaryShort?: StringFilter<"AnalystReport"> | string
    summaryLong?: StringFilter<"AnalystReport"> | string
    riskSummary?: StringFilter<"AnalystReport"> | string
    model?: StringFilter<"AnalystReport"> | string
    createdAt?: DateTimeFilter<"AnalystReport"> | Date | string
    token?: XOR<TokenRelationFilter, TokenWhereInput>
  }

  export type AnalystReportOrderByWithRelationInput = {
    id?: SortOrder
    tokenId?: SortOrder
    signalEventId?: SortOrderInput | SortOrder
    summaryShort?: SortOrder
    summaryLong?: SortOrder
    riskSummary?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
    token?: TokenOrderByWithRelationInput
  }

  export type AnalystReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnalystReportWhereInput | AnalystReportWhereInput[]
    OR?: AnalystReportWhereInput[]
    NOT?: AnalystReportWhereInput | AnalystReportWhereInput[]
    tokenId?: StringFilter<"AnalystReport"> | string
    signalEventId?: StringNullableFilter<"AnalystReport"> | string | null
    summaryShort?: StringFilter<"AnalystReport"> | string
    summaryLong?: StringFilter<"AnalystReport"> | string
    riskSummary?: StringFilter<"AnalystReport"> | string
    model?: StringFilter<"AnalystReport"> | string
    createdAt?: DateTimeFilter<"AnalystReport"> | Date | string
    token?: XOR<TokenRelationFilter, TokenWhereInput>
  }, "id">

  export type AnalystReportOrderByWithAggregationInput = {
    id?: SortOrder
    tokenId?: SortOrder
    signalEventId?: SortOrderInput | SortOrder
    summaryShort?: SortOrder
    summaryLong?: SortOrder
    riskSummary?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
    _count?: AnalystReportCountOrderByAggregateInput
    _max?: AnalystReportMaxOrderByAggregateInput
    _min?: AnalystReportMinOrderByAggregateInput
  }

  export type AnalystReportScalarWhereWithAggregatesInput = {
    AND?: AnalystReportScalarWhereWithAggregatesInput | AnalystReportScalarWhereWithAggregatesInput[]
    OR?: AnalystReportScalarWhereWithAggregatesInput[]
    NOT?: AnalystReportScalarWhereWithAggregatesInput | AnalystReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnalystReport"> | string
    tokenId?: StringWithAggregatesFilter<"AnalystReport"> | string
    signalEventId?: StringNullableWithAggregatesFilter<"AnalystReport"> | string | null
    summaryShort?: StringWithAggregatesFilter<"AnalystReport"> | string
    summaryLong?: StringWithAggregatesFilter<"AnalystReport"> | string
    riskSummary?: StringWithAggregatesFilter<"AnalystReport"> | string
    model?: StringWithAggregatesFilter<"AnalystReport"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AnalystReport"> | Date | string
  }

  export type SocialMentionWhereInput = {
    AND?: SocialMentionWhereInput | SocialMentionWhereInput[]
    OR?: SocialMentionWhereInput[]
    NOT?: SocialMentionWhereInput | SocialMentionWhereInput[]
    id?: StringFilter<"SocialMention"> | string
    tokenId?: StringFilter<"SocialMention"> | string
    tweetId?: StringFilter<"SocialMention"> | string
    author?: StringFilter<"SocialMention"> | string
    followers?: IntFilter<"SocialMention"> | number
    engagement?: JsonFilter<"SocialMention">
    createdAt?: DateTimeFilter<"SocialMention"> | Date | string
    token?: XOR<TokenRelationFilter, TokenWhereInput>
  }

  export type SocialMentionOrderByWithRelationInput = {
    id?: SortOrder
    tokenId?: SortOrder
    tweetId?: SortOrder
    author?: SortOrder
    followers?: SortOrder
    engagement?: SortOrder
    createdAt?: SortOrder
    token?: TokenOrderByWithRelationInput
  }

  export type SocialMentionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tweetId?: string
    AND?: SocialMentionWhereInput | SocialMentionWhereInput[]
    OR?: SocialMentionWhereInput[]
    NOT?: SocialMentionWhereInput | SocialMentionWhereInput[]
    tokenId?: StringFilter<"SocialMention"> | string
    author?: StringFilter<"SocialMention"> | string
    followers?: IntFilter<"SocialMention"> | number
    engagement?: JsonFilter<"SocialMention">
    createdAt?: DateTimeFilter<"SocialMention"> | Date | string
    token?: XOR<TokenRelationFilter, TokenWhereInput>
  }, "id" | "tweetId">

  export type SocialMentionOrderByWithAggregationInput = {
    id?: SortOrder
    tokenId?: SortOrder
    tweetId?: SortOrder
    author?: SortOrder
    followers?: SortOrder
    engagement?: SortOrder
    createdAt?: SortOrder
    _count?: SocialMentionCountOrderByAggregateInput
    _avg?: SocialMentionAvgOrderByAggregateInput
    _max?: SocialMentionMaxOrderByAggregateInput
    _min?: SocialMentionMinOrderByAggregateInput
    _sum?: SocialMentionSumOrderByAggregateInput
  }

  export type SocialMentionScalarWhereWithAggregatesInput = {
    AND?: SocialMentionScalarWhereWithAggregatesInput | SocialMentionScalarWhereWithAggregatesInput[]
    OR?: SocialMentionScalarWhereWithAggregatesInput[]
    NOT?: SocialMentionScalarWhereWithAggregatesInput | SocialMentionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SocialMention"> | string
    tokenId?: StringWithAggregatesFilter<"SocialMention"> | string
    tweetId?: StringWithAggregatesFilter<"SocialMention"> | string
    author?: StringWithAggregatesFilter<"SocialMention"> | string
    followers?: IntWithAggregatesFilter<"SocialMention"> | number
    engagement?: JsonWithAggregatesFilter<"SocialMention">
    createdAt?: DateTimeWithAggregatesFilter<"SocialMention"> | Date | string
  }

  export type UserAlertLogWhereInput = {
    AND?: UserAlertLogWhereInput | UserAlertLogWhereInput[]
    OR?: UserAlertLogWhereInput[]
    NOT?: UserAlertLogWhereInput | UserAlertLogWhereInput[]
    id?: StringFilter<"UserAlertLog"> | string
    userId?: StringFilter<"UserAlertLog"> | string
    signalEventId?: StringFilter<"UserAlertLog"> | string
    channel?: StringFilter<"UserAlertLog"> | string
    deliveredAt?: DateTimeFilter<"UserAlertLog"> | Date | string
    status?: StringFilter<"UserAlertLog"> | string
    failReason?: StringNullableFilter<"UserAlertLog"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    signalEvent?: XOR<SignalEventRelationFilter, SignalEventWhereInput>
  }

  export type UserAlertLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    signalEventId?: SortOrder
    channel?: SortOrder
    deliveredAt?: SortOrder
    status?: SortOrder
    failReason?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    signalEvent?: SignalEventOrderByWithRelationInput
  }

  export type UserAlertLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserAlertLogWhereInput | UserAlertLogWhereInput[]
    OR?: UserAlertLogWhereInput[]
    NOT?: UserAlertLogWhereInput | UserAlertLogWhereInput[]
    userId?: StringFilter<"UserAlertLog"> | string
    signalEventId?: StringFilter<"UserAlertLog"> | string
    channel?: StringFilter<"UserAlertLog"> | string
    deliveredAt?: DateTimeFilter<"UserAlertLog"> | Date | string
    status?: StringFilter<"UserAlertLog"> | string
    failReason?: StringNullableFilter<"UserAlertLog"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    signalEvent?: XOR<SignalEventRelationFilter, SignalEventWhereInput>
  }, "id">

  export type UserAlertLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    signalEventId?: SortOrder
    channel?: SortOrder
    deliveredAt?: SortOrder
    status?: SortOrder
    failReason?: SortOrderInput | SortOrder
    _count?: UserAlertLogCountOrderByAggregateInput
    _max?: UserAlertLogMaxOrderByAggregateInput
    _min?: UserAlertLogMinOrderByAggregateInput
  }

  export type UserAlertLogScalarWhereWithAggregatesInput = {
    AND?: UserAlertLogScalarWhereWithAggregatesInput | UserAlertLogScalarWhereWithAggregatesInput[]
    OR?: UserAlertLogScalarWhereWithAggregatesInput[]
    NOT?: UserAlertLogScalarWhereWithAggregatesInput | UserAlertLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAlertLog"> | string
    userId?: StringWithAggregatesFilter<"UserAlertLog"> | string
    signalEventId?: StringWithAggregatesFilter<"UserAlertLog"> | string
    channel?: StringWithAggregatesFilter<"UserAlertLog"> | string
    deliveredAt?: DateTimeWithAggregatesFilter<"UserAlertLog"> | Date | string
    status?: StringWithAggregatesFilter<"UserAlertLog"> | string
    failReason?: StringNullableWithAggregatesFilter<"UserAlertLog"> | string | null
  }

  export type ApiKeyWhereInput = {
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    userId?: StringFilter<"ApiKey"> | string
    label?: StringFilter<"ApiKey"> | string
    hashedKey?: StringFilter<"ApiKey"> | string
    scopes?: StringNullableListFilter<"ApiKey">
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    revokedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    hashedKey?: SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    hashedKey?: string
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    userId?: StringFilter<"ApiKey"> | string
    label?: StringFilter<"ApiKey"> | string
    scopes?: StringNullableListFilter<"ApiKey">
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    revokedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "hashedKey">

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    hashedKey?: SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    OR?: ApiKeyScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKey"> | string
    userId?: StringWithAggregatesFilter<"ApiKey"> | string
    label?: StringWithAggregatesFilter<"ApiKey"> | string
    hashedKey?: StringWithAggregatesFilter<"ApiKey"> | string
    scopes?: StringNullableListFilter<"ApiKey">
    createdAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
  }

  export type JobCursorWhereInput = {
    AND?: JobCursorWhereInput | JobCursorWhereInput[]
    OR?: JobCursorWhereInput[]
    NOT?: JobCursorWhereInput | JobCursorWhereInput[]
    id?: StringFilter<"JobCursor"> | string
    source?: StringFilter<"JobCursor"> | string
    cursor?: JsonFilter<"JobCursor">
    updatedAt?: DateTimeFilter<"JobCursor"> | Date | string
  }

  export type JobCursorOrderByWithRelationInput = {
    id?: SortOrder
    source?: SortOrder
    cursor?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobCursorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    source?: string
    AND?: JobCursorWhereInput | JobCursorWhereInput[]
    OR?: JobCursorWhereInput[]
    NOT?: JobCursorWhereInput | JobCursorWhereInput[]
    cursor?: JsonFilter<"JobCursor">
    updatedAt?: DateTimeFilter<"JobCursor"> | Date | string
  }, "id" | "source">

  export type JobCursorOrderByWithAggregationInput = {
    id?: SortOrder
    source?: SortOrder
    cursor?: SortOrder
    updatedAt?: SortOrder
    _count?: JobCursorCountOrderByAggregateInput
    _max?: JobCursorMaxOrderByAggregateInput
    _min?: JobCursorMinOrderByAggregateInput
  }

  export type JobCursorScalarWhereWithAggregatesInput = {
    AND?: JobCursorScalarWhereWithAggregatesInput | JobCursorScalarWhereWithAggregatesInput[]
    OR?: JobCursorScalarWhereWithAggregatesInput[]
    NOT?: JobCursorScalarWhereWithAggregatesInput | JobCursorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobCursor"> | string
    source?: StringWithAggregatesFilter<"JobCursor"> | string
    cursor?: JsonWithAggregatesFilter<"JobCursor">
    updatedAt?: DateTimeWithAggregatesFilter<"JobCursor"> | Date | string
  }

  export type VectorDocWhereInput = {
    AND?: VectorDocWhereInput | VectorDocWhereInput[]
    OR?: VectorDocWhereInput[]
    NOT?: VectorDocWhereInput | VectorDocWhereInput[]
    id?: StringFilter<"VectorDoc"> | string
    tokenId?: StringNullableFilter<"VectorDoc"> | string | null
    kind?: StringFilter<"VectorDoc"> | string
    content?: StringFilter<"VectorDoc"> | string
    token?: XOR<TokenNullableRelationFilter, TokenWhereInput> | null
  }

  export type VectorDocOrderByWithRelationInput = {
    id?: SortOrder
    tokenId?: SortOrderInput | SortOrder
    kind?: SortOrder
    content?: SortOrder
    token?: TokenOrderByWithRelationInput
  }

  export type VectorDocWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VectorDocWhereInput | VectorDocWhereInput[]
    OR?: VectorDocWhereInput[]
    NOT?: VectorDocWhereInput | VectorDocWhereInput[]
    tokenId?: StringNullableFilter<"VectorDoc"> | string | null
    kind?: StringFilter<"VectorDoc"> | string
    content?: StringFilter<"VectorDoc"> | string
    token?: XOR<TokenNullableRelationFilter, TokenWhereInput> | null
  }, "id">

  export type VectorDocOrderByWithAggregationInput = {
    id?: SortOrder
    tokenId?: SortOrderInput | SortOrder
    kind?: SortOrder
    content?: SortOrder
    _count?: VectorDocCountOrderByAggregateInput
    _max?: VectorDocMaxOrderByAggregateInput
    _min?: VectorDocMinOrderByAggregateInput
  }

  export type VectorDocScalarWhereWithAggregatesInput = {
    AND?: VectorDocScalarWhereWithAggregatesInput | VectorDocScalarWhereWithAggregatesInput[]
    OR?: VectorDocScalarWhereWithAggregatesInput[]
    NOT?: VectorDocScalarWhereWithAggregatesInput | VectorDocScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VectorDoc"> | string
    tokenId?: StringNullableWithAggregatesFilter<"VectorDoc"> | string | null
    kind?: StringWithAggregatesFilter<"VectorDoc"> | string
    content?: StringWithAggregatesFilter<"VectorDoc"> | string
  }

  export type UserCreateInput = {
    id?: string
    telegramUserId: string
    handle?: string | null
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    watchlist?: WatchlistItemCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
    alerts?: UserAlertLogCreateNestedManyWithoutUserInput
    authLinks?: AuthLinkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    telegramUserId: string
    handle?: string | null
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    watchlist?: WatchlistItemUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
    alerts?: UserAlertLogUncheckedCreateNestedManyWithoutUserInput
    authLinks?: AuthLinkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramUserId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchlist?: WatchlistItemUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
    alerts?: UserAlertLogUpdateManyWithoutUserNestedInput
    authLinks?: AuthLinkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramUserId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchlist?: WatchlistItemUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
    alerts?: UserAlertLogUncheckedUpdateManyWithoutUserNestedInput
    authLinks?: AuthLinkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    telegramUserId: string
    handle?: string | null
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramUserId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramUserId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthLinkCreateInput = {
    id?: string
    nonce: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAuthLinksInput
  }

  export type AuthLinkUncheckedCreateInput = {
    id?: string
    userId: string
    nonce: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AuthLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuthLinksNestedInput
  }

  export type AuthLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthLinkCreateManyInput = {
    id?: string
    userId: string
    nonce: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AuthLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenCreateInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
    pairs?: PairCreateNestedManyWithoutTokenInput
    reports?: AnalystReportCreateNestedManyWithoutTokenInput
    vectors?: VectorDocCreateNestedManyWithoutTokenInput
    mentions?: SocialMentionCreateNestedManyWithoutTokenInput
    watchlist?: WatchlistItemCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
    pairs?: PairUncheckedCreateNestedManyWithoutTokenInput
    reports?: AnalystReportUncheckedCreateNestedManyWithoutTokenInput
    vectors?: VectorDocUncheckedCreateNestedManyWithoutTokenInput
    mentions?: SocialMentionUncheckedCreateNestedManyWithoutTokenInput
    watchlist?: WatchlistItemUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUpdateManyWithoutTokenNestedInput
    reports?: AnalystReportUpdateManyWithoutTokenNestedInput
    vectors?: VectorDocUpdateManyWithoutTokenNestedInput
    mentions?: SocialMentionUpdateManyWithoutTokenNestedInput
    watchlist?: WatchlistItemUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUncheckedUpdateManyWithoutTokenNestedInput
    reports?: AnalystReportUncheckedUpdateManyWithoutTokenNestedInput
    vectors?: VectorDocUncheckedUpdateManyWithoutTokenNestedInput
    mentions?: SocialMentionUncheckedUpdateManyWithoutTokenNestedInput
    watchlist?: WatchlistItemUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type TokenCreateManyInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
  }

  export type TokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairCreateInput = {
    id?: string
    dexId: string
    base: string
    quote: string
    liqUsd: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    vol5m: Decimal | DecimalJsLike | number | string
    vol1h: Decimal | DecimalJsLike | number | string
    vol24h: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
    token: TokenCreateNestedOneWithoutPairsInput
  }

  export type PairUncheckedCreateInput = {
    id?: string
    tokenId: string
    dexId: string
    base: string
    quote: string
    liqUsd: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    vol5m: Decimal | DecimalJsLike | number | string
    vol1h: Decimal | DecimalJsLike | number | string
    vol24h: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type PairUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dexId?: StringFieldUpdateOperationsInput | string
    base?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    liqUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol5m?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol1h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateOneRequiredWithoutPairsNestedInput
  }

  export type PairUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    dexId?: StringFieldUpdateOperationsInput | string
    base?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    liqUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol5m?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol1h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairCreateManyInput = {
    id?: string
    tokenId: string
    dexId: string
    base: string
    quote: string
    liqUsd: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    vol5m: Decimal | DecimalJsLike | number | string
    vol1h: Decimal | DecimalJsLike | number | string
    vol24h: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type PairUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dexId?: StringFieldUpdateOperationsInput | string
    base?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    liqUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol5m?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol1h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    dexId?: StringFieldUpdateOperationsInput | string
    base?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    liqUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol5m?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol1h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistItemCreateInput = {
    id?: string
    alertPrefs: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWatchlistInput
    token: TokenCreateNestedOneWithoutWatchlistInput
  }

  export type WatchlistItemUncheckedCreateInput = {
    id?: string
    userId: string
    tokenId: string
    alertPrefs: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WatchlistItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    alertPrefs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchlistNestedInput
    token?: TokenUpdateOneRequiredWithoutWatchlistNestedInput
  }

  export type WatchlistItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    alertPrefs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistItemCreateManyInput = {
    id?: string
    userId: string
    tokenId: string
    alertPrefs: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WatchlistItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    alertPrefs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    alertPrefs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalEventCreateInput = {
    id?: string
    tokenId: string
    pairId?: string | null
    kind: string
    metrics: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    scores?: SignalScoreCreateNestedManyWithoutSignalEventInput
    alerts?: UserAlertLogCreateNestedManyWithoutSignalEventInput
  }

  export type SignalEventUncheckedCreateInput = {
    id?: string
    tokenId: string
    pairId?: string | null
    kind: string
    metrics: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    scores?: SignalScoreUncheckedCreateNestedManyWithoutSignalEventInput
    alerts?: UserAlertLogUncheckedCreateNestedManyWithoutSignalEventInput
  }

  export type SignalEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    pairId?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scores?: SignalScoreUpdateManyWithoutSignalEventNestedInput
    alerts?: UserAlertLogUpdateManyWithoutSignalEventNestedInput
  }

  export type SignalEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    pairId?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scores?: SignalScoreUncheckedUpdateManyWithoutSignalEventNestedInput
    alerts?: UserAlertLogUncheckedUpdateManyWithoutSignalEventNestedInput
  }

  export type SignalEventCreateManyInput = {
    id?: string
    tokenId: string
    pairId?: string | null
    kind: string
    metrics: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
  }

  export type SignalEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    pairId?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    pairId?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalScoreCreateInput = {
    id?: string
    score: Decimal | DecimalJsLike | number | string
    label: string
    model?: string
    features: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    signalEvent: SignalEventCreateNestedOneWithoutScoresInput
  }

  export type SignalScoreUncheckedCreateInput = {
    id?: string
    signalEventId: string
    score: Decimal | DecimalJsLike | number | string
    label: string
    model?: string
    features: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SignalScoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    label?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    features?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signalEvent?: SignalEventUpdateOneRequiredWithoutScoresNestedInput
  }

  export type SignalScoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalEventId?: StringFieldUpdateOperationsInput | string
    score?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    label?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    features?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalScoreCreateManyInput = {
    id?: string
    signalEventId: string
    score: Decimal | DecimalJsLike | number | string
    label: string
    model?: string
    features: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SignalScoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    label?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    features?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalScoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalEventId?: StringFieldUpdateOperationsInput | string
    score?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    label?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    features?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalystReportCreateInput = {
    id?: string
    signalEventId?: string | null
    summaryShort: string
    summaryLong: string
    riskSummary: string
    model?: string
    createdAt?: Date | string
    token: TokenCreateNestedOneWithoutReportsInput
  }

  export type AnalystReportUncheckedCreateInput = {
    id?: string
    tokenId: string
    signalEventId?: string | null
    summaryShort: string
    summaryLong: string
    riskSummary: string
    model?: string
    createdAt?: Date | string
  }

  export type AnalystReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalEventId?: NullableStringFieldUpdateOperationsInput | string | null
    summaryShort?: StringFieldUpdateOperationsInput | string
    summaryLong?: StringFieldUpdateOperationsInput | string
    riskSummary?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateOneRequiredWithoutReportsNestedInput
  }

  export type AnalystReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    signalEventId?: NullableStringFieldUpdateOperationsInput | string | null
    summaryShort?: StringFieldUpdateOperationsInput | string
    summaryLong?: StringFieldUpdateOperationsInput | string
    riskSummary?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalystReportCreateManyInput = {
    id?: string
    tokenId: string
    signalEventId?: string | null
    summaryShort: string
    summaryLong: string
    riskSummary: string
    model?: string
    createdAt?: Date | string
  }

  export type AnalystReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalEventId?: NullableStringFieldUpdateOperationsInput | string | null
    summaryShort?: StringFieldUpdateOperationsInput | string
    summaryLong?: StringFieldUpdateOperationsInput | string
    riskSummary?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalystReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    signalEventId?: NullableStringFieldUpdateOperationsInput | string | null
    summaryShort?: StringFieldUpdateOperationsInput | string
    summaryLong?: StringFieldUpdateOperationsInput | string
    riskSummary?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialMentionCreateInput = {
    id?: string
    tweetId: string
    author: string
    followers: number
    engagement: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    token: TokenCreateNestedOneWithoutMentionsInput
  }

  export type SocialMentionUncheckedCreateInput = {
    id?: string
    tokenId: string
    tweetId: string
    author: string
    followers: number
    engagement: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SocialMentionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tweetId?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    engagement?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateOneRequiredWithoutMentionsNestedInput
  }

  export type SocialMentionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    tweetId?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    engagement?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialMentionCreateManyInput = {
    id?: string
    tokenId: string
    tweetId: string
    author: string
    followers: number
    engagement: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SocialMentionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tweetId?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    engagement?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialMentionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    tweetId?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    engagement?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAlertLogCreateInput = {
    id?: string
    channel: string
    deliveredAt?: Date | string
    status: string
    failReason?: string | null
    user: UserCreateNestedOneWithoutAlertsInput
    signalEvent: SignalEventCreateNestedOneWithoutAlertsInput
  }

  export type UserAlertLogUncheckedCreateInput = {
    id?: string
    userId: string
    signalEventId: string
    channel: string
    deliveredAt?: Date | string
    status: string
    failReason?: string | null
  }

  export type UserAlertLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAlertsNestedInput
    signalEvent?: SignalEventUpdateOneRequiredWithoutAlertsNestedInput
  }

  export type UserAlertLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    signalEventId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserAlertLogCreateManyInput = {
    id?: string
    userId: string
    signalEventId: string
    channel: string
    deliveredAt?: Date | string
    status: string
    failReason?: string | null
  }

  export type UserAlertLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserAlertLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    signalEventId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApiKeyCreateInput = {
    id?: string
    label: string
    hashedKey: string
    scopes?: ApiKeyCreatescopesInput | string[]
    createdAt?: Date | string
    revokedAt?: Date | string | null
    user: UserCreateNestedOneWithoutApiKeysInput
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    userId: string
    label: string
    hashedKey: string
    scopes?: ApiKeyCreatescopesInput | string[]
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    hashedKey?: StringFieldUpdateOperationsInput | string
    scopes?: ApiKeyUpdatescopesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutApiKeysNestedInput
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    hashedKey?: StringFieldUpdateOperationsInput | string
    scopes?: ApiKeyUpdatescopesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    userId: string
    label: string
    hashedKey: string
    scopes?: ApiKeyCreatescopesInput | string[]
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    hashedKey?: StringFieldUpdateOperationsInput | string
    scopes?: ApiKeyUpdatescopesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    hashedKey?: StringFieldUpdateOperationsInput | string
    scopes?: ApiKeyUpdatescopesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JobCursorCreateInput = {
    id?: string
    source: string
    cursor: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type JobCursorUncheckedCreateInput = {
    id?: string
    source: string
    cursor: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type JobCursorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    cursor?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCursorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    cursor?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCursorCreateManyInput = {
    id?: string
    source: string
    cursor: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type JobCursorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    cursor?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCursorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    cursor?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VectorDocUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    token?: TokenUpdateOneWithoutVectorsNestedInput
  }

  export type VectorDocUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type VectorDocUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type VectorDocUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WatchlistItemListRelationFilter = {
    every?: WatchlistItemWhereInput
    some?: WatchlistItemWhereInput
    none?: WatchlistItemWhereInput
  }

  export type ApiKeyListRelationFilter = {
    every?: ApiKeyWhereInput
    some?: ApiKeyWhereInput
    none?: ApiKeyWhereInput
  }

  export type UserAlertLogListRelationFilter = {
    every?: UserAlertLogWhereInput
    some?: UserAlertLogWhereInput
    none?: UserAlertLogWhereInput
  }

  export type AuthLinkListRelationFilter = {
    every?: AuthLinkWhereInput
    some?: AuthLinkWhereInput
    none?: AuthLinkWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WatchlistItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApiKeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserAlertLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuthLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    telegramUserId?: SortOrder
    handle?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramUserId?: SortOrder
    handle?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    telegramUserId?: SortOrder
    handle?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AuthLinkCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    nonce?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    nonce?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthLinkMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    nonce?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PairListRelationFilter = {
    every?: PairWhereInput
    some?: PairWhereInput
    none?: PairWhereInput
  }

  export type AnalystReportListRelationFilter = {
    every?: AnalystReportWhereInput
    some?: AnalystReportWhereInput
    none?: AnalystReportWhereInput
  }

  export type VectorDocListRelationFilter = {
    every?: VectorDocWhereInput
    some?: VectorDocWhereInput
    none?: VectorDocWhereInput
  }

  export type SocialMentionListRelationFilter = {
    every?: SocialMentionWhereInput
    some?: SocialMentionWhereInput
    none?: SocialMentionWhereInput
  }

  export type PairOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnalystReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VectorDocOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SocialMentionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TokenCountOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    mint?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    discoveredAt?: SortOrder
    lastSeenAt?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    mint?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    discoveredAt?: SortOrder
    lastSeenAt?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    mint?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    discoveredAt?: SortOrder
    lastSeenAt?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type TokenRelationFilter = {
    is?: TokenWhereInput
    isNot?: TokenWhereInput
  }

  export type PairCountOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    dexId?: SortOrder
    base?: SortOrder
    quote?: SortOrder
    liqUsd?: SortOrder
    price?: SortOrder
    vol5m?: SortOrder
    vol1h?: SortOrder
    vol24h?: SortOrder
    updatedAt?: SortOrder
  }

  export type PairAvgOrderByAggregateInput = {
    liqUsd?: SortOrder
    price?: SortOrder
    vol5m?: SortOrder
    vol1h?: SortOrder
    vol24h?: SortOrder
  }

  export type PairMaxOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    dexId?: SortOrder
    base?: SortOrder
    quote?: SortOrder
    liqUsd?: SortOrder
    price?: SortOrder
    vol5m?: SortOrder
    vol1h?: SortOrder
    vol24h?: SortOrder
    updatedAt?: SortOrder
  }

  export type PairMinOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    dexId?: SortOrder
    base?: SortOrder
    quote?: SortOrder
    liqUsd?: SortOrder
    price?: SortOrder
    vol5m?: SortOrder
    vol1h?: SortOrder
    vol24h?: SortOrder
    updatedAt?: SortOrder
  }

  export type PairSumOrderByAggregateInput = {
    liqUsd?: SortOrder
    price?: SortOrder
    vol5m?: SortOrder
    vol1h?: SortOrder
    vol24h?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type WatchlistItemUserIdTokenIdCompoundUniqueInput = {
    userId: string
    tokenId: string
  }

  export type WatchlistItemCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenId?: SortOrder
    alertPrefs?: SortOrder
    createdAt?: SortOrder
  }

  export type WatchlistItemMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenId?: SortOrder
    createdAt?: SortOrder
  }

  export type WatchlistItemMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenId?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type SignalScoreListRelationFilter = {
    every?: SignalScoreWhereInput
    some?: SignalScoreWhereInput
    none?: SignalScoreWhereInput
  }

  export type SignalScoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SignalEventCountOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    pairId?: SortOrder
    kind?: SortOrder
    metrics?: SortOrder
    occurredAt?: SortOrder
  }

  export type SignalEventMaxOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    pairId?: SortOrder
    kind?: SortOrder
    occurredAt?: SortOrder
  }

  export type SignalEventMinOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    pairId?: SortOrder
    kind?: SortOrder
    occurredAt?: SortOrder
  }

  export type SignalEventRelationFilter = {
    is?: SignalEventWhereInput
    isNot?: SignalEventWhereInput
  }

  export type SignalScoreCountOrderByAggregateInput = {
    id?: SortOrder
    signalEventId?: SortOrder
    score?: SortOrder
    label?: SortOrder
    model?: SortOrder
    features?: SortOrder
    createdAt?: SortOrder
  }

  export type SignalScoreAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type SignalScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    signalEventId?: SortOrder
    score?: SortOrder
    label?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
  }

  export type SignalScoreMinOrderByAggregateInput = {
    id?: SortOrder
    signalEventId?: SortOrder
    score?: SortOrder
    label?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
  }

  export type SignalScoreSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type AnalystReportCountOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    signalEventId?: SortOrder
    summaryShort?: SortOrder
    summaryLong?: SortOrder
    riskSummary?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalystReportMaxOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    signalEventId?: SortOrder
    summaryShort?: SortOrder
    summaryLong?: SortOrder
    riskSummary?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalystReportMinOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    signalEventId?: SortOrder
    summaryShort?: SortOrder
    summaryLong?: SortOrder
    riskSummary?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type SocialMentionCountOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    tweetId?: SortOrder
    author?: SortOrder
    followers?: SortOrder
    engagement?: SortOrder
    createdAt?: SortOrder
  }

  export type SocialMentionAvgOrderByAggregateInput = {
    followers?: SortOrder
  }

  export type SocialMentionMaxOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    tweetId?: SortOrder
    author?: SortOrder
    followers?: SortOrder
    createdAt?: SortOrder
  }

  export type SocialMentionMinOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    tweetId?: SortOrder
    author?: SortOrder
    followers?: SortOrder
    createdAt?: SortOrder
  }

  export type SocialMentionSumOrderByAggregateInput = {
    followers?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserAlertLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    signalEventId?: SortOrder
    channel?: SortOrder
    deliveredAt?: SortOrder
    status?: SortOrder
    failReason?: SortOrder
  }

  export type UserAlertLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    signalEventId?: SortOrder
    channel?: SortOrder
    deliveredAt?: SortOrder
    status?: SortOrder
    failReason?: SortOrder
  }

  export type UserAlertLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    signalEventId?: SortOrder
    channel?: SortOrder
    deliveredAt?: SortOrder
    status?: SortOrder
    failReason?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    hashedKey?: SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    hashedKey?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    hashedKey?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type JobCursorCountOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    cursor?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobCursorMaxOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobCursorMinOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenNullableRelationFilter = {
    is?: TokenWhereInput | null
    isNot?: TokenWhereInput | null
  }

  export type VectorDocCountOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    kind?: SortOrder
    content?: SortOrder
  }

  export type VectorDocMaxOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    kind?: SortOrder
    content?: SortOrder
  }

  export type VectorDocMinOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    kind?: SortOrder
    content?: SortOrder
  }

  export type WatchlistItemCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchlistItemCreateWithoutUserInput, WatchlistItemUncheckedCreateWithoutUserInput> | WatchlistItemCreateWithoutUserInput[] | WatchlistItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistItemCreateOrConnectWithoutUserInput | WatchlistItemCreateOrConnectWithoutUserInput[]
    createMany?: WatchlistItemCreateManyUserInputEnvelope
    connect?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
  }

  export type ApiKeyCreateNestedManyWithoutUserInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
  }

  export type UserAlertLogCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAlertLogCreateWithoutUserInput, UserAlertLogUncheckedCreateWithoutUserInput> | UserAlertLogCreateWithoutUserInput[] | UserAlertLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAlertLogCreateOrConnectWithoutUserInput | UserAlertLogCreateOrConnectWithoutUserInput[]
    createMany?: UserAlertLogCreateManyUserInputEnvelope
    connect?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
  }

  export type AuthLinkCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthLinkCreateWithoutUserInput, AuthLinkUncheckedCreateWithoutUserInput> | AuthLinkCreateWithoutUserInput[] | AuthLinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthLinkCreateOrConnectWithoutUserInput | AuthLinkCreateOrConnectWithoutUserInput[]
    createMany?: AuthLinkCreateManyUserInputEnvelope
    connect?: AuthLinkWhereUniqueInput | AuthLinkWhereUniqueInput[]
  }

  export type WatchlistItemUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchlistItemCreateWithoutUserInput, WatchlistItemUncheckedCreateWithoutUserInput> | WatchlistItemCreateWithoutUserInput[] | WatchlistItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistItemCreateOrConnectWithoutUserInput | WatchlistItemCreateOrConnectWithoutUserInput[]
    createMany?: WatchlistItemCreateManyUserInputEnvelope
    connect?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
  }

  export type ApiKeyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
  }

  export type UserAlertLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAlertLogCreateWithoutUserInput, UserAlertLogUncheckedCreateWithoutUserInput> | UserAlertLogCreateWithoutUserInput[] | UserAlertLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAlertLogCreateOrConnectWithoutUserInput | UserAlertLogCreateOrConnectWithoutUserInput[]
    createMany?: UserAlertLogCreateManyUserInputEnvelope
    connect?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
  }

  export type AuthLinkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthLinkCreateWithoutUserInput, AuthLinkUncheckedCreateWithoutUserInput> | AuthLinkCreateWithoutUserInput[] | AuthLinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthLinkCreateOrConnectWithoutUserInput | AuthLinkCreateOrConnectWithoutUserInput[]
    createMany?: AuthLinkCreateManyUserInputEnvelope
    connect?: AuthLinkWhereUniqueInput | AuthLinkWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WatchlistItemUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchlistItemCreateWithoutUserInput, WatchlistItemUncheckedCreateWithoutUserInput> | WatchlistItemCreateWithoutUserInput[] | WatchlistItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistItemCreateOrConnectWithoutUserInput | WatchlistItemCreateOrConnectWithoutUserInput[]
    upsert?: WatchlistItemUpsertWithWhereUniqueWithoutUserInput | WatchlistItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchlistItemCreateManyUserInputEnvelope
    set?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    disconnect?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    delete?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    connect?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    update?: WatchlistItemUpdateWithWhereUniqueWithoutUserInput | WatchlistItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchlistItemUpdateManyWithWhereWithoutUserInput | WatchlistItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchlistItemScalarWhereInput | WatchlistItemScalarWhereInput[]
  }

  export type ApiKeyUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutUserInput | ApiKeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutUserInput | ApiKeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutUserInput | ApiKeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
  }

  export type UserAlertLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAlertLogCreateWithoutUserInput, UserAlertLogUncheckedCreateWithoutUserInput> | UserAlertLogCreateWithoutUserInput[] | UserAlertLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAlertLogCreateOrConnectWithoutUserInput | UserAlertLogCreateOrConnectWithoutUserInput[]
    upsert?: UserAlertLogUpsertWithWhereUniqueWithoutUserInput | UserAlertLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAlertLogCreateManyUserInputEnvelope
    set?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    disconnect?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    delete?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    connect?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    update?: UserAlertLogUpdateWithWhereUniqueWithoutUserInput | UserAlertLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAlertLogUpdateManyWithWhereWithoutUserInput | UserAlertLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAlertLogScalarWhereInput | UserAlertLogScalarWhereInput[]
  }

  export type AuthLinkUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthLinkCreateWithoutUserInput, AuthLinkUncheckedCreateWithoutUserInput> | AuthLinkCreateWithoutUserInput[] | AuthLinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthLinkCreateOrConnectWithoutUserInput | AuthLinkCreateOrConnectWithoutUserInput[]
    upsert?: AuthLinkUpsertWithWhereUniqueWithoutUserInput | AuthLinkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthLinkCreateManyUserInputEnvelope
    set?: AuthLinkWhereUniqueInput | AuthLinkWhereUniqueInput[]
    disconnect?: AuthLinkWhereUniqueInput | AuthLinkWhereUniqueInput[]
    delete?: AuthLinkWhereUniqueInput | AuthLinkWhereUniqueInput[]
    connect?: AuthLinkWhereUniqueInput | AuthLinkWhereUniqueInput[]
    update?: AuthLinkUpdateWithWhereUniqueWithoutUserInput | AuthLinkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthLinkUpdateManyWithWhereWithoutUserInput | AuthLinkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthLinkScalarWhereInput | AuthLinkScalarWhereInput[]
  }

  export type WatchlistItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchlistItemCreateWithoutUserInput, WatchlistItemUncheckedCreateWithoutUserInput> | WatchlistItemCreateWithoutUserInput[] | WatchlistItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistItemCreateOrConnectWithoutUserInput | WatchlistItemCreateOrConnectWithoutUserInput[]
    upsert?: WatchlistItemUpsertWithWhereUniqueWithoutUserInput | WatchlistItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchlistItemCreateManyUserInputEnvelope
    set?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    disconnect?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    delete?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    connect?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    update?: WatchlistItemUpdateWithWhereUniqueWithoutUserInput | WatchlistItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchlistItemUpdateManyWithWhereWithoutUserInput | WatchlistItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchlistItemScalarWhereInput | WatchlistItemScalarWhereInput[]
  }

  export type ApiKeyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutUserInput | ApiKeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutUserInput | ApiKeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutUserInput | ApiKeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
  }

  export type UserAlertLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAlertLogCreateWithoutUserInput, UserAlertLogUncheckedCreateWithoutUserInput> | UserAlertLogCreateWithoutUserInput[] | UserAlertLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAlertLogCreateOrConnectWithoutUserInput | UserAlertLogCreateOrConnectWithoutUserInput[]
    upsert?: UserAlertLogUpsertWithWhereUniqueWithoutUserInput | UserAlertLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAlertLogCreateManyUserInputEnvelope
    set?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    disconnect?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    delete?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    connect?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    update?: UserAlertLogUpdateWithWhereUniqueWithoutUserInput | UserAlertLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAlertLogUpdateManyWithWhereWithoutUserInput | UserAlertLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAlertLogScalarWhereInput | UserAlertLogScalarWhereInput[]
  }

  export type AuthLinkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthLinkCreateWithoutUserInput, AuthLinkUncheckedCreateWithoutUserInput> | AuthLinkCreateWithoutUserInput[] | AuthLinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthLinkCreateOrConnectWithoutUserInput | AuthLinkCreateOrConnectWithoutUserInput[]
    upsert?: AuthLinkUpsertWithWhereUniqueWithoutUserInput | AuthLinkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthLinkCreateManyUserInputEnvelope
    set?: AuthLinkWhereUniqueInput | AuthLinkWhereUniqueInput[]
    disconnect?: AuthLinkWhereUniqueInput | AuthLinkWhereUniqueInput[]
    delete?: AuthLinkWhereUniqueInput | AuthLinkWhereUniqueInput[]
    connect?: AuthLinkWhereUniqueInput | AuthLinkWhereUniqueInput[]
    update?: AuthLinkUpdateWithWhereUniqueWithoutUserInput | AuthLinkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthLinkUpdateManyWithWhereWithoutUserInput | AuthLinkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthLinkScalarWhereInput | AuthLinkScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAuthLinksInput = {
    create?: XOR<UserCreateWithoutAuthLinksInput, UserUncheckedCreateWithoutAuthLinksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthLinksInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAuthLinksNestedInput = {
    create?: XOR<UserCreateWithoutAuthLinksInput, UserUncheckedCreateWithoutAuthLinksInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthLinksInput
    upsert?: UserUpsertWithoutAuthLinksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthLinksInput, UserUpdateWithoutAuthLinksInput>, UserUncheckedUpdateWithoutAuthLinksInput>
  }

  export type PairCreateNestedManyWithoutTokenInput = {
    create?: XOR<PairCreateWithoutTokenInput, PairUncheckedCreateWithoutTokenInput> | PairCreateWithoutTokenInput[] | PairUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PairCreateOrConnectWithoutTokenInput | PairCreateOrConnectWithoutTokenInput[]
    createMany?: PairCreateManyTokenInputEnvelope
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
  }

  export type AnalystReportCreateNestedManyWithoutTokenInput = {
    create?: XOR<AnalystReportCreateWithoutTokenInput, AnalystReportUncheckedCreateWithoutTokenInput> | AnalystReportCreateWithoutTokenInput[] | AnalystReportUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: AnalystReportCreateOrConnectWithoutTokenInput | AnalystReportCreateOrConnectWithoutTokenInput[]
    createMany?: AnalystReportCreateManyTokenInputEnvelope
    connect?: AnalystReportWhereUniqueInput | AnalystReportWhereUniqueInput[]
  }

  export type VectorDocCreateNestedManyWithoutTokenInput = {
    connect?: VectorDocWhereUniqueInput | VectorDocWhereUniqueInput[]
  }

  export type SocialMentionCreateNestedManyWithoutTokenInput = {
    create?: XOR<SocialMentionCreateWithoutTokenInput, SocialMentionUncheckedCreateWithoutTokenInput> | SocialMentionCreateWithoutTokenInput[] | SocialMentionUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: SocialMentionCreateOrConnectWithoutTokenInput | SocialMentionCreateOrConnectWithoutTokenInput[]
    createMany?: SocialMentionCreateManyTokenInputEnvelope
    connect?: SocialMentionWhereUniqueInput | SocialMentionWhereUniqueInput[]
  }

  export type WatchlistItemCreateNestedManyWithoutTokenInput = {
    create?: XOR<WatchlistItemCreateWithoutTokenInput, WatchlistItemUncheckedCreateWithoutTokenInput> | WatchlistItemCreateWithoutTokenInput[] | WatchlistItemUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: WatchlistItemCreateOrConnectWithoutTokenInput | WatchlistItemCreateOrConnectWithoutTokenInput[]
    createMany?: WatchlistItemCreateManyTokenInputEnvelope
    connect?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
  }

  export type PairUncheckedCreateNestedManyWithoutTokenInput = {
    create?: XOR<PairCreateWithoutTokenInput, PairUncheckedCreateWithoutTokenInput> | PairCreateWithoutTokenInput[] | PairUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PairCreateOrConnectWithoutTokenInput | PairCreateOrConnectWithoutTokenInput[]
    createMany?: PairCreateManyTokenInputEnvelope
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
  }

  export type AnalystReportUncheckedCreateNestedManyWithoutTokenInput = {
    create?: XOR<AnalystReportCreateWithoutTokenInput, AnalystReportUncheckedCreateWithoutTokenInput> | AnalystReportCreateWithoutTokenInput[] | AnalystReportUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: AnalystReportCreateOrConnectWithoutTokenInput | AnalystReportCreateOrConnectWithoutTokenInput[]
    createMany?: AnalystReportCreateManyTokenInputEnvelope
    connect?: AnalystReportWhereUniqueInput | AnalystReportWhereUniqueInput[]
  }

  export type VectorDocUncheckedCreateNestedManyWithoutTokenInput = {
    connect?: VectorDocWhereUniqueInput | VectorDocWhereUniqueInput[]
  }

  export type SocialMentionUncheckedCreateNestedManyWithoutTokenInput = {
    create?: XOR<SocialMentionCreateWithoutTokenInput, SocialMentionUncheckedCreateWithoutTokenInput> | SocialMentionCreateWithoutTokenInput[] | SocialMentionUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: SocialMentionCreateOrConnectWithoutTokenInput | SocialMentionCreateOrConnectWithoutTokenInput[]
    createMany?: SocialMentionCreateManyTokenInputEnvelope
    connect?: SocialMentionWhereUniqueInput | SocialMentionWhereUniqueInput[]
  }

  export type WatchlistItemUncheckedCreateNestedManyWithoutTokenInput = {
    create?: XOR<WatchlistItemCreateWithoutTokenInput, WatchlistItemUncheckedCreateWithoutTokenInput> | WatchlistItemCreateWithoutTokenInput[] | WatchlistItemUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: WatchlistItemCreateOrConnectWithoutTokenInput | WatchlistItemCreateOrConnectWithoutTokenInput[]
    createMany?: WatchlistItemCreateManyTokenInputEnvelope
    connect?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
  }

  export type PairUpdateManyWithoutTokenNestedInput = {
    create?: XOR<PairCreateWithoutTokenInput, PairUncheckedCreateWithoutTokenInput> | PairCreateWithoutTokenInput[] | PairUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PairCreateOrConnectWithoutTokenInput | PairCreateOrConnectWithoutTokenInput[]
    upsert?: PairUpsertWithWhereUniqueWithoutTokenInput | PairUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: PairCreateManyTokenInputEnvelope
    set?: PairWhereUniqueInput | PairWhereUniqueInput[]
    disconnect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    delete?: PairWhereUniqueInput | PairWhereUniqueInput[]
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    update?: PairUpdateWithWhereUniqueWithoutTokenInput | PairUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: PairUpdateManyWithWhereWithoutTokenInput | PairUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: PairScalarWhereInput | PairScalarWhereInput[]
  }

  export type AnalystReportUpdateManyWithoutTokenNestedInput = {
    create?: XOR<AnalystReportCreateWithoutTokenInput, AnalystReportUncheckedCreateWithoutTokenInput> | AnalystReportCreateWithoutTokenInput[] | AnalystReportUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: AnalystReportCreateOrConnectWithoutTokenInput | AnalystReportCreateOrConnectWithoutTokenInput[]
    upsert?: AnalystReportUpsertWithWhereUniqueWithoutTokenInput | AnalystReportUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: AnalystReportCreateManyTokenInputEnvelope
    set?: AnalystReportWhereUniqueInput | AnalystReportWhereUniqueInput[]
    disconnect?: AnalystReportWhereUniqueInput | AnalystReportWhereUniqueInput[]
    delete?: AnalystReportWhereUniqueInput | AnalystReportWhereUniqueInput[]
    connect?: AnalystReportWhereUniqueInput | AnalystReportWhereUniqueInput[]
    update?: AnalystReportUpdateWithWhereUniqueWithoutTokenInput | AnalystReportUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: AnalystReportUpdateManyWithWhereWithoutTokenInput | AnalystReportUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: AnalystReportScalarWhereInput | AnalystReportScalarWhereInput[]
  }

  export type VectorDocUpdateManyWithoutTokenNestedInput = {
    set?: VectorDocWhereUniqueInput | VectorDocWhereUniqueInput[]
    disconnect?: VectorDocWhereUniqueInput | VectorDocWhereUniqueInput[]
    delete?: VectorDocWhereUniqueInput | VectorDocWhereUniqueInput[]
    connect?: VectorDocWhereUniqueInput | VectorDocWhereUniqueInput[]
    update?: VectorDocUpdateWithWhereUniqueWithoutTokenInput | VectorDocUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: VectorDocUpdateManyWithWhereWithoutTokenInput | VectorDocUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: VectorDocScalarWhereInput | VectorDocScalarWhereInput[]
  }

  export type SocialMentionUpdateManyWithoutTokenNestedInput = {
    create?: XOR<SocialMentionCreateWithoutTokenInput, SocialMentionUncheckedCreateWithoutTokenInput> | SocialMentionCreateWithoutTokenInput[] | SocialMentionUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: SocialMentionCreateOrConnectWithoutTokenInput | SocialMentionCreateOrConnectWithoutTokenInput[]
    upsert?: SocialMentionUpsertWithWhereUniqueWithoutTokenInput | SocialMentionUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: SocialMentionCreateManyTokenInputEnvelope
    set?: SocialMentionWhereUniqueInput | SocialMentionWhereUniqueInput[]
    disconnect?: SocialMentionWhereUniqueInput | SocialMentionWhereUniqueInput[]
    delete?: SocialMentionWhereUniqueInput | SocialMentionWhereUniqueInput[]
    connect?: SocialMentionWhereUniqueInput | SocialMentionWhereUniqueInput[]
    update?: SocialMentionUpdateWithWhereUniqueWithoutTokenInput | SocialMentionUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: SocialMentionUpdateManyWithWhereWithoutTokenInput | SocialMentionUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: SocialMentionScalarWhereInput | SocialMentionScalarWhereInput[]
  }

  export type WatchlistItemUpdateManyWithoutTokenNestedInput = {
    create?: XOR<WatchlistItemCreateWithoutTokenInput, WatchlistItemUncheckedCreateWithoutTokenInput> | WatchlistItemCreateWithoutTokenInput[] | WatchlistItemUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: WatchlistItemCreateOrConnectWithoutTokenInput | WatchlistItemCreateOrConnectWithoutTokenInput[]
    upsert?: WatchlistItemUpsertWithWhereUniqueWithoutTokenInput | WatchlistItemUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: WatchlistItemCreateManyTokenInputEnvelope
    set?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    disconnect?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    delete?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    connect?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    update?: WatchlistItemUpdateWithWhereUniqueWithoutTokenInput | WatchlistItemUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: WatchlistItemUpdateManyWithWhereWithoutTokenInput | WatchlistItemUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: WatchlistItemScalarWhereInput | WatchlistItemScalarWhereInput[]
  }

  export type PairUncheckedUpdateManyWithoutTokenNestedInput = {
    create?: XOR<PairCreateWithoutTokenInput, PairUncheckedCreateWithoutTokenInput> | PairCreateWithoutTokenInput[] | PairUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PairCreateOrConnectWithoutTokenInput | PairCreateOrConnectWithoutTokenInput[]
    upsert?: PairUpsertWithWhereUniqueWithoutTokenInput | PairUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: PairCreateManyTokenInputEnvelope
    set?: PairWhereUniqueInput | PairWhereUniqueInput[]
    disconnect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    delete?: PairWhereUniqueInput | PairWhereUniqueInput[]
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    update?: PairUpdateWithWhereUniqueWithoutTokenInput | PairUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: PairUpdateManyWithWhereWithoutTokenInput | PairUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: PairScalarWhereInput | PairScalarWhereInput[]
  }

  export type AnalystReportUncheckedUpdateManyWithoutTokenNestedInput = {
    create?: XOR<AnalystReportCreateWithoutTokenInput, AnalystReportUncheckedCreateWithoutTokenInput> | AnalystReportCreateWithoutTokenInput[] | AnalystReportUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: AnalystReportCreateOrConnectWithoutTokenInput | AnalystReportCreateOrConnectWithoutTokenInput[]
    upsert?: AnalystReportUpsertWithWhereUniqueWithoutTokenInput | AnalystReportUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: AnalystReportCreateManyTokenInputEnvelope
    set?: AnalystReportWhereUniqueInput | AnalystReportWhereUniqueInput[]
    disconnect?: AnalystReportWhereUniqueInput | AnalystReportWhereUniqueInput[]
    delete?: AnalystReportWhereUniqueInput | AnalystReportWhereUniqueInput[]
    connect?: AnalystReportWhereUniqueInput | AnalystReportWhereUniqueInput[]
    update?: AnalystReportUpdateWithWhereUniqueWithoutTokenInput | AnalystReportUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: AnalystReportUpdateManyWithWhereWithoutTokenInput | AnalystReportUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: AnalystReportScalarWhereInput | AnalystReportScalarWhereInput[]
  }

  export type VectorDocUncheckedUpdateManyWithoutTokenNestedInput = {
    set?: VectorDocWhereUniqueInput | VectorDocWhereUniqueInput[]
    disconnect?: VectorDocWhereUniqueInput | VectorDocWhereUniqueInput[]
    delete?: VectorDocWhereUniqueInput | VectorDocWhereUniqueInput[]
    connect?: VectorDocWhereUniqueInput | VectorDocWhereUniqueInput[]
    update?: VectorDocUpdateWithWhereUniqueWithoutTokenInput | VectorDocUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: VectorDocUpdateManyWithWhereWithoutTokenInput | VectorDocUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: VectorDocScalarWhereInput | VectorDocScalarWhereInput[]
  }

  export type SocialMentionUncheckedUpdateManyWithoutTokenNestedInput = {
    create?: XOR<SocialMentionCreateWithoutTokenInput, SocialMentionUncheckedCreateWithoutTokenInput> | SocialMentionCreateWithoutTokenInput[] | SocialMentionUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: SocialMentionCreateOrConnectWithoutTokenInput | SocialMentionCreateOrConnectWithoutTokenInput[]
    upsert?: SocialMentionUpsertWithWhereUniqueWithoutTokenInput | SocialMentionUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: SocialMentionCreateManyTokenInputEnvelope
    set?: SocialMentionWhereUniqueInput | SocialMentionWhereUniqueInput[]
    disconnect?: SocialMentionWhereUniqueInput | SocialMentionWhereUniqueInput[]
    delete?: SocialMentionWhereUniqueInput | SocialMentionWhereUniqueInput[]
    connect?: SocialMentionWhereUniqueInput | SocialMentionWhereUniqueInput[]
    update?: SocialMentionUpdateWithWhereUniqueWithoutTokenInput | SocialMentionUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: SocialMentionUpdateManyWithWhereWithoutTokenInput | SocialMentionUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: SocialMentionScalarWhereInput | SocialMentionScalarWhereInput[]
  }

  export type WatchlistItemUncheckedUpdateManyWithoutTokenNestedInput = {
    create?: XOR<WatchlistItemCreateWithoutTokenInput, WatchlistItemUncheckedCreateWithoutTokenInput> | WatchlistItemCreateWithoutTokenInput[] | WatchlistItemUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: WatchlistItemCreateOrConnectWithoutTokenInput | WatchlistItemCreateOrConnectWithoutTokenInput[]
    upsert?: WatchlistItemUpsertWithWhereUniqueWithoutTokenInput | WatchlistItemUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: WatchlistItemCreateManyTokenInputEnvelope
    set?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    disconnect?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    delete?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    connect?: WatchlistItemWhereUniqueInput | WatchlistItemWhereUniqueInput[]
    update?: WatchlistItemUpdateWithWhereUniqueWithoutTokenInput | WatchlistItemUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: WatchlistItemUpdateManyWithWhereWithoutTokenInput | WatchlistItemUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: WatchlistItemScalarWhereInput | WatchlistItemScalarWhereInput[]
  }

  export type TokenCreateNestedOneWithoutPairsInput = {
    create?: XOR<TokenCreateWithoutPairsInput, TokenUncheckedCreateWithoutPairsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutPairsInput
    connect?: TokenWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type TokenUpdateOneRequiredWithoutPairsNestedInput = {
    create?: XOR<TokenCreateWithoutPairsInput, TokenUncheckedCreateWithoutPairsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutPairsInput
    upsert?: TokenUpsertWithoutPairsInput
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutPairsInput, TokenUpdateWithoutPairsInput>, TokenUncheckedUpdateWithoutPairsInput>
  }

  export type UserCreateNestedOneWithoutWatchlistInput = {
    create?: XOR<UserCreateWithoutWatchlistInput, UserUncheckedCreateWithoutWatchlistInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchlistInput
    connect?: UserWhereUniqueInput
  }

  export type TokenCreateNestedOneWithoutWatchlistInput = {
    create?: XOR<TokenCreateWithoutWatchlistInput, TokenUncheckedCreateWithoutWatchlistInput>
    connectOrCreate?: TokenCreateOrConnectWithoutWatchlistInput
    connect?: TokenWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWatchlistNestedInput = {
    create?: XOR<UserCreateWithoutWatchlistInput, UserUncheckedCreateWithoutWatchlistInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchlistInput
    upsert?: UserUpsertWithoutWatchlistInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWatchlistInput, UserUpdateWithoutWatchlistInput>, UserUncheckedUpdateWithoutWatchlistInput>
  }

  export type TokenUpdateOneRequiredWithoutWatchlistNestedInput = {
    create?: XOR<TokenCreateWithoutWatchlistInput, TokenUncheckedCreateWithoutWatchlistInput>
    connectOrCreate?: TokenCreateOrConnectWithoutWatchlistInput
    upsert?: TokenUpsertWithoutWatchlistInput
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutWatchlistInput, TokenUpdateWithoutWatchlistInput>, TokenUncheckedUpdateWithoutWatchlistInput>
  }

  export type SignalScoreCreateNestedManyWithoutSignalEventInput = {
    create?: XOR<SignalScoreCreateWithoutSignalEventInput, SignalScoreUncheckedCreateWithoutSignalEventInput> | SignalScoreCreateWithoutSignalEventInput[] | SignalScoreUncheckedCreateWithoutSignalEventInput[]
    connectOrCreate?: SignalScoreCreateOrConnectWithoutSignalEventInput | SignalScoreCreateOrConnectWithoutSignalEventInput[]
    createMany?: SignalScoreCreateManySignalEventInputEnvelope
    connect?: SignalScoreWhereUniqueInput | SignalScoreWhereUniqueInput[]
  }

  export type UserAlertLogCreateNestedManyWithoutSignalEventInput = {
    create?: XOR<UserAlertLogCreateWithoutSignalEventInput, UserAlertLogUncheckedCreateWithoutSignalEventInput> | UserAlertLogCreateWithoutSignalEventInput[] | UserAlertLogUncheckedCreateWithoutSignalEventInput[]
    connectOrCreate?: UserAlertLogCreateOrConnectWithoutSignalEventInput | UserAlertLogCreateOrConnectWithoutSignalEventInput[]
    createMany?: UserAlertLogCreateManySignalEventInputEnvelope
    connect?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
  }

  export type SignalScoreUncheckedCreateNestedManyWithoutSignalEventInput = {
    create?: XOR<SignalScoreCreateWithoutSignalEventInput, SignalScoreUncheckedCreateWithoutSignalEventInput> | SignalScoreCreateWithoutSignalEventInput[] | SignalScoreUncheckedCreateWithoutSignalEventInput[]
    connectOrCreate?: SignalScoreCreateOrConnectWithoutSignalEventInput | SignalScoreCreateOrConnectWithoutSignalEventInput[]
    createMany?: SignalScoreCreateManySignalEventInputEnvelope
    connect?: SignalScoreWhereUniqueInput | SignalScoreWhereUniqueInput[]
  }

  export type UserAlertLogUncheckedCreateNestedManyWithoutSignalEventInput = {
    create?: XOR<UserAlertLogCreateWithoutSignalEventInput, UserAlertLogUncheckedCreateWithoutSignalEventInput> | UserAlertLogCreateWithoutSignalEventInput[] | UserAlertLogUncheckedCreateWithoutSignalEventInput[]
    connectOrCreate?: UserAlertLogCreateOrConnectWithoutSignalEventInput | UserAlertLogCreateOrConnectWithoutSignalEventInput[]
    createMany?: UserAlertLogCreateManySignalEventInputEnvelope
    connect?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
  }

  export type SignalScoreUpdateManyWithoutSignalEventNestedInput = {
    create?: XOR<SignalScoreCreateWithoutSignalEventInput, SignalScoreUncheckedCreateWithoutSignalEventInput> | SignalScoreCreateWithoutSignalEventInput[] | SignalScoreUncheckedCreateWithoutSignalEventInput[]
    connectOrCreate?: SignalScoreCreateOrConnectWithoutSignalEventInput | SignalScoreCreateOrConnectWithoutSignalEventInput[]
    upsert?: SignalScoreUpsertWithWhereUniqueWithoutSignalEventInput | SignalScoreUpsertWithWhereUniqueWithoutSignalEventInput[]
    createMany?: SignalScoreCreateManySignalEventInputEnvelope
    set?: SignalScoreWhereUniqueInput | SignalScoreWhereUniqueInput[]
    disconnect?: SignalScoreWhereUniqueInput | SignalScoreWhereUniqueInput[]
    delete?: SignalScoreWhereUniqueInput | SignalScoreWhereUniqueInput[]
    connect?: SignalScoreWhereUniqueInput | SignalScoreWhereUniqueInput[]
    update?: SignalScoreUpdateWithWhereUniqueWithoutSignalEventInput | SignalScoreUpdateWithWhereUniqueWithoutSignalEventInput[]
    updateMany?: SignalScoreUpdateManyWithWhereWithoutSignalEventInput | SignalScoreUpdateManyWithWhereWithoutSignalEventInput[]
    deleteMany?: SignalScoreScalarWhereInput | SignalScoreScalarWhereInput[]
  }

  export type UserAlertLogUpdateManyWithoutSignalEventNestedInput = {
    create?: XOR<UserAlertLogCreateWithoutSignalEventInput, UserAlertLogUncheckedCreateWithoutSignalEventInput> | UserAlertLogCreateWithoutSignalEventInput[] | UserAlertLogUncheckedCreateWithoutSignalEventInput[]
    connectOrCreate?: UserAlertLogCreateOrConnectWithoutSignalEventInput | UserAlertLogCreateOrConnectWithoutSignalEventInput[]
    upsert?: UserAlertLogUpsertWithWhereUniqueWithoutSignalEventInput | UserAlertLogUpsertWithWhereUniqueWithoutSignalEventInput[]
    createMany?: UserAlertLogCreateManySignalEventInputEnvelope
    set?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    disconnect?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    delete?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    connect?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    update?: UserAlertLogUpdateWithWhereUniqueWithoutSignalEventInput | UserAlertLogUpdateWithWhereUniqueWithoutSignalEventInput[]
    updateMany?: UserAlertLogUpdateManyWithWhereWithoutSignalEventInput | UserAlertLogUpdateManyWithWhereWithoutSignalEventInput[]
    deleteMany?: UserAlertLogScalarWhereInput | UserAlertLogScalarWhereInput[]
  }

  export type SignalScoreUncheckedUpdateManyWithoutSignalEventNestedInput = {
    create?: XOR<SignalScoreCreateWithoutSignalEventInput, SignalScoreUncheckedCreateWithoutSignalEventInput> | SignalScoreCreateWithoutSignalEventInput[] | SignalScoreUncheckedCreateWithoutSignalEventInput[]
    connectOrCreate?: SignalScoreCreateOrConnectWithoutSignalEventInput | SignalScoreCreateOrConnectWithoutSignalEventInput[]
    upsert?: SignalScoreUpsertWithWhereUniqueWithoutSignalEventInput | SignalScoreUpsertWithWhereUniqueWithoutSignalEventInput[]
    createMany?: SignalScoreCreateManySignalEventInputEnvelope
    set?: SignalScoreWhereUniqueInput | SignalScoreWhereUniqueInput[]
    disconnect?: SignalScoreWhereUniqueInput | SignalScoreWhereUniqueInput[]
    delete?: SignalScoreWhereUniqueInput | SignalScoreWhereUniqueInput[]
    connect?: SignalScoreWhereUniqueInput | SignalScoreWhereUniqueInput[]
    update?: SignalScoreUpdateWithWhereUniqueWithoutSignalEventInput | SignalScoreUpdateWithWhereUniqueWithoutSignalEventInput[]
    updateMany?: SignalScoreUpdateManyWithWhereWithoutSignalEventInput | SignalScoreUpdateManyWithWhereWithoutSignalEventInput[]
    deleteMany?: SignalScoreScalarWhereInput | SignalScoreScalarWhereInput[]
  }

  export type UserAlertLogUncheckedUpdateManyWithoutSignalEventNestedInput = {
    create?: XOR<UserAlertLogCreateWithoutSignalEventInput, UserAlertLogUncheckedCreateWithoutSignalEventInput> | UserAlertLogCreateWithoutSignalEventInput[] | UserAlertLogUncheckedCreateWithoutSignalEventInput[]
    connectOrCreate?: UserAlertLogCreateOrConnectWithoutSignalEventInput | UserAlertLogCreateOrConnectWithoutSignalEventInput[]
    upsert?: UserAlertLogUpsertWithWhereUniqueWithoutSignalEventInput | UserAlertLogUpsertWithWhereUniqueWithoutSignalEventInput[]
    createMany?: UserAlertLogCreateManySignalEventInputEnvelope
    set?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    disconnect?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    delete?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    connect?: UserAlertLogWhereUniqueInput | UserAlertLogWhereUniqueInput[]
    update?: UserAlertLogUpdateWithWhereUniqueWithoutSignalEventInput | UserAlertLogUpdateWithWhereUniqueWithoutSignalEventInput[]
    updateMany?: UserAlertLogUpdateManyWithWhereWithoutSignalEventInput | UserAlertLogUpdateManyWithWhereWithoutSignalEventInput[]
    deleteMany?: UserAlertLogScalarWhereInput | UserAlertLogScalarWhereInput[]
  }

  export type SignalEventCreateNestedOneWithoutScoresInput = {
    create?: XOR<SignalEventCreateWithoutScoresInput, SignalEventUncheckedCreateWithoutScoresInput>
    connectOrCreate?: SignalEventCreateOrConnectWithoutScoresInput
    connect?: SignalEventWhereUniqueInput
  }

  export type SignalEventUpdateOneRequiredWithoutScoresNestedInput = {
    create?: XOR<SignalEventCreateWithoutScoresInput, SignalEventUncheckedCreateWithoutScoresInput>
    connectOrCreate?: SignalEventCreateOrConnectWithoutScoresInput
    upsert?: SignalEventUpsertWithoutScoresInput
    connect?: SignalEventWhereUniqueInput
    update?: XOR<XOR<SignalEventUpdateToOneWithWhereWithoutScoresInput, SignalEventUpdateWithoutScoresInput>, SignalEventUncheckedUpdateWithoutScoresInput>
  }

  export type TokenCreateNestedOneWithoutReportsInput = {
    create?: XOR<TokenCreateWithoutReportsInput, TokenUncheckedCreateWithoutReportsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutReportsInput
    connect?: TokenWhereUniqueInput
  }

  export type TokenUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<TokenCreateWithoutReportsInput, TokenUncheckedCreateWithoutReportsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutReportsInput
    upsert?: TokenUpsertWithoutReportsInput
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutReportsInput, TokenUpdateWithoutReportsInput>, TokenUncheckedUpdateWithoutReportsInput>
  }

  export type TokenCreateNestedOneWithoutMentionsInput = {
    create?: XOR<TokenCreateWithoutMentionsInput, TokenUncheckedCreateWithoutMentionsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutMentionsInput
    connect?: TokenWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TokenUpdateOneRequiredWithoutMentionsNestedInput = {
    create?: XOR<TokenCreateWithoutMentionsInput, TokenUncheckedCreateWithoutMentionsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutMentionsInput
    upsert?: TokenUpsertWithoutMentionsInput
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutMentionsInput, TokenUpdateWithoutMentionsInput>, TokenUncheckedUpdateWithoutMentionsInput>
  }

  export type UserCreateNestedOneWithoutAlertsInput = {
    create?: XOR<UserCreateWithoutAlertsInput, UserUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlertsInput
    connect?: UserWhereUniqueInput
  }

  export type SignalEventCreateNestedOneWithoutAlertsInput = {
    create?: XOR<SignalEventCreateWithoutAlertsInput, SignalEventUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: SignalEventCreateOrConnectWithoutAlertsInput
    connect?: SignalEventWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAlertsNestedInput = {
    create?: XOR<UserCreateWithoutAlertsInput, UserUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlertsInput
    upsert?: UserUpsertWithoutAlertsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAlertsInput, UserUpdateWithoutAlertsInput>, UserUncheckedUpdateWithoutAlertsInput>
  }

  export type SignalEventUpdateOneRequiredWithoutAlertsNestedInput = {
    create?: XOR<SignalEventCreateWithoutAlertsInput, SignalEventUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: SignalEventCreateOrConnectWithoutAlertsInput
    upsert?: SignalEventUpsertWithoutAlertsInput
    connect?: SignalEventWhereUniqueInput
    update?: XOR<XOR<SignalEventUpdateToOneWithWhereWithoutAlertsInput, SignalEventUpdateWithoutAlertsInput>, SignalEventUncheckedUpdateWithoutAlertsInput>
  }

  export type ApiKeyCreatescopesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutApiKeysInput = {
    create?: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: UserCreateOrConnectWithoutApiKeysInput
    connect?: UserWhereUniqueInput
  }

  export type ApiKeyUpdatescopesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutApiKeysNestedInput = {
    create?: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: UserCreateOrConnectWithoutApiKeysInput
    upsert?: UserUpsertWithoutApiKeysInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApiKeysInput, UserUpdateWithoutApiKeysInput>, UserUncheckedUpdateWithoutApiKeysInput>
  }

  export type TokenUpdateOneWithoutVectorsNestedInput = {
    create?: XOR<TokenCreateWithoutVectorsInput, TokenUncheckedCreateWithoutVectorsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutVectorsInput
    upsert?: TokenUpsertWithoutVectorsInput
    disconnect?: TokenWhereInput | boolean
    delete?: TokenWhereInput | boolean
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutVectorsInput, TokenUpdateWithoutVectorsInput>, TokenUncheckedUpdateWithoutVectorsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type WatchlistItemCreateWithoutUserInput = {
    id?: string
    alertPrefs: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    token: TokenCreateNestedOneWithoutWatchlistInput
  }

  export type WatchlistItemUncheckedCreateWithoutUserInput = {
    id?: string
    tokenId: string
    alertPrefs: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WatchlistItemCreateOrConnectWithoutUserInput = {
    where: WatchlistItemWhereUniqueInput
    create: XOR<WatchlistItemCreateWithoutUserInput, WatchlistItemUncheckedCreateWithoutUserInput>
  }

  export type WatchlistItemCreateManyUserInputEnvelope = {
    data: WatchlistItemCreateManyUserInput | WatchlistItemCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ApiKeyCreateWithoutUserInput = {
    id?: string
    label: string
    hashedKey: string
    scopes?: ApiKeyCreatescopesInput | string[]
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type ApiKeyUncheckedCreateWithoutUserInput = {
    id?: string
    label: string
    hashedKey: string
    scopes?: ApiKeyCreatescopesInput | string[]
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type ApiKeyCreateOrConnectWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    create: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput>
  }

  export type ApiKeyCreateManyUserInputEnvelope = {
    data: ApiKeyCreateManyUserInput | ApiKeyCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserAlertLogCreateWithoutUserInput = {
    id?: string
    channel: string
    deliveredAt?: Date | string
    status: string
    failReason?: string | null
    signalEvent: SignalEventCreateNestedOneWithoutAlertsInput
  }

  export type UserAlertLogUncheckedCreateWithoutUserInput = {
    id?: string
    signalEventId: string
    channel: string
    deliveredAt?: Date | string
    status: string
    failReason?: string | null
  }

  export type UserAlertLogCreateOrConnectWithoutUserInput = {
    where: UserAlertLogWhereUniqueInput
    create: XOR<UserAlertLogCreateWithoutUserInput, UserAlertLogUncheckedCreateWithoutUserInput>
  }

  export type UserAlertLogCreateManyUserInputEnvelope = {
    data: UserAlertLogCreateManyUserInput | UserAlertLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuthLinkCreateWithoutUserInput = {
    id?: string
    nonce: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AuthLinkUncheckedCreateWithoutUserInput = {
    id?: string
    nonce: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AuthLinkCreateOrConnectWithoutUserInput = {
    where: AuthLinkWhereUniqueInput
    create: XOR<AuthLinkCreateWithoutUserInput, AuthLinkUncheckedCreateWithoutUserInput>
  }

  export type AuthLinkCreateManyUserInputEnvelope = {
    data: AuthLinkCreateManyUserInput | AuthLinkCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WatchlistItemUpsertWithWhereUniqueWithoutUserInput = {
    where: WatchlistItemWhereUniqueInput
    update: XOR<WatchlistItemUpdateWithoutUserInput, WatchlistItemUncheckedUpdateWithoutUserInput>
    create: XOR<WatchlistItemCreateWithoutUserInput, WatchlistItemUncheckedCreateWithoutUserInput>
  }

  export type WatchlistItemUpdateWithWhereUniqueWithoutUserInput = {
    where: WatchlistItemWhereUniqueInput
    data: XOR<WatchlistItemUpdateWithoutUserInput, WatchlistItemUncheckedUpdateWithoutUserInput>
  }

  export type WatchlistItemUpdateManyWithWhereWithoutUserInput = {
    where: WatchlistItemScalarWhereInput
    data: XOR<WatchlistItemUpdateManyMutationInput, WatchlistItemUncheckedUpdateManyWithoutUserInput>
  }

  export type WatchlistItemScalarWhereInput = {
    AND?: WatchlistItemScalarWhereInput | WatchlistItemScalarWhereInput[]
    OR?: WatchlistItemScalarWhereInput[]
    NOT?: WatchlistItemScalarWhereInput | WatchlistItemScalarWhereInput[]
    id?: StringFilter<"WatchlistItem"> | string
    userId?: StringFilter<"WatchlistItem"> | string
    tokenId?: StringFilter<"WatchlistItem"> | string
    alertPrefs?: JsonFilter<"WatchlistItem">
    createdAt?: DateTimeFilter<"WatchlistItem"> | Date | string
  }

  export type ApiKeyUpsertWithWhereUniqueWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    update: XOR<ApiKeyUpdateWithoutUserInput, ApiKeyUncheckedUpdateWithoutUserInput>
    create: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput>
  }

  export type ApiKeyUpdateWithWhereUniqueWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    data: XOR<ApiKeyUpdateWithoutUserInput, ApiKeyUncheckedUpdateWithoutUserInput>
  }

  export type ApiKeyUpdateManyWithWhereWithoutUserInput = {
    where: ApiKeyScalarWhereInput
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyWithoutUserInput>
  }

  export type ApiKeyScalarWhereInput = {
    AND?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    OR?: ApiKeyScalarWhereInput[]
    NOT?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    userId?: StringFilter<"ApiKey"> | string
    label?: StringFilter<"ApiKey"> | string
    hashedKey?: StringFilter<"ApiKey"> | string
    scopes?: StringNullableListFilter<"ApiKey">
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    revokedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
  }

  export type UserAlertLogUpsertWithWhereUniqueWithoutUserInput = {
    where: UserAlertLogWhereUniqueInput
    update: XOR<UserAlertLogUpdateWithoutUserInput, UserAlertLogUncheckedUpdateWithoutUserInput>
    create: XOR<UserAlertLogCreateWithoutUserInput, UserAlertLogUncheckedCreateWithoutUserInput>
  }

  export type UserAlertLogUpdateWithWhereUniqueWithoutUserInput = {
    where: UserAlertLogWhereUniqueInput
    data: XOR<UserAlertLogUpdateWithoutUserInput, UserAlertLogUncheckedUpdateWithoutUserInput>
  }

  export type UserAlertLogUpdateManyWithWhereWithoutUserInput = {
    where: UserAlertLogScalarWhereInput
    data: XOR<UserAlertLogUpdateManyMutationInput, UserAlertLogUncheckedUpdateManyWithoutUserInput>
  }

  export type UserAlertLogScalarWhereInput = {
    AND?: UserAlertLogScalarWhereInput | UserAlertLogScalarWhereInput[]
    OR?: UserAlertLogScalarWhereInput[]
    NOT?: UserAlertLogScalarWhereInput | UserAlertLogScalarWhereInput[]
    id?: StringFilter<"UserAlertLog"> | string
    userId?: StringFilter<"UserAlertLog"> | string
    signalEventId?: StringFilter<"UserAlertLog"> | string
    channel?: StringFilter<"UserAlertLog"> | string
    deliveredAt?: DateTimeFilter<"UserAlertLog"> | Date | string
    status?: StringFilter<"UserAlertLog"> | string
    failReason?: StringNullableFilter<"UserAlertLog"> | string | null
  }

  export type AuthLinkUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthLinkWhereUniqueInput
    update: XOR<AuthLinkUpdateWithoutUserInput, AuthLinkUncheckedUpdateWithoutUserInput>
    create: XOR<AuthLinkCreateWithoutUserInput, AuthLinkUncheckedCreateWithoutUserInput>
  }

  export type AuthLinkUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthLinkWhereUniqueInput
    data: XOR<AuthLinkUpdateWithoutUserInput, AuthLinkUncheckedUpdateWithoutUserInput>
  }

  export type AuthLinkUpdateManyWithWhereWithoutUserInput = {
    where: AuthLinkScalarWhereInput
    data: XOR<AuthLinkUpdateManyMutationInput, AuthLinkUncheckedUpdateManyWithoutUserInput>
  }

  export type AuthLinkScalarWhereInput = {
    AND?: AuthLinkScalarWhereInput | AuthLinkScalarWhereInput[]
    OR?: AuthLinkScalarWhereInput[]
    NOT?: AuthLinkScalarWhereInput | AuthLinkScalarWhereInput[]
    id?: StringFilter<"AuthLink"> | string
    userId?: StringFilter<"AuthLink"> | string
    nonce?: StringFilter<"AuthLink"> | string
    expiresAt?: DateTimeFilter<"AuthLink"> | Date | string
    usedAt?: DateTimeNullableFilter<"AuthLink"> | Date | string | null
    createdAt?: DateTimeFilter<"AuthLink"> | Date | string
  }

  export type UserCreateWithoutAuthLinksInput = {
    id?: string
    telegramUserId: string
    handle?: string | null
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    watchlist?: WatchlistItemCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
    alerts?: UserAlertLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuthLinksInput = {
    id?: string
    telegramUserId: string
    handle?: string | null
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    watchlist?: WatchlistItemUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
    alerts?: UserAlertLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuthLinksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthLinksInput, UserUncheckedCreateWithoutAuthLinksInput>
  }

  export type UserUpsertWithoutAuthLinksInput = {
    update: XOR<UserUpdateWithoutAuthLinksInput, UserUncheckedUpdateWithoutAuthLinksInput>
    create: XOR<UserCreateWithoutAuthLinksInput, UserUncheckedCreateWithoutAuthLinksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthLinksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthLinksInput, UserUncheckedUpdateWithoutAuthLinksInput>
  }

  export type UserUpdateWithoutAuthLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramUserId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchlist?: WatchlistItemUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
    alerts?: UserAlertLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramUserId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchlist?: WatchlistItemUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
    alerts?: UserAlertLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PairCreateWithoutTokenInput = {
    id?: string
    dexId: string
    base: string
    quote: string
    liqUsd: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    vol5m: Decimal | DecimalJsLike | number | string
    vol1h: Decimal | DecimalJsLike | number | string
    vol24h: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type PairUncheckedCreateWithoutTokenInput = {
    id?: string
    dexId: string
    base: string
    quote: string
    liqUsd: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    vol5m: Decimal | DecimalJsLike | number | string
    vol1h: Decimal | DecimalJsLike | number | string
    vol24h: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type PairCreateOrConnectWithoutTokenInput = {
    where: PairWhereUniqueInput
    create: XOR<PairCreateWithoutTokenInput, PairUncheckedCreateWithoutTokenInput>
  }

  export type PairCreateManyTokenInputEnvelope = {
    data: PairCreateManyTokenInput | PairCreateManyTokenInput[]
    skipDuplicates?: boolean
  }

  export type AnalystReportCreateWithoutTokenInput = {
    id?: string
    signalEventId?: string | null
    summaryShort: string
    summaryLong: string
    riskSummary: string
    model?: string
    createdAt?: Date | string
  }

  export type AnalystReportUncheckedCreateWithoutTokenInput = {
    id?: string
    signalEventId?: string | null
    summaryShort: string
    summaryLong: string
    riskSummary: string
    model?: string
    createdAt?: Date | string
  }

  export type AnalystReportCreateOrConnectWithoutTokenInput = {
    where: AnalystReportWhereUniqueInput
    create: XOR<AnalystReportCreateWithoutTokenInput, AnalystReportUncheckedCreateWithoutTokenInput>
  }

  export type AnalystReportCreateManyTokenInputEnvelope = {
    data: AnalystReportCreateManyTokenInput | AnalystReportCreateManyTokenInput[]
    skipDuplicates?: boolean
  }

  export type SocialMentionCreateWithoutTokenInput = {
    id?: string
    tweetId: string
    author: string
    followers: number
    engagement: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SocialMentionUncheckedCreateWithoutTokenInput = {
    id?: string
    tweetId: string
    author: string
    followers: number
    engagement: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SocialMentionCreateOrConnectWithoutTokenInput = {
    where: SocialMentionWhereUniqueInput
    create: XOR<SocialMentionCreateWithoutTokenInput, SocialMentionUncheckedCreateWithoutTokenInput>
  }

  export type SocialMentionCreateManyTokenInputEnvelope = {
    data: SocialMentionCreateManyTokenInput | SocialMentionCreateManyTokenInput[]
    skipDuplicates?: boolean
  }

  export type WatchlistItemCreateWithoutTokenInput = {
    id?: string
    alertPrefs: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWatchlistInput
  }

  export type WatchlistItemUncheckedCreateWithoutTokenInput = {
    id?: string
    userId: string
    alertPrefs: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WatchlistItemCreateOrConnectWithoutTokenInput = {
    where: WatchlistItemWhereUniqueInput
    create: XOR<WatchlistItemCreateWithoutTokenInput, WatchlistItemUncheckedCreateWithoutTokenInput>
  }

  export type WatchlistItemCreateManyTokenInputEnvelope = {
    data: WatchlistItemCreateManyTokenInput | WatchlistItemCreateManyTokenInput[]
    skipDuplicates?: boolean
  }

  export type PairUpsertWithWhereUniqueWithoutTokenInput = {
    where: PairWhereUniqueInput
    update: XOR<PairUpdateWithoutTokenInput, PairUncheckedUpdateWithoutTokenInput>
    create: XOR<PairCreateWithoutTokenInput, PairUncheckedCreateWithoutTokenInput>
  }

  export type PairUpdateWithWhereUniqueWithoutTokenInput = {
    where: PairWhereUniqueInput
    data: XOR<PairUpdateWithoutTokenInput, PairUncheckedUpdateWithoutTokenInput>
  }

  export type PairUpdateManyWithWhereWithoutTokenInput = {
    where: PairScalarWhereInput
    data: XOR<PairUpdateManyMutationInput, PairUncheckedUpdateManyWithoutTokenInput>
  }

  export type PairScalarWhereInput = {
    AND?: PairScalarWhereInput | PairScalarWhereInput[]
    OR?: PairScalarWhereInput[]
    NOT?: PairScalarWhereInput | PairScalarWhereInput[]
    id?: StringFilter<"Pair"> | string
    tokenId?: StringFilter<"Pair"> | string
    dexId?: StringFilter<"Pair"> | string
    base?: StringFilter<"Pair"> | string
    quote?: StringFilter<"Pair"> | string
    liqUsd?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    price?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    vol5m?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    vol1h?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    vol24h?: DecimalFilter<"Pair"> | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFilter<"Pair"> | Date | string
  }

  export type AnalystReportUpsertWithWhereUniqueWithoutTokenInput = {
    where: AnalystReportWhereUniqueInput
    update: XOR<AnalystReportUpdateWithoutTokenInput, AnalystReportUncheckedUpdateWithoutTokenInput>
    create: XOR<AnalystReportCreateWithoutTokenInput, AnalystReportUncheckedCreateWithoutTokenInput>
  }

  export type AnalystReportUpdateWithWhereUniqueWithoutTokenInput = {
    where: AnalystReportWhereUniqueInput
    data: XOR<AnalystReportUpdateWithoutTokenInput, AnalystReportUncheckedUpdateWithoutTokenInput>
  }

  export type AnalystReportUpdateManyWithWhereWithoutTokenInput = {
    where: AnalystReportScalarWhereInput
    data: XOR<AnalystReportUpdateManyMutationInput, AnalystReportUncheckedUpdateManyWithoutTokenInput>
  }

  export type AnalystReportScalarWhereInput = {
    AND?: AnalystReportScalarWhereInput | AnalystReportScalarWhereInput[]
    OR?: AnalystReportScalarWhereInput[]
    NOT?: AnalystReportScalarWhereInput | AnalystReportScalarWhereInput[]
    id?: StringFilter<"AnalystReport"> | string
    tokenId?: StringFilter<"AnalystReport"> | string
    signalEventId?: StringNullableFilter<"AnalystReport"> | string | null
    summaryShort?: StringFilter<"AnalystReport"> | string
    summaryLong?: StringFilter<"AnalystReport"> | string
    riskSummary?: StringFilter<"AnalystReport"> | string
    model?: StringFilter<"AnalystReport"> | string
    createdAt?: DateTimeFilter<"AnalystReport"> | Date | string
  }

  export type VectorDocUpdateWithWhereUniqueWithoutTokenInput = {
    where: VectorDocWhereUniqueInput
    data: XOR<VectorDocUpdateWithoutTokenInput, VectorDocUncheckedUpdateWithoutTokenInput>
  }

  export type VectorDocUpdateManyWithWhereWithoutTokenInput = {
    where: VectorDocScalarWhereInput
    data: XOR<VectorDocUpdateManyMutationInput, VectorDocUncheckedUpdateManyWithoutTokenInput>
  }

  export type VectorDocScalarWhereInput = {
    AND?: VectorDocScalarWhereInput | VectorDocScalarWhereInput[]
    OR?: VectorDocScalarWhereInput[]
    NOT?: VectorDocScalarWhereInput | VectorDocScalarWhereInput[]
    id?: StringFilter<"VectorDoc"> | string
    tokenId?: StringNullableFilter<"VectorDoc"> | string | null
    kind?: StringFilter<"VectorDoc"> | string
    content?: StringFilter<"VectorDoc"> | string
  }

  export type SocialMentionUpsertWithWhereUniqueWithoutTokenInput = {
    where: SocialMentionWhereUniqueInput
    update: XOR<SocialMentionUpdateWithoutTokenInput, SocialMentionUncheckedUpdateWithoutTokenInput>
    create: XOR<SocialMentionCreateWithoutTokenInput, SocialMentionUncheckedCreateWithoutTokenInput>
  }

  export type SocialMentionUpdateWithWhereUniqueWithoutTokenInput = {
    where: SocialMentionWhereUniqueInput
    data: XOR<SocialMentionUpdateWithoutTokenInput, SocialMentionUncheckedUpdateWithoutTokenInput>
  }

  export type SocialMentionUpdateManyWithWhereWithoutTokenInput = {
    where: SocialMentionScalarWhereInput
    data: XOR<SocialMentionUpdateManyMutationInput, SocialMentionUncheckedUpdateManyWithoutTokenInput>
  }

  export type SocialMentionScalarWhereInput = {
    AND?: SocialMentionScalarWhereInput | SocialMentionScalarWhereInput[]
    OR?: SocialMentionScalarWhereInput[]
    NOT?: SocialMentionScalarWhereInput | SocialMentionScalarWhereInput[]
    id?: StringFilter<"SocialMention"> | string
    tokenId?: StringFilter<"SocialMention"> | string
    tweetId?: StringFilter<"SocialMention"> | string
    author?: StringFilter<"SocialMention"> | string
    followers?: IntFilter<"SocialMention"> | number
    engagement?: JsonFilter<"SocialMention">
    createdAt?: DateTimeFilter<"SocialMention"> | Date | string
  }

  export type WatchlistItemUpsertWithWhereUniqueWithoutTokenInput = {
    where: WatchlistItemWhereUniqueInput
    update: XOR<WatchlistItemUpdateWithoutTokenInput, WatchlistItemUncheckedUpdateWithoutTokenInput>
    create: XOR<WatchlistItemCreateWithoutTokenInput, WatchlistItemUncheckedCreateWithoutTokenInput>
  }

  export type WatchlistItemUpdateWithWhereUniqueWithoutTokenInput = {
    where: WatchlistItemWhereUniqueInput
    data: XOR<WatchlistItemUpdateWithoutTokenInput, WatchlistItemUncheckedUpdateWithoutTokenInput>
  }

  export type WatchlistItemUpdateManyWithWhereWithoutTokenInput = {
    where: WatchlistItemScalarWhereInput
    data: XOR<WatchlistItemUpdateManyMutationInput, WatchlistItemUncheckedUpdateManyWithoutTokenInput>
  }

  export type TokenCreateWithoutPairsInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
    reports?: AnalystReportCreateNestedManyWithoutTokenInput
    vectors?: VectorDocCreateNestedManyWithoutTokenInput
    mentions?: SocialMentionCreateNestedManyWithoutTokenInput
    watchlist?: WatchlistItemCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateWithoutPairsInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
    reports?: AnalystReportUncheckedCreateNestedManyWithoutTokenInput
    vectors?: VectorDocUncheckedCreateNestedManyWithoutTokenInput
    mentions?: SocialMentionUncheckedCreateNestedManyWithoutTokenInput
    watchlist?: WatchlistItemUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenCreateOrConnectWithoutPairsInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutPairsInput, TokenUncheckedCreateWithoutPairsInput>
  }

  export type TokenUpsertWithoutPairsInput = {
    update: XOR<TokenUpdateWithoutPairsInput, TokenUncheckedUpdateWithoutPairsInput>
    create: XOR<TokenCreateWithoutPairsInput, TokenUncheckedCreateWithoutPairsInput>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutPairsInput = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutPairsInput, TokenUncheckedUpdateWithoutPairsInput>
  }

  export type TokenUpdateWithoutPairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: AnalystReportUpdateManyWithoutTokenNestedInput
    vectors?: VectorDocUpdateManyWithoutTokenNestedInput
    mentions?: SocialMentionUpdateManyWithoutTokenNestedInput
    watchlist?: WatchlistItemUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutPairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: AnalystReportUncheckedUpdateManyWithoutTokenNestedInput
    vectors?: VectorDocUncheckedUpdateManyWithoutTokenNestedInput
    mentions?: SocialMentionUncheckedUpdateManyWithoutTokenNestedInput
    watchlist?: WatchlistItemUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type UserCreateWithoutWatchlistInput = {
    id?: string
    telegramUserId: string
    handle?: string | null
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
    alerts?: UserAlertLogCreateNestedManyWithoutUserInput
    authLinks?: AuthLinkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWatchlistInput = {
    id?: string
    telegramUserId: string
    handle?: string | null
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
    alerts?: UserAlertLogUncheckedCreateNestedManyWithoutUserInput
    authLinks?: AuthLinkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWatchlistInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWatchlistInput, UserUncheckedCreateWithoutWatchlistInput>
  }

  export type TokenCreateWithoutWatchlistInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
    pairs?: PairCreateNestedManyWithoutTokenInput
    reports?: AnalystReportCreateNestedManyWithoutTokenInput
    vectors?: VectorDocCreateNestedManyWithoutTokenInput
    mentions?: SocialMentionCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateWithoutWatchlistInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
    pairs?: PairUncheckedCreateNestedManyWithoutTokenInput
    reports?: AnalystReportUncheckedCreateNestedManyWithoutTokenInput
    vectors?: VectorDocUncheckedCreateNestedManyWithoutTokenInput
    mentions?: SocialMentionUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenCreateOrConnectWithoutWatchlistInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutWatchlistInput, TokenUncheckedCreateWithoutWatchlistInput>
  }

  export type UserUpsertWithoutWatchlistInput = {
    update: XOR<UserUpdateWithoutWatchlistInput, UserUncheckedUpdateWithoutWatchlistInput>
    create: XOR<UserCreateWithoutWatchlistInput, UserUncheckedCreateWithoutWatchlistInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWatchlistInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWatchlistInput, UserUncheckedUpdateWithoutWatchlistInput>
  }

  export type UserUpdateWithoutWatchlistInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramUserId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
    alerts?: UserAlertLogUpdateManyWithoutUserNestedInput
    authLinks?: AuthLinkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWatchlistInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramUserId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
    alerts?: UserAlertLogUncheckedUpdateManyWithoutUserNestedInput
    authLinks?: AuthLinkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TokenUpsertWithoutWatchlistInput = {
    update: XOR<TokenUpdateWithoutWatchlistInput, TokenUncheckedUpdateWithoutWatchlistInput>
    create: XOR<TokenCreateWithoutWatchlistInput, TokenUncheckedCreateWithoutWatchlistInput>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutWatchlistInput = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutWatchlistInput, TokenUncheckedUpdateWithoutWatchlistInput>
  }

  export type TokenUpdateWithoutWatchlistInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUpdateManyWithoutTokenNestedInput
    reports?: AnalystReportUpdateManyWithoutTokenNestedInput
    vectors?: VectorDocUpdateManyWithoutTokenNestedInput
    mentions?: SocialMentionUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutWatchlistInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUncheckedUpdateManyWithoutTokenNestedInput
    reports?: AnalystReportUncheckedUpdateManyWithoutTokenNestedInput
    vectors?: VectorDocUncheckedUpdateManyWithoutTokenNestedInput
    mentions?: SocialMentionUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type SignalScoreCreateWithoutSignalEventInput = {
    id?: string
    score: Decimal | DecimalJsLike | number | string
    label: string
    model?: string
    features: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SignalScoreUncheckedCreateWithoutSignalEventInput = {
    id?: string
    score: Decimal | DecimalJsLike | number | string
    label: string
    model?: string
    features: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SignalScoreCreateOrConnectWithoutSignalEventInput = {
    where: SignalScoreWhereUniqueInput
    create: XOR<SignalScoreCreateWithoutSignalEventInput, SignalScoreUncheckedCreateWithoutSignalEventInput>
  }

  export type SignalScoreCreateManySignalEventInputEnvelope = {
    data: SignalScoreCreateManySignalEventInput | SignalScoreCreateManySignalEventInput[]
    skipDuplicates?: boolean
  }

  export type UserAlertLogCreateWithoutSignalEventInput = {
    id?: string
    channel: string
    deliveredAt?: Date | string
    status: string
    failReason?: string | null
    user: UserCreateNestedOneWithoutAlertsInput
  }

  export type UserAlertLogUncheckedCreateWithoutSignalEventInput = {
    id?: string
    userId: string
    channel: string
    deliveredAt?: Date | string
    status: string
    failReason?: string | null
  }

  export type UserAlertLogCreateOrConnectWithoutSignalEventInput = {
    where: UserAlertLogWhereUniqueInput
    create: XOR<UserAlertLogCreateWithoutSignalEventInput, UserAlertLogUncheckedCreateWithoutSignalEventInput>
  }

  export type UserAlertLogCreateManySignalEventInputEnvelope = {
    data: UserAlertLogCreateManySignalEventInput | UserAlertLogCreateManySignalEventInput[]
    skipDuplicates?: boolean
  }

  export type SignalScoreUpsertWithWhereUniqueWithoutSignalEventInput = {
    where: SignalScoreWhereUniqueInput
    update: XOR<SignalScoreUpdateWithoutSignalEventInput, SignalScoreUncheckedUpdateWithoutSignalEventInput>
    create: XOR<SignalScoreCreateWithoutSignalEventInput, SignalScoreUncheckedCreateWithoutSignalEventInput>
  }

  export type SignalScoreUpdateWithWhereUniqueWithoutSignalEventInput = {
    where: SignalScoreWhereUniqueInput
    data: XOR<SignalScoreUpdateWithoutSignalEventInput, SignalScoreUncheckedUpdateWithoutSignalEventInput>
  }

  export type SignalScoreUpdateManyWithWhereWithoutSignalEventInput = {
    where: SignalScoreScalarWhereInput
    data: XOR<SignalScoreUpdateManyMutationInput, SignalScoreUncheckedUpdateManyWithoutSignalEventInput>
  }

  export type SignalScoreScalarWhereInput = {
    AND?: SignalScoreScalarWhereInput | SignalScoreScalarWhereInput[]
    OR?: SignalScoreScalarWhereInput[]
    NOT?: SignalScoreScalarWhereInput | SignalScoreScalarWhereInput[]
    id?: StringFilter<"SignalScore"> | string
    signalEventId?: StringFilter<"SignalScore"> | string
    score?: DecimalFilter<"SignalScore"> | Decimal | DecimalJsLike | number | string
    label?: StringFilter<"SignalScore"> | string
    model?: StringFilter<"SignalScore"> | string
    features?: JsonFilter<"SignalScore">
    createdAt?: DateTimeFilter<"SignalScore"> | Date | string
  }

  export type UserAlertLogUpsertWithWhereUniqueWithoutSignalEventInput = {
    where: UserAlertLogWhereUniqueInput
    update: XOR<UserAlertLogUpdateWithoutSignalEventInput, UserAlertLogUncheckedUpdateWithoutSignalEventInput>
    create: XOR<UserAlertLogCreateWithoutSignalEventInput, UserAlertLogUncheckedCreateWithoutSignalEventInput>
  }

  export type UserAlertLogUpdateWithWhereUniqueWithoutSignalEventInput = {
    where: UserAlertLogWhereUniqueInput
    data: XOR<UserAlertLogUpdateWithoutSignalEventInput, UserAlertLogUncheckedUpdateWithoutSignalEventInput>
  }

  export type UserAlertLogUpdateManyWithWhereWithoutSignalEventInput = {
    where: UserAlertLogScalarWhereInput
    data: XOR<UserAlertLogUpdateManyMutationInput, UserAlertLogUncheckedUpdateManyWithoutSignalEventInput>
  }

  export type SignalEventCreateWithoutScoresInput = {
    id?: string
    tokenId: string
    pairId?: string | null
    kind: string
    metrics: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    alerts?: UserAlertLogCreateNestedManyWithoutSignalEventInput
  }

  export type SignalEventUncheckedCreateWithoutScoresInput = {
    id?: string
    tokenId: string
    pairId?: string | null
    kind: string
    metrics: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    alerts?: UserAlertLogUncheckedCreateNestedManyWithoutSignalEventInput
  }

  export type SignalEventCreateOrConnectWithoutScoresInput = {
    where: SignalEventWhereUniqueInput
    create: XOR<SignalEventCreateWithoutScoresInput, SignalEventUncheckedCreateWithoutScoresInput>
  }

  export type SignalEventUpsertWithoutScoresInput = {
    update: XOR<SignalEventUpdateWithoutScoresInput, SignalEventUncheckedUpdateWithoutScoresInput>
    create: XOR<SignalEventCreateWithoutScoresInput, SignalEventUncheckedCreateWithoutScoresInput>
    where?: SignalEventWhereInput
  }

  export type SignalEventUpdateToOneWithWhereWithoutScoresInput = {
    where?: SignalEventWhereInput
    data: XOR<SignalEventUpdateWithoutScoresInput, SignalEventUncheckedUpdateWithoutScoresInput>
  }

  export type SignalEventUpdateWithoutScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    pairId?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alerts?: UserAlertLogUpdateManyWithoutSignalEventNestedInput
  }

  export type SignalEventUncheckedUpdateWithoutScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    pairId?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alerts?: UserAlertLogUncheckedUpdateManyWithoutSignalEventNestedInput
  }

  export type TokenCreateWithoutReportsInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
    pairs?: PairCreateNestedManyWithoutTokenInput
    vectors?: VectorDocCreateNestedManyWithoutTokenInput
    mentions?: SocialMentionCreateNestedManyWithoutTokenInput
    watchlist?: WatchlistItemCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateWithoutReportsInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
    pairs?: PairUncheckedCreateNestedManyWithoutTokenInput
    vectors?: VectorDocUncheckedCreateNestedManyWithoutTokenInput
    mentions?: SocialMentionUncheckedCreateNestedManyWithoutTokenInput
    watchlist?: WatchlistItemUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenCreateOrConnectWithoutReportsInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutReportsInput, TokenUncheckedCreateWithoutReportsInput>
  }

  export type TokenUpsertWithoutReportsInput = {
    update: XOR<TokenUpdateWithoutReportsInput, TokenUncheckedUpdateWithoutReportsInput>
    create: XOR<TokenCreateWithoutReportsInput, TokenUncheckedCreateWithoutReportsInput>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutReportsInput = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutReportsInput, TokenUncheckedUpdateWithoutReportsInput>
  }

  export type TokenUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUpdateManyWithoutTokenNestedInput
    vectors?: VectorDocUpdateManyWithoutTokenNestedInput
    mentions?: SocialMentionUpdateManyWithoutTokenNestedInput
    watchlist?: WatchlistItemUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUncheckedUpdateManyWithoutTokenNestedInput
    vectors?: VectorDocUncheckedUpdateManyWithoutTokenNestedInput
    mentions?: SocialMentionUncheckedUpdateManyWithoutTokenNestedInput
    watchlist?: WatchlistItemUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type TokenCreateWithoutMentionsInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
    pairs?: PairCreateNestedManyWithoutTokenInput
    reports?: AnalystReportCreateNestedManyWithoutTokenInput
    vectors?: VectorDocCreateNestedManyWithoutTokenInput
    watchlist?: WatchlistItemCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateWithoutMentionsInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
    pairs?: PairUncheckedCreateNestedManyWithoutTokenInput
    reports?: AnalystReportUncheckedCreateNestedManyWithoutTokenInput
    vectors?: VectorDocUncheckedCreateNestedManyWithoutTokenInput
    watchlist?: WatchlistItemUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenCreateOrConnectWithoutMentionsInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutMentionsInput, TokenUncheckedCreateWithoutMentionsInput>
  }

  export type TokenUpsertWithoutMentionsInput = {
    update: XOR<TokenUpdateWithoutMentionsInput, TokenUncheckedUpdateWithoutMentionsInput>
    create: XOR<TokenCreateWithoutMentionsInput, TokenUncheckedCreateWithoutMentionsInput>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutMentionsInput = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutMentionsInput, TokenUncheckedUpdateWithoutMentionsInput>
  }

  export type TokenUpdateWithoutMentionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUpdateManyWithoutTokenNestedInput
    reports?: AnalystReportUpdateManyWithoutTokenNestedInput
    vectors?: VectorDocUpdateManyWithoutTokenNestedInput
    watchlist?: WatchlistItemUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutMentionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUncheckedUpdateManyWithoutTokenNestedInput
    reports?: AnalystReportUncheckedUpdateManyWithoutTokenNestedInput
    vectors?: VectorDocUncheckedUpdateManyWithoutTokenNestedInput
    watchlist?: WatchlistItemUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type UserCreateWithoutAlertsInput = {
    id?: string
    telegramUserId: string
    handle?: string | null
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    watchlist?: WatchlistItemCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
    authLinks?: AuthLinkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAlertsInput = {
    id?: string
    telegramUserId: string
    handle?: string | null
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    watchlist?: WatchlistItemUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
    authLinks?: AuthLinkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAlertsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAlertsInput, UserUncheckedCreateWithoutAlertsInput>
  }

  export type SignalEventCreateWithoutAlertsInput = {
    id?: string
    tokenId: string
    pairId?: string | null
    kind: string
    metrics: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    scores?: SignalScoreCreateNestedManyWithoutSignalEventInput
  }

  export type SignalEventUncheckedCreateWithoutAlertsInput = {
    id?: string
    tokenId: string
    pairId?: string | null
    kind: string
    metrics: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    scores?: SignalScoreUncheckedCreateNestedManyWithoutSignalEventInput
  }

  export type SignalEventCreateOrConnectWithoutAlertsInput = {
    where: SignalEventWhereUniqueInput
    create: XOR<SignalEventCreateWithoutAlertsInput, SignalEventUncheckedCreateWithoutAlertsInput>
  }

  export type UserUpsertWithoutAlertsInput = {
    update: XOR<UserUpdateWithoutAlertsInput, UserUncheckedUpdateWithoutAlertsInput>
    create: XOR<UserCreateWithoutAlertsInput, UserUncheckedCreateWithoutAlertsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAlertsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAlertsInput, UserUncheckedUpdateWithoutAlertsInput>
  }

  export type UserUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramUserId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchlist?: WatchlistItemUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
    authLinks?: AuthLinkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramUserId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchlist?: WatchlistItemUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
    authLinks?: AuthLinkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SignalEventUpsertWithoutAlertsInput = {
    update: XOR<SignalEventUpdateWithoutAlertsInput, SignalEventUncheckedUpdateWithoutAlertsInput>
    create: XOR<SignalEventCreateWithoutAlertsInput, SignalEventUncheckedCreateWithoutAlertsInput>
    where?: SignalEventWhereInput
  }

  export type SignalEventUpdateToOneWithWhereWithoutAlertsInput = {
    where?: SignalEventWhereInput
    data: XOR<SignalEventUpdateWithoutAlertsInput, SignalEventUncheckedUpdateWithoutAlertsInput>
  }

  export type SignalEventUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    pairId?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scores?: SignalScoreUpdateManyWithoutSignalEventNestedInput
  }

  export type SignalEventUncheckedUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    pairId?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scores?: SignalScoreUncheckedUpdateManyWithoutSignalEventNestedInput
  }

  export type UserCreateWithoutApiKeysInput = {
    id?: string
    telegramUserId: string
    handle?: string | null
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    watchlist?: WatchlistItemCreateNestedManyWithoutUserInput
    alerts?: UserAlertLogCreateNestedManyWithoutUserInput
    authLinks?: AuthLinkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApiKeysInput = {
    id?: string
    telegramUserId: string
    handle?: string | null
    role?: $Enums.Role
    status?: $Enums.UserStatus
    createdAt?: Date | string
    watchlist?: WatchlistItemUncheckedCreateNestedManyWithoutUserInput
    alerts?: UserAlertLogUncheckedCreateNestedManyWithoutUserInput
    authLinks?: AuthLinkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApiKeysInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
  }

  export type UserUpsertWithoutApiKeysInput = {
    update: XOR<UserUpdateWithoutApiKeysInput, UserUncheckedUpdateWithoutApiKeysInput>
    create: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApiKeysInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApiKeysInput, UserUncheckedUpdateWithoutApiKeysInput>
  }

  export type UserUpdateWithoutApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramUserId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchlist?: WatchlistItemUpdateManyWithoutUserNestedInput
    alerts?: UserAlertLogUpdateManyWithoutUserNestedInput
    authLinks?: AuthLinkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramUserId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchlist?: WatchlistItemUncheckedUpdateManyWithoutUserNestedInput
    alerts?: UserAlertLogUncheckedUpdateManyWithoutUserNestedInput
    authLinks?: AuthLinkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TokenCreateWithoutVectorsInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
    pairs?: PairCreateNestedManyWithoutTokenInput
    reports?: AnalystReportCreateNestedManyWithoutTokenInput
    mentions?: SocialMentionCreateNestedManyWithoutTokenInput
    watchlist?: WatchlistItemCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateWithoutVectorsInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    discoveredAt?: Date | string
    lastSeenAt?: Date | string
    pairs?: PairUncheckedCreateNestedManyWithoutTokenInput
    reports?: AnalystReportUncheckedCreateNestedManyWithoutTokenInput
    mentions?: SocialMentionUncheckedCreateNestedManyWithoutTokenInput
    watchlist?: WatchlistItemUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenCreateOrConnectWithoutVectorsInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutVectorsInput, TokenUncheckedCreateWithoutVectorsInput>
  }

  export type TokenUpsertWithoutVectorsInput = {
    update: XOR<TokenUpdateWithoutVectorsInput, TokenUncheckedUpdateWithoutVectorsInput>
    create: XOR<TokenCreateWithoutVectorsInput, TokenUncheckedCreateWithoutVectorsInput>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutVectorsInput = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutVectorsInput, TokenUncheckedUpdateWithoutVectorsInput>
  }

  export type TokenUpdateWithoutVectorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUpdateManyWithoutTokenNestedInput
    reports?: AnalystReportUpdateManyWithoutTokenNestedInput
    mentions?: SocialMentionUpdateManyWithoutTokenNestedInput
    watchlist?: WatchlistItemUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutVectorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    discoveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUncheckedUpdateManyWithoutTokenNestedInput
    reports?: AnalystReportUncheckedUpdateManyWithoutTokenNestedInput
    mentions?: SocialMentionUncheckedUpdateManyWithoutTokenNestedInput
    watchlist?: WatchlistItemUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type WatchlistItemCreateManyUserInput = {
    id?: string
    tokenId: string
    alertPrefs: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ApiKeyCreateManyUserInput = {
    id?: string
    label: string
    hashedKey: string
    scopes?: ApiKeyCreatescopesInput | string[]
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type UserAlertLogCreateManyUserInput = {
    id?: string
    signalEventId: string
    channel: string
    deliveredAt?: Date | string
    status: string
    failReason?: string | null
  }

  export type AuthLinkCreateManyUserInput = {
    id?: string
    nonce: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type WatchlistItemUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    alertPrefs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateOneRequiredWithoutWatchlistNestedInput
  }

  export type WatchlistItemUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    alertPrefs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistItemUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    alertPrefs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    hashedKey?: StringFieldUpdateOperationsInput | string
    scopes?: ApiKeyUpdatescopesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiKeyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    hashedKey?: StringFieldUpdateOperationsInput | string
    scopes?: ApiKeyUpdatescopesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApiKeyUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    hashedKey?: StringFieldUpdateOperationsInput | string
    scopes?: ApiKeyUpdatescopesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserAlertLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    signalEvent?: SignalEventUpdateOneRequiredWithoutAlertsNestedInput
  }

  export type UserAlertLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalEventId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserAlertLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalEventId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthLinkUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthLinkUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthLinkUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairCreateManyTokenInput = {
    id?: string
    dexId: string
    base: string
    quote: string
    liqUsd: Decimal | DecimalJsLike | number | string
    price: Decimal | DecimalJsLike | number | string
    vol5m: Decimal | DecimalJsLike | number | string
    vol1h: Decimal | DecimalJsLike | number | string
    vol24h: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type AnalystReportCreateManyTokenInput = {
    id?: string
    signalEventId?: string | null
    summaryShort: string
    summaryLong: string
    riskSummary: string
    model?: string
    createdAt?: Date | string
  }

  export type SocialMentionCreateManyTokenInput = {
    id?: string
    tweetId: string
    author: string
    followers: number
    engagement: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type WatchlistItemCreateManyTokenInput = {
    id?: string
    userId: string
    alertPrefs: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PairUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    dexId?: StringFieldUpdateOperationsInput | string
    base?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    liqUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol5m?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol1h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairUncheckedUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    dexId?: StringFieldUpdateOperationsInput | string
    base?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    liqUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol5m?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol1h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairUncheckedUpdateManyWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    dexId?: StringFieldUpdateOperationsInput | string
    base?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    liqUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol5m?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol1h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vol24h?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalystReportUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalEventId?: NullableStringFieldUpdateOperationsInput | string | null
    summaryShort?: StringFieldUpdateOperationsInput | string
    summaryLong?: StringFieldUpdateOperationsInput | string
    riskSummary?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalystReportUncheckedUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalEventId?: NullableStringFieldUpdateOperationsInput | string | null
    summaryShort?: StringFieldUpdateOperationsInput | string
    summaryLong?: StringFieldUpdateOperationsInput | string
    riskSummary?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalystReportUncheckedUpdateManyWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalEventId?: NullableStringFieldUpdateOperationsInput | string | null
    summaryShort?: StringFieldUpdateOperationsInput | string
    summaryLong?: StringFieldUpdateOperationsInput | string
    riskSummary?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VectorDocUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type VectorDocUncheckedUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type VectorDocUncheckedUpdateManyWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type SocialMentionUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    tweetId?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    engagement?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialMentionUncheckedUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    tweetId?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    engagement?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialMentionUncheckedUpdateManyWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    tweetId?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    followers?: IntFieldUpdateOperationsInput | number
    engagement?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistItemUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    alertPrefs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchlistNestedInput
  }

  export type WatchlistItemUncheckedUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    alertPrefs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistItemUncheckedUpdateManyWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    alertPrefs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalScoreCreateManySignalEventInput = {
    id?: string
    score: Decimal | DecimalJsLike | number | string
    label: string
    model?: string
    features: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type UserAlertLogCreateManySignalEventInput = {
    id?: string
    userId: string
    channel: string
    deliveredAt?: Date | string
    status: string
    failReason?: string | null
  }

  export type SignalScoreUpdateWithoutSignalEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    label?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    features?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalScoreUncheckedUpdateWithoutSignalEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    label?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    features?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalScoreUncheckedUpdateManyWithoutSignalEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    label?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    features?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAlertLogUpdateWithoutSignalEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAlertsNestedInput
  }

  export type UserAlertLogUncheckedUpdateWithoutSignalEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserAlertLogUncheckedUpdateManyWithoutSignalEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    deliveredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    failReason?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TokenCountOutputTypeDefaultArgs instead
     */
    export type TokenCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TokenCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SignalEventCountOutputTypeDefaultArgs instead
     */
    export type SignalEventCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SignalEventCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuthLinkDefaultArgs instead
     */
    export type AuthLinkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuthLinkDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TokenDefaultArgs instead
     */
    export type TokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TokenDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PairDefaultArgs instead
     */
    export type PairArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PairDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WatchlistItemDefaultArgs instead
     */
    export type WatchlistItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WatchlistItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SignalEventDefaultArgs instead
     */
    export type SignalEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SignalEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SignalScoreDefaultArgs instead
     */
    export type SignalScoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SignalScoreDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AnalystReportDefaultArgs instead
     */
    export type AnalystReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AnalystReportDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SocialMentionDefaultArgs instead
     */
    export type SocialMentionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SocialMentionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserAlertLogDefaultArgs instead
     */
    export type UserAlertLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserAlertLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ApiKeyDefaultArgs instead
     */
    export type ApiKeyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ApiKeyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobCursorDefaultArgs instead
     */
    export type JobCursorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobCursorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VectorDocDefaultArgs instead
     */
    export type VectorDocArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VectorDocDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}