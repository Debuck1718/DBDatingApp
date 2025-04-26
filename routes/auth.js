const express = require('express');
const db = require('../db');
const router = express.Router();


// Sign up route
router.post('/signup', (req, res) => {
  const {
    firstname, surname, username, email, phone, race,
    country, city, employment, education, age,
    parentOccupation, familyIncome, annualIncome, password
  } = req.body;

  const query = `
    INSERT INTO users (
      firstname, surname, username, email, phone, race,
      country, city, employment, education, age,
      parentOccupation, familyIncome, annualIncome, password
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    firstname, surname, username, email, phone, race,
    country, city, employment, education, age,
    parentOccupation, familyIncome, annualIncome, password
  ];

  db.run(query, values, function (err) {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({
      success: true,
      message: 'User registered successfully',
      id: this.lastID
    });
  });
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, row) => {
      if (err) return res.status(500).json({ success: false, error: err.message });

      if (row) {
        res.json({ success: true, user: row });
      } else {
        res.json({ success: false, message: 'Invalid username or password' });
      }
    }
  );
});

module.exports = router;
