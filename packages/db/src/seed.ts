import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create some sample tokens
  const solToken = await prisma.token.upsert({
    where: { mint: 'So11111111111111111111111111111111111111112' },
    update: {},
    create: {
      mint: 'So11111111111111111111111111111111111111112',
      symbol: 'SOL',
      name: 'Solana',
      chain: 'sol',
    },
  });

  const usdcToken = await prisma.token.upsert({
    where: { mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
    update: {},
    create: {
      mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      symbol: 'USDC',
      name: 'USD Coin',
      chain: 'sol',
    },
  });

  // Create sample pairs
  await prisma.pair.upsert({
    where: { id: 'sol-usdc-raydium' },
    update: {},
    create: {
      id: 'sol-usdc-raydium',
      tokenId: solToken.id,
      dexId: 'raydium',
      base: 'SOL',
      quote: 'USDC',
      liqUsd: 1000000,
      price: 100.50,
      vol5m: 50000,
      vol1h: 200000,
      vol24h: 5000000,
    },
  });

  // Initialize job cursors
  await prisma.jobCursor.upsert({
    where: { source: 'dexscreener' },
    update: {},
    create: {
      source: 'dexscreener',
      cursor: { lastFetch: new Date().toISOString(), page: 0 },
    },
  });

  await prisma.jobCursor.upsert({
    where: { source: 'twitter' },
    update: {},
    create: {
      source: 'twitter',
      cursor: { lastTweetId: '0', lastFetch: new Date().toISOString() },
    },
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });