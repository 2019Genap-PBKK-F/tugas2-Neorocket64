import pandas as pd
import numpy as np
import pyodbc, xlrd, os, random
from dateutil.relativedelta import relativedelta

server = '10.199.13.253'
db = 'nrp05111740000137'
user = 'sa'
password = 'SaSa1212'

conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + server + ';DATABASE=' + db + ';UID=' + user + ';PWD=' + password)
cursor = conn.cursor()

query = """
        UPDATE Indikator_SatuanKerja SET capaian = ? WHERE id_master = ? AND id_satker = ?
        """

# cursor.execute("SELECT COUNT(id_master) FROM Indikator_SatuanKerja")
# satker = cursor.fetchall()

# for r in range(1, satker[0][0]):
#     cursor.execute("SELECT id_master, id_satker FROM Indikator_SatuanKerja")
#     nicesatker = cursor.fetchall()
#     master = nicesatker[0][0]

#     values = ()
#     cursor.execute(query, values)
for r in range(1, 77):
    cursor.execute("UPDATE Indikator_SatuanKerja SET capaian = ? WHERE id_master = ?", round(random.random(), 4), r)
conn.commit()
conn.close()