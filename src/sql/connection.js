// const mysql = require("mysql2");
// require("dotenv").config();

// class Connection {
//   constructor() {
//     if (!this.pool) {
//       console.log("creating connection...");
//       this.pool = mysql.createPool({
//         connectionLimit: 100,
//         host: process.env.HOST,
//         user: process.env.DB_USER,
//         password: process.env.PW,
//         database: process.env.DB,
//       });

//       return this.pool;
//     }

//     return this.pool;
//   }
// }

// const instance = new Connection();

// module.exports = instance;