var express = require('express');
var app = express();
app.set('view engine', 'pug');


app.get('/', function (req, res) {
    let articles = [
        {
            id: 1,
            title: 'Artikel 1',
            author: 'Bassam Mednini',
            body: 'Das ist Artikel 1'
        },
        {
            id: 2,
            title: 'Artikel 2',
            author: 'Bassam Mednini',
            body: 'Das ist Artikel 2'
        },
        {
            id: 3,
            title: 'Artikel 3',
            author: 'Bassam Mednini',
            body: 'Das ist Artikel 3'
        }
    ]
    res.render('index', {
        title: 'Mednini',
        articles: articles
    })
})

app.get('/articles/add', function(req, res) {
    res.render('add_article', {
        title: 'Add Article'
    })
})

var server = app.listen(3000, function () {});