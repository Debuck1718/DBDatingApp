const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/signup', (req, res) => {
  const data = req.body;
  try {
    db.prepare(`
      INSERT INTO users (
        firstname, surname, username, email, phone, race, country, city,
        employment, education, age, parentOccupation, familyIncome, annualIncome, password
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      data.firstname, data.surname, data.username, data.email, data.phone,
      data.race, data.country, data.city, data.employment, data.education,
      data.age, data.parentOccupation, data.familyIncome, data.annualIncome,
      data.password
    );
    res.status(201).send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: 'Signup failed. Username might be taken.' });
  }
});

