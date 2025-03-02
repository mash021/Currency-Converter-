export interface CurrencyRate {
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export interface AlertSetting {
  fromCurrency: string;
  toCurrency: string;
  targetRate: number;
}

export interface ConversionResult {
  amount: number;
  from: string;
  to: string;
  result: number;
  rate: number;
}