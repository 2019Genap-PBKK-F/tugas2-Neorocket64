import pandas as pd
import numpy as np
import pyodbc, xlrd, os
from dateutil.relativedelta import relativedelta

server = '10.199.13.253'
db = 'nrp05111740000137'
user = 'sa'
password = 'SaSa1212'

conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + server + ';DATABASE=' + db + ';UID=' + user + ';PWD=' + password)
cursor = conn.cursor()

query = """
        UPDATE SatuanKerja SET email = ? WHERE nama = ?
        """

filename = "SatuanKerja+Email.xlsx"

book = xlrd.open_workbook(filename)
sheet = book.sheet_by_name("unit organisasi")

#Get Total Rows
totalRows = 0
for r in range(1, sheet.nrows):
    if sheet.cell(r,5).value != '':
        totalRows += 1
    else:
        continue
print(totalRows)

for r in range(1, totalRows+1):
    nama = sheet.cell(r,1).value
    email = sheet.cell(r,5).value
    print(nama, ' ', email)

    values = (email, nama)
    try :
        cursor.execute(query, values)
    except ConnectionError:
        print('bruh')
        break
conn.commit()
conn.close()