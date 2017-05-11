var config = require('./config');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var express = require('express');
var app = express();

var connection = mysql.createConnection({
    host     : config.get('dbHost'),
    user     : config.get('dbUser'),
    password : config.get('dbPassword'),
    database : config.get('dbName')
});

app.use(bodyParser.json());
app.use(express.static('dist'));
app.get('/', function (req, res) {
    res.sendFile('/dist/index.html', { root: __dirname + '/../' });
});
app.get('/comments', function (req, res) {
    connection.connect();
    connection.query('SELECT `comment_id`, `parent_id`, `username`, `email`, `text` FROM `tim_comments`',
        function (err, rows, fields) {
            if (err) throw err;
            console.log('comments: ', rows);
            res.json(rows);
        }
    );
    connection.end();
});

app.post('/', function (req, res) {
    console.log('Пришел post', req.body);
    res.end();
});




app.listen(config.get('port'), function () {
    console.log('App listening on port ' + config.get('port'))
});