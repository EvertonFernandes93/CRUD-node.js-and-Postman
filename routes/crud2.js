var express = require('express');
var router = express.Router();
var objecttoxml = require('object-to-xml');
var xmlparser = require('express-xml-bodyparser');
var mysql = require('mysql');

router.get('/', function(req, res, next) { // candidato

    var sql = 'select candidato.*,vaga.nomeVaga, vaga.descricaoVaga' +
        ' from candidato,vaga where vaga.idVaga = candidato.vagaId order by candidato.nomeCandidato';

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

    var vagaId = req.body.vagaId;
    var nomeCandidato = req.body.nomeCandidato;
    var endereco = req.body.endereco;
    var telefone = req.body.telefone;
    var email = req.body.email;

    var sql = 'INSERT INTO candidato (idCandidato, vagaId, nomeCandidato, endereco, telefone, email)' +
        ' values (null,'+ vagaId + ', "' + nomeCandidato + '", "' + endereco + '", "' + telefone +'", "' + email +'")';

    console.log(sql);

    const connection = mysql.createConnection('mysql://root:12345@127.0.0.1:3306/empregos_rh');
    connection.connect();
    connection.query(sql, function(error, results, fields) {
        res.location('/empregos_rh/'+results.insertId);
        res.status(201).json(results);
    });
    connection.end();

});

router.put('/:idCandidato', function(req, res, next) { // atualiza

    var idCandidato = req.params.idCandidato;
    var vagaId = req.body.vagaId;
    var nomeCandidato = req.body.nomeCandidato;
    var endereco = req.body.endereco;
    var telefone = req.body.telefone;
    var email = req.body.email;

    var sql = 'UPDATE candidato SET vagaId = "' + vagaId + '", ' +
        'nomeCandidato = "'+ nomeCandidato + '",' +
        'endereco = "'+ endereco + '",' +
        'telefone = "'+ telefone + '",' +
        'email = "'+ email +'"' +
        ' WHERE idCandidato = "'+ idCandidato + '"';

    const connection = mysql.createConnection('mysql://root:12345@127.0.0.1:3306/empregos_rh');
    connection.connect();
    connection.query(sql, function(error, results, fields) {
        console.log(sql);
        //res.location('/empregos_rh/'+results.insertId);
        res.status(201).json(results);
    });
    connection.end();
});

router.delete('/:idCandidato', function(req, res, next) {

    var idCandidato = req.params.idCandidato;
    var sql = 'DELETE FROM candidato WHERE idCandidato=' + idCandidato;

    const connection = mysql.createConnection('mysql://root:12345@127.0.0.1:3306/empregos_rh');
    connection.connect();
    connection.query(sql, function(error, results, fields) {
        res.location('/empregos_rh/'+results.insertId);
        res.status(201).json(results);
    });
    connection.end();
});

module.exports = router;