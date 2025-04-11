const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const prisma = require('./db');

router.get('/', async (req, res) => {
  try {
    res.status(201).status(200).json({ message: 'Welcome to the API!' });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({ data: { email, name, password: hashedPassword } });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }
    res.json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;
