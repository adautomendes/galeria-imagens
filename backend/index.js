var express = require('express');
var cors = require('cors')
var mysql = require('mysql');
var fs = require('fs');
var CronJob = require('cron').CronJob;
var util = require('./util.js');

const imgFolder = 'imagens';

var app = express();

var con = {
    host: 'localhost',
    user: 'root',
    pass: '',
    database: 'galeria'
}

function atualizarBD() {
    util.logInfo("Populando banco de dados, baseado na pasta 'imagens'...");

    var connection = mysql.createConnection(con);
    connection.connect();
    connection.query("TRUNCATE TABLE imagem;");
    connection.end();

    fs.readdir(imgFolder, (err, files) => {
        files.forEach(file => {
            util.logInfo("Processando arquivo <" + file + ">");

            var connection = mysql.createConnection(con);
            connection.connect();
            connection.query("INSERT INTO imagem (nome, caminho) VALUES ('" + file + "','/" + imgFolder + "/" + file + "')");
            connection.end();
        });
        util.logInfo("Banco de Dados populado com sucesso!");
    })
}

function buscarImagens(req, res, next) {
    var connection = mysql.createConnection(con);
    connection.connect();

    var strQuery = "SELECT id, nome, caminho FROM imagem;";
    util.printSQL(strQuery);

    connection.query(strQuery, function (err, rows, fields) {
        if (!err) {
            util.rndDelay(5);
            res.json(rows);
        } else {
            res.json(err);
        }
        connection.end();
        next();
    });
}

/*************************/
/* JOB PARA ATUALIZAR BD */
/*************************/

var bdJob = new CronJob('* * * * *', function () { //* * * * * => fará que o esse job seja executado a todo minuto
    atualizarBD();
});

/*************************/

app.use(cors())
app.use('/imagens', express.static(imgFolder)); //Expondo repositório de arquivos estáticos

app.get('/buscarImagens', buscarImagens); //Endpoint de busca das imagens

app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000!');
    atualizarBD();
    bdJob.start();
});

