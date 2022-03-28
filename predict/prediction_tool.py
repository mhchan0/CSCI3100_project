import numpy as np
import pandas as pd
import scipy.optimize as spo

def prediction(stock):
    stock = pd.read_csv(f"stock_data/{stock}.csv",
                        index_col="Date",
                        usecols=["Date", "Adj Close"],
                        parse_dates=True)
    expected_log_return=pd.read_csv("prediction_data/{stock}_mu.csv")
    expected_log_return=pd.read_csv("prediction_data/{stock}_sig.csv")