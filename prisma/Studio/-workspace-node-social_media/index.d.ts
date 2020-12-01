import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
  Decimal,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }
export { Decimal }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.10.2
 * Query Engine version: 7d0087eadc7265e12d4b8d8c3516b02c4c965111
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

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
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
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
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
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
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
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
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
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
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): CommentDelegate;

  /**
   * `prisma.like`: Exposes CRUD operations for the **Like** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Likes
    * const likes = await prisma.like.findMany()
    * ```
    */
  get like(): LikeDelegate;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): PostDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const UserDistinctFieldEnum: {
  id: 'id',
  username: 'username',
  password: 'password',
  createdAt: 'createdAt',
  email: 'email'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const CommentDistinctFieldEnum: {
  id: 'id',
  body: 'body',
  userId: 'userId',
  createdAt: 'createdAt'
};

export declare type CommentDistinctFieldEnum = (typeof CommentDistinctFieldEnum)[keyof typeof CommentDistinctFieldEnum]


export declare const LikeDistinctFieldEnum: {
  id: 'id',
  userId: 'userId',
  createdAt: 'createdAt'
};

export declare type LikeDistinctFieldEnum = (typeof LikeDistinctFieldEnum)[keyof typeof LikeDistinctFieldEnum]


export declare const PostDistinctFieldEnum: {
  id: 'id',
  body: 'body',
  userId: 'userId',
  createdAt: 'createdAt'
};

export declare type PostDistinctFieldEnum = (typeof PostDistinctFieldEnum)[keyof typeof PostDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const QueryMode: {
  default: 'default',
  insensitive: 'insensitive'
};

export declare type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]



/**
 * Model User
 */

export type User = {
  id: number
  username: string | null
  password: string | null
  createdAt: Date
  email: string
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  username?: boolean
  password?: boolean
  createdAt?: boolean
  email?: boolean
  comments?: boolean | FindManyCommentArgs
  likes?: boolean | FindManyLikeArgs
  posts?: boolean | FindManyPostArgs
}

export type UserInclude = {
  comments?: boolean | FindManyCommentArgs
  likes?: boolean | FindManyLikeArgs
  posts?: boolean | FindManyPostArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'comments'
      ? Array<CommentGetPayload<S['include'][P]>> :
      P extends 'likes'
      ? Array<LikeGetPayload<S['include'][P]>> :
      P extends 'posts'
      ? Array<PostGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'comments'
      ? Array<CommentGetPayload<S['select'][P]>> :
      P extends 'likes'
      ? Array<LikeGetPayload<S['select'][P]>> :
      P extends 'posts'
      ? Array<PostGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args?: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
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
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
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
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
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
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
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
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
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
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  comments<T extends FindManyCommentArgs = {}>(args?: Subset<T, FindManyCommentArgs>): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>;

  likes<T extends FindManyLikeArgs = {}>(args?: Subset<T, FindManyLikeArgs>): CheckSelect<T, Promise<Array<Like>>, Promise<Array<LikeGetPayload<T>>>>;

  posts<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Comment
 */

export type Comment = {
  id: number
  body: string
  userId: number
  createdAt: Date
}


export type AggregateComment = {
  count: number
  avg: CommentAvgAggregateOutputType | null
  sum: CommentSumAggregateOutputType | null
  min: CommentMinAggregateOutputType | null
  max: CommentMaxAggregateOutputType | null
}

export type CommentAvgAggregateOutputType = {
  id: number
  userId: number
}

export type CommentSumAggregateOutputType = {
  id: number
  userId: number
}

export type CommentMinAggregateOutputType = {
  id: number
  userId: number
}

export type CommentMaxAggregateOutputType = {
  id: number
  userId: number
}


export type CommentAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type CommentSumAggregateInputType = {
  id?: true
  userId?: true
}

export type CommentMinAggregateInputType = {
  id?: true
  userId?: true
}

export type CommentMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregateCommentArgs = {
  where?: CommentWhereInput
  orderBy?: Enumerable<CommentOrderByInput> | CommentOrderByInput
  cursor?: CommentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CommentDistinctFieldEnum>
  count?: true
  avg?: CommentAvgAggregateInputType
  sum?: CommentSumAggregateInputType
  min?: CommentMinAggregateInputType
  max?: CommentMaxAggregateInputType
}

export type GetCommentAggregateType<T extends AggregateCommentArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetCommentAggregateScalarType<T[P]>
}

export type GetCommentAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CommentAvgAggregateOutputType ? CommentAvgAggregateOutputType[P] : never
}
    
    

export type CommentSelect = {
  id?: boolean
  body?: boolean
  userId?: boolean
  createdAt?: boolean
  User?: boolean | UserArgs
}

