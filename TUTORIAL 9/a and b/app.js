
var express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('view engine', 'ejs');

//for task A
app.post('/calculations', (req, res) => {
  let body = req.body;
  let num1 = parseInt(body.num1);
  let num2 = parseInt(body.num2);
  let operator = body.operator;
  let result;
  switch (operator){
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    default:
      result = "Bad Input!";        
  }
  res.json({
    result: result
  });
});

//for task B
app.get("/form", (req, res) => {
  res.render('index');
});

app.listen(3000, () => {console.log("Started at port 3000!")});
