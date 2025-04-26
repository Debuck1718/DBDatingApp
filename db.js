const Database = require('better-sqlite3');
const db = new Database('./chatapp.db');

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
`);

module.exports = db;