export type CommentInclude = {
  User?: boolean | UserArgs
}

export type CommentGetPayload<
  S extends boolean | null | undefined | CommentArgs,
  U = keyof S
> = S extends true
  ? Comment
  : S extends undefined
  ? never
  : S extends CommentArgs | FindManyCommentArgs
  ? 'include' extends U
    ? Comment  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Comment ? Comment[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Comment
: Comment


export interface CommentDelegate {
  /**
   * Find zero or one Comment that matches the filter.
   * @param {FindOneCommentArgs} args - Arguments to find a Comment
   * @example
   * // Get one Comment
   * const comment = await prisma.comment.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCommentArgs>(
    args: Subset<T, FindOneCommentArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment | null>, Prisma__CommentClient<CommentGetPayload<T> | null>>
  /**
   * Find the first Comment that matches the filter.
   * @param {FindFirstCommentArgs} args - Arguments to find a Comment
   * @example
   * // Get one Comment
   * const comment = await prisma.comment.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstCommentArgs>(
    args?: Subset<T, FindFirstCommentArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment | null>, Prisma__CommentClient<CommentGetPayload<T> | null>>
  /**
   * Find zero or more Comments that matches the filter.
   * @param {FindManyCommentArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Comments
   * const comments = await prisma.comment.findMany()
   * 
   * // Get first 10 Comments
   * const comments = await prisma.comment.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCommentArgs>(
    args?: Subset<T, FindManyCommentArgs>
  ): CheckSelect<T, Promise<Array<Comment>>, Promise<Array<CommentGetPayload<T>>>>
  /**
   * Create a Comment.
   * @param {CommentCreateArgs} args - Arguments to create a Comment.
   * @example
   * // Create one Comment
   * const Comment = await prisma.comment.create({
   *   data: {
   *     // ... data to create a Comment
   *   }
   * })
   * 
  **/
  create<T extends CommentCreateArgs>(
    args: Subset<T, CommentCreateArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
  /**
   * Delete a Comment.
   * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
   * @example
   * // Delete one Comment
   * const Comment = await prisma.comment.delete({
   *   where: {
   *     // ... filter to delete one Comment
   *   }
   * })
   * 
  **/
  delete<T extends CommentDeleteArgs>(
    args: Subset<T, CommentDeleteArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
  /**
   * Update one Comment.
   * @param {CommentUpdateArgs} args - Arguments to update one Comment.
   * @example
   * // Update one Comment
   * const comment = await prisma.comment.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CommentUpdateArgs>(
    args: Subset<T, CommentUpdateArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
  /**
   * Delete zero or more Comments.
   * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
   * @example
   * // Delete a few Comments
   * const { count } = await prisma.comment.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CommentDeleteManyArgs>(
    args: Subset<T, CommentDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Comments.
   * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Comments
   * const comment = await prisma.comment.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CommentUpdateManyArgs>(
    args: Subset<T, CommentUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Comment.
   * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
   * @example
   * // Update or create a Comment
   * const comment = await prisma.comment.upsert({
   *   create: {
   *     // ... data to create a Comment
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Comment we want to update
   *   }
   * })
  **/
  upsert<T extends CommentUpsertArgs>(
    args: Subset<T, CommentUpsertArgs>
  ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyCommentArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCommentArgs>(args: Subset<T, AggregateCommentArgs>): Promise<GetCommentAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Comment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__CommentClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Comment findOne
 */
export type FindOneCommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter, which Comment to fetch.
  **/
  where: CommentWhereUniqueInput
}


/**
 * Comment findFirst
 */
export type FindFirstCommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter, which Comment to fetch.
  **/
  where?: CommentWhereInput
  orderBy?: Enumerable<CommentOrderByInput> | CommentOrderByInput
  cursor?: CommentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CommentDistinctFieldEnum>
}


/**
 * Comment findMany
 */
export type FindManyCommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter, which Comments to fetch.
  **/
  where?: CommentWhereInput
  /**
   * Determine the order of the Comments to fetch.
  **/
  orderBy?: Enumerable<CommentOrderByInput> | CommentOrderByInput
  /**
   * Sets the position for listing Comments.
  **/
  cursor?: CommentWhereUniqueInput
  /**
   * The number of Comments to fetch. If negative number, it will take Comments before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Comments.
  **/
  skip?: number
  distinct?: Enumerable<CommentDistinctFieldEnum>
}


/**
 * Comment create
 */
export type CommentCreateArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * The data needed to create a Comment.
  **/
  data: CommentCreateInput
}


/**
 * Comment update
 */
export type CommentUpdateArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * The data needed to update a Comment.
  **/
  data: CommentUpdateInput
  /**
   * Choose, which Comment to update.
  **/
  where: CommentWhereUniqueInput
}


