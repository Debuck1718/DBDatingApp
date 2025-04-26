

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    console.error('Database opening error:', err.message);
  } else {
    console.log('Connected to SQLite database.');

    // Create tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT,
        surname TEXT,
        username TEXT UNIQUE,
        email TEXT,
        phone TEXT,
        race TEXT,
        country TEXT,
        city TEXT,
        employment TEXT,
        education TEXT,
        age INTEGER,
        parentOccupation TEXT,
        familyIncome TEXT,
        annualIncome TEXT,
        password TEXT
      );

      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT,
        receiver TEXT,
        message TEXT,
        timestamp TEXT
      );
    `, (execErr) => {
      if (execErr) {
        console.error('Error creating tables:', execErr.message);
      } else {
        console.log('Tables ensured.');
      }
    });
  }
});


module.exports = db;
