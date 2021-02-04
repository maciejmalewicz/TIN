var mysql = require('mysql');

exports.getConnection = () => {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'tin'
      });
      
      connection.connect(function(err) {
          if (err) return null;
          console.log("Connected!");
      });
      return connection;
}