/**
 * Comment updateMany
 */
export type CommentUpdateManyArgs = {
  data: CommentUpdateManyMutationInput
  where?: CommentWhereInput
}


/**
 * Comment upsert
 */
export type CommentUpsertArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * The filter to search for the Comment to update in case it exists.
  **/
  where: CommentWhereUniqueInput
  /**
   * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
  **/
  create: CommentCreateInput
  /**
   * In case the Comment was found with the provided `where` argument, update it with this data.
  **/
  update: CommentUpdateInput
}


/**
 * Comment delete
 */
export type CommentDeleteArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
  /**
   * Filter which Comment to delete.
  **/
  where: CommentWhereUniqueInput
}


/**
 * Comment deleteMany
 */
export type CommentDeleteManyArgs = {
  where?: CommentWhereInput
}


/**
 * Comment without action
 */
export type CommentArgs = {
  /**
   * Select specific fields to fetch from the Comment
  **/
  select?: CommentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CommentInclude | null
}



/**
 * Model Like
 */

export type Like = {
  id: number
  userId: number
  createdAt: Date
}


export type AggregateLike = {
  count: number
  avg: LikeAvgAggregateOutputType | null
  sum: LikeSumAggregateOutputType | null
  min: LikeMinAggregateOutputType | null
  max: LikeMaxAggregateOutputType | null
}

export type LikeAvgAggregateOutputType = {
  id: number
  userId: number
}

export type LikeSumAggregateOutputType = {
  id: number
  userId: number
}

export type LikeMinAggregateOutputType = {
  id: number
  userId: number
}

export type LikeMaxAggregateOutputType = {
  id: number
  userId: number
}


export type LikeAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type LikeSumAggregateInputType = {
  id?: true
  userId?: true
}

export type LikeMinAggregateInputType = {
  id?: true
  userId?: true
}

export type LikeMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregateLikeArgs = {
  where?: LikeWhereInput
  orderBy?: Enumerable<LikeOrderByInput> | LikeOrderByInput
  cursor?: LikeWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<LikeDistinctFieldEnum>
  count?: true
  avg?: LikeAvgAggregateInputType
  sum?: LikeSumAggregateInputType
  min?: LikeMinAggregateInputType
  max?: LikeMaxAggregateInputType
}

export type GetLikeAggregateType<T extends AggregateLikeArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetLikeAggregateScalarType<T[P]>
}

export type GetLikeAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof LikeAvgAggregateOutputType ? LikeAvgAggregateOutputType[P] : never
}
    
    

export type LikeSelect = {
  id?: boolean
  userId?: boolean
  createdAt?: boolean
  User?: boolean | UserArgs
}

export type LikeInclude = {
  User?: boolean | UserArgs
}

export type LikeGetPayload<
  S extends boolean | null | undefined | LikeArgs,
  U = keyof S
