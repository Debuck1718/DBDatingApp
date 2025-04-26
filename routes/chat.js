const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/:user1/:user2', (req, res) => {
  const { user1, user2 } = req.params;
  const messages = db.prepare(`
    SELECT * FROM messages
    WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)
    ORDER BY id ASC
  `).all(user1, user2, user2, user1);

  res.json(messages);
});

module.exports = router;
