import pandas as pd
from pymongo import MongoClient
import json

def initDB(file):

    client = MongoClient("mongodb://localhost:27017/")
    db = client["db"]
    col = db["stocks"]

    data = pd.read_csv(file)
    payload = json.loads(data.to_json(orient='records'))
    col.drop()
    col.insert_many(payload)


initDB("./HSI_all_stocks.csv")
