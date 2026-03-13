import { useState, useMemo } from "react";
import { useMarket } from "@/context/MarketContext";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
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

export default function Dashboard() {
  const { stocks, marketHistory } = useMarket();
  const [search, setSearch] = useState("");

  const filteredStocks = useMemo(() => {
    return stocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(search.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [stocks, search]);

  const marketTrend = useMemo(() => {
    const start = marketHistory[0].value;
    const end = marketHistory[marketHistory.length - 1].value;
    return ((end - start) / start) * 100;
  }, [marketHistory]);

  const chartData = {
    labels: marketHistory.map(d => d.date),
    datasets: [
      {
        fill: true,
        label: 'NIFTY 50 Index',
        data: marketHistory.map(d => d.value),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
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
      y: { display: false, suggestedMin: 17000 },
    },
  };

  return (
    <div className="container py-8 px-4 md:px-6 space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-xl shadow-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              NIFTY 50 Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Market Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold flex items-center gap-2 ${marketTrend >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {marketTrend >= 0 ? '+' : ''}{marketTrend.toFixed(2)}%
                {marketTrend >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Past 30 Days</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Gainer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">RELIANCE</div>
              <p className="text-xs text-primary/80 mt-1">+1.25% Today</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h2 className="text-2xl font-bold font-display">Market Watch</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks..."
              className="pl-9 bg-card/50 border-border/50 focus:ring-primary/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStocks.map((stock) => (
            <Link key={stock.symbol} to={`/stock/${stock.symbol}`} target="_blank">
              <Card className="cursor-pointer hover:border-primary/50 transition-all hover:bg-card/80 group h-full">
                <CardContent className="p-6 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{stock.symbol}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{stock.name}</p>
                    </div>
                    <div className={`flex items-center px-2 py-1 rounded text-xs font-medium ${stock.change >= 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-mono font-bold">₹{stock.price.toFixed(2)}</span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
