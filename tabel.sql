DROP TABLE Indikator_SatuanKerja_Log;
DROP TABLE Indikator_SatuanKerja;
DROP TABLE Capaian_Unit;
DROP TABLE SatuanKerja;
DROP TABLE Indikator_Periode;
DROP TABLE MasterIndikator;
DROP TABLE Periode;
DROP TABLE JenisSatker;
DROP TABLE Aspek;
DROP TABLE DataDasar;

CREATE TABLE DataDasar(
	id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	nama VARCHAR(500),
	create_date DATETIME,
	last_update DATETIME,
	expired_date DATETIME
);

CREATE TABLE Aspek(
	id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	aspek VARCHAR(50),
	komponen_aspek VARCHAR(50)
);

CREATE TABLE JenisSatker(
	id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	nama VARCHAR(50),
	create_date DATETIME,
	last_update DATETIME,
	expired_date DATETIME
);

CREATE TABLE Periode(
	id NUMERIC(4,0) NOT NULL IDENTITY(1,1) PRIMARY KEY,
	nama VARCHAR(50),
	create_date DATETIME,
	last_update DATETIME
);

CREATE TABLE MasterIndikator(
	id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	id_pembilang INT,
	id_penyebut INT,
	id_aspek INT,
	nama VARCHAR(200),
	deskripsi VARCHAR(1000),
	default_bobot FLOAT,
	create_date DATETIME,
	last_update DATETIME,
	expired_date DATETIME,
	CONSTRAINT fk_masterindikator_datadasar1 FOREIGN KEY (id_pembilang)
    REFERENCES DataDasar(id),
	CONSTRAINT fk_masterindikator_datadasar2 FOREIGN KEY (id_penyebut)
    REFERENCES DataDasar(id),
	CONSTRAINT fk_masterindikator_datadasar3 FOREIGN KEY (id_aspek)
    REFERENCES Aspek(id)
);

CREATE TABLE Indikator_Periode(
	id_master INT NOT NULL,
	id_periode NUMERIC(4,0) NOT NULL,
	bobot FLOAT,
	PRIMARY KEY (id_master, id_periode),
	CONSTRAINT fk_indikatorperiode_masterindikator FOREIGN KEY (id_master)
    REFERENCES MasterIndikator(id),
	CONSTRAINT fk_indikatorperiode_periode FOREIGN KEY (id_periode)
    REFERENCES Periode(id)
);

CREATE TABLE SatuanKerja(
	id INT NOT NULL IDENTITY(1,1),
	id_satker AS 'SK'+ RIGHT('00000000000000000000000000000' + CAST(ID AS VARCHAR(30)), 30) PERSISTED PRIMARY KEY,
	id_jns_satker INT,
	id_induk_satker VARCHAR(32),
	nama VARCHAR(50),
	email VARCHAR(50),
	create_date DATETIME,
	last_update DATETIME,
	expired_date DATETIME,
	CONSTRAINT fk_satuankerja_jenissatker FOREIGN KEY (id_jns_satker)
    REFERENCES JenisSatker(id),
	CONSTRAINT fk_satuankerja_satuankerja FOREIGN KEY (id_induk_satker)
    REFERENCES SatuanKerja(id_satker)
);

CREATE TABLE Capaian_Unit(
	id_satker VARCHAR(32) NOT NULL,
	id_datadasar INT NOT NULL,
	waktu DATETIME,
	capaian FLOAT,
	PRIMARY KEY (id_satker, id_datadasar),
	CONSTRAINT fk_capaianunit_satuankerja FOREIGN KEY (id_satker)
    REFERENCES SatuanKerja(id_satker) ON DELETE CASCADE,
	CONSTRAINT fk_capaianunit_datadasar FOREIGN KEY (id_datadasar)
    REFERENCES DataDasar(id) ON DELETE CASCADE
);

CREATE TABLE Indikator_SatuanKerja(
	id_periode NUMERIC(4,0) NOT NULL,
	id_master INT NOT NULL,
	id_satker VARCHAR(32) NOT NULL,
	bobot FLOAT,
	targett FLOAT,
	capaian FLOAT,
	last_update DATETIME,
	PRIMARY KEY (id_periode, id_master, id_satker),
	CONSTRAINT fk_indikatorsatker_indikatorperiode1 FOREIGN KEY (id_master, id_periode)
    REFERENCES Indikator_Periode(id_master, id_periode),
	CONSTRAINT fk_indikatorsatker_satker FOREIGN KEY (id_satker)
    REFERENCES SatuanKerja(id_satker)
);

CREATE TABLE Indikator_SatuanKerja_Log(
	id_satker VARCHAR(32),
	id_master INT,
	id_periode NUMERIC(4,0),
	capaian FLOAT,
	create_date DATETIME,
	CONSTRAINT fk_indikatorsatkerlog_periode FOREIGN KEY (id_periode, id_master, id_satker)
    REFERENCES Indikator_SatuanKerja(id_periode, id_master, id_satker)
);