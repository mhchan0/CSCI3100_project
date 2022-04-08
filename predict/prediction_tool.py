import math
import numpy as np
import pandas as pd
import scipy.stats as ss
import matplotlib.pyplot as plt
import seaborn as sns

def price_confidence_interval(stock, CI=0.95, plot_graph=False):
    """
    Predicts confidence interval of price for stock.
    
    Parameters
    ----------
    stock : str
        Stock to predict.
    CI : float, optional
        Confidence interval to be calculated. The default is 0.95.
    plot_graph: bool, optional.
        If True, plot graph of expected return along with confidence interval;
        not plot graph otherwise. The default is False.

    Returns
    -------
    upper_bound : float
        Upper bound of the confidence interval for price.
    lower_bound : float
        Lower bound of the confidence interval for price.

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
    
    if plot_graph:
        next_dates = pd.date_range(start=data.index[-1],
                                   periods=len(expected_prices)+1,
                                   freq="B")[1:]
        expected_close = pd.DataFrame({"Adj Close": expected_prices}, index=next_dates)
        all_close = pd.concat([data.iloc[-60:], expected_close])
        min_price_date = pd.DataFrame({"Adj Close": min_prices}, index=next_dates)
        min_price_date = pd.concat([data.iloc[-1:], min_price_date])
        max_price_date = pd.DataFrame({"Adj Close": max_prices}, index=next_dates)
        max_price_date = pd.concat([data.iloc[-1:], max_price_date])

        sns.set_theme(style="darkgrid")
        
        plt.plot(all_close.index, all_close["Adj Close"])
        plt.plot(min_price_date, color="r")
        plt.plot(max_price_date, color="r")
        plt.grid(True)
        fill = plt.fill_between(max_price_date.index, 
                         min_price_date["Adj Close"], 
                         max_price_date["Adj Close"], 
                         color="#CC0033",
                         alpha=0.3)
        plt.xticks(rotation=45)
        plt.legend(handles=[fill], labels=["Confidence Interval"])
        if stock[0].isdigit():
            plt.ylabel("Price (HKD)")
        else:
            plt.ylabel("Price (USD)")
        plt.savefig(f"stock_graph/{stock}.jpg")
        plt.show()

    
    upper_bound, lower_bound = max_prices[-1], min_prices[-1]
    return upper_bound, lower_bound

def return_confidence_interval(stock, CI=0.95):
    """
    Predicts confidence interval of return for stock.

    Parameters
    ----------
    stock : str
        Stock to predict.
    CI : float, optional
        Confidence interval to be calculated. The default is 0.95.
    plot_graph: bool, optional.
        If True, plot graph of expected return along with confidence interval;
        not plot graph otherwise. The default is False.

    Returns
    -------
    upper_bound : float
        Upper bound of the confidence interval for return.
    lower_bound : float
        Lower bound of the confidence interval for return.

    """
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
    
    upper_bound, lower_bound = np.sum(max_return[-1]), np.sum(min_return[-1])
    return upper_bound, lower_bound
    
def VaR_price(stock, param=0.95):
    """
    Predicts VaR (in dollar) of stock.
    
    Parameters
    ----------
    stock : str
        Stock to predict.
    param : float, optional
        Confidence interval to be calculated. The default is 0.95.

    Returns
    -------
    final_VaR : float
        Expected VaR of the stock.

    """
    data = pd.read_csv(f"stock_data/{stock}.csv",
                            index_col="Date",
                            usecols=["Date", "Adj Close"],
                            parse_dates=True)
    expected_log_return = pd.read_csv(f"prediction_data/{stock}_mu.csv").x
    expected_std = pd.read_csv(f"prediction_data/{stock}_sig.csv").x
    
    param = 1 - (1 - param) * 2
    quantile_width = [1 - (1 - param) ** (1 / (i + 1)) for i in range(len(expected_log_return))]
    min_quantile = (1 - np.array(quantile_width)) / 2
    
    min_return = [ss.norm.ppf(min_quantile[i],
                              expected_log_return[:i + 1],
                              expected_std[:i + 1]) for i in range(len(expected_log_return))]

    min_prices = []
    for i in range(len(expected_log_return)):
        min_price = data["Adj Close"].iloc[-1]
        for j in range(i + 1):
            min_price *= math.exp(min_return[i][j - 1])
        min_prices.append(min_price)
            
    min_prices = np.minimum(data["Adj Close"].iloc[-1], min_prices)
    
    final_VaR = data["Adj Close"].iloc[-1] - min_prices[-1]
    return final_VaR

def VaR_return(stock, param=0.95):
    """
    Predicts VaR (in dollar) of stock.
    
    Parameters
    ----------
    stock : str
        Stock to predict.
    param : float, optional
        Confidence interval to be calculated. The default is 0.95.

    Returns
    -------
    final_VaR : float
        Expected VaR of the stock.

    """
    expected_log_return = pd.read_csv(f"prediction_data/{stock}_mu.csv").x
    expected_std = pd.read_csv(f"prediction_data/{stock}_sig.csv").x
    
    param = 1 - (1 - param) * 2
    quantile_width = [1 - (1 - param) ** (1 / (i + 1)) for i in range(len(expected_log_return))]
    min_quantile = (1 - np.array(quantile_width)) / 2
    
    min_return = [ss.norm.ppf(min_quantile[i],
                              expected_log_return[:i + 1],
                              expected_std[:i + 1]) for i in range(len(expected_log_return))]
            
    min_return = np.minimum(0, np.sum(min_return[-1]))
    return -min_return

def expected_log_return(stock):
    """
    Predicts log return of stock.
    
    Parameters
    ----------
    stock : str
        Stock to predict.

    Returns
    -------
    total_expected_return : float
        Expected log return of the stock.

    """
    expected_log_return = pd.read_csv(f"prediction_data/{stock}_mu.csv").x
    total_expected_return = np.sum(expected_log_return)
    return total_expected_return

def expected_price(stock):
    """
    Predicts price (in dollar) of stock.

    Parameters
    ----------
    stock : str
        Stock to predict.

    Returns
    -------
    price : float
        Expected price of the stock.

    """
    data = pd.read_csv(f"stock_data/{stock}.csv",
                            index_col="Date",
                            usecols=["Date", "Adj Close"],
                            parse_dates=True)
    last_price = data["Adj Close"].iloc[-1]
    expected_return = expected_log_return(stock)
    price = last_price * math.exp(expected_return)
    return price
    
def expected_std(stock):
    """
    Predicts standard deviation of log return of stock.

    Parameters
    ----------
    stock : str
        Stock to predict.

    Returns
    -------
    std : float
        Expected standard deviation of return.

    """
    upper_bound, lower_bound = return_confidence_interval(stock)
    interval_width = upper_bound - lower_bound
    std = interval_width / (2 * ss.norm.ppf(0.975))
    return std

def expected_sharpe_ratio(stock):
    """
    Predicts annualized Sharpe ratio of stock.
    
    Parameters
    ----------
    stock : str
        Stock to predict.

    Returns
    -------
    expected_sharpe : float
        Expected Sharpe ratio of the stock.

    """
    expected_return = expected_log_return(stock)
    expected_sd = expected_std(stock)
    expected_sharpe = expected_return / expected_sd
    expected_sharpe *= math.sqrt(250 / len(pd.read_csv(f"prediction_data/{stock}_mu.csv").x))
    return expected_sharpe

# For debugging
stock = "AAPL"

print("CI (price):", price_confidence_interval(stock, CI=0.9, plot_graph=True))
print("CI (return):", return_confidence_interval(stock, CI=0.9))
print("VaR (price):", VaR_price(stock, param=0.95))
print("VaR (return):", VaR_return(stock, param=0.95))
print("Log return:", expected_log_return(stock))
print("Price:", expected_price(stock))
print("Std:", expected_std(stock))
print("Sharpe ratio:", expected_sharpe_ratio(stock))