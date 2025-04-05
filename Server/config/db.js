const mysql2 = require("mysql2");
if (
  (process.env.HOST === false,
  process.env.USER === false,
  process.env.PASSWORD === false,
  process.env.DATABASE === false)
) {
  return null;
}
const db = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
module.exports = db;
