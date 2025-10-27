import Bull from 'bull';
import { config } from '@/config';
import { createLogger } from '@/utils/logger';
import { 
  TokenDataJob, 
  SocialDataJob, 
  AIAnalysisJob, 
  SignalGenerationJob,
  WorkerMetrics 
} from '@/types';

const log = createLogger('jobs');

// Job Queue Configuration
const queueConfig = {
  redis: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    password: config.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: 3,
    retryDelayOnFailover: 100,
    lazyConnect: true
  },
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

// Create job queues
export const tokenDataQueue = new Bull('token-data', queueConfig);
export const socialDataQueue = new Bull('social-data', queueConfig);
export const aiAnalysisQueue = new Bull('ai-analysis', queueConfig);
export const signalGenerationQueue = new Bull('signal-generation', queueConfig);
export const cleanupQueue = new Bull('cleanup', queueConfig);

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
}

/**
 * Set up event listeners for job queues
 */
function setupEventListeners() {
  const queues = [tokenDataQueue, socialDataQueue, aiAnalysisQueue, signalGenerationQueue, cleanupQueue];
  
  queues.forEach(queue => {
    const queueName = queue.name;
    
    queue.on('completed', (job, result) => {
      log.jobComplete(job.id, queueName, job.processedOn ? Date.now() - job.processedOn : 0, {
        result: typeof result === 'object' ? JSON.stringify(result).substring(0, 100) : result
      });
    });
    
    queue.on('failed', (job, err) => {
      log.jobFailed(job.id, queueName, err, {
        attempts: job.attemptsMade,
        data: JSON.stringify(job.data).substring(0, 200)
      });
    });
    
    queue.on('stalled', (job) => {
      log.warn(`Job stalled: ${queueName}`, { jobId: job.id });
    });
    
    queue.on('progress', (job, progress) => {
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
): Promise<Bull.Job<TokenDataJob>> {
  const jobData: TokenDataJob = {
    tokenAddresses,
    network,
    batchId: `batch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };

  const job = await tokenDataQueue.add('fetch-token-data', jobData, {
    priority,
    delay,
    jobId: `token-data-${jobData.batchId}`
  });

  log.jobStart(job.id, 'token-data', { 
    tokenCount: tokenAddresses.length, 
    network,
    batchId: jobData.batchId 
  });

  return job;
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
): Promise<Bull.Job<SocialDataJob>> {
  const jobData: SocialDataJob = {
    tokens,
    platform,
    keywords,
    batchId: `social-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };

  const job = await socialDataQueue.add('fetch-social-data', jobData, {
    priority,
    delay,
    jobId: `social-data-${jobData.batchId}`
  });

  log.jobStart(job.id, 'social-data', { 
    tokenCount: tokens.length, 
    platform,
    batchId: jobData.batchId 
  });

  return job;
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
): Promise<Bull.Job<AIAnalysisJob>> {
  const jobData: AIAnalysisJob = {
    tokenId,
    analysisType,
    data
  };

  const job = await aiAnalysisQueue.add('generate-analysis', jobData, {
    priority,
    delay,
    jobId: `ai-analysis-${tokenId}-${analysisType}-${Date.now()}`
  });

  log.jobStart(job.id, 'ai-analysis', { tokenId, analysisType });

  return job;
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
): Promise<Bull.Job<SignalGenerationJob>> {
  const jobData: SignalGenerationJob = {
    tokenId,
    analyses,
    marketData,
    socialData
  };

  const job = await signalGenerationQueue.add('generate-signal', jobData, {
    priority,
    delay,
    jobId: `signal-${tokenId}-${Date.now()}`
  });

  log.jobStart(job.id, 'signal-generation', { tokenId });

  return job;
}

/**
 * Add cleanup job
 */
export async function addCleanupJob(
  type: 'old_data' | 'expired_signals' | 'logs',
  olderThanDays: number = 30,
  priority: number = -1 // Lower priority
): Promise<Bull.Job> {
  const jobData = {
    type,
    olderThanDays,
    timestamp: new Date()
  };

  const job = await cleanupQueue.add('cleanup-data', jobData, {
    priority,
    jobId: `cleanup-${type}-${Date.now()}`
  });

  log.jobStart(job.id, 'cleanup', { type, olderThanDays });

  return job;
}

/**
 * Schedule recurring jobs
 */
export function scheduleRecurringJobs() {
  log.info('Scheduling recurring jobs');

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
}

/**
 * Get queue statistics
 */
export async function getQueueStats(): Promise<WorkerMetrics> {
  const queues = [tokenDataQueue, socialDataQueue, aiAnalysisQueue, signalGenerationQueue, cleanupQueue];
  
  let totalCompleted = 0;
  let totalFailed = 0;
  let totalWaiting = 0;
  let totalActive = 0;

  for (const queue of queues) {
    const completed = await queue.getCompleted();
    const failed = await queue.getFailed();
    const waiting = await queue.getWaiting();
    const active = await queue.getActive();

    totalCompleted += completed.length;
    totalFailed += failed.length;
    totalWaiting += waiting.length;
    totalActive += active.length;
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
  
  const queues = [tokenDataQueue, socialDataQueue, aiAnalysisQueue, signalGenerationQueue, cleanupQueue];
  
  await Promise.all(queues.map(queue => queue.pause()));
  
  log.info('All job queues paused');
}

/**
 * Resume all queues
 */
export async function resumeAllQueues() {
  log.info('Resuming all job queues');
  
  const queues = [tokenDataQueue, socialDataQueue, aiAnalysisQueue, signalGenerationQueue, cleanupQueue];
  
  await Promise.all(queues.map(queue => queue.resume()));
  
  log.info('All job queues resumed');
}

/**
 * Clean all queues
 */
export async function cleanAllQueues() {
  log.info('Cleaning all job queues');
  
  const queues = [tokenDataQueue, socialDataQueue, aiAnalysisQueue, signalGenerationQueue, cleanupQueue];
  
  await Promise.all(queues.map(async queue => {
    await queue.clean(24 * 60 * 60 * 1000, 'completed'); // Clean completed jobs older than 24h
    await queue.clean(7 * 24 * 60 * 60 * 1000, 'failed'); // Clean failed jobs older than 7 days
  }));
  
  log.info('All job queues cleaned');
}

/**
 * Graceful shutdown
 */
export async function shutdownQueues() {
  log.info('Shutting down job queues');
  
  const queues = [tokenDataQueue, socialDataQueue, aiAnalysisQueue, signalGenerationQueue, cleanupQueue];
  
  // Pause all queues first
  await pauseAllQueues();
  
  // Wait for active jobs to complete (with timeout)
  const timeout = 30000; // 30 seconds
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const activeJobs = await Promise.all(queues.map(queue => queue.getActive()));
    const totalActive = activeJobs.reduce((sum, jobs) => sum + jobs.length, 0);
    
    if (totalActive === 0) break;
    
    log.info(`Waiting for ${totalActive} active jobs to complete...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Close all queues
  await Promise.all(queues.map(queue => queue.close()));
  
  log.info('Job queues shut down');
}