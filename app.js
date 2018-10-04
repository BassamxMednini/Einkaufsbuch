const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Verbindung zur Datenbank
mongoose.connect('mongodb://localhost/nodekb')
let db = mongoose.connection;

// Bei erfolgreicher Verbindung wird diese dementsprechend angezeigt
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Bei nicht erfolgreicher Verbindung wird diese dementsprechend angezeigt
db.on('error', function(err) {
    console.log(err);
});

// Dient für die DB - Schema
let Article = require('./models/article');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Ordner 'public' wird als statische Datei bereitgestellt
app.use(express.static(path.join(__dirname, 'public')));

// Folgende Dateien werden ebenfalls als statische Datei gestellt
// Beim Arbeiten mit HTML (unter .pug) reicht es die Datei mit Hilfe
// der Angabe des Pfads sowie den Name der Datei einzufügen
// z.B: für '/bootstrap' --> '/bootstrap/bootstrap.css'
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/styles', express.static(__dirname + '/public/css'));
app.use('/bootstrap/javascript', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/js', express.static(__dirname + '/public/js'));

// Template-Engine Pug wird in dieser Applikation verwendet
app.set('view engine', 'pug');

// Startseite
app.get('/', function (req, res) {
    Article.find({}, function(err, articles){
        if(err){
            console.log(err);
        } else {
            res.render('index', {
                title: 'NodeJS Applikation',
                articles: articles
            }); 
        }
    });
});

// Öffnet jeden DB-Eintrag über /article/:id
// Neben dem Titel und der Beschreibung, wird auch der Autor angezeigt
// Lösch- & Bearbeitenbutton werden ebenfalls dann angezeigt
app.get('/article/:id', function(req, res) {
    Article.findById(req.params.id, function(err, article){
        res.render('article', {
            article: article
        });
    });
});

// Bearbeiten-Button
app.get('/article/edit/:id', function(req, res) {
    Article.findById(req.params.id, function(err, article){
        res.render('edit_article', {
            title: 'Artikel ändern',
            article: article
        });
    });
});

// Hinzufügen eines neuen DB-Eintrags
app.get('/articles/add', function(req, res) {
    res.render('add_article', {
        title: 'Hinzufügen eines Artikels'
    })
})

// Speichert den neuen Artikel in die DB
app.post('/articles/add', function(req, res) {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    // Sofern beim Erstellen ein Fehler existiert, wird dieser über die Konsole angezeigt
    // Ansonsten wird man zur Startseite weitergeleitet
    article.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })
})

// Aktualisierter Artikel wird in der DB gespeichert
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

// Server
var server = app.listen(3000, function () {});