> = S extends true
  ? Like
  : S extends undefined
  ? never
  : S extends LikeArgs | FindManyLikeArgs
  ? 'include' extends U
    ? Like  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Like ? Like[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Like
: Like


export interface LikeDelegate {
  /**
   * Find zero or one Like that matches the filter.
   * @param {FindOneLikeArgs} args - Arguments to find a Like
   * @example
   * // Get one Like
   * const like = await prisma.like.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneLikeArgs>(
    args: Subset<T, FindOneLikeArgs>
  ): CheckSelect<T, Prisma__LikeClient<Like | null>, Prisma__LikeClient<LikeGetPayload<T> | null>>
  /**
   * Find the first Like that matches the filter.
   * @param {FindFirstLikeArgs} args - Arguments to find a Like
   * @example
   * // Get one Like
   * const like = await prisma.like.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstLikeArgs>(
    args?: Subset<T, FindFirstLikeArgs>
  ): CheckSelect<T, Prisma__LikeClient<Like | null>, Prisma__LikeClient<LikeGetPayload<T> | null>>
  /**
   * Find zero or more Likes that matches the filter.
   * @param {FindManyLikeArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Likes
   * const likes = await prisma.like.findMany()
   * 
   * // Get first 10 Likes
   * const likes = await prisma.like.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const likeWithIdOnly = await prisma.like.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyLikeArgs>(
    args?: Subset<T, FindManyLikeArgs>
  ): CheckSelect<T, Promise<Array<Like>>, Promise<Array<LikeGetPayload<T>>>>
  /**
   * Create a Like.
   * @param {LikeCreateArgs} args - Arguments to create a Like.
   * @example
   * // Create one Like
   * const Like = await prisma.like.create({
   *   data: {
   *     // ... data to create a Like
   *   }
   * })
   * 
  **/
  create<T extends LikeCreateArgs>(
    args: Subset<T, LikeCreateArgs>
  ): CheckSelect<T, Prisma__LikeClient<Like>, Prisma__LikeClient<LikeGetPayload<T>>>
  /**
   * Delete a Like.
   * @param {LikeDeleteArgs} args - Arguments to delete one Like.
   * @example
   * // Delete one Like
   * const Like = await prisma.like.delete({
   *   where: {
   *     // ... filter to delete one Like
   *   }
   * })
   * 
  **/
  delete<T extends LikeDeleteArgs>(
    args: Subset<T, LikeDeleteArgs>
  ): CheckSelect<T, Prisma__LikeClient<Like>, Prisma__LikeClient<LikeGetPayload<T>>>
  /**
   * Update one Like.
   * @param {LikeUpdateArgs} args - Arguments to update one Like.
   * @example
   * // Update one Like
   * const like = await prisma.like.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends LikeUpdateArgs>(
    args: Subset<T, LikeUpdateArgs>
  ): CheckSelect<T, Prisma__LikeClient<Like>, Prisma__LikeClient<LikeGetPayload<T>>>
  /**
   * Delete zero or more Likes.
   * @param {LikeDeleteManyArgs} args - Arguments to filter Likes to delete.
   * @example
   * // Delete a few Likes
   * const { count } = await prisma.like.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends LikeDeleteManyArgs>(
    args: Subset<T, LikeDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Likes.
   * @param {LikeUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Likes
   * const like = await prisma.like.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends LikeUpdateManyArgs>(
    args: Subset<T, LikeUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Like.
   * @param {LikeUpsertArgs} args - Arguments to update or create a Like.
   * @example
   * // Update or create a Like
   * const like = await prisma.like.upsert({
   *   create: {
   *     // ... data to create a Like
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Like we want to update
   *   }
   * })
  **/
  upsert<T extends LikeUpsertArgs>(
    args: Subset<T, LikeUpsertArgs>
  ): CheckSelect<T, Prisma__LikeClient<Like>, Prisma__LikeClient<LikeGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyLikeArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateLikeArgs>(args: Subset<T, AggregateLikeArgs>): Promise<GetLikeAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Like.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__LikeClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Like findOne
 */
export type FindOneLikeArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * Filter, which Like to fetch.
  **/
  where: LikeWhereUniqueInput
}


/**
 * Like findFirst
 */
export type FindFirstLikeArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * Filter, which Like to fetch.
  **/
  where?: LikeWhereInput
  orderBy?: Enumerable<LikeOrderByInput> | LikeOrderByInput
  cursor?: LikeWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<LikeDistinctFieldEnum>
}


/**
 * Like findMany
 */
export type FindManyLikeArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * Filter, which Likes to fetch.
  **/
  where?: LikeWhereInput
  /**
   * Determine the order of the Likes to fetch.
  **/
  orderBy?: Enumerable<LikeOrderByInput> | LikeOrderByInput
  /**
   * Sets the position for listing Likes.
  **/
  cursor?: LikeWhereUniqueInput
  /**
   * The number of Likes to fetch. If negative number, it will take Likes before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Likes.
  **/
  skip?: number
  distinct?: Enumerable<LikeDistinctFieldEnum>
}


/**
 * Like create
 */
export type LikeCreateArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * The data needed to create a Like.
  **/
  data: LikeCreateInput
}


/**
 * Like update
 */
export type LikeUpdateArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * The data needed to update a Like.
  **/
  data: LikeUpdateInput
  /**
   * Choose, which Like to update.
  **/
  where: LikeWhereUniqueInput
}


/**
 * Like updateMany
 */
export type LikeUpdateManyArgs = {
  data: LikeUpdateManyMutationInput
  where?: LikeWhereInput
}


/**
 * Like upsert
 */
export type LikeUpsertArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * The filter to search for the Like to update in case it exists.
  **/
  where: LikeWhereUniqueInput
  /**
   * In case the Like found by the `where` argument doesn't exist, create a new Like with this data.
  **/
  create: LikeCreateInput
  /**
   * In case the Like was found with the provided `where` argument, update it with this data.
  **/
  update: LikeUpdateInput
}


/**
 * Like delete
 */
export type LikeDeleteArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
  /**
   * Filter which Like to delete.
  **/
  where: LikeWhereUniqueInput
}


/**
 * Like deleteMany
 */
export type LikeDeleteManyArgs = {
  where?: LikeWhereInput
}


/**
 * Like without action
 */
