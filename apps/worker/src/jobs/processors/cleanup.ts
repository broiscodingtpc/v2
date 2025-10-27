import Bull from 'bull';
import { PrismaClient } from '@prisma/client';
import { createLogger } from '@/utils/logger';
import { CleanupJob } from '@/types';
import { config } from '@/config';

const log = createLogger('cleanup-processor');
const prisma = new PrismaClient();

/**
 * Process cleanup job
 */
export async function processCleanup(job: Bull.Job<CleanupJob>): Promise<any> {
  const { cleanupTypes, batchId } = job.data;
  
  log.info(`Processing cleanup job: ${batchId}`, {
    cleanupTypes
  });

  try {
    const results = {
      processed: 0,
      failed: 0,
      deletedRecords: 0,
      cleanedTables: [] as string[]
    };

    const totalTypes = cleanupTypes.length;

    for (let i = 0; i < cleanupTypes.length; i++) {
      const cleanupType = cleanupTypes[i];
      
      // Update job progress
      const progress = Math.floor((i / totalTypes) * 100);
      job.progress(progress);
      
      try {
        log.info(`Processing cleanup type: ${cleanupType}`);
        
        let deletedCount = 0;
        
        switch (cleanupType) {
          case 'expired_signals':
            deletedCount = await cleanupExpiredSignals();
            break;
          case 'old_metrics':
            deletedCount = await cleanupOldMetrics();
            break;
          case 'old_social_data':
            deletedCount = await cleanupOldSocialData();
            break;
          case 'old_analyses':
            deletedCount = await cleanupOldAnalyses();
            break;
          case 'inactive_tokens':
            deletedCount = await cleanupInactiveTokens();
            break;
          case 'old_logs':
            deletedCount = await cleanupOldLogs();
            break;
          case 'duplicate_records':
            deletedCount = await cleanupDuplicateRecords();
            break;
          case 'orphaned_data':
            deletedCount = await cleanupOrphanedData();
            break;
          default:
            log.warn(`Unknown cleanup type: ${cleanupType}`);
            results.failed++;
            continue;
        }

        results.deletedRecords += deletedCount;
        results.cleanedTables.push(cleanupType);
        results.processed++;
        
        log.info(`Cleanup completed for ${cleanupType}`, {
          deletedRecords: deletedCount
        });

      } catch (error) {
        log.error(`Failed to process cleanup type: ${cleanupType}`, error);
        results.failed++;
      }
    }

    // Perform database optimization
    await optimizeDatabase();

    log.info(`Cleanup job completed: ${batchId}`, {
      processed: results.processed,
      failed: results.failed,
      deletedRecords: results.deletedRecords,
      cleanedTables: results.cleanedTables
    });

    return {
      batchId,
      processed: results.processed,
      failed: results.failed,
      deletedRecords: results.deletedRecords,
      cleanedTables: results.cleanedTables
    };

  } catch (error) {
    log.error(`Cleanup job failed: ${batchId}`, error);
    throw error;
  }
}

/**
 * Clean up expired signals
 */
async function cleanupExpiredSignals(): Promise<number> {
  try {
    const result = await prisma.signal.deleteMany({
      where: {
        OR: [
          {
            expiresAt: {
              lt: new Date()
            }
          },
          {
            status: 'expired'
          },
          {
            createdAt: {
              lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Older than 7 days
            }
          }
        ]
      }
    });

    log.info(`Cleaned up ${result.count} expired signals`);
    return result.count;

  } catch (error) {
    log.error('Failed to cleanup expired signals', error);
    throw error;
  }
}

/**
 * Clean up old token metrics
 */
async function cleanupOldMetrics(): Promise<number> {
  try {
    const retentionDays = config.dataRetention.tokenMetrics || 30;
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

    const result = await prisma.tokenMetrics.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate
        }
      }
    });

    log.info(`Cleaned up ${result.count} old token metrics (older than ${retentionDays} days)`);
    return result.count;

  } catch (error) {
    log.error('Failed to cleanup old metrics', error);
    throw error;
  }
}

/**
 * Clean up old social data
 */
async function cleanupOldSocialData(): Promise<number> {
  try {
    const retentionDays = config.dataRetention.socialMetrics || 14;
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

    // Clean up social metrics
    const socialResult = await prisma.socialMetrics.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate
        }
      }
    });

    // Clean up trending topics
    const trendingResult = await prisma.trendingTopic.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate
        }
      }
    });

    const totalDeleted = socialResult.count + trendingResult.count;
    log.info(`Cleaned up ${totalDeleted} old social data records (older than ${retentionDays} days)`);
    return totalDeleted;

  } catch (error) {
    log.error('Failed to cleanup old social data', error);
    throw error;
  }
}

