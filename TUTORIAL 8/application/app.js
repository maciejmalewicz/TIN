const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({extended: true}));

app.get('/hello', (req, res) => { res.send('hello world') });

app.get('/form', (req, res)=> {
    res.render('form', {});
});

app.post('/formdata', (req, res) => {
    res.render('formdata', { body: req.body });
});

app.post('/jsondata', (req, res) => {
    res.render('formdata', {body: req.body});
})

app.listen(3000, console.log("Listening at port 3000")); 