export type LikeArgs = {
  /**
   * Select specific fields to fetch from the Like
  **/
  select?: LikeSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LikeInclude | null
}



/**
 * Model Post
 */

export type Post = {
  id: number
  body: string
  userId: number
  createdAt: Date
}


export type AggregatePost = {
  count: number
  avg: PostAvgAggregateOutputType | null
  sum: PostSumAggregateOutputType | null
  min: PostMinAggregateOutputType | null
  max: PostMaxAggregateOutputType | null
}

export type PostAvgAggregateOutputType = {
  id: number
  userId: number
}

export type PostSumAggregateOutputType = {
  id: number
  userId: number
}

export type PostMinAggregateOutputType = {
  id: number
  userId: number
}

export type PostMaxAggregateOutputType = {
  id: number
  userId: number
}


export type PostAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type PostSumAggregateInputType = {
  id?: true
  userId?: true
}

export type PostMinAggregateInputType = {
  id?: true
  userId?: true
}

export type PostMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregatePostArgs = {
  where?: PostWhereInput
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput
  cursor?: PostWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
  count?: true
  avg?: PostAvgAggregateInputType
  sum?: PostSumAggregateInputType
  min?: PostMinAggregateInputType
  max?: PostMaxAggregateInputType
}

export type GetPostAggregateType<T extends AggregatePostArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetPostAggregateScalarType<T[P]>
}

export type GetPostAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PostAvgAggregateOutputType ? PostAvgAggregateOutputType[P] : never
}
    
    

export type PostSelect = {
  id?: boolean
  body?: boolean
  userId?: boolean
  createdAt?: boolean
  User?: boolean | UserArgs
}

export type PostInclude = {
  User?: boolean | UserArgs
}

export type PostGetPayload<
  S extends boolean | null | undefined | PostArgs,
  U = keyof S
