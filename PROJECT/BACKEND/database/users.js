var c = require('./connection');

exports.create = (user, res) => {
    let connection = c.getConnection();
    connection.query({
        sql: "insert into app_user(user_login, user_password, roles, first_name, last_name) "
        + "values (?, ?, 'USER', ?, ?)",
        values: [user.login, user.password, user.firstName, user.lastName],
        timeout: 4000
    }, function (error, results, fields) {
        if (error == null){
          res.json({ status: 200 })
        } else {
          res.json({ status: 400 })
        }
        connection.end();
    });
}

exports.login = (data, res) => {
  let connection = c.getConnection();
  connection.query({
    sql: "SELECT first_name, last_name FROM app_user WHERE user_login = ? AND user_password = ?",
    values: [data.login, data.password],
    timeout: 4000
  },  function (error, results, fields) {
    if (error != null){
      res.json({ status: 400 });
      connection.end();
      return;
    }
    if (results.length == 0){
        res.json({ status: 401 });
        connection.end();
        return;
    }
    let result = results[0];
    res.json({ 
      firstName: result.first_name,
      lastName: result.last_name,
      status: 200
     });
     connection.end();
    
  });
}