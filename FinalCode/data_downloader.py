"""
PROGRAM data_downloader - Program for downloading stock data
PROGRAMMER: WONG, Kong Wa
VERSION 1.0.0: written Mar 31, 2022
REVISION 1.1.0: Apr 2, fixed a bug where download gets stuck for no apparent reason
REVISION 1.1.1: Apr 9, 2022, for integration with front-end application
PURPOSE: To download raw stock data from Yahoo! Finance and export them to csv files
Refer to header comment block of the function for details.
"""

import pandas as pd
import yfinance as yf
import datetime
import sys

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
                # For error handling, as yfinance sometimes does not work for unknown reasons
                while stock.shape[0] < 3 and retry > 0:
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
            # For error handling, as yfinance sometimes does not work for unknown reasons
            while stock.shape[0] < 3 and retry > 0:
                stock = yf.download(symbols, start=modified_start, end=modified_end, timeout=3)
                retry -= 1
            if retry > 0:
                stock.to_csv(f'stock_data/{symbol[0]}.csv')
            else:
                print(f"Error downloading data for {symbols}. Please check if inputs are correct.")
        except Exception:
            pass

if (len(sys.argv) == 2):
    s=sys.argv[1]
    data_download(s)

else:
    data_download()
