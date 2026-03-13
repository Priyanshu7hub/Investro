export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export const nifty50Stocks: Stock[] = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", price: 2450.75, change: 1.25 },
  { symbol: "TCS", name: "Tata Consultancy Services Ltd", price: 3215.20, change: -0.45 },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd", price: 1520.30, change: 0.85 },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd", price: 940.55, change: 1.10 },
  { symbol: "INFY", name: "Infosys Ltd", price: 1380.15, change: -1.20 },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", price: 2540.60, change: 0.30 },
  { symbol: "ITC", name: "ITC Ltd", price: 445.25, change: 2.15 },
  { symbol: "SBIN", name: "State Bank of India", price: 585.90, change: -0.75 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", price: 870.45, change: 0.95 },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank Ltd", price: 1845.20, change: -0.25 },
  { symbol: "LT", name: "Larsen & Toubro Ltd", price: 2380.10, change: 1.55 },
  { symbol: "AXISBANK", name: "Axis Bank Ltd", price: 960.35, change: 0.65 },
  { symbol: "ASIANPAINT", name: "Asian Paints Ltd", price: 3120.80, change: -0.90 },
  { symbol: "MARUTI", name: "Maruti Suzuki India Ltd", price: 9240.50, change: 0.40 },
  { symbol: "TITAN", name: "Titan Company Ltd", price: 2980.25, change: 1.80 },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", price: 7150.60, change: -1.15 },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries Ltd", price: 1050.40, change: 0.55 },
  { symbol: "HCLTECH", name: "HCL Technologies Ltd", price: 1120.75, change: -0.60 },
  { symbol: "ADANIENT", name: "Adani Enterprises Ltd", price: 2480.30, change: 3.20 },
  { symbol: "TATASTEEL", name: "Tata Steel Ltd", price: 115.45, change: -0.35 },
  { symbol: "NTPC", name: "NTPC Ltd", price: 195.20, change: 0.90 },
  { symbol: "M&M", name: "Mahindra & Mahindra Ltd", price: 1450.80, change: 1.25 },
  { symbol: "POWERGRID", name: "Power Grid Corporation of India Ltd", price: 245.15, change: 0.45 },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement Ltd", price: 8240.60, change: -0.50 },
  { symbol: "ADANIPORTS", name: "Adani Ports & SEZ Ltd", price: 745.25, change: 2.10 },
  { symbol: "JSWSTEEL", name: "JSW Steel Ltd", price: 785.40, change: -0.85 },
  { symbol: "GRASIM", name: "Grasim Industries Ltd", price: 1780.90, change: 0.20 },
  { symbol: "HINDALCO", name: "Hindalco Industries Ltd", price: 425.35, change: 1.45 },
  { symbol: "NESTLEIND", name: "Nestle India Ltd", price: 22150.00, change: -0.30 },
  { symbol: "INDUSINDBK", name: "IndusInd Bank Ltd", price: 1320.45, change: 0.75 },
  { symbol: "TECHM", name: "Tech Mahindra Ltd", price: 1080.60, change: -1.25 },
  { symbol: "TATAMOTORS", name: "Tata Motors Ltd", price: 620.15, change: 2.45 },
  { symbol: "WIPRO", name: "Wipro Ltd", price: 395.40, change: -0.95 },
  { symbol: "ONGC", name: "Oil & Natural Gas Corporation Ltd", price: 165.80, change: 0.65 },
  { symbol: "COALINDIA", name: "Coal India Ltd", price: 230.25, change: 0.50 },
  { symbol: "SBILIFE", name: "SBI Life Insurance Company Ltd", price: 1280.90, change: -0.40 },
  { symbol: "HDFCLIFE", name: "HDFC Life Insurance Company Ltd", price: 645.15, change: 0.80 },
  { symbol: "BRITANNIA", name: "Britannia Industries Ltd", price: 4850.30, change: -0.20 },
  { symbol: "DRREDDY", name: "Dr. Reddy's Laboratories Ltd", price: 5120.45, change: 1.15 },
  { symbol: "APOLLOHOSP", name: "Apollo Hospitals Enterprise Ltd", price: 4980.60, change: -0.75 },
  { symbol: "DIVISLAB", name: "Divi's Laboratories Ltd", price: 3650.25, change: 0.40 },
  { symbol: "EICHERMOT", name: "Eicher Motors Ltd", price: 3340.80, change: 1.20 },
  { symbol: "BPCL", name: "Bharat Petroleum Corporation Ltd", price: 365.45, change: -0.55 },
  { symbol: "BAJAJ-AUTO", name: "Bajaj Auto Ltd", price: 4680.15, change: 0.90 },
  { symbol: "HEROMOTOCO", name: "Hero MotoCorp Ltd", price: 2840.30, change: -0.35 },
  { symbol: "CIPLA", name: "Cipla Ltd", price: 1020.75, change: 0.65 },
  { symbol: "UPL", name: "UPL Ltd", price: 685.20, change: -1.45 },
  { symbol: "BAJAJFINSV", name: "Bajaj Finserv Ltd", price: 1540.60, change: -0.80 },
  { symbol: "LTIM", name: "LTIMindtree Ltd", price: 4950.25, change: 1.10 }
];

export const generateStockHistory = (basePrice: number) => {
  const data = [];
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const randomChange = (Math.random() - 0.5) * (basePrice * 0.05);
    data.push({
      date: date.toLocaleDateString(),
      value: basePrice + randomChange
    });
  }
  return data;
};

export const generateMarketHistory = () => {
  const data = [];
  const now = new Date();
  const baseValue = 18500;
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const randomChange = (Math.random() - 0.5) * 500;
    data.push({
      date: date.toLocaleDateString(),
      value: baseValue + randomChange
    });
  }
  return data;
};
