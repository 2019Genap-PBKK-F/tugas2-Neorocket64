/*server.js*/
const hostname = 'localhost';
const port = 8024;

const express = require('express');
var sql = require('mssql');
const bodyParser = require('body-parser');
const app = express();

var config = {
  user: 'sa',
  password: 'SaSa1212',
  server: '10.199.13.253',
  database: 'nrp05111740000137'
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
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

//Data Dasar
//GET API
app.get("/api/datadasar", function (req, res) {
  var query = "SELECT id, nama AS name FROM datadasar";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/datadasar/:id", function (req, res) {
  var query = "SELECT * FROM datadasar WHERE id = " + req.params.id;
  executeQuery(res, query, null, 0);
});

//POST API
app.post("/api/datadasar", function (req, res) {

  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = "INSERT INTO datadasar (nama) VALUES (@nama)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/datadasar/:id", function (req, res) {

  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = "UPDATE datadasar SET nama = @nama WHERE id = " + req.params.id;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/datadasar/:id", function (req, res) {
  var query = "DELETE FROM datadasar WHERE id=" + req.params.id;
  executeQuery(res, query, null, 0);
});
//-----------------------------------------

//Kategori Unit
//GET API
app.get("/api/kategoriunit", function (req, res) {
  var query = "SELECT id, nama AS name FROM kategoriunit";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/kategoriunit/:id", function (req, res) {
  var query = "SELECT * FROM kategoriunit WHERE id = " + req.params.id;
  executeQuery(res, query, null, 0);
});

//POST API
app.post("/api/kategoriunit", function (req, res) {

  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = "INSERT INTO kategoriunit (nama) VALUES (@nama)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/kategoriunit/:id", function (req, res) {

  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = "UPDATE kategoriunit SET nama = @nama WHERE id = " + req.params.id;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/kategoriunit/:id", function (req, res) {
  var query = "DELETE FROM kategoriunit WHERE id=" + req.params.id;
  executeQuery(res, query, null, 0);
});
//-----------------------------------------

//Unit
//GET API
app.get("/api/unit", function (req, res) {
  var query = "SELECT * FROM unit";
  executeQuery(res, query, null, 0);
});

app.get("/api/unitname", function (req, res) {
  var query = "SELECT id, nama AS name FROM unit";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/unit/:id", function (req, res) {
  var query = "SELECT * FROM unit WHERE id = " + req.params.id;
  executeQuery(res, query, null, 0);
});

//POST API
app.post("/api/unit", function (req, res) {

  var param = [
    { name: 'kategoriunit_id', sqltype: sql.Int, value: req.body.kategoriunit_id},
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = "INSERT INTO unit (kategoriunit_id, nama) VALUES (@kategoriunit_id, @nama)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/unit/:id", function (req, res) {

  var param = [
    { name: 'kategoriunit_id', sqltype: sql.Int, value: req.body.kategoriunit_id},
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = "UPDATE unit SET nama = @nama, kategoriunit_id = @kategoriunit_id WHERE id = " + req.params.id;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/unit/:id", function (req, res) {
  var query = "DELETE FROM unit WHERE id=" + req.params.id;
  executeQuery(res, query, null, 0);
});
//-----------------------------------------

//Capaian Unit
//GET API
app.get("/api/capaian_unit", function (req, res) {
  var query = "SELECT * FROM capaian_unit";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/capaian_unit/:datadasar_id&:unit_id", function (req, res) {
  var query = "SELECT * FROM capaian_unit WHERE datadasar_id = " + req.params.datadasar_id + "AND unit_id = " + req.params.unit_id;
  executeQuery(res, query, null, 0);
});


//POST API
app.post("/api/capaian_unit", function (req, res) {

  var param = [
    { name: 'datadasar_id', sqltype: sql.Int, value: req.body.datadasar_id },
    { name: 'unit_id', sqltype: sql.Int, value: req.body.unit_id },
    { name: 'waktu', sqltype: sql.Date, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = "INSERT INTO capaian_unit (datadasar_id, unit_id, waktu, capaian) VALUES (@datadasar_id, @unit_id, @waktu, @capaian)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/capaian_unit/:datadasar_id&:unit_id", function (req, res) {

  var param = [
    { name: 'datadasar_id', sqltype: sql.Int, value: req.body.datadasar_id },
    { name: 'unit_id', sqltype: sql.Int, value: req.body.unit_id },
    { name: 'waktu', sqltype: sql.Date, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = "UPDATE capaian_unit SET datadasar_id = @datadasar_id, unit_id = @unit_id, waktu = CURRENT_TIMESTAMP, capaian = @capaian WHERE datadasar_id = " + req.params.datadasar_id + " AND unit_id = " + req.params.unit_id;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/capaian_unit/:datadasar_id&:unit_id", function (req, res) {
  var query = "DELETE FROM capaian_unit WHERE datadasar_id = " + req.params.datadasar_id + "AND unit_id = " + req.params.unit_id;
  executeQuery(res, query, null, 0);
});

app.listen(port, hostname, () => {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});