import Bull from 'bull';
import { config } from '@/config';
import { createLogger } from '@/utils/logger';
import { makeRedis, testRedisConnection as testRedis } from '@/services/redis';
import { 
  TokenDataJob, 
  SocialDataJob, 
  AIAnalysisJob, 
  SignalGenerationJob,
  WorkerMetrics 
} from '@/types';

const log = createLogger('jobs');

// Create Redis connection with fallback
let redisConnection: any = null;
let queueConfig: any = null;

try {
  redisConnection = makeRedis();
  queueConfig = {
    redis: redisConnection,
    defaultJobOptions: {
      removeOnComplete: 100,
      removeOnFail: 50,
      attempts: config.JOB_ATTEMPTS,
      backoff: {
        type: 'exponential',
        delay: config.JOB_BACKOFF_DELAY
      }
    }
  };
  log.info('Redis connection created successfully');
} catch (error) {
  log.warn('Redis connection failed, using memory fallback:', error);
  // Fallback to memory-based queues (no persistence)
  queueConfig = {
    redis: {
      host: 'localhost',
      port: 6379,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      lazyConnect: true
    },
    defaultJobOptions: {
      removeOnComplete: 10,
      removeOnFail: 5,
      attempts: 1,
      backoff: {
        type: 'exponential',
        delay: 1000
      }
    }
  };
}

// Create job queues with error handling
let tokenDataQueue: Bull.Queue | null = null;
let socialDataQueue: Bull.Queue | null = null;
let aiAnalysisQueue: Bull.Queue | null = null;
let signalGenerationQueue: Bull.Queue | null = null;
let cleanupQueue: Bull.Queue | null = null;

try {
  tokenDataQueue = new Bull('token-data', queueConfig as any);
  socialDataQueue = new Bull('social-data', queueConfig as any);
  aiAnalysisQueue = new Bull('ai-analysis', queueConfig as any);
  signalGenerationQueue = new Bull('signal-generation', queueConfig as any);
  cleanupQueue = new Bull('cleanup', queueConfig as any);
  
  log.info('Job queues created successfully');
} catch (error) {
  log.error('Failed to create job queues:', error);
  // Don't throw error, just log and continue without queues
  log.warn('Continuing without job queues - some features will be disabled');
}

// Export queues
export { 
  tokenDataQueue, 
  socialDataQueue, 
  aiAnalysisQueue, 
  signalGenerationQueue, 
  cleanupQueue,
  testRedis as testRedisConnection
};

// Job processors
import { processTokenData } from './processors/tokenData';
import { processSocialData } from './processors/socialData';
import { processAIAnalysis } from './processors/aiAnalysis';
import { processSignalGeneration } from './processors/signalGeneration';
import { processCleanup } from './processors/cleanup';

/**
 * Initialize job processors
 */
export function initializeJobProcessors() {
  log.info('Initializing job processors');

  if (!tokenDataQueue || !socialDataQueue || !aiAnalysisQueue || !signalGenerationQueue || !cleanupQueue) {
    log.warn('Job queues not available, skipping processor initialization');
    return;
  }

  try {
    // Token data processing
    tokenDataQueue.process('fetch-token-data', config.JOB_CONCURRENCY, processTokenData);
    
    // Social data processing
    socialDataQueue.process('fetch-social-data', config.JOB_CONCURRENCY, processSocialData);
    
    // AI analysis processing
    aiAnalysisQueue.process('generate-analysis', Math.ceil(config.JOB_CONCURRENCY / 2), processAIAnalysis);
    
    // Signal generation processing
    signalGenerationQueue.process('generate-signal', Math.ceil(config.JOB_CONCURRENCY / 2), processSignalGeneration);
    
    // Cleanup processing
    cleanupQueue.process('cleanup-data', 1, processCleanup);

    // Set up event listeners
    setupEventListeners();
    
    log.info('Job processors initialized');
  } catch (error) {
    log.error('Failed to initialize job processors:', error);
    log.warn('Continuing without job processors');
  }
}

// Alias for backward compatibility
export const initializeQueues = initializeJobProcessors;

/**
 * Set up event listeners for job queues
 */
