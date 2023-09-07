var mysql = require("mysql");
var myDBconn = mysql.createConnection({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: 3306,
    database: process.env.DATABASE
});

module.exports = myDBconn;