/*server.js*/
const hostname = 'localhost';
const port = 8024;

const express = require('express');
var sql = require('mssql');
const bodyParser = require('body-parser');
const app = express();

var config = {
  user: 'su',
  password: 'SaSa1212',
  server: '10.199.13.253',
  database: 'nrp05111740000137'
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, content-Type, Accept, Authorization");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var executeQuery = function(res, query, param, reqType) {
  sql.connect(config, function(err){
    if(err) {
      res.end('Connection Error\n' + err)
    }
    else {
      var request = new sql.Request()
      if(reqType != 0) {
        param.forEach(function(p)
        {
          request.input(p.name, p.sqltype, p.value);
        });
      }
      request.query(query, function(err, response){
        if(err) {
          console.log('Query Error\n' + err)
        }
        else{
          res.send(response.recordset)
        }
     })
    }
  })
}

app.get("/", function (req, res) {
  res.end('finished');
});

//GET API
app.get("/api/mahasiswa", function (req, res) {
  var query = "SELECT * FROM mahasiswa";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/mahasiswa/:mhs_id", function (req, res) {
  var query = "SELECT * FROM mahasiswa WHERE mhs_id = " + req.params.mhs_id;
  executeQuery(res, query, null, 0);
});

//POST API
app.post("/api/mahasiswa", function (req, res) {

  var param = [
    { name: 'mhs_id', sqltype: sql.Int, value: req.body.mhs_id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'nrp', sqltype: sql.VarChar, value: req.body.nrp },
    { name: 'telp', sqltype: sql.VarChar, value: req.body.telp }
  ]

  var query = "INSERT INTO mahasiswa (nama, nrp, telp) VALUES (@nama, @nrp, @telp)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/mahasiswa/:mhs_id", function (req, res) {

  var param = [
    { name: 'mhs_id', sqltype: sql.Int, value: req.body.mhs_id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'nrp', sqltype: sql.VarChar, value: req.body.nrp },
    { name: 'telp', sqltype: sql.VarChar, value: req.body.telp }
  ]

  var query = "UPDATE mahasiswa SET nama = @nama, nrp = @nrp, telp = @telp WHERE mhs_id = @mhs_id";
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/mahasiswa/:mhs_id", function (req, res) {
  var query = "DELETE FROM mahasiswa WHERE mhs_id=" + req.params.mhs_id;
  executeQuery(res, query, null, 0);
});

app.listen(port, hostname, () => {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});