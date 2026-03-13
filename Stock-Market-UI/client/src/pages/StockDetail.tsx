import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMarket } from "@/context/MarketContext";
import { usePortfolio } from "@/context/PortfolioContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateStockHistory } from "@/data/marketData";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const { getStock } = useMarket();
  const { buyStock, sellStock, getHolding } = usePortfolio();
  
  const stock = getStock(symbol || "");
  const holding = getHolding(symbol || "");
  
  const [quantity, setQuantity] = useState<string>("1");
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (stock) {
      setHistory(generateStockHistory(stock.price));
    }
  }, [stock]);

  if (!stock) {
    return <div className="container py-8 text-center">Stock not found</div>;
  }

  const handleBuy = () => {
    const qty = parseInt(quantity);
    if (qty > 0) buyStock(stock.symbol, stock.name, stock.price, qty);
  };

  const handleSell = () => {
    const qty = parseInt(quantity);
    if (qty > 0 && holding && holding.quantity >= qty) {
      sellStock(stock.symbol, stock.price, qty);
    }
  };

  const isPositive = stock.change >= 0;
  const chartColor = isPositive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';
  const chartBg = isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)';

  const chartData = {
    labels: history.map(d => d.date),
    datasets: [
      {
        fill: true,
        label: `${stock.symbol} Price`,
        data: history.map(d => d.value),
        borderColor: chartColor,
        backgroundColor: chartBg,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      x: { display: false },
      y: { display: false, suggestedMin: stock.price * 0.9, suggestedMax: stock.price * 1.1 },
    },
  };

  return (
    <div className="container py-8 px-4 md:px-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">{stock.symbol}</h1>
          <p className="text-xl text-muted-foreground">{stock.name}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-mono font-bold">₹{stock.price.toFixed(2)}</div>
          <div className={`flex items-center justify-end gap-2 text-lg font-medium ${isPositive ? 'text-primary' : 'text-destructive'}`}>
            {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
            {isPositive ? '+' : ''}{stock.change}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="h-[400px] w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle>Trade {stock.symbol}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Quantity</label>
                <Input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-background/50 text-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleBuy} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12">Buy</Button>
                <Button onClick={handleSell} variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10 font-bold h-12" disabled={!holding || holding.quantity < parseInt(quantity)}>Sell</Button>
              </div>
              <div className="pt-4 border-t border-border flex justify-between text-sm">
                <span className="text-muted-foreground">Est. Cost</span>
                <span className="font-mono">₹{(stock.price * (parseInt(quantity) || 0)).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {holding && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Position Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Qty Owned</span>
                  <span className="font-bold">{holding.quantity}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Avg Price</span>
                  <span className="font-mono font-bold">₹{holding.averagePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-muted-foreground text-sm font-medium">Profit / Loss</span>
                  <span className={`font-mono font-bold ${(stock.price - holding.averagePrice) >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    ₹{((stock.price - holding.averagePrice) * holding.quantity).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
