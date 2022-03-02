import numpy as np
import pandas as pd
import scipy.optimize as spo

class ARIMA_GARCH():
    """
    ARIMA-GARCH model.
    This class chooses the best ARIMA-GARCH model using Bayesian Information 
    Criteria (BIC).
    
    Parameters:
        price: array_like
            Adjusted close prices of a stock
        model_param: array of size 5
            Model parameters, with 0-th to 4-th elements being order of
            autoregressive model, degree of differencing, order of moving-
            average model, order of GARCH terms and order of ARCH terms respectively
    
    Methods:
        (To be updated)
    """
    def __init__(self, price):
        self.price = np.array(price)
        self.model_param = None