var c = require('./connection');

exports.create = (ingredient, res) => {
  let connection = c.getConnection();
    connection.query({
        sql: 'INSERT INTO ingredient (ingredient_name, ingredient_type) VALUES (?, ?)',
        timeout: 4000,
        values: [ingredient.name, ingredient.type]
      }, function (error, results, fields) {
        if (error == null){
          res.json({ status: 0, id: results.insertId })
        } else {
          res.json({ status: 400 })
        }
        connection.end();
      });
}

exports.read = (res) => {
  let connection = c.getConnection();
    connection.query({
        sql: 'SELECT id_ingredient as id, ingredient_name as name, ingredient_type as type FROM ingredient',
        timeout: 4000
    }, function (error, results, fields) {
        if (error == null){
          res.json(results);
        } else {
          res.json({ status: 400 });
        }
        connection.end();
    })
}

exports.update = (ingredient, res) => {
  let connection = c.getConnection();
    connection.query({
        sql: 'UPDATE ingredient SET ingredient_name = ?, ingredient_type = ? WHERE id_ingredient = ?',
        timeout: 4000,
        values: [ingredient.name, ingredient.type, ingredient.id]
    }, function (error, results, fields) {
        if (error == null){
          res.json({ status: 0 })
        } else {
          res.json({ status: 400 })
        }
        connection.end();
      })
}

exports.delete = (id, res) => {
  let connection = c.getConnection();
  connection.beginTransaction(err => {
    if (err){
      res.json({ status: 400 });
    }
    deleteIngredientConnections(connection, id)
    .then(result => {
      return deleteIngredient(connection, id)
    })
    .then(result2 => {
      connection.commit();
      connection.end();
      res.json({ status: 200})
    })
    .catch(err => {
      connection.rollback();
      connection.end();
      res.json({ status: 400 });
    })
  })
}

function deleteIngredient(connection, id){
  return new Promise((resolve, reject) => {
    connection.query({
      sql: 'DELETE FROM ingredient WHERE id_ingredient = ?',
      timeout: 4000,
      values: [id]
  }, function (error, results, fields) {
      if (error == null){
        resolve(results);
      } else {
        return reject(error);
      }
    })
  })
}

function deleteIngredientConnections(connection, id){
  return new Promise((resolve, reject) => {
    connection.query({
      sql: 'DELETE FROM ingredient_usage WHERE ingredient = ?',
      timeout: 4000,
      values: [id] 
    }, function(error, results, fields){
      if (error == null){
        resolve(results);
      } else {
        reject(error);
      }
    })
  });
}