function setupEventListeners() {
  const queues = [tokenDataQueue, socialDataQueue, aiAnalysisQueue, signalGenerationQueue, cleanupQueue].filter(Boolean);
  
  if (queues.length === 0) {
    log.warn('No queues available for event listeners');
    return;
  }
  
  queues.forEach(queue => {
    const queueName = queue!.name;
    
    queue!.on('completed', (job, result) => {
      log.info(`Job ${job.id} (${queueName}) completed in ${job.processedOn ? Date.now() - job.processedOn : 0}ms`, {
        jobId: job.id,
        queueName,
        duration: job.processedOn ? Date.now() - job.processedOn : 0,
        result: typeof result === 'object' ? JSON.stringify(result).substring(0, 100) : result
      });
    });
    
    queue!.on('failed', (job, err) => {
      log.error(`Job ${job.id} (${queueName}) failed`, err, {
        jobId: job.id,
        queueName,
        attempts: job.attemptsMade,
        data: JSON.stringify(job.data).substring(0, 200)
      });
    });
    
    queue!.on('stalled', (job) => {
      log.warn(`Job stalled: ${queueName}`, { jobId: job.id });
    });
    
    queue!.on('progress', (job, progress) => {
      if (progress % 25 === 0) { // Log every 25% progress
        log.info(`Job progress: ${queueName}`, { jobId: job.id, progress: `${progress}%` });
      }
    });
  });
}

/**
 * Add token data collection job
 */
export async function addTokenDataJob(
  tokenAddresses: string[], 
  network: string = 'solana',
  priority: number = 0,
  delay: number = 0
): Promise<Bull.Job<TokenDataJob> | null> {
  if (!tokenDataQueue) {
    log.warn('Token data queue not available, skipping job');
    return null;
  }

  const jobData: TokenDataJob = {
    tokenAddresses,
    network,
    batchId: `batch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };

  try {
    const job = await tokenDataQueue.add('fetch-token-data', jobData, {
      priority,
      delay,
      jobId: `token-data-${jobData.batchId}`
    });

    log.info(`Job started: token-data`, {
      jobId: job.id,
      jobType: 'token-data',
      tokenCount: tokenAddresses.length,
      network,
      batchId: jobData.batchId
    });

    return job;
  } catch (error) {
    log.error('Failed to add token data job:', error);
    return null;
  }
}

/**
 * Add social data collection job
 */
export async function addSocialDataJob(
  tokens: string[], 
  platform: string = 'twitter',
  keywords: string[] = [],
  priority: number = 0,
  delay: number = 0
): Promise<Bull.Job<SocialDataJob> | null> {
  if (!socialDataQueue) {
    log.warn('Social data queue not available, skipping job');
    return null;
  }

  const jobData: SocialDataJob = {
    tokens,
    platform,
    keywords,
    batchId: `social-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };

  try {
    const job = await socialDataQueue.add('fetch-social-data', jobData, {
      priority,
      delay,
      jobId: `social-data-${jobData.batchId}`
    });

    log.info(`Job started: social-data`, {
      jobId: job.id,
      jobType: 'social-data',
      tokenCount: tokens.length,
      platform,
      batchId: jobData.batchId
    });

    return job;
  } catch (error) {
    log.error('Failed to add social data job:', error);
    return null;
  }
}

/**
 * Add AI analysis job
 */
export async function addAIAnalysisJob(
  tokenId: string,
  analysisType: 'technical' | 'fundamental' | 'sentiment' | 'social',
  data: any,
  priority: number = 0,
  delay: number = 0
): Promise<Bull.Job<AIAnalysisJob> | null> {
  if (!aiAnalysisQueue) {
    log.warn('AI analysis queue not available, skipping job');
    return null;
  }

  const jobData: AIAnalysisJob = {
    tokenId,
    analysisType,
    data
  };

  try {
    const job = await aiAnalysisQueue.add('generate-analysis', jobData, {
      priority,
      delay,
      jobId: `ai-analysis-${tokenId}-${analysisType}`
    });

    log.info(`Job started: ai-analysis`, {
      jobId: job.id,
      jobType: 'ai-analysis',
      tokenId,
      analysisType
    });

    return job;
  } catch (error) {
    log.error('Failed to add AI analysis job:', error);
    return null;
  }
}

/**
 * Add signal generation job
 */
