import pandas as pd
import yfinance as yf
import datetime

def data_download(symbols=None, date=datetime.date(2017, 1, 1)):
    """
    Download SP500 & HSI constituent stock data and export them to csv files.

    Parameters
    ----------
    symbols : Nonetype or list-like, optional
        If None, download all SP500 & HSI constituent stock data;
        else download all stocks in the list. 
        The default is None.
    date : datetime.date object, optional
        Starting date of data to be downloaded. 
        The default is datetime.date(2017, 1, 1).

    Returns
    -------
    None.

    """
    # import data
    start = date
    end = datetime.date.today()
    modified_start = start + datetime.timedelta(days=1)
    modified_end = end + datetime.timedelta(days=1)
    
    if symbols == None:
        symbol1 = pd.read_csv('SP500_all_stocks.csv', usecols=['Symbol'])
        symbol2 = pd.read_csv('HSI_all_stocks.csv', usecols=['Symbol'])
        symbols = pd.concat([symbol1, symbol2])
        for symbol in symbols.values:
            try:
                stock = yf.download(symbol[0], start=modified_start, end=modified_end)
                stock.to_csv(f'stock_data/{symbol[0]}.csv')
            except Exception:
                continue
    else:
        for symbol in symbols:
            try:
                stock = yf.download(symbol, start=modified_start, end=modified_end)
                stock.to_csv(f'stock_data/{symbol}.csv')
            except Exception:
                continue
    # SP500 = yf.download('SPY',start=datetime.date(2019, 10, 2), end=modified_end)
    # SP500.to_csv(f'stock_data/SP500.csv')

data_download()