/*server.js*/
// 10.199.14.46
const hostname = 'localhost';
const port = 8024;

const express = require('express');
var sql = require('mssql');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

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
app.get("/api/datadasarname", function (req, res) {
  var query = "SELECT id, nama AS name FROM DataDasar";
  executeQuery(res, query, null, 0);
});

app.get("/api/datadasar", function (req, res) {
  var query = "SELECT * FROM DataDasar";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/datadasar/:id", function (req, res) {
  var query = "SELECT * FROM DataDasar WHERE id = " + req.params.id;
  executeQuery(res, query, null, 0);
});

//POST API
app.post("/api/datadasar", function (req, res) {

  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Date, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Date, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Date, value: req.body.expired_date }
  ]

  var query = "INSERT INTO DataDasar (nama, create_date, last_update, expired_date) VALUES (@nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/datadasar/:id", function (req, res) {

  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Date, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Date, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Date, value: req.body.expired_date }
  ]

  var query = "UPDATE DataDasar SET nama = @nama, last_update = CURRENT_TIMESTAMP, expired_date = @expired_date WHERE id = " + req.params.id;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/datadasar/:id", function (req, res) {
  var query = "DELETE FROM DataDasar WHERE id=" + req.params.id;
  executeQuery(res, query, null, 0);
});
//-----------------------------------------

//Aspek
//GET API
app.get("/api/aspekname", function (req, res) {
  var query = "SELECT id, komponen_aspek AS name FROM Aspek";
  executeQuery(res, query, null, 0);
});

app.get("/api/aspek", function (req, res) {
  var query = "SELECT * FROM Aspek";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/aspek/:id", function (req, res) {
  var query = "SELECT * FROM Aspek WHERE id = " + req.params.id;
  executeQuery(res, query, null, 0);
});

//POST API
app.post("/api/aspek", function (req, res) {

  var param = [
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
    { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }
  ]

  var query = "INSERT INTO Aspek (aspek, komponen_aspek) VALUES (@aspek, @komponen_aspek)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/aspek/:id", function (req, res) {

  var param = [
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
    { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }
  ]

  var query = "UPDATE Aspek SET aspek = @aspek, komponen_aspek = @komponen_aspek WHERE id = " + req.params.id;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/aspek/:id", function (req, res) {
  var query = "DELETE FROM Aspek WHERE id=" + req.params.id;
  executeQuery(res, query, null, 0);
});
//-----------------------------------------

//Jenis Satker
//GET API
app.get("/api/jenissatkername", function (req, res) {
  var query = "SELECT id, nama AS name FROM JenisSatker";
  executeQuery(res, query, null, 0);
});

app.get("/api/jenissatker", function (req, res) {
  var query = "SELECT * FROM JenisSatker";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/jenissatker/:id", function (req, res) {
  var query = "SELECT * FROM JenisSatker WHERE id = " + req.params.id;
  executeQuery(res, query, null, 0);
});

//POST API
app.post("/api/jenissatker", function (req, res) {

  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Date, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Date, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Date, value: req.body.expired_date }
  ]

  var query = "INSERT INTO JenisSatker (nama, create_date, last_update, expired_date) VALUES (@nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/jenissatker/:id", function (req, res) {

  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Date, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Date, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Date, value: req.body.expired_date }
  ]

  var query = "UPDATE JenisSatker SET nama = @nama, last_update = CURRENT_TIMESTAMP, expired_date = @expired_date WHERE id = " + req.params.id;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/jenissatker/:id", function (req, res) {
  var query = "DELETE FROM JenisSatker WHERE id=" + req.params.id;
  executeQuery(res, query, null, 0);
});
//-----------------------------------------

//Periode
//GET API
app.get("/api/periodename", function (req, res) {
  var query = "SELECT id, nama AS name FROM Periode";
  executeQuery(res, query, null, 0);
});

app.get("/api/periode", function (req, res) {
  var query = "SELECT * FROM Periode";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/periode/:id", function (req, res) {
  var query = "SELECT * FROM Periode WHERE id = " + req.params.id;
  executeQuery(res, query, null, 0);
});

