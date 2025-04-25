
const express = require('express');
const db = require('../db');
const router = express.Router();

// Update user profile route
router.post('/update', (req, res) => {
  const {
    firstname, surname, email, phone, race,
    country, city, employment, education, age,
    parentOccupation, familyIncome, annualIncome, username
  } = req.body;

  const query = `
    UPDATE users
    SET
      firstname = ?,
      surname = ?,
      email = ?,
      phone = ?,
      race = ?,
      country = ?,
      city = ?,
      employment = ?,
      education = ?,
      age = ?,
      parentOccupation = ?,
      familyIncome = ?,
      annualIncome = ?
    WHERE username = ?
  `;

  const values = [
    firstname, surname, email, phone, race,
    country, city, employment, education, age,
    parentOccupation, familyIncome, annualIncome, username
  ];

  db.run(query, values, function (err) {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: 'Profile updated successfully' });
  });
});

module.exports = router;
