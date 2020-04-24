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

SELECT * FROM MasterIndikator