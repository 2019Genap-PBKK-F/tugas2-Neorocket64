/*server.js*/
const hostname = 'localhost';
const port = 8024;

const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

//set views file
app.set('views', path.join(__dirname, 'views'));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mssql = require("mssql");
var config = {
  user: 'su',
  password: 'SaSa1212',
  server: '10.199.13.253',
  database: 'nrp05111740000137'
};

// connect to your database
mssql.connect(config, function (err) {
  // create Request object
  var request = new mssql.Request();

  app.get('/', (req, res) => {
    let sql = "SELECT * FROM mahasiswa";
    request.query(sql, function (err, rows) {
      if (err) throw err;
      res.render('user_index', {
        title: 'CRUD Operation using NodeJS / ExpressJS / MSSQL',
        users: rows
      });
    });
  });

  app.get('/add', (req, res) => {
    res.render('user_add', {
      title: 'CRUD Operation using NodeJS / ExpressJS / MySQL'
    });
  });

  app.post('/save', (req, res) => {
    let data = { name: req.body.nama, nrp: req.body.nrp, telp: req.body.telp };
    let sql = "INSERT INTO mahasiswa SET ?";
    request.query(sql, data, (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
  });

  app.get('/edit/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = `SELECT * FROM mahasiswa WHERE mhs_id = ${userId}`;
    request.query(sql, (err, result) => {
      if (err) throw err;
      res.render('user_edit', {
        title: 'CRUD Operation using NodeJS / ExpressJS / MySQL',
        user: result.recordset[0]
      });
    });
  });

  app.post('/update', (req, res) => {
    const userId = req.body.mhs_id;
    let sql = "UPDATE mahasiswa SET nama='" + req.body.nama + "',  nrp='" + req.body.nrp + "',  telp='" + req.body.telp + "' WHERE mhs_id =" + userId;
    request.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
  });

  app.get('/delete/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE FROM mahasiswa WHERE mhs_id = ${userId}`;
    request.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

app.listen(port, hostname, () => {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});