// server/db_layer/user_db.js
const pool = require("./db");

/**
 * username + password로 사용자 조회
 * - 로그인용
 * - 반환: { id, username, created_at } 또는 null
 */
async function findUserByCredentials(username, password) {
  const [rows] = await pool.query(
    "SELECT id, username, created_at FROM users WHERE username = ? AND password = ?",
    [username, password]
  );
  if (!rows || rows.length === 0) return null;
  return rows[0];
}
async function findUserById(id) {
  const [rows] = await pool.query(
    "SELECT id, username, created_at FROM users WHERE id = ? ",
    [id]
  );
  if (!rows || rows.length === 0) return null;
  return rows[0];
}
async function findUserByUsername(username) {
  const [rows] = await pool.query(
    "SELECT id, username,password FROM users WHERE username = ? ",
    [username]
  );
  if (!rows || rows.length === 0) return null;
  return rows[0];
}
async function createUser(username, password) {
  await pool.query("INSERT INTO USERS (username,password)VALUES(?,?)", [
    username,
    password,
  ]);
}
module.exports = {
  findUserByCredentials,
  findUserById,
  findUserByUsername,
  createUser,
};
