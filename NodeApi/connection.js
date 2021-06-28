const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
try{
    var connection =  mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });

    connection.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }

      console.log('Connected to the MySQL server.');
    });
}
catch(e){
  console.log(e);
}




  // connection.end(function(err) {
  //   if (err) {
  //     return console.log('error:' + err.message);
  //   }
  //   console.log('Close the database connection.');
  // });

  module.exports = connection;