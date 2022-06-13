import csv
import pandas as pd
import pymongo
import json
import glob
import re

client = pymongo.MongoClient("fill in the black")
db = client['stock']
collection = db['stockdata']

path="stock2"
all_files=glob.glob(path+'\*.csv')

#q=collection.delete_many({})

for filename in all_files:
    nocsv=re.sub('.csv', '' ,filename)
    nopath=re.sub(path, '', nocsv)

    data = pd.read_csv(filename,encoding = 'UTF-8')
    #get the info
    data_json = json.loads(data.to_json(orient='records'))
    for data in data_json:
        data['stocknumber']=nopath

collection.insert_many(data_json)
