// Creates (or resets the password for) an admin user.
// Run on the server only — never expose this as an HTTP endpoint.
//
// Usage:
//   npm run create-admin -- <username> <password>

import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const [, , username, password] = process.argv;

if (!username || !password) {
  console.error('Usage: npm run create-admin -- <username> <password>');
  process.exit(1);
}

if (password.length < 8) {
  console.error('Password must be at least 8 characters.');
  process.exit(1);
}

const prisma = new PrismaClient();

try {
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });

  console.log(`Admin user ready: ${user.username} (id: ${user.id})`);
} catch (err) {
  console.error('Failed to create admin user:', err.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
