
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  telegramUserId: 'telegramUserId',
  handle: 'handle',
  role: 'role',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.AuthLinkScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  nonce: 'nonce',
  expiresAt: 'expiresAt',
  usedAt: 'usedAt',
  createdAt: 'createdAt'
};

exports.Prisma.TokenScalarFieldEnum = {
  id: 'id',
  chain: 'chain',
  mint: 'mint',
  symbol: 'symbol',
  name: 'name',
  discoveredAt: 'discoveredAt',
  lastSeenAt: 'lastSeenAt'
};

exports.Prisma.PairScalarFieldEnum = {
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

exports.Prisma.WatchlistItemScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  tokenId: 'tokenId',
  alertPrefs: 'alertPrefs',
  createdAt: 'createdAt'
};

exports.Prisma.SignalEventScalarFieldEnum = {
  id: 'id',
  tokenId: 'tokenId',
  pairId: 'pairId',
  kind: 'kind',
  metrics: 'metrics',
  occurredAt: 'occurredAt'
};

exports.Prisma.SignalScoreScalarFieldEnum = {
  id: 'id',
  signalEventId: 'signalEventId',
  score: 'score',
  label: 'label',
  model: 'model',
  features: 'features',
  createdAt: 'createdAt'
};

exports.Prisma.AnalystReportScalarFieldEnum = {
  id: 'id',
  tokenId: 'tokenId',
  signalEventId: 'signalEventId',
  summaryShort: 'summaryShort',
  summaryLong: 'summaryLong',
  riskSummary: 'riskSummary',
  model: 'model',
  createdAt: 'createdAt'
};

exports.Prisma.SocialMentionScalarFieldEnum = {
  id: 'id',
  tokenId: 'tokenId',
  tweetId: 'tweetId',
  author: 'author',
  followers: 'followers',
  engagement: 'engagement',
  createdAt: 'createdAt'
};

exports.Prisma.UserAlertLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  signalEventId: 'signalEventId',
  channel: 'channel',
  deliveredAt: 'deliveredAt',
  status: 'status',
  failReason: 'failReason'
};

exports.Prisma.ApiKeyScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  label: 'label',
  hashedKey: 'hashedKey',
  scopes: 'scopes',
  createdAt: 'createdAt',
  revokedAt: 'revokedAt'
};

exports.Prisma.JobCursorScalarFieldEnum = {
  id: 'id',
  source: 'source',
  cursor: 'cursor',
  updatedAt: 'updatedAt'
};

exports.Prisma.VectorDocScalarFieldEnum = {
  id: 'id',
  tokenId: 'tokenId',
  kind: 'kind',
  content: 'content'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  FREE: 'FREE',
  PRO: 'PRO',
  ADMIN: 'ADMIN'
};

exports.UserStatus = exports.$Enums.UserStatus = {
  ACTIVE: 'ACTIVE',
  BANNED: 'BANNED'
};

exports.Prisma.ModelName = {
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

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
