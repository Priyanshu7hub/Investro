import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
}

interface PortfolioContextType {
  holdings: Holding[];
  buyStock: (symbol: string, name: string, price: number, quantity: number) => void;
  sellStock: (symbol: string, price: number, quantity: number) => void;
  getHolding: (symbol: string) => Holding | undefined;
  totalInvested: number;
  totalCurrentValue: (currentPrices: Record<string, number>) => number;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const { toast } = useToast();

  const portfolioKey = user ? `investro_portfolio_${user.email}` : null;

  useEffect(() => {
    if (portfolioKey) {
      const stored = localStorage.getItem(portfolioKey);
      if (stored) {
        try {
          setHoldings(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse portfolio");
        }
      } else {
        setHoldings([]);
      }
    } else {
      setHoldings([]);
    }
  }, [portfolioKey]);

  useEffect(() => {
    if (portfolioKey) {
      localStorage.setItem(portfolioKey, JSON.stringify(holdings));
    }
  }, [holdings, portfolioKey]);

  const buyStock = (symbol: string, name: string, price: number, quantity: number) => {
    setHoldings(current => {
      const existing = current.find(h => h.symbol === symbol);
      if (existing) {
        const newQuantity = existing.quantity + quantity;
        const newAveragePrice = (existing.averagePrice * existing.quantity + price * quantity) / newQuantity;
        return current.map(h => h.symbol === symbol ? { ...h, quantity: newQuantity, averagePrice: newAveragePrice } : h);
      }
      return [...current, { symbol, name, quantity, averagePrice: price }];
    });
    toast({ title: "Purchase Successful", description: `Bought ${quantity} shares of ${symbol}` });
  };

  const sellStock = (symbol: string, price: number, quantity: number) => {
    setHoldings(current => {
      const existing = current.find(h => h.symbol === symbol);
      if (!existing || existing.quantity < quantity) return current;
      
      const newQuantity = existing.quantity - quantity;
      if (newQuantity === 0) {
        return current.filter(h => h.symbol !== symbol);
      }
      return current.map(h => h.symbol === symbol ? { ...h, quantity: newQuantity } : h);
    });
    toast({ title: "Sale Successful", description: `Sold ${quantity} shares of ${symbol}` });
  };

  const getHolding = (symbol: string) => holdings.find(h => h.symbol === symbol);

  const totalInvested = holdings.reduce((sum, h) => sum + (h.averagePrice * h.quantity), 0);

  const totalCurrentValue = (currentPrices: Record<string, number>) => {
    return holdings.reduce((sum, h) => sum + ((currentPrices[h.symbol] || h.averagePrice) * h.quantity), 0);
  };

  return (
    <PortfolioContext.Provider value={{ holdings, buyStock, sellStock, getHolding, totalInvested, totalCurrentValue }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
