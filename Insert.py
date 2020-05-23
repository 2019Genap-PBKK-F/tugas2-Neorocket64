import pandas as pd
import numpy as np
import pyodbc, xlrd, datetime, os
from dateutil.relativedelta import relativedelta

server = '10.199.13.253'
db = 'nrp05111740000137'
user = 'sa'
password = 'SaSa1212'

now = datetime.datetime.now()
expired = now + relativedelta(year=1)

conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + server + ';DATABASE=' + db + ';UID=' + user + ';PWD=' + password)
cursor = conn.cursor()

query = """
        INSERT INTO Indikator_SatuanKerja( id_periode, id_master, id_satker, bobot, targett, last_update) 
        VALUES( ?, ?, ?, ?, ?, ?)
        """

f = open("Fakultas.txt", "w")

os.chdir('Fakultas')
listDir = os.listdir()
print(listDir)

for dir in listDir:
        filename = dir
        deptName = dir.split('.')
        deptName = deptName[0]
        deptName = str(deptName).replace('Konkin ', '')
        print(deptName)

        #Get ID Satker
        cursor.execute("select id_satker, nama from SatuanKerja where nama like ?", deptName)
        satker = cursor.fetchall()
        idSatker = None
        if satker:
                idSatker = satker[0][0]
                print("id satker plsss : ",idSatker)

        #Get ID Priode
        cursor.execute("select id from Periode")
        periode = cursor.fetchall()
        idPeriode = periode[0][0]

        book = xlrd.open_workbook(filename)
        sheet = book.sheet_by_name("Konkin")

        #Get Total Rows
        totalRows = None
        for r in range(4, sheet.nrows):
                try:
                        totalRows = int(sheet.cell(r,0).value)
                except ValueError:
                        continue

        # print(totalRows)

        temp = None
        komponenAspek = None

        for r in range(4, totalRows+4):

                #Komponen Aspek 
                # if len(sheet.cell(r,2).value) > 1:
                #         temp = sheet.cell(r,2).value 

                # if temp:
                #         komponenAspek = temp
                # else:
                #         komponenAspek = sheet.cell(r,2).value

                # cursor.execute("select id, aspek, komponen_aspek from Aspek where komponen_aspek = ?",  komponenAspek )
                # idAspek = cursor.fetchall()

                #Master Indikator

                namaIndikator = sheet.cell(r, 3).value
                cursor.execute("select id from MasterIndikator where nama = ?",  namaIndikator )
                idIndikator = cursor.fetchall()

                bobot = sheet.cell(r, 4).value
                target = sheet.cell(r, 5).value
                
                values = (idPeriode, idIndikator[0][0], idSatker, float(bobot), float(target), now )
                f.write(str(deptName) + ' ' + str(r-3) + ' ' + str(values) + "\n")
                
                cursor.execute(query, values)

        conn.commit()

conn.close()

