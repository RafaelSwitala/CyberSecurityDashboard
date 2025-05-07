
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
 * Model UserAuthentication
 * 
 */
export type UserAuthentication = $Result.DefaultSelection<Prisma.$UserAuthenticationPayload>
/**
 * Model LogData
 * 
 */
export type LogData = $Result.DefaultSelection<Prisma.$LogDataPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  ANALYST: 'ANALYST'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserAuthentications
 * const userAuthentications = await prisma.userAuthentication.findMany()
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
   * // Fetch zero or more UserAuthentications
   * const userAuthentications = await prisma.userAuthentication.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.userAuthentication`: Exposes CRUD operations for the **UserAuthentication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAuthentications
    * const userAuthentications = await prisma.userAuthentication.findMany()
    * ```
    */
  get userAuthentication(): Prisma.UserAuthenticationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.logData`: Exposes CRUD operations for the **LogData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LogData
    * const logData = await prisma.logData.findMany()
    * ```
    */
  get logData(): Prisma.LogDataDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    UserAuthentication: 'UserAuthentication',
    LogData: 'LogData'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "userAuthentication" | "logData"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      UserAuthentication: {
        payload: Prisma.$UserAuthenticationPayload<ExtArgs>
        fields: Prisma.UserAuthenticationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAuthenticationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAuthenticationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAuthenticationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAuthenticationPayload>
          }
          findFirst: {
            args: Prisma.UserAuthenticationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAuthenticationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAuthenticationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAuthenticationPayload>
          }
          findMany: {
            args: Prisma.UserAuthenticationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAuthenticationPayload>[]
          }
          create: {
            args: Prisma.UserAuthenticationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAuthenticationPayload>
          }
          createMany: {
            args: Prisma.UserAuthenticationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserAuthenticationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAuthenticationPayload>[]
          }
          delete: {
            args: Prisma.UserAuthenticationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAuthenticationPayload>
          }
          update: {
            args: Prisma.UserAuthenticationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAuthenticationPayload>
          }
          deleteMany: {
            args: Prisma.UserAuthenticationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAuthenticationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserAuthenticationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAuthenticationPayload>[]
          }
          upsert: {
            args: Prisma.UserAuthenticationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAuthenticationPayload>
          }
          aggregate: {
            args: Prisma.UserAuthenticationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAuthentication>
          }
          groupBy: {
            args: Prisma.UserAuthenticationGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAuthenticationGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAuthenticationCountArgs<ExtArgs>
            result: $Utils.Optional<UserAuthenticationCountAggregateOutputType> | number
          }
        }
      }
      LogData: {
        payload: Prisma.$LogDataPayload<ExtArgs>
        fields: Prisma.LogDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LogDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LogDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogDataPayload>
          }
          findFirst: {
            args: Prisma.LogDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LogDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogDataPayload>
          }
          findMany: {
            args: Prisma.LogDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogDataPayload>[]
          }
          create: {
            args: Prisma.LogDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogDataPayload>
          }
          createMany: {
            args: Prisma.LogDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LogDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogDataPayload>[]
          }
          delete: {
            args: Prisma.LogDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogDataPayload>
          }
          update: {
            args: Prisma.LogDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogDataPayload>
          }
          deleteMany: {
            args: Prisma.LogDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LogDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LogDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogDataPayload>[]
          }
          upsert: {
            args: Prisma.LogDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogDataPayload>
          }
          aggregate: {
            args: Prisma.LogDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLogData>
          }
          groupBy: {
            args: Prisma.LogDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<LogDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.LogDataCountArgs<ExtArgs>
            result: $Utils.Optional<LogDataCountAggregateOutputType> | number
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
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    userAuthentication?: UserAuthenticationOmit
    logData?: LogDataOmit
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
    | 'updateManyAndReturn'
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
   * Models
   */

  /**
   * Model UserAuthentication
   */

  export type AggregateUserAuthentication = {
    _count: UserAuthenticationCountAggregateOutputType | null
    _avg: UserAuthenticationAvgAggregateOutputType | null
    _sum: UserAuthenticationSumAggregateOutputType | null
    _min: UserAuthenticationMinAggregateOutputType | null
    _max: UserAuthenticationMaxAggregateOutputType | null
  }

  export type UserAuthenticationAvgAggregateOutputType = {
    id: number | null
  }

  export type UserAuthenticationSumAggregateOutputType = {
    id: number | null
  }

  export type UserAuthenticationMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
  }

  export type UserAuthenticationMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
  }

  export type UserAuthenticationCountAggregateOutputType = {
    id: number
    username: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserAuthenticationAvgAggregateInputType = {
    id?: true
  }

  export type UserAuthenticationSumAggregateInputType = {
    id?: true
  }

  export type UserAuthenticationMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserAuthenticationMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserAuthenticationCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAuthenticationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAuthentication to aggregate.
     */
    where?: UserAuthenticationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAuthentications to fetch.
     */
    orderBy?: UserAuthenticationOrderByWithRelationInput | UserAuthenticationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAuthenticationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAuthentications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAuthentications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAuthentications
    **/
    _count?: true | UserAuthenticationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAuthenticationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserAuthenticationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAuthenticationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAuthenticationMaxAggregateInputType
  }

  export type GetUserAuthenticationAggregateType<T extends UserAuthenticationAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAuthentication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAuthentication[P]>
      : GetScalarType<T[P], AggregateUserAuthentication[P]>
  }




  export type UserAuthenticationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAuthenticationWhereInput
    orderBy?: UserAuthenticationOrderByWithAggregationInput | UserAuthenticationOrderByWithAggregationInput[]
    by: UserAuthenticationScalarFieldEnum[] | UserAuthenticationScalarFieldEnum
    having?: UserAuthenticationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAuthenticationCountAggregateInputType | true
    _avg?: UserAuthenticationAvgAggregateInputType
    _sum?: UserAuthenticationSumAggregateInputType
    _min?: UserAuthenticationMinAggregateInputType
    _max?: UserAuthenticationMaxAggregateInputType
  }

  export type UserAuthenticationGroupByOutputType = {
    id: number
    username: string
    password: string
    role: $Enums.UserRole
    createdAt: Date
    _count: UserAuthenticationCountAggregateOutputType | null
    _avg: UserAuthenticationAvgAggregateOutputType | null
    _sum: UserAuthenticationSumAggregateOutputType | null
    _min: UserAuthenticationMinAggregateOutputType | null
    _max: UserAuthenticationMaxAggregateOutputType | null
  }

  type GetUserAuthenticationGroupByPayload<T extends UserAuthenticationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAuthenticationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAuthenticationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAuthenticationGroupByOutputType[P]>
            : GetScalarType<T[P], UserAuthenticationGroupByOutputType[P]>
        }
      >
    >


  export type UserAuthenticationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["userAuthentication"]>

  export type UserAuthenticationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["userAuthentication"]>

  export type UserAuthenticationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["userAuthentication"]>

  export type UserAuthenticationSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserAuthenticationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "role" | "createdAt", ExtArgs["result"]["userAuthentication"]>

  export type $UserAuthenticationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAuthentication"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
      role: $Enums.UserRole
      createdAt: Date
    }, ExtArgs["result"]["userAuthentication"]>
    composites: {}
  }

  type UserAuthenticationGetPayload<S extends boolean | null | undefined | UserAuthenticationDefaultArgs> = $Result.GetResult<Prisma.$UserAuthenticationPayload, S>

  type UserAuthenticationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserAuthenticationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserAuthenticationCountAggregateInputType | true
    }

  export interface UserAuthenticationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAuthentication'], meta: { name: 'UserAuthentication' } }
    /**
     * Find zero or one UserAuthentication that matches the filter.
     * @param {UserAuthenticationFindUniqueArgs} args - Arguments to find a UserAuthentication
     * @example
     * // Get one UserAuthentication
     * const userAuthentication = await prisma.userAuthentication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAuthenticationFindUniqueArgs>(args: SelectSubset<T, UserAuthenticationFindUniqueArgs<ExtArgs>>): Prisma__UserAuthenticationClient<$Result.GetResult<Prisma.$UserAuthenticationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserAuthentication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserAuthenticationFindUniqueOrThrowArgs} args - Arguments to find a UserAuthentication
     * @example
     * // Get one UserAuthentication
     * const userAuthentication = await prisma.userAuthentication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAuthenticationFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAuthenticationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAuthenticationClient<$Result.GetResult<Prisma.$UserAuthenticationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAuthentication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAuthenticationFindFirstArgs} args - Arguments to find a UserAuthentication
     * @example
     * // Get one UserAuthentication
     * const userAuthentication = await prisma.userAuthentication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAuthenticationFindFirstArgs>(args?: SelectSubset<T, UserAuthenticationFindFirstArgs<ExtArgs>>): Prisma__UserAuthenticationClient<$Result.GetResult<Prisma.$UserAuthenticationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAuthentication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAuthenticationFindFirstOrThrowArgs} args - Arguments to find a UserAuthentication
     * @example
     * // Get one UserAuthentication
     * const userAuthentication = await prisma.userAuthentication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAuthenticationFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAuthenticationFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAuthenticationClient<$Result.GetResult<Prisma.$UserAuthenticationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserAuthentications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAuthenticationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAuthentications
     * const userAuthentications = await prisma.userAuthentication.findMany()
     * 
     * // Get first 10 UserAuthentications
     * const userAuthentications = await prisma.userAuthentication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAuthenticationWithIdOnly = await prisma.userAuthentication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAuthenticationFindManyArgs>(args?: SelectSubset<T, UserAuthenticationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAuthenticationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserAuthentication.
     * @param {UserAuthenticationCreateArgs} args - Arguments to create a UserAuthentication.
     * @example
     * // Create one UserAuthentication
     * const UserAuthentication = await prisma.userAuthentication.create({
     *   data: {
     *     // ... data to create a UserAuthentication
     *   }
     * })
     * 
     */
    create<T extends UserAuthenticationCreateArgs>(args: SelectSubset<T, UserAuthenticationCreateArgs<ExtArgs>>): Prisma__UserAuthenticationClient<$Result.GetResult<Prisma.$UserAuthenticationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserAuthentications.
     * @param {UserAuthenticationCreateManyArgs} args - Arguments to create many UserAuthentications.
     * @example
     * // Create many UserAuthentications
     * const userAuthentication = await prisma.userAuthentication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAuthenticationCreateManyArgs>(args?: SelectSubset<T, UserAuthenticationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserAuthentications and returns the data saved in the database.
     * @param {UserAuthenticationCreateManyAndReturnArgs} args - Arguments to create many UserAuthentications.
     * @example
     * // Create many UserAuthentications
     * const userAuthentication = await prisma.userAuthentication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserAuthentications and only return the `id`
     * const userAuthenticationWithIdOnly = await prisma.userAuthentication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserAuthenticationCreateManyAndReturnArgs>(args?: SelectSubset<T, UserAuthenticationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAuthenticationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserAuthentication.
     * @param {UserAuthenticationDeleteArgs} args - Arguments to delete one UserAuthentication.
     * @example
     * // Delete one UserAuthentication
     * const UserAuthentication = await prisma.userAuthentication.delete({
     *   where: {
     *     // ... filter to delete one UserAuthentication
     *   }
     * })
     * 
     */
    delete<T extends UserAuthenticationDeleteArgs>(args: SelectSubset<T, UserAuthenticationDeleteArgs<ExtArgs>>): Prisma__UserAuthenticationClient<$Result.GetResult<Prisma.$UserAuthenticationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserAuthentication.
     * @param {UserAuthenticationUpdateArgs} args - Arguments to update one UserAuthentication.
     * @example
     * // Update one UserAuthentication
     * const userAuthentication = await prisma.userAuthentication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAuthenticationUpdateArgs>(args: SelectSubset<T, UserAuthenticationUpdateArgs<ExtArgs>>): Prisma__UserAuthenticationClient<$Result.GetResult<Prisma.$UserAuthenticationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserAuthentications.
     * @param {UserAuthenticationDeleteManyArgs} args - Arguments to filter UserAuthentications to delete.
     * @example
     * // Delete a few UserAuthentications
     * const { count } = await prisma.userAuthentication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAuthenticationDeleteManyArgs>(args?: SelectSubset<T, UserAuthenticationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAuthentications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAuthenticationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAuthentications
     * const userAuthentication = await prisma.userAuthentication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAuthenticationUpdateManyArgs>(args: SelectSubset<T, UserAuthenticationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAuthentications and returns the data updated in the database.
     * @param {UserAuthenticationUpdateManyAndReturnArgs} args - Arguments to update many UserAuthentications.
     * @example
     * // Update many UserAuthentications
     * const userAuthentication = await prisma.userAuthentication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserAuthentications and only return the `id`
     * const userAuthenticationWithIdOnly = await prisma.userAuthentication.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserAuthenticationUpdateManyAndReturnArgs>(args: SelectSubset<T, UserAuthenticationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAuthenticationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserAuthentication.
     * @param {UserAuthenticationUpsertArgs} args - Arguments to update or create a UserAuthentication.
     * @example
     * // Update or create a UserAuthentication
     * const userAuthentication = await prisma.userAuthentication.upsert({
     *   create: {
     *     // ... data to create a UserAuthentication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAuthentication we want to update
     *   }
     * })
     */
    upsert<T extends UserAuthenticationUpsertArgs>(args: SelectSubset<T, UserAuthenticationUpsertArgs<ExtArgs>>): Prisma__UserAuthenticationClient<$Result.GetResult<Prisma.$UserAuthenticationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserAuthentications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAuthenticationCountArgs} args - Arguments to filter UserAuthentications to count.
     * @example
     * // Count the number of UserAuthentications
     * const count = await prisma.userAuthentication.count({
     *   where: {
     *     // ... the filter for the UserAuthentications we want to count
     *   }
     * })
    **/
    count<T extends UserAuthenticationCountArgs>(
      args?: Subset<T, UserAuthenticationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAuthenticationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAuthentication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAuthenticationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAuthenticationAggregateArgs>(args: Subset<T, UserAuthenticationAggregateArgs>): Prisma.PrismaPromise<GetUserAuthenticationAggregateType<T>>

    /**
     * Group by UserAuthentication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAuthenticationGroupByArgs} args - Group by arguments.
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
      T extends UserAuthenticationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAuthenticationGroupByArgs['orderBy'] }
        : { orderBy?: UserAuthenticationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserAuthenticationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAuthenticationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAuthentication model
   */
  readonly fields: UserAuthenticationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAuthentication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAuthenticationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the UserAuthentication model
   */
  interface UserAuthenticationFieldRefs {
    readonly id: FieldRef<"UserAuthentication", 'Int'>
    readonly username: FieldRef<"UserAuthentication", 'String'>
    readonly password: FieldRef<"UserAuthentication", 'String'>
    readonly role: FieldRef<"UserAuthentication", 'UserRole'>
    readonly createdAt: FieldRef<"UserAuthentication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserAuthentication findUnique
   */
  export type UserAuthenticationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAuthentication
     */
    select?: UserAuthenticationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAuthentication
     */
    omit?: UserAuthenticationOmit<ExtArgs> | null
    /**
     * Filter, which UserAuthentication to fetch.
     */
    where: UserAuthenticationWhereUniqueInput
  }

  /**
   * UserAuthentication findUniqueOrThrow
   */
  export type UserAuthenticationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAuthentication
     */
    select?: UserAuthenticationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAuthentication
     */
    omit?: UserAuthenticationOmit<ExtArgs> | null
    /**
     * Filter, which UserAuthentication to fetch.
     */
    where: UserAuthenticationWhereUniqueInput
  }

  /**
   * UserAuthentication findFirst
   */
  export type UserAuthenticationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAuthentication
     */
    select?: UserAuthenticationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAuthentication
     */
    omit?: UserAuthenticationOmit<ExtArgs> | null
    /**
     * Filter, which UserAuthentication to fetch.
     */
    where?: UserAuthenticationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAuthentications to fetch.
     */
    orderBy?: UserAuthenticationOrderByWithRelationInput | UserAuthenticationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAuthentications.
     */
    cursor?: UserAuthenticationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAuthentications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAuthentications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAuthentications.
     */
    distinct?: UserAuthenticationScalarFieldEnum | UserAuthenticationScalarFieldEnum[]
  }

  /**
   * UserAuthentication findFirstOrThrow
   */
  export type UserAuthenticationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAuthentication
     */
    select?: UserAuthenticationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAuthentication
     */
    omit?: UserAuthenticationOmit<ExtArgs> | null
    /**
     * Filter, which UserAuthentication to fetch.
     */
    where?: UserAuthenticationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAuthentications to fetch.
     */
    orderBy?: UserAuthenticationOrderByWithRelationInput | UserAuthenticationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAuthentications.
     */
    cursor?: UserAuthenticationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAuthentications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAuthentications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAuthentications.
     */
    distinct?: UserAuthenticationScalarFieldEnum | UserAuthenticationScalarFieldEnum[]
  }

  /**
   * UserAuthentication findMany
   */
  export type UserAuthenticationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAuthentication
     */
    select?: UserAuthenticationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAuthentication
     */
    omit?: UserAuthenticationOmit<ExtArgs> | null
    /**
     * Filter, which UserAuthentications to fetch.
     */
    where?: UserAuthenticationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAuthentications to fetch.
     */
    orderBy?: UserAuthenticationOrderByWithRelationInput | UserAuthenticationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAuthentications.
     */
    cursor?: UserAuthenticationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAuthentications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAuthentications.
     */
    skip?: number
    distinct?: UserAuthenticationScalarFieldEnum | UserAuthenticationScalarFieldEnum[]
  }

  /**
   * UserAuthentication create
   */
  export type UserAuthenticationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAuthentication
     */
    select?: UserAuthenticationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAuthentication
     */
    omit?: UserAuthenticationOmit<ExtArgs> | null
    /**
     * The data needed to create a UserAuthentication.
     */
    data: XOR<UserAuthenticationCreateInput, UserAuthenticationUncheckedCreateInput>
  }

  /**
   * UserAuthentication createMany
   */
  export type UserAuthenticationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAuthentications.
     */
    data: UserAuthenticationCreateManyInput | UserAuthenticationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAuthentication createManyAndReturn
   */
  export type UserAuthenticationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAuthentication
     */
    select?: UserAuthenticationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAuthentication
     */
    omit?: UserAuthenticationOmit<ExtArgs> | null
    /**
     * The data used to create many UserAuthentications.
     */
    data: UserAuthenticationCreateManyInput | UserAuthenticationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAuthentication update
   */
  export type UserAuthenticationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAuthentication
     */
    select?: UserAuthenticationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAuthentication
     */
    omit?: UserAuthenticationOmit<ExtArgs> | null
    /**
     * The data needed to update a UserAuthentication.
     */
    data: XOR<UserAuthenticationUpdateInput, UserAuthenticationUncheckedUpdateInput>
    /**
     * Choose, which UserAuthentication to update.
     */
    where: UserAuthenticationWhereUniqueInput
  }

  /**
   * UserAuthentication updateMany
   */
  export type UserAuthenticationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAuthentications.
     */
    data: XOR<UserAuthenticationUpdateManyMutationInput, UserAuthenticationUncheckedUpdateManyInput>
    /**
     * Filter which UserAuthentications to update
     */
    where?: UserAuthenticationWhereInput
    /**
     * Limit how many UserAuthentications to update.
     */
    limit?: number
  }

  /**
   * UserAuthentication updateManyAndReturn
   */
  export type UserAuthenticationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAuthentication
     */
    select?: UserAuthenticationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAuthentication
     */
    omit?: UserAuthenticationOmit<ExtArgs> | null
    /**
     * The data used to update UserAuthentications.
     */
    data: XOR<UserAuthenticationUpdateManyMutationInput, UserAuthenticationUncheckedUpdateManyInput>
    /**
     * Filter which UserAuthentications to update
     */
    where?: UserAuthenticationWhereInput
    /**
     * Limit how many UserAuthentications to update.
     */
    limit?: number
  }

  /**
   * UserAuthentication upsert
   */
  export type UserAuthenticationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAuthentication
     */
    select?: UserAuthenticationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAuthentication
     */
    omit?: UserAuthenticationOmit<ExtArgs> | null
    /**
     * The filter to search for the UserAuthentication to update in case it exists.
     */
    where: UserAuthenticationWhereUniqueInput
    /**
     * In case the UserAuthentication found by the `where` argument doesn't exist, create a new UserAuthentication with this data.
     */
    create: XOR<UserAuthenticationCreateInput, UserAuthenticationUncheckedCreateInput>
    /**
     * In case the UserAuthentication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAuthenticationUpdateInput, UserAuthenticationUncheckedUpdateInput>
  }

  /**
   * UserAuthentication delete
   */
  export type UserAuthenticationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAuthentication
     */
    select?: UserAuthenticationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAuthentication
     */
    omit?: UserAuthenticationOmit<ExtArgs> | null
    /**
     * Filter which UserAuthentication to delete.
     */
    where: UserAuthenticationWhereUniqueInput
  }

  /**
   * UserAuthentication deleteMany
   */
  export type UserAuthenticationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAuthentications to delete
     */
    where?: UserAuthenticationWhereInput
    /**
     * Limit how many UserAuthentications to delete.
     */
    limit?: number
  }

  /**
   * UserAuthentication without action
   */
  export type UserAuthenticationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAuthentication
     */
    select?: UserAuthenticationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAuthentication
     */
    omit?: UserAuthenticationOmit<ExtArgs> | null
  }


  /**
   * Model LogData
   */

  export type AggregateLogData = {
    _count: LogDataCountAggregateOutputType | null
    _avg: LogDataAvgAggregateOutputType | null
    _sum: LogDataSumAggregateOutputType | null
    _min: LogDataMinAggregateOutputType | null
    _max: LogDataMaxAggregateOutputType | null
  }

  export type LogDataAvgAggregateOutputType = {
    id: number | null
    port: number | null
  }

  export type LogDataSumAggregateOutputType = {
    id: number | null
    port: number | null
  }

  export type LogDataMinAggregateOutputType = {
    id: number | null
    message: string | null
    port: number | null
    sourceIP: string | null
    destinationIP: string | null
    protocol: string | null
    action: string | null
    reason: string | null
    timestamp: Date | null
  }

  export type LogDataMaxAggregateOutputType = {
    id: number | null
    message: string | null
    port: number | null
    sourceIP: string | null
    destinationIP: string | null
    protocol: string | null
    action: string | null
    reason: string | null
    timestamp: Date | null
  }

  export type LogDataCountAggregateOutputType = {
    id: number
    message: number
    port: number
    sourceIP: number
    destinationIP: number
    protocol: number
    action: number
    reason: number
    timestamp: number
    _all: number
  }


  export type LogDataAvgAggregateInputType = {
    id?: true
    port?: true
  }

  export type LogDataSumAggregateInputType = {
    id?: true
    port?: true
  }

  export type LogDataMinAggregateInputType = {
    id?: true
    message?: true
    port?: true
    sourceIP?: true
    destinationIP?: true
    protocol?: true
    action?: true
    reason?: true
    timestamp?: true
  }

  export type LogDataMaxAggregateInputType = {
    id?: true
    message?: true
    port?: true
    sourceIP?: true
    destinationIP?: true
    protocol?: true
    action?: true
    reason?: true
    timestamp?: true
  }

  export type LogDataCountAggregateInputType = {
    id?: true
    message?: true
    port?: true
    sourceIP?: true
    destinationIP?: true
    protocol?: true
    action?: true
    reason?: true
    timestamp?: true
    _all?: true
  }

  export type LogDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LogData to aggregate.
     */
    where?: LogDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogData to fetch.
     */
    orderBy?: LogDataOrderByWithRelationInput | LogDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LogDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LogData
    **/
    _count?: true | LogDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LogDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LogDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogDataMaxAggregateInputType
  }

  export type GetLogDataAggregateType<T extends LogDataAggregateArgs> = {
        [P in keyof T & keyof AggregateLogData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLogData[P]>
      : GetScalarType<T[P], AggregateLogData[P]>
  }




  export type LogDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogDataWhereInput
    orderBy?: LogDataOrderByWithAggregationInput | LogDataOrderByWithAggregationInput[]
    by: LogDataScalarFieldEnum[] | LogDataScalarFieldEnum
    having?: LogDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogDataCountAggregateInputType | true
    _avg?: LogDataAvgAggregateInputType
    _sum?: LogDataSumAggregateInputType
    _min?: LogDataMinAggregateInputType
    _max?: LogDataMaxAggregateInputType
  }

  export type LogDataGroupByOutputType = {
    id: number
    message: string
    port: number
    sourceIP: string
    destinationIP: string
    protocol: string
    action: string
    reason: string
    timestamp: Date
    _count: LogDataCountAggregateOutputType | null
    _avg: LogDataAvgAggregateOutputType | null
    _sum: LogDataSumAggregateOutputType | null
    _min: LogDataMinAggregateOutputType | null
    _max: LogDataMaxAggregateOutputType | null
  }

  type GetLogDataGroupByPayload<T extends LogDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LogDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogDataGroupByOutputType[P]>
            : GetScalarType<T[P], LogDataGroupByOutputType[P]>
        }
      >
    >


  export type LogDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    port?: boolean
    sourceIP?: boolean
    destinationIP?: boolean
    protocol?: boolean
    action?: boolean
    reason?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["logData"]>

  export type LogDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    port?: boolean
    sourceIP?: boolean
    destinationIP?: boolean
    protocol?: boolean
    action?: boolean
    reason?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["logData"]>

  export type LogDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    port?: boolean
    sourceIP?: boolean
    destinationIP?: boolean
    protocol?: boolean
    action?: boolean
    reason?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["logData"]>

  export type LogDataSelectScalar = {
    id?: boolean
    message?: boolean
    port?: boolean
    sourceIP?: boolean
    destinationIP?: boolean
    protocol?: boolean
    action?: boolean
    reason?: boolean
    timestamp?: boolean
  }

  export type LogDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "message" | "port" | "sourceIP" | "destinationIP" | "protocol" | "action" | "reason" | "timestamp", ExtArgs["result"]["logData"]>

  export type $LogDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LogData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      message: string
      port: number
      sourceIP: string
      destinationIP: string
      protocol: string
      action: string
      reason: string
      timestamp: Date
    }, ExtArgs["result"]["logData"]>
    composites: {}
  }

  type LogDataGetPayload<S extends boolean | null | undefined | LogDataDefaultArgs> = $Result.GetResult<Prisma.$LogDataPayload, S>

  type LogDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LogDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LogDataCountAggregateInputType | true
    }

  export interface LogDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LogData'], meta: { name: 'LogData' } }
    /**
     * Find zero or one LogData that matches the filter.
     * @param {LogDataFindUniqueArgs} args - Arguments to find a LogData
     * @example
     * // Get one LogData
     * const logData = await prisma.logData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LogDataFindUniqueArgs>(args: SelectSubset<T, LogDataFindUniqueArgs<ExtArgs>>): Prisma__LogDataClient<$Result.GetResult<Prisma.$LogDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LogData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LogDataFindUniqueOrThrowArgs} args - Arguments to find a LogData
     * @example
     * // Get one LogData
     * const logData = await prisma.logData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LogDataFindUniqueOrThrowArgs>(args: SelectSubset<T, LogDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LogDataClient<$Result.GetResult<Prisma.$LogDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LogData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogDataFindFirstArgs} args - Arguments to find a LogData
     * @example
     * // Get one LogData
     * const logData = await prisma.logData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LogDataFindFirstArgs>(args?: SelectSubset<T, LogDataFindFirstArgs<ExtArgs>>): Prisma__LogDataClient<$Result.GetResult<Prisma.$LogDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LogData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogDataFindFirstOrThrowArgs} args - Arguments to find a LogData
     * @example
     * // Get one LogData
     * const logData = await prisma.logData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LogDataFindFirstOrThrowArgs>(args?: SelectSubset<T, LogDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__LogDataClient<$Result.GetResult<Prisma.$LogDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LogData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LogData
     * const logData = await prisma.logData.findMany()
     * 
     * // Get first 10 LogData
     * const logData = await prisma.logData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const logDataWithIdOnly = await prisma.logData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LogDataFindManyArgs>(args?: SelectSubset<T, LogDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LogData.
     * @param {LogDataCreateArgs} args - Arguments to create a LogData.
     * @example
     * // Create one LogData
     * const LogData = await prisma.logData.create({
     *   data: {
     *     // ... data to create a LogData
     *   }
     * })
     * 
     */
    create<T extends LogDataCreateArgs>(args: SelectSubset<T, LogDataCreateArgs<ExtArgs>>): Prisma__LogDataClient<$Result.GetResult<Prisma.$LogDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LogData.
     * @param {LogDataCreateManyArgs} args - Arguments to create many LogData.
     * @example
     * // Create many LogData
     * const logData = await prisma.logData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LogDataCreateManyArgs>(args?: SelectSubset<T, LogDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LogData and returns the data saved in the database.
     * @param {LogDataCreateManyAndReturnArgs} args - Arguments to create many LogData.
     * @example
     * // Create many LogData
     * const logData = await prisma.logData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LogData and only return the `id`
     * const logDataWithIdOnly = await prisma.logData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LogDataCreateManyAndReturnArgs>(args?: SelectSubset<T, LogDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LogData.
     * @param {LogDataDeleteArgs} args - Arguments to delete one LogData.
     * @example
     * // Delete one LogData
     * const LogData = await prisma.logData.delete({
     *   where: {
     *     // ... filter to delete one LogData
     *   }
     * })
     * 
     */
    delete<T extends LogDataDeleteArgs>(args: SelectSubset<T, LogDataDeleteArgs<ExtArgs>>): Prisma__LogDataClient<$Result.GetResult<Prisma.$LogDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LogData.
     * @param {LogDataUpdateArgs} args - Arguments to update one LogData.
     * @example
     * // Update one LogData
     * const logData = await prisma.logData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LogDataUpdateArgs>(args: SelectSubset<T, LogDataUpdateArgs<ExtArgs>>): Prisma__LogDataClient<$Result.GetResult<Prisma.$LogDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LogData.
     * @param {LogDataDeleteManyArgs} args - Arguments to filter LogData to delete.
     * @example
     * // Delete a few LogData
     * const { count } = await prisma.logData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LogDataDeleteManyArgs>(args?: SelectSubset<T, LogDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LogData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LogData
     * const logData = await prisma.logData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LogDataUpdateManyArgs>(args: SelectSubset<T, LogDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LogData and returns the data updated in the database.
     * @param {LogDataUpdateManyAndReturnArgs} args - Arguments to update many LogData.
     * @example
     * // Update many LogData
     * const logData = await prisma.logData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LogData and only return the `id`
     * const logDataWithIdOnly = await prisma.logData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LogDataUpdateManyAndReturnArgs>(args: SelectSubset<T, LogDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LogData.
     * @param {LogDataUpsertArgs} args - Arguments to update or create a LogData.
     * @example
     * // Update or create a LogData
     * const logData = await prisma.logData.upsert({
     *   create: {
     *     // ... data to create a LogData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LogData we want to update
     *   }
     * })
     */
    upsert<T extends LogDataUpsertArgs>(args: SelectSubset<T, LogDataUpsertArgs<ExtArgs>>): Prisma__LogDataClient<$Result.GetResult<Prisma.$LogDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LogData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogDataCountArgs} args - Arguments to filter LogData to count.
     * @example
     * // Count the number of LogData
     * const count = await prisma.logData.count({
     *   where: {
     *     // ... the filter for the LogData we want to count
     *   }
     * })
    **/
    count<T extends LogDataCountArgs>(
      args?: Subset<T, LogDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LogData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LogDataAggregateArgs>(args: Subset<T, LogDataAggregateArgs>): Prisma.PrismaPromise<GetLogDataAggregateType<T>>

    /**
     * Group by LogData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogDataGroupByArgs} args - Group by arguments.
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
      T extends LogDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogDataGroupByArgs['orderBy'] }
        : { orderBy?: LogDataGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LogDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LogData model
   */
  readonly fields: LogDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LogData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LogDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the LogData model
   */
  interface LogDataFieldRefs {
    readonly id: FieldRef<"LogData", 'Int'>
    readonly message: FieldRef<"LogData", 'String'>
    readonly port: FieldRef<"LogData", 'Int'>
    readonly sourceIP: FieldRef<"LogData", 'String'>
    readonly destinationIP: FieldRef<"LogData", 'String'>
    readonly protocol: FieldRef<"LogData", 'String'>
    readonly action: FieldRef<"LogData", 'String'>
    readonly reason: FieldRef<"LogData", 'String'>
    readonly timestamp: FieldRef<"LogData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LogData findUnique
   */
  export type LogDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogData
     */
    select?: LogDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogData
     */
    omit?: LogDataOmit<ExtArgs> | null
    /**
     * Filter, which LogData to fetch.
     */
    where: LogDataWhereUniqueInput
  }

  /**
   * LogData findUniqueOrThrow
   */
  export type LogDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogData
     */
    select?: LogDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogData
     */
    omit?: LogDataOmit<ExtArgs> | null
    /**
     * Filter, which LogData to fetch.
     */
    where: LogDataWhereUniqueInput
  }

  /**
   * LogData findFirst
   */
  export type LogDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogData
     */
    select?: LogDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogData
     */
    omit?: LogDataOmit<ExtArgs> | null
    /**
     * Filter, which LogData to fetch.
     */
    where?: LogDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogData to fetch.
     */
    orderBy?: LogDataOrderByWithRelationInput | LogDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogData.
     */
    cursor?: LogDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogData.
     */
    distinct?: LogDataScalarFieldEnum | LogDataScalarFieldEnum[]
  }

  /**
   * LogData findFirstOrThrow
   */
  export type LogDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogData
     */
    select?: LogDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogData
     */
    omit?: LogDataOmit<ExtArgs> | null
    /**
     * Filter, which LogData to fetch.
     */
    where?: LogDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogData to fetch.
     */
    orderBy?: LogDataOrderByWithRelationInput | LogDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogData.
     */
    cursor?: LogDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogData.
     */
    distinct?: LogDataScalarFieldEnum | LogDataScalarFieldEnum[]
  }

  /**
   * LogData findMany
   */
  export type LogDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogData
     */
    select?: LogDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogData
     */
    omit?: LogDataOmit<ExtArgs> | null
    /**
     * Filter, which LogData to fetch.
     */
    where?: LogDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogData to fetch.
     */
    orderBy?: LogDataOrderByWithRelationInput | LogDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LogData.
     */
    cursor?: LogDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogData.
     */
    skip?: number
    distinct?: LogDataScalarFieldEnum | LogDataScalarFieldEnum[]
  }

  /**
   * LogData create
   */
  export type LogDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogData
     */
    select?: LogDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogData
     */
    omit?: LogDataOmit<ExtArgs> | null
    /**
     * The data needed to create a LogData.
     */
    data: XOR<LogDataCreateInput, LogDataUncheckedCreateInput>
  }

  /**
   * LogData createMany
   */
  export type LogDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LogData.
     */
    data: LogDataCreateManyInput | LogDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LogData createManyAndReturn
   */
  export type LogDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogData
     */
    select?: LogDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LogData
     */
    omit?: LogDataOmit<ExtArgs> | null
    /**
     * The data used to create many LogData.
     */
    data: LogDataCreateManyInput | LogDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LogData update
   */
  export type LogDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogData
     */
    select?: LogDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogData
     */
    omit?: LogDataOmit<ExtArgs> | null
    /**
     * The data needed to update a LogData.
     */
    data: XOR<LogDataUpdateInput, LogDataUncheckedUpdateInput>
    /**
     * Choose, which LogData to update.
     */
    where: LogDataWhereUniqueInput
  }

  /**
   * LogData updateMany
   */
  export type LogDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LogData.
     */
    data: XOR<LogDataUpdateManyMutationInput, LogDataUncheckedUpdateManyInput>
    /**
     * Filter which LogData to update
     */
    where?: LogDataWhereInput
    /**
     * Limit how many LogData to update.
     */
    limit?: number
  }

  /**
   * LogData updateManyAndReturn
   */
  export type LogDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogData
     */
    select?: LogDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LogData
     */
    omit?: LogDataOmit<ExtArgs> | null
    /**
     * The data used to update LogData.
     */
    data: XOR<LogDataUpdateManyMutationInput, LogDataUncheckedUpdateManyInput>
    /**
     * Filter which LogData to update
     */
    where?: LogDataWhereInput
    /**
     * Limit how many LogData to update.
     */
    limit?: number
  }

  /**
   * LogData upsert
   */
  export type LogDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogData
     */
    select?: LogDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogData
     */
    omit?: LogDataOmit<ExtArgs> | null
    /**
     * The filter to search for the LogData to update in case it exists.
     */
    where: LogDataWhereUniqueInput
    /**
     * In case the LogData found by the `where` argument doesn't exist, create a new LogData with this data.
     */
    create: XOR<LogDataCreateInput, LogDataUncheckedCreateInput>
    /**
     * In case the LogData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LogDataUpdateInput, LogDataUncheckedUpdateInput>
  }

  /**
   * LogData delete
   */
  export type LogDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogData
     */
    select?: LogDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogData
     */
    omit?: LogDataOmit<ExtArgs> | null
    /**
     * Filter which LogData to delete.
     */
    where: LogDataWhereUniqueInput
  }

  /**
   * LogData deleteMany
   */
  export type LogDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LogData to delete
     */
    where?: LogDataWhereInput
    /**
     * Limit how many LogData to delete.
     */
    limit?: number
  }

  /**
   * LogData without action
   */
  export type LogDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogData
     */
    select?: LogDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LogData
     */
    omit?: LogDataOmit<ExtArgs> | null
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


  export const UserAuthenticationScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserAuthenticationScalarFieldEnum = (typeof UserAuthenticationScalarFieldEnum)[keyof typeof UserAuthenticationScalarFieldEnum]


  export const LogDataScalarFieldEnum: {
    id: 'id',
    message: 'message',
    port: 'port',
    sourceIP: 'sourceIP',
    destinationIP: 'destinationIP',
    protocol: 'protocol',
    action: 'action',
    reason: 'reason',
    timestamp: 'timestamp'
  };

  export type LogDataScalarFieldEnum = (typeof LogDataScalarFieldEnum)[keyof typeof LogDataScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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


  export type UserAuthenticationWhereInput = {
    AND?: UserAuthenticationWhereInput | UserAuthenticationWhereInput[]
    OR?: UserAuthenticationWhereInput[]
    NOT?: UserAuthenticationWhereInput | UserAuthenticationWhereInput[]
    id?: IntFilter<"UserAuthentication"> | number
    username?: StringFilter<"UserAuthentication"> | string
    password?: StringFilter<"UserAuthentication"> | string
    role?: EnumUserRoleFilter<"UserAuthentication"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"UserAuthentication"> | Date | string
  }

  export type UserAuthenticationOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAuthenticationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: UserAuthenticationWhereInput | UserAuthenticationWhereInput[]
    OR?: UserAuthenticationWhereInput[]
    NOT?: UserAuthenticationWhereInput | UserAuthenticationWhereInput[]
    password?: StringFilter<"UserAuthentication"> | string
    role?: EnumUserRoleFilter<"UserAuthentication"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"UserAuthentication"> | Date | string
  }, "id" | "username">

  export type UserAuthenticationOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserAuthenticationCountOrderByAggregateInput
    _avg?: UserAuthenticationAvgOrderByAggregateInput
    _max?: UserAuthenticationMaxOrderByAggregateInput
    _min?: UserAuthenticationMinOrderByAggregateInput
    _sum?: UserAuthenticationSumOrderByAggregateInput
  }

  export type UserAuthenticationScalarWhereWithAggregatesInput = {
    AND?: UserAuthenticationScalarWhereWithAggregatesInput | UserAuthenticationScalarWhereWithAggregatesInput[]
    OR?: UserAuthenticationScalarWhereWithAggregatesInput[]
    NOT?: UserAuthenticationScalarWhereWithAggregatesInput | UserAuthenticationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserAuthentication"> | number
    username?: StringWithAggregatesFilter<"UserAuthentication"> | string
    password?: StringWithAggregatesFilter<"UserAuthentication"> | string
    role?: EnumUserRoleWithAggregatesFilter<"UserAuthentication"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"UserAuthentication"> | Date | string
  }

  export type LogDataWhereInput = {
    AND?: LogDataWhereInput | LogDataWhereInput[]
    OR?: LogDataWhereInput[]
    NOT?: LogDataWhereInput | LogDataWhereInput[]
    id?: IntFilter<"LogData"> | number
    message?: StringFilter<"LogData"> | string
    port?: IntFilter<"LogData"> | number
    sourceIP?: StringFilter<"LogData"> | string
    destinationIP?: StringFilter<"LogData"> | string
    protocol?: StringFilter<"LogData"> | string
    action?: StringFilter<"LogData"> | string
    reason?: StringFilter<"LogData"> | string
    timestamp?: DateTimeFilter<"LogData"> | Date | string
  }

  export type LogDataOrderByWithRelationInput = {
    id?: SortOrder
    message?: SortOrder
    port?: SortOrder
    sourceIP?: SortOrder
    destinationIP?: SortOrder
    protocol?: SortOrder
    action?: SortOrder
    reason?: SortOrder
    timestamp?: SortOrder
  }

  export type LogDataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LogDataWhereInput | LogDataWhereInput[]
    OR?: LogDataWhereInput[]
    NOT?: LogDataWhereInput | LogDataWhereInput[]
    message?: StringFilter<"LogData"> | string
    port?: IntFilter<"LogData"> | number
    sourceIP?: StringFilter<"LogData"> | string
    destinationIP?: StringFilter<"LogData"> | string
    protocol?: StringFilter<"LogData"> | string
    action?: StringFilter<"LogData"> | string
    reason?: StringFilter<"LogData"> | string
    timestamp?: DateTimeFilter<"LogData"> | Date | string
  }, "id">

  export type LogDataOrderByWithAggregationInput = {
    id?: SortOrder
    message?: SortOrder
    port?: SortOrder
    sourceIP?: SortOrder
    destinationIP?: SortOrder
    protocol?: SortOrder
    action?: SortOrder
    reason?: SortOrder
    timestamp?: SortOrder
    _count?: LogDataCountOrderByAggregateInput
    _avg?: LogDataAvgOrderByAggregateInput
    _max?: LogDataMaxOrderByAggregateInput
    _min?: LogDataMinOrderByAggregateInput
    _sum?: LogDataSumOrderByAggregateInput
  }

  export type LogDataScalarWhereWithAggregatesInput = {
    AND?: LogDataScalarWhereWithAggregatesInput | LogDataScalarWhereWithAggregatesInput[]
    OR?: LogDataScalarWhereWithAggregatesInput[]
    NOT?: LogDataScalarWhereWithAggregatesInput | LogDataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LogData"> | number
    message?: StringWithAggregatesFilter<"LogData"> | string
    port?: IntWithAggregatesFilter<"LogData"> | number
    sourceIP?: StringWithAggregatesFilter<"LogData"> | string
    destinationIP?: StringWithAggregatesFilter<"LogData"> | string
    protocol?: StringWithAggregatesFilter<"LogData"> | string
    action?: StringWithAggregatesFilter<"LogData"> | string
    reason?: StringWithAggregatesFilter<"LogData"> | string
    timestamp?: DateTimeWithAggregatesFilter<"LogData"> | Date | string
  }

  export type UserAuthenticationCreateInput = {
    username: string
    password: string
    role: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserAuthenticationUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    role: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserAuthenticationUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAuthenticationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAuthenticationCreateManyInput = {
    id?: number
    username: string
    password: string
    role: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserAuthenticationUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAuthenticationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogDataCreateInput = {
    message: string
    port: number
    sourceIP: string
    destinationIP: string
    protocol: string
    action: string
    reason: string
    timestamp?: Date | string
  }

  export type LogDataUncheckedCreateInput = {
    id?: number
    message: string
    port: number
    sourceIP: string
    destinationIP: string
    protocol: string
    action: string
    reason: string
    timestamp?: Date | string
  }

  export type LogDataUpdateInput = {
    message?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    sourceIP?: StringFieldUpdateOperationsInput | string
    destinationIP?: StringFieldUpdateOperationsInput | string
    protocol?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogDataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    sourceIP?: StringFieldUpdateOperationsInput | string
    destinationIP?: StringFieldUpdateOperationsInput | string
    protocol?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogDataCreateManyInput = {
    id?: number
    message: string
    port: number
    sourceIP: string
    destinationIP: string
    protocol: string
    action: string
    reason: string
    timestamp?: Date | string
  }

  export type LogDataUpdateManyMutationInput = {
    message?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    sourceIP?: StringFieldUpdateOperationsInput | string
    destinationIP?: StringFieldUpdateOperationsInput | string
    protocol?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogDataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    sourceIP?: StringFieldUpdateOperationsInput | string
    destinationIP?: StringFieldUpdateOperationsInput | string
    protocol?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type UserAuthenticationCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAuthenticationAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserAuthenticationMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAuthenticationMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAuthenticationSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type LogDataCountOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    port?: SortOrder
    sourceIP?: SortOrder
    destinationIP?: SortOrder
    protocol?: SortOrder
    action?: SortOrder
    reason?: SortOrder
    timestamp?: SortOrder
  }

  export type LogDataAvgOrderByAggregateInput = {
    id?: SortOrder
    port?: SortOrder
  }

  export type LogDataMaxOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    port?: SortOrder
    sourceIP?: SortOrder
    destinationIP?: SortOrder
    protocol?: SortOrder
    action?: SortOrder
    reason?: SortOrder
    timestamp?: SortOrder
  }

  export type LogDataMinOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    port?: SortOrder
    sourceIP?: SortOrder
    destinationIP?: SortOrder
    protocol?: SortOrder
    action?: SortOrder
    reason?: SortOrder
    timestamp?: SortOrder
  }

  export type LogDataSumOrderByAggregateInput = {
    id?: SortOrder
    port?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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