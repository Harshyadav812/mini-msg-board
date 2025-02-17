#! /usr/bin/env node
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- Add a unique constraint if it doesn't exist
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conname = 'unique_username_message'
    ) THEN
      ALTER TABLE messages ADD CONSTRAINT unique_username_message UNIQUE (username, message);
    END IF;
  END $$;

`;

const insertDataQuery = `
  INSERT INTO messages (username, message) VALUES
  ('alice', 'Hello, this is Alice!'),
  ('bob', 'Hey there, Bob here!'),
  ('charlie', 'Charlie says hi!')
  ON CONFLICT ON CONSTRAINT unique_username_message DO NOTHING;
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

