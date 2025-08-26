var mysql = require("mysql2");

var con = mysql.createConnection({
    host: "localhost",  
    user: "root",        
    password: "hemu1234",        
    database: "sanskriti"   
});

module.exports = con;
