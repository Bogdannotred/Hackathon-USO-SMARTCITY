const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Check if admin user exists to avoid duplicate entries.
  const adminUserExists = await prisma.user.findUnique({ where: { email: 'admin@example.com' } });
  if (!adminUserExists) {
    const hashedPassword = await bcrypt.hash('adminpassword', 10); // Secure this in production!
    await prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: hashedPassword,
      },
    });
    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists.');
  }

  // Add more seed data as needed...  Example for a 'Product' model:
  // const product = await prisma.product.create({ data: { name: "Example Product", price: 19.99 } });
  // console.log('Product created:', product);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });