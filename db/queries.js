const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function getAllMessages() {
  try {
    const res = await pool.query("SELECT * FROM messages ORDER BY id;");
    return res.rows;
  }
  catch (err) {
    console.error("Error fetching messages:", err);
    throw err;
  }
}

async function insertMessage(username, message) {
  const query = "INSERT INTO messages (username, message) VALUES ($1, $2);";
  try {
    await pool.query(query, [username, message]);
  } catch (err) {
    console.error("Error inserting message:", err);
    throw err;
  }
}

async function updateMessage(id, newMessage) {
  const query = "UPDATE messages SET message = $1 WHERE id =$2;"
  try {
    await pool.query(query, [newMessage, id]);
  } catch (err) {
    console.error("Error updating message:", err);
    throw err;
  }
}

async function deleteMessage(id) {
  const query = "DELETE FROM messages WHERE id = $1";
  try {
    await pool.query(query, [id]);
  } catch (err) {
    console.error("Error deleting message:", err);
    throw err;
  }
}

module.exports = { getAllMessages, insertMessage, updateMessage, deleteMessage };