//POST API
app.post("/api/periode", function (req, res) {

  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Date, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Date, value: req.body.last_update }
  ]

  var query = "INSERT INTO Periode (nama, create_date, last_update) VALUES (@nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/periode/:id", function (req, res) {

  var param = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'create_date', sqltype: sql.Date, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Date, value: req.body.last_update }
  ]

  var query = "UPDATE Periode SET nama = @nama, last_update = CURRENT_TIMESTAMP WHERE id = " + req.params.id;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/periode/:id", function (req, res) {
  var query = "DELETE FROM Periode WHERE id=" + req.params.id;
  executeQuery(res, query, null, 0);
});
//-----------------------------------------

//Master Indikator
//GET API
app.get("/api/masterindikator", function (req, res) {
  var query = "SELECT * FROM MasterIndikator";
  executeQuery(res, query, null, 0);
});

app.get("/api/masterindikatorname", function (req, res) {
  var query = "SELECT id, nama AS name FROM MasterIndikator";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/masterindikator/:id", function (req, res) {
  var query = "SELECT * FROM MasterIndikator WHERE id = " + req.params.id;
  executeQuery(res, query, null, 0);
});

//POST API
app.post("/api/masterindikator", function (req, res) {

  var param = [
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang},
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut},
    { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek},
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot },
    { name: 'create_date', sqltype: sql.Date, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Date, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Date, value: req.body.expired_date }
  ]

  var query = "INSERT INTO MasterIndikator (id_pembilang, id_penyebut, id_aspek, nama, deskripsi, default_bobot, create_date, last_update, expired_date) VALUES (@id_pembilang, @id_penyebut, @id_aspek, @nama, @deskripsi, @default_bobot, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/masterindikator/:id", function (req, res) {

  var param = [
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang},
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut},
    { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek},
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot },
    { name: 'create_date', sqltype: sql.Date, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Date, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Date, value: req.body.expired_date }
  ]

  var query = "UPDATE MasterIndikator SET id_penyebut = @id_penyebut, id_pembilang = @id_pembilang, id_aspek = @id_aspek, nama = @nama, deskripsi = @deskripsi, default_bobot = @default_bobot, last_update = CURRENT_TIMESTAMP, expired_date = @expired_date WHERE id = " + req.params.id;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/masterindikator/:id", function (req, res) {
  var query = "DELETE FROM MasterIndikator WHERE id=" + req.params.id;
  executeQuery(res, query, null, 0);
});
//-----------------------------------------

//Indikator Periode
//GET API
app.get("/api/indikator_periode", function (req, res) {
  var query = "SELECT * FROM Indikator_Periode";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/indikator_periode/:id_master&:id_periode", function (req, res) {
  var query = "SELECT * FROM Indikator_Periode WHERE id_master = " + req.params.id_master + "AND id_periode = " + req.params.id_periode;
  executeQuery(res, query, null, 0);
});


//POST API
app.post("/api/indikator_periode", function (req, res) {

  var param = [
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot }
  ]

  var query = "INSERT INTO Indikator_Periode (id_master, id_periode, bobot) VALUES (@id_master, @id_periode, @bobot)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/indikator_periode/:id_master&:id_periode", function (req, res) {

  var param = [
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot }
  ]

  var query = "UPDATE Indikator_Periode SET id_master = @id_master, id_periode = @id_periode, bobot = @bobot WHERE id_master = " + req.params.id_master + "AND id_periode = " + req.params.id_periode;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/indikator_periode/:id_master&:id_periode", function (req, res) {
  var query = "DELETE FROM Indikator_Periode WHERE datadasar_id = " + req.params.datadasar_id + "AND unit_id = " + req.params.unit_id;
  executeQuery(res, query, null, 0);
}); 
//-----------------------------------------

//Satuan Kerja
//GET API
app.get("/api/satuankerja", function (req, res) {
  var query = "SELECT * FROM SatuanKerja ORDER BY id ASC";
  executeQuery(res, query, null, 0);
});

app.get("/api/satuankerjaname", function (req, res) {
  var query = "SELECT id_satker AS id, nama AS name FROM SatuanKerja";
  executeQuery(res, query, null, 0);
});

app.get("/api/satuankerjadrop", function (req, res) {
  var query = "SELECT id, nama FROM SatuanKerja WHERE nama LIKE 'Departemen%' OR nama LIKE 'Fakultas%' ORDER BY nama";
  executeQuery(res, query, null, 0);
});

