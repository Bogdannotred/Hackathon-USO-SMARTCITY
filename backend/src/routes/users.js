// backend/src/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

//Example route to get all users (requires authentication in a real application)
router.get('/', async (req, res) => {
  try {
    const users = await db.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;