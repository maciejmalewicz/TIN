var c = require('./connection');

exports.create = (kebab, res) => {
  let connection = c.getConnection();
  connection.beginTransaction(err => {
    if (err){
      res.json({ status: 401 })
    }
    insertKebab(connection, kebab)
    .then(res => {
      return insertKebabConnections(connection, kebab)
    })
    .then((result) => {
      connection.commit();
      connection.end();
      res.json({ status: 0, id: kebab.id });
    }).catch((err) => {
      connection.rollback();
      connection.end();
      res.json({ status: 400 });
    })
  })
}

function insertKebab(connection, kebab){
  return new Promise((resolve, reject) => {
    connection.query({
      sql: 'INSERT INTO kebab (meal_name, meal_cost, meal_description) VALUES (?, ?, ?)',
      timeout: 4000,
      values: [kebab.name, kebab.cost, kebab.description]
    }, function (error, results, fields) {
      if (error == null){
        kebab.id = results.insertId;
        resolve(results)
      } else {
        return reject(error)
      }
    });
  }) 
}

function insertKebabConnections(connection, kebab){
  return new Promise((resolve, reject) => {
    let promises = [];
    for (ingredient of kebab.ingredients){
      let promise = insertSingleKebabConnection(connection, kebab.id, ingredient);
      promises.push(promise);
    }
    Promise.all(promises).then((rows) => {
      resolve(rows)
    }).catch((err) => {
      return reject(err)
    })
  })
}


function insertSingleKebabConnection(connection, id, ingredient){
  return new Promise((resolve, reject) => {
    connection.query({
      sql: 'INSERT INTO ingredient_usage (kebab, ingredient, amount) VALUES (?, ?, ?)',
      timeout: 4000,
      values: [id, ingredient.id, ingredient.amount]
    }, function (error, results, fields) {
      if (error != null){
        return reject(error);
      } else {
        resolve(results);
      }
    });
  })
}

exports.readAll = (res) => {
  let connection = c.getConnection();
  connection.query({
    sql: 'SELECT k.id_kebab AS id, k.meal_cost, k.meal_name, k.meal_description, '
    + 'i.id_ingredient, i.ingredient_name, i.ingredient_type, u.amount FROM kebab k '
    + 'JOIN ingredient_usage u ON u.kebab = k.id_kebab '
    + 'JOIN ingredient i ON i.id_ingredient = u.ingredient',
    timeout: 4000
  }, function (error, results, fields) {
    if (error == null){
      let processed = processQueryResults(results);
      res.json(processed);
    } else {
      res.json({ status: 400 })
    }
    connection.end();
  });
}

//function making records more pretty
function processQueryResults(results){
  results = results.sort((a, b) => { return a.id - b.id});
  let out = [];
  let currentId = -1;
  for (i = 0; i < results.length; i++){
    let row = results[i];
    if (row.id > currentId){
      let kebab = {
        id: row.id,
        meal_cost: row.meal_cost,
        meal_name: row.meal_name,
        meal_description: row.meal_description,
        ingredients: []
      };
      currentId = row.id;
      out.push(kebab);
    }
    let lastFromList = out[out.length-1];
    let ingredient = {
      id: row.id_ingredient,
      ingredient_name: row.ingredient_name,
      ingredient_type: row.ingredient_type,
      amount: row.amount
    }
    lastFromList.ingredients.push(ingredient);
  }
  return out;
}

exports.update = (kebab, res) => {
  let connection = c.getConnection();
  connection.beginTransaction(err => {
    if (err){
      res.json({ status: 401 })
    }
    editKebabEntity(connection, kebab)
    .then(res => {
      return getKebabsIngrediendsIds(connection, kebab)
    })
    .then(connections => {
      return addIngredientsConnections(connection, kebab, connections);
    })
    .then(connections => {
      return deleteIngredientsUnusedUsages(connection, kebab, connections);
    })
    .then(results => {
      return updateIngredientUsages(connection, kebab, results);
    })
    .then(a => {
      connection.commit();
      connection.end();
      res.json({ status: 200 })
    })
    .catch(err => {
      connection.rollback();
      connection.end();
      res.json({ status: 400 });
    })
  })
  
}

function getUsagesToAdd(newIngredients, results){
  toAdd = [];
  resultIds = results.map(res => {return res.id_ingredient});
  for (ingredient of newIngredients){
    if (!resultIds.includes(ingredient.id)){
      toAdd.push(ingredient);
    }
  }
  return toAdd;
}

