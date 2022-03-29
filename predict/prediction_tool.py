import math
import numpy as np
import pandas as pd
import scipy.stats as ss
import matplotlib.pyplot as plt

def convidence_interval(stock, CI=0.95):
    """
    Parameters
    ----------
    stock : string
        Stock to predict
    CI : float, optional
        Confidence interval to be calculated. The default is 0.95.

    Returns
    -------
    None.

    """
    data = pd.read_csv(f"stock_data/{stock}.csv",
                            index_col="Date",
                            usecols=["Date", "Adj Close"],
                            parse_dates=True)
    expected_log_return = pd.read_csv(f"prediction_data/{stock}_mu.csv").x
    expected_std = pd.read_csv(f"prediction_data/{stock}_sig.csv").x
    
    quantile_width = [1 - (1 - CI) ** (1 / (i + 1)) for i in range(len(expected_log_return))]
    min_quantile = (1 - np.array(quantile_width)) / 2
    max_quantile = 1 - (1 - np.array(quantile_width)) / 2
    
    min_return = [ss.norm.ppf(min_quantile[i],
                              expected_log_return[:i + 1],
                              expected_std[:i + 1]) for i in range(len(expected_log_return))]
    max_return = [ss.norm.ppf(max_quantile[i],
                              expected_log_return[:i + 1],
                              expected_std[:i + 1]) for i in range(len(expected_log_return))]
    
        
    expected_prices = [data["Adj Close"].iloc[-1]]
    min_prices = []
    max_prices = []
    for i in range(len(expected_log_return)):
        expected_prices.append(expected_prices[-1] * math.exp(expected_log_return[i]))
        min_price, max_price = data["Adj Close"].iloc[-1], data["Adj Close"].iloc[-1]
        for j in range(i + 1):
            min_price *= math.exp(min_return[i][j - 1])
            max_price *= math.exp(max_return[i][j - 1])
        min_prices.append(min_price)
        max_prices.append(max_price)
            
    expected_prices = expected_prices[1:]
    
    plt.plot(expected_prices)
    plt.plot(min_prices)
    plt.plot(max_prices)