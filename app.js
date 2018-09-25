const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodekb')
let db = mongoose.connection;

db.once('open', function() {
    console.log('Connected to MongoDB');
});

db.on('error', function(err) {
    console.log(err);
});

let Article = require('./models/article');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.set('view engine', 'pug');

app.get('/', function (req, res) {
    Article.find({}, function(err, articles){
        if(err){
            console.log(err);
        } else {
            res.render('index', {
                title: 'Mednini',
                articles: articles
            }); 
        }
    });
});

app.get('/articles/add', function(req, res) {
    res.render('add_article', {
        title: 'Add Article'
    })
})

app.post('/articles/add', function(req, res) {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })
})

var server = app.listen(3000, function () {});