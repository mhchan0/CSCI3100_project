import csv
import pandas as pd
import pymongo
import json
client = pymongo.MongoClient("fill in the blank")
db = client['stock']
collection = db['stockdata']

data = pd.read_csv('A.csv',encoding = 'UTF-8')
#get the info
data_json = json.loads(data.to_json(orient='records'))
collection.insert_many(data_json)