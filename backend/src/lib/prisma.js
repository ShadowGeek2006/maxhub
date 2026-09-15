import { PrismaClient } from '@prisma/client';
import { env } from '../config/env.js';

// One PrismaClient instance shared across the app (recommended by Prisma
// to avoid exhausting DB connections, especially under --watch reloads).
export const prisma = new PrismaClient({
  log: env.nodeEnv === 'development' ? ['warn', 'error'] : ['error'],
});
