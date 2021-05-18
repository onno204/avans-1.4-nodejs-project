const logger = require('tracer').console()
const mysql = require('mysql');

const credentials = {
    address: "onno204.nl",
    username: "avans_1.4_samen_eten",
    password: "Xwty*j1r88A4-7QM",
    database: "avans_1.4_samen_eten",
}

exports.con = mysql.createConnection({
    host: credentials.address,
    user: credentials.username,
    password: credentials.password,
    database: credentials.database
});

exports.con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    logger.log("Database connected with id:", exports.con.threadId);
});
// database.con.query('SELECT * FROM users WHERE id = ?', [userId], function (error, results, fields) {
//     if (error) throw error;
//     // ...
// });