export async function addSignalGenerationJob(
  tokenId: string,
  analyses: any[],
  marketData: any,
  socialData: any[],
  priority: number = 1, // Higher priority for signals
  delay: number = 0
): Promise<Bull.Job<SignalGenerationJob> | null> {
  if (!signalGenerationQueue) {
    log.warn('Signal generation queue not available, skipping job');
    return null;
  }

  const jobData: SignalGenerationJob = {
    tokenId,
    analyses,
    marketData,
    socialData
  };

  try {
    const job = await signalGenerationQueue.add('generate-signal', jobData, {
      priority,
      delay,
      jobId: `signal-${tokenId}-${Date.now()}`
    });

    log.info(`Job started: signal-generation`, {
      jobId: job.id,
      jobType: 'signal-generation',
      tokenId
    });

    return job;
  } catch (error) {
    log.error('Failed to add signal generation job:', error);
    return null;
  }
}

/**
 * Add cleanup job
 */
export async function addCleanupJob(
  type: 'old_data' | 'expired_signals' | 'logs',
  olderThanDays: number = 30,
  priority: number = -1 // Lower priority
): Promise<Bull.Job | null> {
  if (!cleanupQueue) {
    log.warn('Cleanup queue not available, skipping job');
    return null;
  }

  const jobData = {
    type,
    olderThanDays,
    timestamp: new Date()
  };

  try {
    const job = await cleanupQueue.add('cleanup-data', jobData, {
      priority,
      jobId: `cleanup-${type}-${Date.now()}`
    });

    log.info(`Job started: cleanup`, {
      jobId: job.id,
      jobType: 'cleanup',
      type,
      olderThanDays
    });

    return job;
  } catch (error) {
    log.error('Failed to add cleanup job:', error);
    return null;
  }
}

/**
 * Schedule recurring jobs
 */
export function scheduleRecurringJobs() {
  log.info('Scheduling recurring jobs');

  if (!tokenDataQueue || !socialDataQueue || !aiAnalysisQueue || !signalGenerationQueue || !cleanupQueue) {
    log.warn('Job queues not available, skipping recurring job scheduling');
    return;
  }

  try {
    // Token data collection - every 5 minutes
    tokenDataQueue.add('fetch-token-data', 
      { 
        tokenAddresses: [], // Will be populated by the processor
        network: 'solana',
        batchId: 'recurring-tokens'
      }, 
      { 
        repeat: { cron: `*/${config.TOKEN_DATA_INTERVAL} * * * *` },
        jobId: 'recurring-token-data'
      }
    );

    // Social data collection - every 15 minutes
    socialDataQueue.add('fetch-social-data',
      {
        tokens: [], // Will be populated by the processor
        platform: 'twitter',
        keywords: ['crypto', 'defi', 'solana'],
        batchId: 'recurring-social'
      },
      {
        repeat: { cron: `*/${config.SOCIAL_DATA_INTERVAL} * * * *` },
        jobId: 'recurring-social-data'
      }
    );

    // AI analysis - every 30 minutes
    aiAnalysisQueue.add('generate-analysis',
      {
        tokenId: 'batch',
        analysisType: 'technical',
        data: {}
      },
      {
        repeat: { cron: `*/${config.AI_ANALYSIS_INTERVAL} * * * *` },
        jobId: 'recurring-ai-analysis'
      }
    );

    // Signal generation - every hour
    signalGenerationQueue.add('generate-signal',
      {
        tokenId: 'batch',
        analyses: [],
        marketData: {},
        socialData: []
      },
      {
        repeat: { cron: `*/${config.SIGNAL_GENERATION_INTERVAL} * * * *` },
        jobId: 'recurring-signal-generation'
      }
    );

    // Cleanup - daily at 2 AM
    cleanupQueue.add('cleanup-data',
      {
        type: 'old_data',
        olderThanDays: config.DATA_RETENTION_DAYS,
        timestamp: new Date()
      },
      {
        repeat: { cron: '0 2 * * *' },
        jobId: 'daily-cleanup'
      }
    );

    log.info('Recurring jobs scheduled');
  } catch (error) {
    log.error('Failed to schedule recurring jobs:', error);
    log.warn('Continuing without recurring jobs');
  }
}

/**
 * Get queue statistics
 */
