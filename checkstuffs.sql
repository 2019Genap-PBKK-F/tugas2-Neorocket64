-- CREATE TRIGGER dbo.time_add_datadasar ON dbo.DataDasar
-- AFTER INSERT
-- AS
--   UPDATE dbo.DataDasar
--   SET create_date = CURRENT_TIMESTAMP, last_update = CURRENT_TIMESTAMP
--   FROM Inserted i
--   WHERE dbo.DataDasar.id = i.id

-- DROP TRIGGER dbo.time_add_datadasar;

-- CREATE TRIGGER dbo.time_add_masterindikator ON dbo.MasterIndikator
-- AFTER INSERT
-- AS
--   UPDATE dbo.MasterIndikator
--   SET create_date = CURRENT_TIMESTAMP, last_update = CURRENT_TIMESTAMP
--   FROM Inserted i
--   WHERE dbo.MasterIndikator.id = i.id

-- DROP TRIGGER dbo.time_add_masterindikator;

-- SELECT * FROM MasterIndikator

-- CREATE TRIGGER dbo.add_generateip ON dbo.MasterIndikator
-- AFTER INSERT
-- AS
--     INSERT INTO dbo.Indikator_Periode (id_master,id_periode,bobot)
--     SELECT id, YEAR(last_update), default_bobot FROM Inserted
-- ;

-- DROP TRIGGER dbo.add_generateip;

-- INSERT INTO dbo.Periode (nama,create_date,last_update) VALUES ('2020', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- DELETE FROM dbo.SatuanKerja

-- DBCC CHECKIDENT ('dbo.SatuanKerja', RESEED, 0)  

SELECT * FROM dbo.SatuanKerja

DBCC CHECKIDENT ('dbo.SatuanKerja')