/**
 * Clean up old AI analyses
 */
async function cleanupOldAnalyses(): Promise<number> {
  try {
    const retentionDays = config.dataRetention.aiAnalysis || 7;
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

    // Clean up technical analyses
    const technicalResult = await prisma.technicalAnalysis.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate
        }
      }
    });

    // Clean up sentiment analyses
    const sentimentResult = await prisma.sentimentAnalysis.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate
        }
      }
    });

    // Clean up AI analyses
    const aiResult = await prisma.aiAnalysis.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate
        }
      }
    });

    const totalDeleted = technicalResult.count + sentimentResult.count + aiResult.count;
    log.info(`Cleaned up ${totalDeleted} old analysis records (older than ${retentionDays} days)`);
    return totalDeleted;

  } catch (error) {
    log.error('Failed to cleanup old analyses', error);
    throw error;
  }
}

/**
 * Clean up inactive tokens
 */
async function cleanupInactiveTokens(): Promise<number> {
  try {
    const inactivityDays = 30; // Tokens with no activity for 30 days
    const cutoffDate = new Date(Date.now() - inactivityDays * 24 * 60 * 60 * 1000);

    // Find tokens with no recent metrics
    const inactiveTokens = await prisma.token.findMany({
      where: {
        AND: [
          {
            updatedAt: {
              lt: cutoffDate
            }
          },
          {
            tokenMetrics: {
              none: {
                timestamp: {
                  gte: cutoffDate
                }
              }
            }
          },
          {
            signals: {
              none: {
                createdAt: {
                  gte: cutoffDate
                }
              }
            }
          }
        ]
      },
      select: { address: true }
    });

    let deletedCount = 0;

    // Delete inactive tokens and their related data
    for (const token of inactiveTokens) {
      try {
        // Delete related data first (due to foreign key constraints)
        await prisma.socialMetrics.deleteMany({
          where: { tokenAddress: token.address }
        });

        await prisma.tokenMetrics.deleteMany({
          where: { tokenAddress: token.address }
        });

        await prisma.technicalAnalysis.deleteMany({
          where: { tokenAddress: token.address }
        });

        await prisma.sentimentAnalysis.deleteMany({
          where: { tokenAddress: token.address }
        });

        await prisma.aiAnalysis.deleteMany({
          where: { tokenAddress: token.address }
        });

        // Finally delete the token
        await prisma.token.delete({
          where: { address: token.address }
        });

        deletedCount++;

      } catch (error) {
        log.error(`Failed to delete inactive token: ${token.address}`, error);
      }
    }

    log.info(`Cleaned up ${deletedCount} inactive tokens (inactive for ${inactivityDays} days)`);
    return deletedCount;

  } catch (error) {
    log.error('Failed to cleanup inactive tokens', error);
    throw error;
  }
}

/**
 * Clean up old application logs (if stored in database)
 */
async function cleanupOldLogs(): Promise<number> {
  try {
    // This would depend on your logging setup
    // For now, we'll just return 0 as logs are typically handled by external systems
    log.info('Log cleanup skipped (logs handled externally)');
    return 0;

  } catch (error) {
    log.error('Failed to cleanup old logs', error);
    throw error;
  }
}

/**
 * Clean up duplicate records
 */
async function cleanupDuplicateRecords(): Promise<number> {
  try {
    let deletedCount = 0;

    // Clean up duplicate token metrics (same token, same timestamp)
    const duplicateMetrics = await prisma.$queryRaw`
      SELECT tokenAddress, timestamp, COUNT(*) as count
      FROM TokenMetrics
      GROUP BY tokenAddress, timestamp
      HAVING COUNT(*) > 1
    ` as Array<{ tokenAddress: string; timestamp: Date; count: number }>;

    for (const duplicate of duplicateMetrics) {
      // Keep the first record, delete the rest
      const records = await prisma.tokenMetrics.findMany({
        where: {
          tokenAddress: duplicate.tokenAddress,
          timestamp: duplicate.timestamp
        },
        orderBy: { id: 'asc' }
      });

      if (records.length > 1) {
        const toDelete = records.slice(1); // Keep first, delete rest
        for (const record of toDelete) {
          await prisma.tokenMetrics.delete({
            where: { id: record.id }
          });
          deletedCount++;
        }
      }
    }

    // Clean up duplicate social metrics
    const duplicateSocial = await prisma.$queryRaw`
      SELECT tokenAddress, platform, timestamp, COUNT(*) as count
      FROM SocialMetrics
      GROUP BY tokenAddress, platform, timestamp
      HAVING COUNT(*) > 1
    ` as Array<{ tokenAddress: string; platform: string; timestamp: Date; count: number }>;

    for (const duplicate of duplicateSocial) {
      const records = await prisma.socialMetrics.findMany({
        where: {
          tokenAddress: duplicate.tokenAddress,
          platform: duplicate.platform,
          timestamp: duplicate.timestamp
        },
        orderBy: { id: 'asc' }
      });

      if (records.length > 1) {
        const toDelete = records.slice(1);
        for (const record of toDelete) {
          await prisma.socialMetrics.delete({
            where: { id: record.id }
          });
          deletedCount++;
        }
      }
    }

    log.info(`Cleaned up ${deletedCount} duplicate records`);
    return deletedCount;

  } catch (error) {
    log.error('Failed to cleanup duplicate records', error);
    throw error;
  }
}

