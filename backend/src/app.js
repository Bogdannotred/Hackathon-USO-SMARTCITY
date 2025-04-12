
const express = require('express');
const routes = require('./routes');
const app = express();
const port = 3001;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/api`);
});

const { PrismaClient } = require('../prisma/src/generated/client'); // Adjust path if necessary. This assumes it is in src/generated/client
const prisma = new PrismaClient();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
