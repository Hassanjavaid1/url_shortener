const mysql2 = require("mysql2");
// if (
//   (process.env.HOST === true,
//   process.env.USER === true,
//   process.env.PASSWORD === true,
//   process.env.DATABASE === true)
// ) {
//   const db = mysql2.createConnection({
//     host: process.env.HOST || "",
//     user: process.env.USER || "",
//     password: process.env.PASSWORD || "",
//     database: process.env.DATABASE || "",
//   });
// }
let db = true;

module.exports = db;
