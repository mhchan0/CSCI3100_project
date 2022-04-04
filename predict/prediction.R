library(rugarch)

arma_garch_pred <- function(ticker, m=7, use_period=125, arma_order=c(1, 1), garch_order=c(2, 2)) {
  # ticker: ticker of stock to predict
  # m: Number of periods (days) to predict
  # arma_order: Order of ARMA model
  # garch_order: Order of GARCH model
  
  # Retrieving data from csv & calculating log return
  path <- paste("stock_data/", ticker, ".csv", sep="")
  stock <- read.csv(path)$Adj.Close
  stock <- tail(stock, use_period)
  print(stock)
  log_returns <- diff(log(stock), lag=1)
  
  # Fitting ARMA-GARCH model
  var_model <- list(model = "sGARCH", garchOrder = garch_order)
  spec <- ugarchspec(var_model, mean.model=list(armaOrder=arma_order),
                     distribution.model="std")
  fit <- ugarchfit(spec, data = log_returns)
  
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
arma_garch_pred("1997.HK", m=20)
