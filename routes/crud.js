var express = require('express');
var router = express.Router();
var objecttoxml = require('object-to-xml');
var xmlparser = require('express-xml-bodyparser');
var mysql = require('mysql');

/* GET home page. */

router.get('/', function(req, res, next) { // vaga

    var sql = 'SELECT * FROM vaga';

    const connection = mysql.createConnection('mysql://root:12345@127.0.0.1:3306/empregos_rh');
    connection.connect(function (err) {
        console.log(err);
    });
    connection.query(sql, function(error, results, fields) {
        res.json(results);
        console.log(results);
    });
    connection.end();
});

router.post('/', function(req, res, next) {

    var nomeVaga = req.body.nomeVaga;
    var descricaoVaga = req.body.descricaoVaga;

    var sql = 'INSERT INTO vaga (idvaga, nomeVaga, descricaoVaga)' +
        ' values (null, "' + nomeVaga + '", "' + descricaoVaga +'")';

    console.log(sql);

    const connection = mysql.createConnection('mysql://root:12345@127.0.0.1:3306/empregos_rh');
    connection.connect();
    connection.query(sql, function(error, results, fields) {
        res.location('/empregos_rh/'+results.insertId);
        res.status(201).json(results);
    });
    connection.end();

});

router.put('/:idvaga', function(req, res, next) { // atualiza

    var idvaga = req.params.idvaga;
    var nomeVaga = req.body.nomeVaga;
    var descricaoVaga = req.body.descricaoVaga;

    var sql = 'UPDATE vaga SET nomeVaga = "' + nomeVaga + '", ' +
        'descricaoVaga = "'+ descricaoVaga +'",' +
        'WHERE idvaga = "'+ idvaga + '"';

    const connection = mysql.createConnection('mysql://root:12345@127.0.0.1:3306/empregos_rh');
    connection.connect();
    connection.query(sql, function(error, results, fields) {
        //res.location('/empregos_rh/'+results.insertId);
        res.status(201).json(results);
    });
    connection.end();
});

router.delete('/:idvaga', function(req, res, next) {

    var idvaga = req.params.idvaga;
    var sql = 'DELETE FROM vaga WHERE idvaga=' + idvaga;

    const connection = mysql.createConnection('mysql://root:12345@127.0.0.1:3306/empregos_rh');
    connection.connect();
    connection.query(sql, function(error, results, fields) {
        res.location('/empregos_rh/'+results.insertId);
        res.status(201).json(results);
    });
    connection.end();
});

module.exports = router;
/** ----------------------------------------------------------------------- **/