app.post("/api/satuankerjadrop", function (req, res) {

  var param = [
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.username }
  ]

  var query = "SELECT id, nama FROM SatuanKerja WHERE (id_satker = @id_satker OR id_induk_satker = @id_satker) AND (nama LIKE 'Departemen%' OR nama LIKE 'Fakultas%') ORDER BY nama";
  executeQuery(res, query, param, 1);
});

//GET API AS ID
app.get("/api/satuankerja/hasil/:id", function (req, res) {
  var query = "SELECT id_satker FROM SatuanKerja WHERE id = " + req.params.id;
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/satuankerja/:id", function (req, res) {
  var query = "SELECT * FROM SatuanKerja WHERE id = " + req.params.id;
  executeQuery(res, query, null, 0);
});

//POST API
app.post("/api/satuankerja", function (req, res) {

  var param = [
    { name: 'id_jns_satker', sqltype: sql.Int, value: req.body.id_jns_satker},
    { name: 'id_induk_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_induk_satker},
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'email', sqltype: sql.VarChar, value: req.body.email },
    { name: 'create_date', sqltype: sql.Date, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Date, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Date, value: req.body.expired_date }
  ]

  var query = "INSERT INTO SatuanKerja (id_jns_satker, id_induk_satker, nama, email, create_date, last_update, expired_date) VALUES (@id_jns_satker, @id_induk_satker, @nama, @email, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/satuankerja/:id", function (req, res) {

  var param = [
    { name: 'id_jns_satker', sqltype: sql.Int, value: req.body.id_jns_satker},
    { name: 'id_induk_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_induk_satker},
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'email', sqltype: sql.VarChar, value: req.body.email },
    { name: 'create_date', sqltype: sql.Date, value: req.body.create_date },
    { name: 'last_update', sqltype: sql.Date, value: req.body.last_update },
    { name: 'expired_date', sqltype: sql.Date, value: req.body.expired_date }
  ]

  var query = "UPDATE SatuanKerja SET id_jns_satker = @id_jns_satker, id_induk_satker = @id_induk_satker, nama = @nama, email = @email, last_update = CURRENT_TIMESTAMP, expired_date = @expired_date WHERE id = " + req.params.id;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/satuankerja/:id", function (req, res) {
  var query = "DELETE FROM SatuanKerja WHERE id=" + req.params.id;
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
app.get("/api/capaian_unit/:id_satker&:id_datadasar", function (req, res) {
  var query = "SELECT * FROM capaian_unit WHERE id_satker = " + req.params.id_satker + "AND id_datadasar = " + req.params.id_datadasar;
  executeQuery(res, query, null, 0);
});


//POST API
app.post("/api/capaian_unit", function (req, res) {

  var param = [
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'waktu', sqltype: sql.Date, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = "INSERT INTO capaian_unit (id_satker, id_datadasar, waktu, capaian) VALUES (@id_satker, @id_datadasar, CURRENT_TIMESTAMP, @capaian)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/capaian_unit/:id_satker&:id_datadasar", function (req, res) {

  var param = [
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'waktu', sqltype: sql.Date, value: req.body.waktu },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = "UPDATE capaian_unit SET id_satker = @id_satker, id_datadasar = @id_datadasar, waktu = CURRENT_TIMESTAMP, capaian = @capaian WHERE id_satker = " + req.params.id_satker + " AND id_datadasar = " + req.params.id_datadasar;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/capaian_unit/:id_satker&:id_datadasar", function (req, res) {
  var query = "DELETE FROM capaian_unit WHERE id_satker = " + req.params.id_satker + "AND id_datadasar = " + req.params.id_datadasar;
  executeQuery(res, query, null, 0);
});
//-----------------------------------------

//Indikator_Satuan Kerja
//GET API
app.get("/api/indikator_satuankerja", function (req, res) {
  var query = "SELECT * FROM Indikator_SatuanKerja";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/indikator_satuankerja/:id_periode&:id_master&:id_satker", function (req, res) {
  var query = "SELECT * FROM Indikator_SatuanKerja WHERE id_master = " + req.params.id_master + "AND id_periode = " + req.params.id_periode + "AND id_satker = " + req.params.id_satker;
  executeQuery(res, query, null, 0);
});

//GET API FROM satker
app.get("/api/indikator_satuankerja/satker/:id_satker", function (req, res) {
  var query = "SELECT * FROM Indikator_SatuanKerja WHERE id_satker = " + req.params.id_satker;
  executeQuery(res, query, null, 0);
});

//POST API
app.post("/api/indikator_satuankerja", function (req, res) {

  var param = [
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'targett', sqltype: sql.Float, value: req.body.targett },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
    { name: 'last_update', sqltype: sql.Date, value: req.body.last_update }
  ]

  var query = "INSERT INTO Indikator_SatuanKerja (id_periode, id_master, id_satker, bobot, targett, capaian, last_update) VALUES (@id_periode, @id_master, @id_satker, @bobot, @targett, @capaian, CURRENT_TIMESTAMP)";
  executeQuery(res, query, param, 1);
});

//PUT API
app.put("/api/indikator_satuankerja/:id_periode&:id_master&:id_satker", function (req, res) {

  var param = [
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'targett', sqltype: sql.Float, value: req.body.targett },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
    { name: 'last_update', sqltype: sql.Date, value: req.body.last_update }
  ]

  var query = "UPDATE Indikator_SatuanKerja SET id_periode = @id_periode, id_master = @id_master, id_satker = @id_satker, bobot = @bobot, targett = @targett, capaian = @capaian, last_update = CURRENT_TIMESTAMP WHERE id_master = " + req.params.id_master + "AND id_periode = " + req.params.id_periode + "AND id_satker = " + req.params.id_satker;
  executeQuery(res, query, param, 1);
});

// DELETE API
app.delete("/api/indikator_satuankerja/:id_periode&:id_master&:id_satker", function (req, res) {
  var query = "DELETE FROM Indikator_SatuanKerja WHERE datadasar_id = " + req.params.datadasar_id + "AND unit_id = " + req.params.unit_id + "AND id_satker = " + req.params.id_satker;
  executeQuery(res, query, null, 0);
}); 
//-----------------------------------------

//Indikator_Satuan Kerja LOG
//GET API
app.get("/api/indikator_satuankerja_log", function (req, res) {
  var query = "SELECT * FROM Indikator_SatuanKerja_Log";
  executeQuery(res, query, null, 0);
});
//-----------------------------------------

//GET API FORM ID
app.get("/api/dosen", function (req, res) {
  var query = "SELECT * FROM dosen";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/abmas", function (req, res) {
  var query = "SELECT * FROM abmas";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/penelitian", function (req, res) {
  var query = "SELECT * FROM penelitian";
  executeQuery(res, query, null, 0);
});

//GET API FORM ID
app.get("/api/publikasi", function (req, res) {
  var query = "SELECT * FROM publikasi";
  executeQuery(res, query, null, 0);
});

//-----------------------------------------not this again ;_;

//GET API FROM satker
app.get("/api/indikator_satuankerja/satker/:id_satker", function (req, res) {
  var query = "SELECT * FROM Indikator_SatuanKerja WHERE id_satker = " + req.params.id_satker;
  executeQuery(res, query, null, 0);
});

//GET API
app.get("/api/konkin/:id_satker", function (req, res) {
  var query = "SELECT asp.aspek, asp.komponen_aspek, mi.nama, isk.bobot, isk.targett, CONCAT(isk.capaian, '(', ROUND(COALESCE(capaian/NULLIF(isk.targett,0), 0)*100, 2), '%)') AS 'capaian'  FROM Indikator_SatuanKerja AS isk JOIN MasterIndikator AS mi ON (isk.id_master = mi.id) JOIN Aspek AS asp ON (mi.id_aspek = asp.id) WHERE isk.id_satker = CAST ('" + req.params.id_satker + "' AS UNIQUEIDENTIFIER)";
  executeQuery(res, query, null, 0);
});

//LOGIN
app.post("/api/login", function (req, res) {

  var param = [
    { name: 'email', sqltype: sql.VarChar, value: req.body.username },
    { name: 'password', sqltype: sql.VarChar, value: req.body.password },
  ]

  var query = "SELECT email, id_satker, nama FROM SatuanKerja WHERE email = @email AND @email = @password";
  executeQuery(res, query, param, 1);
});

https.createServer(options, app).listen(port, () => {
  console.log('Listening...')
});

// app.listen(port, () => {
//   console.log('Server running at http://' + hostname + ':' + port + '/');
// });

// app.listen(port, hostname, () => {
//   console.log('Server running at http://' + hostname + ':' + port + '/');
// });