/**
 * Clean up orphaned data (records without parent references)
 */
async function cleanupOrphanedData(): Promise<number> {
  try {
    let deletedCount = 0;

    // Clean up metrics for non-existent tokens
    const orphanedMetrics = await prisma.tokenMetrics.findMany({
      where: {
        token: null
      }
    });

    for (const metric of orphanedMetrics) {
      await prisma.tokenMetrics.delete({
        where: { id: metric.id }
      });
      deletedCount++;
    }

    // Clean up social metrics for non-existent tokens
    const orphanedSocial = await prisma.socialMetrics.findMany({
      where: {
        token: null
      }
    });

    for (const social of orphanedSocial) {
      await prisma.socialMetrics.delete({
        where: { id: social.id }
      });
      deletedCount++;
    }

    // Clean up analyses for non-existent tokens
    const orphanedTechnical = await prisma.technicalAnalysis.findMany({
      where: {
        token: null
      }
    });

    for (const analysis of orphanedTechnical) {
      await prisma.technicalAnalysis.delete({
        where: { id: analysis.id }
      });
      deletedCount++;
    }

    log.info(`Cleaned up ${deletedCount} orphaned records`);
    return deletedCount;

  } catch (error) {
    log.error('Failed to cleanup orphaned data', error);
    throw error;
  }
}

/**
 * Optimize database performance
 */
async function optimizeDatabase(): Promise<void> {
  try {
    log.info('Starting database optimization');

    // Update table statistics (PostgreSQL specific)
    await prisma.$executeRaw`ANALYZE`;

    // Vacuum to reclaim space (would need to be done outside transaction)
    // This is typically handled by database maintenance scripts

    log.info('Database optimization completed');

  } catch (error) {
    log.error('Failed to optimize database', error);
    // Don't throw error as this is not critical
  }
}

/**
 * Get cleanup statistics
 */
export async function getCleanupStatistics(): Promise<Record<string, any>> {
  try {
    const stats = {
      totalTokens: await prisma.token.count(),
      totalMetrics: await prisma.tokenMetrics.count(),
      totalSocialMetrics: await prisma.socialMetrics.count(),
      totalSignals: await prisma.signal.count(),
      totalAnalyses: {
        technical: await prisma.technicalAnalysis.count(),
        sentiment: await prisma.sentimentAnalysis.count(),
        ai: await prisma.aiAnalysis.count()
      },
      expiredSignals: await prisma.signal.count({
        where: {
          OR: [
            { expiresAt: { lt: new Date() } },
            { status: 'expired' }
          ]
        }
      }),
      oldMetrics: await prisma.tokenMetrics.count({
        where: {
          timestamp: {
            lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      inactiveTokens: await prisma.token.count({
        where: {
          updatedAt: {
            lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      })
    };

    return stats;

  } catch (error) {
    log.error('Failed to get cleanup statistics', error);
    return {};
  }
}

/**
 * Schedule automatic cleanup based on configuration
 */
export function getRecommendedCleanupTypes(): string[] {
  const cleanupTypes = [];

  // Always include basic cleanup
  cleanupTypes.push('expired_signals');
  cleanupTypes.push('duplicate_records');
  cleanupTypes.push('orphaned_data');

  // Add data retention cleanup based on config
  if (config.dataRetention.tokenMetrics) {
    cleanupTypes.push('old_metrics');
  }

  if (config.dataRetention.socialMetrics) {
    cleanupTypes.push('old_social_data');
  }

  if (config.dataRetention.aiAnalysis) {
    cleanupTypes.push('old_analyses');
  }

  // Add inactive token cleanup if enabled
  if (config.features.cleanupInactiveTokens) {
    cleanupTypes.push('inactive_tokens');
  }

  return cleanupTypes;
}