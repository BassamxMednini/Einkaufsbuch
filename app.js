const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

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


app.use(express.static(path.join(__dirname, 'public')));

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/styles', express.static(__dirname + '/public/css'));
app.use('/bootstrap/javascript', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/js', express.static(__dirname + '/public/js'));

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


app.get('/article/:id', function(req, res) {
    Article.findById(req.params.id, function(err, article){
        res.render('article', {
            article: article
        });
    });
});

app.get('/article/edit/:id', function(req, res) {
    Article.findById(req.params.id, function(err, article){
        res.render('edit_article', {
            title: 'Edit Article',
            article: article
        });
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

// Update 
app.post('/articles/edit/:id', function(req, res) {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id}

    Article.update(query, article, function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })
})

// Delete
app.delete('/article/:id', function(req, res) {
    let query = {_id:req.params.id}

    Article.remove(query, function(err) {
        if (err) {
            console.log(err);
        }
        res.send('Success');
    });
});


var server = app.listen(3000, function () {});