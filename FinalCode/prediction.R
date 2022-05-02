#-------------------------------------------------------------------------------
# PROGRAM prediction - Program for computing expectations and standard 
# deviations of log returns
# PROGRAMMER: WONG, Kong Wa
# VERSION 1.0.0: written Mar 30, 2022
# REVISION 1.1: Apr 4, 2022, default parameters updated
# PURPOSE: To compute expectations and standard deviations of log returns for 
# specified period and stock using ARMA-GARCH model with historical stock data
# Refer to header comment block of the function for details.
#-------------------------------------------------------------------------------

library(parallel)
library(rugarch, warn.conflicts = FALSE)

arma_garch_pred <- function(ticker, m=7, use_period=125, arma_order=c(1, 1), garch_order=c(2, 2)) {
  #-----------------------------------------------------------------------------
  # Computes expected log return and standard deviation of the next m day(s)
  # using use_period days of historical data, and output them to csv 
  # files.
    
  # Parameters
  # ----------
  # ticker: str
  #   ticker of stock to predict
  # m: int, optional
  #   Number of periods (days) to predict. The default is 7.
  # use_period: int, optional
  #   Number of periods (days) to use for prediction. The default is 125.
  # arma_order: vector of int, optional
  #   Order of ARMA part of the model. The default is c(1, 1).
  # garch_order: vector of int, optional
  #   Order of GARCH part of the model. The default is c(2, 2).

  # Returns
  # -------
  # None.
  #-----------------------------------------------------------------------------

  setwd("./") #C:/Users/hinsl/OneDrive/Desktop/react/testing__4/
  path <- paste("stock_data/", ticker, ".csv", sep="")
  stock <- read.csv(path)$Adj.Close
  stock <- tail(stock, use_period)
  print(stock)
  log_returns <- diff(log(stock), lag=1)
  
  # Fitting ARMA-GARCH model
  var_model <- list(model = "sGARCH", garchOrder = garch_order)
  spec <- ugarchspec(var_model, mean.model=list(armaOrder=arma_order),
                     distribution.model="std")
  fit <- ugarchfit(spec, data = log_returns, solver ='hybrid')
  
  # Prediction
  fspec <- getspec(fit)
  setfixed(fspec) <- as.list(coef(fit))
  pred <- ugarchforecast(fspec, data=log_returns, n.ahead = 1, n.roll=m-1, out.sample=m)
  mu.predict <- as.numeric(fitted(pred))
  sig.predict <- as.numeric(sigma(pred))
  
  # Plotting mu and sigma (for debugging only, to be deleted)
  plot(mu.predict, type='l')
  plot(sig.predict, type='l')
  
  # Exporting ARMA-GARCH prediction data
  write.csv(mu.predict, paste("prediction_data/", ticker, "_mu.csv", sep=""))
  write.csv(sig.predict, paste("prediction_data/", ticker, "_sig.csv", sep=""))     
}
# arma_garch_pred("AAPL", m=20)