function getUsagesToRemove(newIngredients, results){
  toRemove = [];
  newIngredientsIds = newIngredients.map(i => i.id);
  for (result of results){
    if (!newIngredientsIds.includes(result.id_ingredient)){
      toRemove.push(result.id_usage);
    }
  }
  return toRemove;
}

function getUsagesToUpdate(newIngredients, results){
  toUpdate = [];
  for (ingredient of newIngredients){
    let id = ingredient.id;
    let result = [].find(res => res.id == id);
    if (result == undefined){
      continue;
    }
    if (result.amount != ingredient.amount){
      toUpdate.push(ingredient);
    }
  }
  return toUpdate;
}

function editKebabEntity(connection, kebab){
  return new Promise((resolve, reject) => {
    connection.query({
      sql: 'UPDATE kebab SET meal_name = ?, meal_cost = ?, meal_description = ? WHERE id_kebab = ?',
      timeout: 4000,
      values: [kebab.name, kebab.cost, kebab.description, kebab.id]
    }, function(error, results, fields){
      if (error == null){
        resolve(results);
      } else {
        return reject(error);
      }
    });
  })
}

function getKebabsIngrediendsIds(connection, kebab){
  return new Promise((resolve, reject) => {
    connection.query({
      sql: 'SELECT i.id_usage, i.ingredient, i.amount FROM ingredient_usage i WHERE i.kebab = ?',
      timeout: 4000,
      values: [kebab.id]
    }, function(error, results2, fields){
      if (error == null){
        resolve(results2);
      } else {
        return reject(error);
      }
    });
  })   
}

function addIngredientsConnections(connection, kebab, results){
  return new Promise((resolve, reject) => {
    let toAdd = getUsagesToAdd(kebab.ingredients, results);
    let promises = [];
    for (usage of toAdd){
      let promise = insertSingleKebabConnection(connection, kebab.id, usage); //used from inserting part
      promises.push(promise);
    }
    Promise.all(promises).then(resultsArray => {
      resolve(results);
    }).catch(err => {
      return reject(err);
    })
  })
}

function deleteIngredientsUnusedUsages(connection, kebab, results){
  return new Promise((resolve, reject) => {
    let toRemove = getUsagesToRemove(kebab.ingredients, results);
    let promises = [];
    for (usage of toRemove){
      let promise = deleteSingleIngredientUsage(connection, usage);
      promises.push(promise);
    }
    Promise.all(promises)
    .then(res => {
      resolve(results)
    })
    .catch(err => {
      return reject(err);
    })
  })
}

function deleteSingleIngredientUsage(connection, id){
  return new Promise((resolve, reject) => {
    connection.query({
      sql: 'DELETE FROM ingredient_usage WHERE id_usage = ?',
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

function updateIngredientUsages(connection, kebab, usages){
  return new Promise((resolve, reject) => {
    promises = [];
    let toUpdate = getUsagesToUpdate(kebab.ingredients, usages);
    for (usage of toUpdate){
      let promise = updateSingleUsage(connection, usage);
      promises.push(promise);
    }
    Promise.all(promises)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      return reject(err);
    })
  })
}


function updateSingleUsage(connection, usage){
  return new Promise((resolve, reject) => {
    connection.query({
      sql: 'UPDATE ingredient_usage SET amount = ? WHERE id_usage = ?',
      timeout: 4000,
      values: [usage.amount, usage.id]
    }, function(error, results, fields){
      if (error == null){
        resolve(results);
      } else {
        return reject(error);
      }
    });
  })
}


exports.delete = (id, res) => {
  let connection = c.getConnection();
  connection.beginTransaction(err => {
    if (err){
      res.json({ status: 401 });
    }
    deleteIngredientConnections(connection, id)
    .then(res => {
      return deleteKebab(connection, id)
    })
    .then(a => {
      connection.commit();
      connection.end();
      res.json({ status: 200 })
    })
    .catch(err => {
      connection.rollback();
      connection.end();
      res.json({ status: 400 })
    })
  })
}

function deleteIngredientConnections(connection, kebabId){
  return new Promise((resolve, reject) => {
    connection.query({
      sql: 'DELETE FROM ingredient_usage WHERE kebab = ?',
      timeout: 4000,
      values: [kebabId]
  }, function (error, results, fields) {
      if (error == null){
        resolve(results);
      } else {
        return reject(error);
      }
    })
  })
}

function deleteKebab(connection, kebabId){
  return new Promise((resolve, reject) => {
    connection.query({
      sql: 'DELETE FROM kebab WHERE id_kebab = ?',
      timeout: 4000,
      values: [kebabId]
  }, function (error, results, fields) {
      if (error == null){
        resolve(results);
      } else {
        return reject(error);
      }
    })
  })
}


