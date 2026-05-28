import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin account
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'change-me-admin-2024!', 12)
  
  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@sagarkandel.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@sagarkandel.com',
      passwordHash: hash,
    },
  })

  console.log('✅ Admin account created')
  console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@sagarkandel.com'}`)
  console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'change-me-admin-2024!'}`)
  console.log('   ⚠️  Change this password immediately in production!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
