

const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/:from/:to', (req, res) => {
  const { from, to } = req.params;
  db.all(
    'SELECT * FROM messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY id',
    [from, to, to, from],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
  
});

module.exports = router;
