const express = require('express');
const db = require('../db');
const router = express.Router();

// Get profile
router.get('/:username', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(req.params.username);
  res.json(user);
});

// Update profile
router.post('/update/:username', (req, res) => {
  const d = req.body;
  try {
    db.prepare(`
      UPDATE users SET
        firstname = ?, surname = ?, email = ?, phone = ?, race = ?, country = ?, city = ?,
        employment = ?, education = ?, age = ?, parentOccupation = ?, familyIncome = ?, annualIncome = ?
      WHERE username = ?
    `).run(
      d.firstname, d.surname, d.email, d.phone, d.race, d.country, d.city,
      d.employment, d.education, d.age, d.parentOccupation, d.familyIncome, d.annualIncome,
      req.params.username
    );
    res.send({ success: true });
  } catch (err) {
    res.status(400).send({ error: 'Update failed' });
  }
});

module.exports = router;
