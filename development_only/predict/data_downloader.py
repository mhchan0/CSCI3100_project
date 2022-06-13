import pandas as pd
import yfinance as yf
import datetime

def data_download(symbols=None, date=datetime.date(2017, 1, 1)):
    """
    Download SP500 & HSI constituent stock data and export them to csv files.

    Parameters
    ----------
    symbols : None or string, optional
        If None, download all SP500 & HSI constituent stock data;
        else download stock with symbol as input. 
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
                stock = yf.download(symbol[0], start=modified_start, end=modified_end, timeout=3)
                retry = 10
                while stock.shape[0] < 3 and retry > 0:   # For error handling, as yfinance sometimes does not work for unknown reasons
                    stock = yf.download(symbol[0], start=modified_start, end=modified_end, timeout=3)
                    retry -= 1
                if retry > 0:
                    stock.to_csv(f'stock_data/{symbol[0]}.csv')
                else:
                    print(f"Error downloading data for {symbol}. Please check if inputs are correct.")
            except Exception:
                continue
    else:
        try:
            stock = yf.download(symbols, start=modified_start, end=modified_end, timeout=3)
            retry = 10
            while stock.shape[0] < 3 and retry > 0:   # For error handling, as yfinance sometimes does not work for unknown reasons
                stock = yf.download(symbols, start=modified_start, end=modified_end, timeout=3)
                retry -= 1
            if retry > 0:
                stock.to_csv(f'stock_data/{symbol[0]}.csv')
            else:
                print(f"Error downloading data for {symbols}. Please check if inputs are correct.")
        except Exception:
            pass
    # SP500 = yf.download('SPY',start=datetime.date(2019, 10, 2), end=modified_end)
    # SP500.to_csv(f'stock_data/SP500.csv')

data_download()