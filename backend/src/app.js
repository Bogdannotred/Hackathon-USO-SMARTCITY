const express = require('express');
const routes = require('./routes');
const app = express();
const port = 3001;

app.use(express.json());
app.use('/api', routes); // Mount the routes under /api

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/api`);
});

//Cleanup on exit
const prisma = require('./db');
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});