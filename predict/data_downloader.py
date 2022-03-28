import pandas as pd
import yfinance as yf
import datetime
import numpy as np
from sklearn.decomposition import PCA

def data_download(symbol=None, date=datetime.date(2021, 1, 1)):
    # import data
    start = date
    end = datetime.date.today()
    modified_start = start + datetime.timedelta(days=1)
    modified_end = end + datetime.timedelta(days=1)
    
    if symbol == None:
        symbols = pd.read_csv('SP500_all_stocks', usecols=['Symbol'])
        for symbol in symbols.values:
            try:
                stock = yf.download(symbol[0], start=modified_start, end=modified_end)
                stock.to_csv(f'stock_data/{symbol[0]}.csv')
            except Exception:
                continue
    else:
        try:
            stock = yf.download(symbol, start=modified_start, end=modified_end)
            stock.to_csv(f'stock_data/{symbol[0]}.csv')
        except Exception:
            pass
    # SP500 = yf.download('SPY',start=datetime.date(2019, 10, 2), end=modified_end)
    # SP500.to_csv(f'stock_data/SP500.csv')

data_download()