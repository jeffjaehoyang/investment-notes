export interface InvestmentRecord {
  createdAt: string;
  id: string;
  startDate: Date;
  tickerSymbol: string;
  companyName: string;
  companyDomain: string;
  amount: number;
  notes: string;
  didInvest: boolean;
  marketData?: {
    dates: Array<string>;
    data: Array<number>;
  };
  gains?: number;
}

export interface User {
  name: string;
  email: string;
  image: string;
}

export interface StockData {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  adjClose: string;
  volume: string;
}
