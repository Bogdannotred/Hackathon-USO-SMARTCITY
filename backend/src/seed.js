const { PrismaClient } = require('../prisma/src/generated/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Hash password once
  const commonPassword = await bcrypt.hash('1234567890', 10);

  // Create admin user: raulcalin@gmail.com
  const adminUser = await prisma.user.upsert({
    where: { email: 'raulcalin@gmail.com' },
    update: {},
    create: {
      email: 'raulcalin@gmail.com',
      name: 'Raul Calin',
      password: commonPassword,
      isAdmin: true,
      balance: 100,
    },
  });
  console.log('Admin user created or exists:', adminUser.email);

  // Create normal user: takacstamas@gmail.com
  const regularUser = await prisma.user.upsert({
    where: { email: 'takacstamas@gmail.com' },
    update: {},
    create: {
      email: 'takacstamas@gmail.com',
      name: 'Takacs Tamas',
      password: commonPassword,
      isAdmin: false,
      balance: 50,
    },
  });
  console.log('Regular user created or exists:', regularUser.email);

  // Create Parking Lot: PrimariaOradea
  const parkingLot = await prisma.parkingLot.upsert({
    where: { name: 'PrimariaOradea' },
    update: {},
    create: {
      name: 'PrimariaOradea',
      location: 'Piata Unirii 1, Oradea',
      totalSpaces: 2,
      availableSpaces: 2,
      price: 5.0,
    },
  });
  console.log('Parking lot created or exists:', parkingLot.name);

  // Create Parking Spaces S1 and S2 for PrimariaOradea
  const parkingSpacesData = ['S1', 'S2'];
  for (const spaceName of parkingSpacesData) {
    const existing = await prisma.parkingSpace.findFirst({
      where: { name: spaceName, parkingLotId: parkingLot.id },
    });

    if (!existing) {
      await prisma.parkingSpace.create({
        data: {
          name: spaceName,
          location: 'Inside Primaria Lot',
          parkingLotId: parkingLot.id,
          isAvailable: true,
        },
      });
      console.log(`Parking space ${spaceName} created.`);
    } else {
      console.log(`Parking space ${spaceName} already exists.`);
    }
  }
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
