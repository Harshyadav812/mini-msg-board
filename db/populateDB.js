#! /usr/bin/env node
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

const insertDataQuery = `
  INSERT INTO messages (username, message) VALUES
  ('alice', 'Hello, this is Alice!'),
  ('bob', 'Hey there, Bob here!'),
  ('charlie', 'Charlie says hi!')
`;

async function populateDB() {
  try {
    await pool.connect();
    await pool.query(createTableQuery);
    console.log("Table 'messages' created (if not exists).");

    await pool.query(insertDataQuery);

    pool.end();
  } catch (err) {
    console.error("Error populating database:", err);
    pool.end();
  }
}

populateDB();

console.log("Database URL:", process.env.DATABASE_URL);