export async function getQueueStats(): Promise<WorkerMetrics> {
  const queues = [tokenDataQueue, socialDataQueue, aiAnalysisQueue, signalGenerationQueue, cleanupQueue].filter(Boolean);
  
  let totalCompleted = 0;
  let totalFailed = 0;
  let totalWaiting = 0;
  let totalActive = 0;

  if (queues.length === 0) {
    return {
      jobsProcessed: 0,
      jobsFailed: 0,
      averageProcessingTime: 0,
      tokensProcessed: 0,
      signalsGenerated: 0,
      apiCallsCount: 0,
      errorRate: 0,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024,
      timestamp: new Date()
    };
  }

  try {
    for (const queue of queues) {
      const completed = await queue!.getCompleted();
      const failed = await queue!.getFailed();
      const waiting = await queue!.getWaiting();
      const active = await queue!.getActive();

      totalCompleted += completed.length;
      totalFailed += failed.length;
      totalWaiting += waiting.length;
      totalActive += active.length;
    }
  } catch (error) {
    log.error('Error getting queue stats:', error);
  }

  const totalJobs = totalCompleted + totalFailed;
  const errorRate = totalJobs > 0 ? totalFailed / totalJobs : 0;

  return {
    jobsProcessed: totalCompleted,
    jobsFailed: totalFailed,
    averageProcessingTime: 0, // Would need to calculate from job data
    tokensProcessed: 0, // Would need to track separately
    signalsGenerated: 0, // Would need to track separately
    apiCallsCount: 0, // Would need to track separately
    errorRate,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // MB
    timestamp: new Date()
  };
}

/**
 * Pause all queues
 */
export async function pauseAllQueues() {
  log.info('Pausing all job queues');
  
  const queues = [tokenDataQueue, socialDataQueue, aiAnalysisQueue, signalGenerationQueue, cleanupQueue].filter(Boolean);
  
  if (queues.length === 0) {
    log.info('No job queues to pause');
    return;
  }
  
  try {
    await Promise.all(queues.map(queue => queue!.pause()));
    log.info('All job queues paused');
  } catch (error) {
    log.error('Error pausing queues:', error);
  }
}

/**
 * Resume all queues
 */
export async function resumeAllQueues() {
  log.info('Resuming all job queues');
  
  const queues = [tokenDataQueue, socialDataQueue, aiAnalysisQueue, signalGenerationQueue, cleanupQueue].filter(Boolean);
  
  if (queues.length === 0) {
    log.info('No job queues to resume');
    return;
  }
  
  try {
    await Promise.all(queues.map(queue => queue!.resume()));
    log.info('All job queues resumed');
  } catch (error) {
    log.error('Error resuming queues:', error);
  }
}

/**
 * Clean all queues
 */
export async function cleanAllQueues() {
  log.info('Cleaning all job queues');
  
  const queues = [tokenDataQueue, socialDataQueue, aiAnalysisQueue, signalGenerationQueue, cleanupQueue].filter(Boolean);
  
  if (queues.length === 0) {
    log.info('No job queues to clean');
    return;
  }
  
  try {
    await Promise.all(queues.map(async queue => {
      await queue!.clean(24 * 60 * 60 * 1000, 'completed'); // Clean completed jobs older than 24h
      await queue!.clean(7 * 24 * 60 * 60 * 1000, 'failed'); // Clean failed jobs older than 7 days
    }));
    
    log.info('All job queues cleaned');
  } catch (error) {
    log.error('Error cleaning queues:', error);
  }
}

/**
 * Graceful shutdown
 */
export async function shutdownQueues() {
  log.info('Shutting down job queues');
  
  const queues = [tokenDataQueue, socialDataQueue, aiAnalysisQueue, signalGenerationQueue, cleanupQueue].filter(Boolean);
  
  if (queues.length === 0) {
    log.info('No job queues to shut down');
    return;
  }
  
  try {
    // Pause all queues first
    await pauseAllQueues();
    
    // Wait for active jobs to complete (with timeout)
    const timeout = 30000; // 30 seconds
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const activeJobs = await Promise.all(queues.map(queue => queue!.getActive()));
      const totalActive = activeJobs.reduce((sum, jobs) => sum + jobs.length, 0);
      
      if (totalActive === 0) break;
      
      log.info(`Waiting for ${totalActive} active jobs to complete...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Close all queues
    await Promise.all(queues.map(queue => queue!.close()));
    
    log.info('Job queues shut down');
  } catch (error) {
    log.error('Error during queue shutdown:', error);
    log.warn('Forcing queue shutdown');
  }
}

// Alias for backward compatibility
export const gracefulShutdown = shutdownQueues;
