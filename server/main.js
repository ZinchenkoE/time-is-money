var config = require('./config');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var express = require('express');
var app = express();
var connection;

function initConnection () {
    console.log('_____init db connection____');
    connection = mysql.createConnection({
        host     : config.get('dbHost'),
        user     : config.get('dbUser'),
        password : config.get('dbPassword'),
        database : config.get('dbName')
    });
    connection.connect(function() {
        connection.query(
            'SET NAMES utf8 COLLATE utf8_general_ci',
            function (err) { if (err) throw err; }
        );
    });
    connection.on('error', function(err) {
        console.log('db error: ' + err.code, err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') initConnection();
        else throw err;
    });
}
try{
    initConnection();

    app.use(bodyParser.json());
    app.use(express.static('dist'));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
        next();
    });
    app.get('/', function (req, res) {
        console.log(req.ip, '____fdf_');
        // res.sendFile('/dist/index.html', { root: __dirname + '/../' });
        res.send('Hello Vova!!');
    });
    app.get('/comments', function (req, res) {
        var page   = req.query.page   || 1;
        var sortBy = req.query.sortBy || 'comment_id';
        var order  = req.query.order ===  'ASC' ? 'ASC' : 'DESC';
        var offset = (page - 1) * 25;

        console.log(req.query.page);

        var query = 'SELECT `comment_id`, `parent_id`, `username`, `email`, `text`, `create_time`, `homepage` ' +
                    'FROM `tim_comments` ORDER BY `' + sortBy + '` ' + order + ' LIMIT 25 OFFSET ' + offset;
        connection.query(query, function (err, comments) {
            if (err) throw err;
            connection.query('SELECT COUNT(*) AS comments_count FROM `tim_comments`', function (err, rows) {
                if (err) throw err;
                var data = {
                    countPages: Math.ceil(rows[0]['comments_count'] / 25),
                    comments: comments
                };
                res.json(data);
            });
        });

    });
    app.post('/comments', function (req, res) {
        console.log('Пришел post', req.body);
        var data = req.body;
        data.parent_id   = data.parent_id    || 0;
        data.username    = data.username     || '';
        data.email       = data.email        || '';
        data.text        = data.text         || '';
        data.create_time = data.create_time  || +new Date();
        data.browser     = data.browser      || '';
        data.ip          = req.ip            || '';

        connection.query('INSERT INTO tim_comments SET ?', data, function (err) {
                if (err) { res.end(); throw err; }
                res.end('success');
            }
        );

        console.log(req.ip, '____________________');
    });
    app.listen(config.get('port'), function () {
        console.log('App listening on port ' + config.get('port'))
    });
}catch (e){
    console.log('ERROR', e);
}


















