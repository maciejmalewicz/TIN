var express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('view engine', 'ejs');

var cors = require('cors')

app.use(cors())

//services
var ingredients = require('./database/ingredients');

//ingredient
app.post('/ingredients', (req, res) => {
  let ingredient = req.body;
  ingredients.create(ingredient, res);
})

app.get('/ingredients', (req, res) => {
  ingredients.read(res);
})

app.put('/ingredients', (req, res) => {
  let ingredient = req.body;
  ingredients.update(ingredient, res);
})

app.delete('/ingredients/:id', (req, res) => {
  let id = req.params.id;
  ingredients.delete(id, res);
})

var kebabs = require('./database/kebabs');

//kebab
app.post('/kebab', (req, res) => {
  let kebab = req.body;
  kebabs.create(kebab, res);
})

app.get('/kebab', (req, res) => {
  kebabs.readAll(res);
})

app.put('/kebab', (req, res) => {
  let kebab = req.body;
  kebabs.update(kebab, res);
})

app.delete('/kebab/:id', (req, res) => {
  let id = req.params.id;
  kebabs.delete(id, res);
})

var users = require('./database/users');
//users
app.post('/users', (req, res) => {
  users.create(req.body, res);
})

app.post('/login', (req, res) => {
  users.login(req.body, res);
})

app.listen(3000, () => {console.log("Started at port 3000!")});
