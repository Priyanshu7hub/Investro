import { createContext, useContext, useState, useEffect } from "react";
import { nifty50Stocks, generateMarketHistory, Stock } from "@/data/marketData";

interface MarketContextType {
  stocks: Stock[];
  marketHistory: any[];
  getStock: (symbol: string) => Stock | undefined;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [stocks, setStocks] = useState<Stock[]>(nifty50Stocks);
  const [marketHistory] = useState(generateMarketHistory());

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(currentStocks => 
        currentStocks.map(stock => ({
          ...stock,
          price: stock.price * (1 + (Math.random() - 0.5) * 0.002)
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStock = (symbol: string) => stocks.find(s => s.symbol === symbol);

  return (
    <MarketContext.Provider value={{ stocks, marketHistory, getStock }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error("useMarket must be used within a MarketProvider");
  }
  return context;
}