> = S extends true
  ? Post
  : S extends undefined
  ? never
  : S extends PostArgs | FindManyPostArgs
  ? 'include' extends U
    ? Post  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Post ? Post[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Post
: Post


export interface PostDelegate {
  /**
   * Find zero or one Post that matches the filter.
   * @param {FindOnePostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePostArgs>(
    args: Subset<T, FindOnePostArgs>
  ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>
  /**
   * Find the first Post that matches the filter.
   * @param {FindFirstPostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstPostArgs>(
    args?: Subset<T, FindFirstPostArgs>
  ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>
  /**
   * Find zero or more Posts that matches the filter.
   * @param {FindManyPostArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Posts
   * const posts = await prisma.post.findMany()
   * 
   * // Get first 10 Posts
   * const posts = await prisma.post.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPostArgs>(
    args?: Subset<T, FindManyPostArgs>
  ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>
  /**
   * Create a Post.
   * @param {PostCreateArgs} args - Arguments to create a Post.
   * @example
   * // Create one Post
   * const Post = await prisma.post.create({
   *   data: {
   *     // ... data to create a Post
   *   }
   * })
   * 
  **/
  create<T extends PostCreateArgs>(
    args: Subset<T, PostCreateArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Delete a Post.
   * @param {PostDeleteArgs} args - Arguments to delete one Post.
   * @example
   * // Delete one Post
   * const Post = await prisma.post.delete({
   *   where: {
   *     // ... filter to delete one Post
   *   }
   * })
   * 
  **/
  delete<T extends PostDeleteArgs>(
    args: Subset<T, PostDeleteArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Update one Post.
   * @param {PostUpdateArgs} args - Arguments to update one Post.
   * @example
   * // Update one Post
   * const post = await prisma.post.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PostUpdateArgs>(
    args: Subset<T, PostUpdateArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Delete zero or more Posts.
   * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
   * @example
   * // Delete a few Posts
   * const { count } = await prisma.post.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PostDeleteManyArgs>(
    args: Subset<T, PostDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Posts.
   * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Posts
   * const post = await prisma.post.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PostUpdateManyArgs>(
    args: Subset<T, PostUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Post.
   * @param {PostUpsertArgs} args - Arguments to update or create a Post.
   * @example
   * // Update or create a Post
   * const post = await prisma.post.upsert({
   *   create: {
   *     // ... data to create a Post
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Post we want to update
   *   }
   * })
  **/
  upsert<T extends PostUpsertArgs>(
    args: Subset<T, PostUpsertArgs>
  ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyPostArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePostArgs>(args: Subset<T, AggregatePostArgs>): Promise<GetPostAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Post.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PostClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Post findOne
 */
export type FindOnePostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Post to fetch.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post findFirst
 */
export type FindFirstPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Post to fetch.
  **/
  where?: PostWhereInput
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput
  cursor?: PostWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
}


/**
 * Post findMany
 */
export type FindManyPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Posts to fetch.
  **/
  where?: PostWhereInput
  /**
   * Determine the order of the Posts to fetch.
  **/
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput
  /**
   * Sets the position for listing Posts.
  **/
  cursor?: PostWhereUniqueInput
  /**
   * The number of Posts to fetch. If negative number, it will take Posts before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Posts.
  **/
  skip?: number
  distinct?: Enumerable<PostDistinctFieldEnum>
}


/**
 * Post create
 */
export type PostCreateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to create a Post.
  **/
  data: PostCreateInput
}


/**
 * Post update
 */
export type PostUpdateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to update a Post.
  **/
  data: PostUpdateInput
  /**
   * Choose, which Post to update.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post updateMany
 */
export type PostUpdateManyArgs = {
  data: PostUpdateManyMutationInput
  where?: PostWhereInput
}


/**
 * Post upsert
 */
export type PostUpsertArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The filter to search for the Post to update in case it exists.
  **/
  where: PostWhereUniqueInput
  /**
   * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
  **/
  create: PostCreateInput
  /**
   * In case the Post was found with the provided `where` argument, update it with this data.
  **/
  update: PostUpdateInput
}


/**
 * Post delete
 */
export type PostDeleteArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter which Post to delete.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post deleteMany
 */
export type PostDeleteManyArgs = {
  where?: PostWhereInput
}


/**
 * Post without action
 */
export type PostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
}



/**
 * Deep Input Types
 */


export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>
  OR?: UserWhereInput | Enumerable<UserWhereInput>
  NOT?: UserWhereInput | Enumerable<UserWhereInput>
  id?: IntFilter | number
  username?: StringNullableFilter | string | null
  password?: StringNullableFilter | string | null
  createdAt?: DateTimeFilter | Date | string
  email?: StringFilter | string
  comments?: CommentListRelationFilter
  likes?: LikeListRelationFilter
  posts?: PostListRelationFilter
}

export type UserOrderByInput = {
  id?: SortOrder
  username?: SortOrder
  password?: SortOrder
  createdAt?: SortOrder
  email?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type CommentWhereInput = {
  AND?: CommentWhereInput | Enumerable<CommentWhereInput>
  OR?: CommentWhereInput | Enumerable<CommentWhereInput>
  NOT?: CommentWhereInput | Enumerable<CommentWhereInput>
  id?: IntFilter | number
  body?: StringFilter | string
  userId?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  User?: UserRelationFilter | UserWhereInput
}

export type CommentOrderByInput = {
  id?: SortOrder
  body?: SortOrder
  userId?: SortOrder
  createdAt?: SortOrder
}

export type CommentWhereUniqueInput = {
  id?: number
}

export type LikeWhereInput = {
  AND?: LikeWhereInput | Enumerable<LikeWhereInput>
  OR?: LikeWhereInput | Enumerable<LikeWhereInput>
  NOT?: LikeWhereInput | Enumerable<LikeWhereInput>
  id?: IntFilter | number
  userId?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  User?: UserRelationFilter | UserWhereInput
}

export type LikeOrderByInput = {
  id?: SortOrder
  userId?: SortOrder
  createdAt?: SortOrder
}

export type LikeWhereUniqueInput = {
  id?: number
}

export type PostWhereInput = {
  AND?: PostWhereInput | Enumerable<PostWhereInput>
  OR?: PostWhereInput | Enumerable<PostWhereInput>
  NOT?: PostWhereInput | Enumerable<PostWhereInput>
  id?: IntFilter | number
  body?: StringFilter | string
  userId?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  User?: UserRelationFilter | UserWhereInput
}

export type PostOrderByInput = {
  id?: SortOrder
  body?: SortOrder
  userId?: SortOrder
  createdAt?: SortOrder
}

export type PostWhereUniqueInput = {
  id?: number
}

export type UserCreateInput = {
  username?: string | null
  password?: string | null
  createdAt?: Date | string
  email: string
  comments?: CommentCreateManyWithoutUserInput
  likes?: LikeCreateManyWithoutUserInput
  posts?: PostCreateManyWithoutUserInput
}

export type UserUpdateInput = {
  username?: string | NullableStringFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  comments?: CommentUpdateManyWithoutUserInput
  likes?: LikeUpdateManyWithoutUserInput
  posts?: PostUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  username?: string | NullableStringFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
}

export type CommentCreateInput = {
  body: string
  createdAt?: Date | string
  User: UserCreateOneWithoutCommentsInput
}

export type CommentUpdateInput = {
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  User?: UserUpdateOneRequiredWithoutCommentsInput
}

export type CommentUpdateManyMutationInput = {
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type LikeCreateInput = {
  createdAt?: Date | string
  User: UserCreateOneWithoutLikesInput
}

export type LikeUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  User?: UserUpdateOneRequiredWithoutLikesInput
}

export type LikeUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type PostCreateInput = {
  body: string
  createdAt?: Date | string
  User: UserCreateOneWithoutPostsInput
}

export type PostUpdateInput = {
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  User?: UserUpdateOneRequiredWithoutPostsInput
}

export type PostUpdateManyMutationInput = {
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringNullableFilter | null
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringFilter
}

export type CommentListRelationFilter = {
  every?: CommentWhereInput
  some?: CommentWhereInput
  none?: CommentWhereInput
}

export type LikeListRelationFilter = {
  every?: LikeWhereInput
  some?: LikeWhereInput
  none?: LikeWhereInput
}

export type PostListRelationFilter = {
  every?: PostWhereInput
  some?: PostWhereInput
  none?: PostWhereInput
}

export type UserRelationFilter = {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export type CommentCreateManyWithoutUserInput = {
  create?: CommentCreateWithoutUserInput | Enumerable<CommentCreateWithoutUserInput>
  connect?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
}

export type LikeCreateManyWithoutUserInput = {
  create?: LikeCreateWithoutUserInput | Enumerable<LikeCreateWithoutUserInput>
  connect?: LikeWhereUniqueInput | Enumerable<LikeWhereUniqueInput>
}

export type PostCreateManyWithoutUserInput = {
  create?: PostCreateWithoutUserInput | Enumerable<PostCreateWithoutUserInput>
  connect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type CommentUpdateManyWithoutUserInput = {
  create?: CommentCreateWithoutUserInput | Enumerable<CommentCreateWithoutUserInput>
  connect?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
  set?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
  disconnect?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
  delete?: CommentWhereUniqueInput | Enumerable<CommentWhereUniqueInput>
  update?: CommentUpdateWithWhereUniqueWithoutUserInput | Enumerable<CommentUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: CommentUpdateManyWithWhereNestedInput | Enumerable<CommentUpdateManyWithWhereNestedInput>
  deleteMany?: CommentScalarWhereInput | Enumerable<CommentScalarWhereInput>
  upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | Enumerable<CommentUpsertWithWhereUniqueWithoutUserInput>
}

export type LikeUpdateManyWithoutUserInput = {
  create?: LikeCreateWithoutUserInput | Enumerable<LikeCreateWithoutUserInput>
  connect?: LikeWhereUniqueInput | Enumerable<LikeWhereUniqueInput>
  set?: LikeWhereUniqueInput | Enumerable<LikeWhereUniqueInput>
  disconnect?: LikeWhereUniqueInput | Enumerable<LikeWhereUniqueInput>
  delete?: LikeWhereUniqueInput | Enumerable<LikeWhereUniqueInput>
  update?: LikeUpdateWithWhereUniqueWithoutUserInput | Enumerable<LikeUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: LikeUpdateManyWithWhereNestedInput | Enumerable<LikeUpdateManyWithWhereNestedInput>
  deleteMany?: LikeScalarWhereInput | Enumerable<LikeScalarWhereInput>
  upsert?: LikeUpsertWithWhereUniqueWithoutUserInput | Enumerable<LikeUpsertWithWhereUniqueWithoutUserInput>
}

export type PostUpdateManyWithoutUserInput = {
  create?: PostCreateWithoutUserInput | Enumerable<PostCreateWithoutUserInput>
  connect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  set?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  disconnect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  delete?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>
  update?: PostUpdateWithWhereUniqueWithoutUserInput | Enumerable<PostUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: PostUpdateManyWithWhereNestedInput | Enumerable<PostUpdateManyWithWhereNestedInput>
  deleteMany?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  upsert?: PostUpsertWithWhereUniqueWithoutUserInput | Enumerable<PostUpsertWithWhereUniqueWithoutUserInput>
}

export type UserCreateOneWithoutCommentsInput = {
  create?: UserCreateWithoutCommentsInput
  connect?: UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutCommentsInput = {
  create?: UserCreateWithoutCommentsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutCommentsDataInput
  upsert?: UserUpsertWithoutCommentsInput
}

export type UserCreateOneWithoutLikesInput = {
  create?: UserCreateWithoutLikesInput
  connect?: UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutLikesInput = {
  create?: UserCreateWithoutLikesInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutLikesDataInput
  upsert?: UserUpsertWithoutLikesInput
}

export type UserCreateOneWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutPostsDataInput
  upsert?: UserUpsertWithoutPostsInput
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type CommentCreateWithoutUserInput = {
  body: string
  createdAt?: Date | string
}

export type LikeCreateWithoutUserInput = {
  createdAt?: Date | string
}

export type PostCreateWithoutUserInput = {
  body: string
  createdAt?: Date | string
}

export type CommentUpdateWithWhereUniqueWithoutUserInput = {
  where: CommentWhereUniqueInput
  data: CommentUpdateWithoutUserDataInput
}

export type CommentUpdateManyWithWhereNestedInput = {
  where: CommentScalarWhereInput
  data: CommentUpdateManyDataInput
}

export type CommentScalarWhereInput = {
  AND?: CommentScalarWhereInput | Enumerable<CommentScalarWhereInput>
  OR?: CommentScalarWhereInput | Enumerable<CommentScalarWhereInput>
  NOT?: CommentScalarWhereInput | Enumerable<CommentScalarWhereInput>
  id?: IntFilter | number
  body?: StringFilter | string
  userId?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
}

export type CommentUpsertWithWhereUniqueWithoutUserInput = {
  where: CommentWhereUniqueInput
  update: CommentUpdateWithoutUserDataInput
  create: CommentCreateWithoutUserInput
}

export type LikeUpdateWithWhereUniqueWithoutUserInput = {
  where: LikeWhereUniqueInput
  data: LikeUpdateWithoutUserDataInput
}

export type LikeUpdateManyWithWhereNestedInput = {
  where: LikeScalarWhereInput
  data: LikeUpdateManyDataInput
}

export type LikeScalarWhereInput = {
  AND?: LikeScalarWhereInput | Enumerable<LikeScalarWhereInput>
  OR?: LikeScalarWhereInput | Enumerable<LikeScalarWhereInput>
  NOT?: LikeScalarWhereInput | Enumerable<LikeScalarWhereInput>
  id?: IntFilter | number
  userId?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
}

export type LikeUpsertWithWhereUniqueWithoutUserInput = {
  where: LikeWhereUniqueInput
  update: LikeUpdateWithoutUserDataInput
  create: LikeCreateWithoutUserInput
}

export type PostUpdateWithWhereUniqueWithoutUserInput = {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutUserDataInput
}

export type PostUpdateManyWithWhereNestedInput = {
  where: PostScalarWhereInput
  data: PostUpdateManyDataInput
}

export type PostScalarWhereInput = {
  AND?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  OR?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  NOT?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>
  id?: IntFilter | number
  body?: StringFilter | string
  userId?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
}

export type PostUpsertWithWhereUniqueWithoutUserInput = {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutUserDataInput
  create: PostCreateWithoutUserInput
}

export type UserCreateWithoutCommentsInput = {
  username?: string | null
  password?: string | null
  createdAt?: Date | string
  email: string
  likes?: LikeCreateManyWithoutUserInput
  posts?: PostCreateManyWithoutUserInput
}

export type UserUpdateWithoutCommentsDataInput = {
  username?: string | NullableStringFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  likes?: LikeUpdateManyWithoutUserInput
  posts?: PostUpdateManyWithoutUserInput
}

export type UserUpsertWithoutCommentsInput = {
  update: UserUpdateWithoutCommentsDataInput
  create: UserCreateWithoutCommentsInput
}

export type UserCreateWithoutLikesInput = {
  username?: string | null
  password?: string | null
  createdAt?: Date | string
  email: string
  comments?: CommentCreateManyWithoutUserInput
  posts?: PostCreateManyWithoutUserInput
}

export type UserUpdateWithoutLikesDataInput = {
  username?: string | NullableStringFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  comments?: CommentUpdateManyWithoutUserInput
  posts?: PostUpdateManyWithoutUserInput
}

export type UserUpsertWithoutLikesInput = {
  update: UserUpdateWithoutLikesDataInput
  create: UserCreateWithoutLikesInput
}

export type UserCreateWithoutPostsInput = {
  username?: string | null
  password?: string | null
  createdAt?: Date | string
  email: string
  comments?: CommentCreateManyWithoutUserInput
  likes?: LikeCreateManyWithoutUserInput
}

export type UserUpdateWithoutPostsDataInput = {
  username?: string | NullableStringFieldUpdateOperationsInput | null
  password?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  comments?: CommentUpdateManyWithoutUserInput
  likes?: LikeUpdateManyWithoutUserInput
}

export type UserUpsertWithoutPostsInput = {
  update: UserUpdateWithoutPostsDataInput
  create: UserCreateWithoutPostsInput
}

export type CommentUpdateWithoutUserDataInput = {
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type CommentUpdateManyDataInput = {
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type LikeUpdateWithoutUserDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type LikeUpdateManyDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type PostUpdateWithoutUserDataInput = {
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type PostUpdateManyDataInput = {
  body?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
