import { usePortfolio } from "@/context/PortfolioContext";
import { useMarket } from "@/context/MarketContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { ArrowUpRight, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  const { holdings, totalInvested, totalCurrentValue } = usePortfolio();
  const { stocks } = useMarket();

  const currentPrices = stocks.reduce((acc, stock) => {
    acc[stock.symbol] = stock.price;
    return acc;
  }, {} as Record<string, number>);

  const currentValue = totalCurrentValue(currentPrices);
  const totalPL = currentValue - totalInvested;
  const isProfitable = totalPL >= 0;

  return (
    <div className="container py-8 px-4 md:px-6 space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-display font-bold">Your Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground">Total Invested</CardHeader>
          <CardContent><div className="text-2xl font-mono font-bold text-white">₹{totalInvested.toFixed(2)}</div></CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground">Current Value</CardHeader>
          <CardContent><div className="text-2xl font-mono font-bold text-white">₹{currentValue.toFixed(2)}</div></CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground">Overall P&L</CardHeader>
          <CardContent>
            <div className={`text-2xl font-mono font-bold ${isProfitable ? 'text-primary' : 'text-destructive'}`}>
              {isProfitable ? '+' : ''}₹{totalPL.toFixed(2)}
            </div>
            <p className={`text-xs mt-1 ${isProfitable ? 'text-primary/80' : 'text-destructive/80'}`}>
              {totalInvested > 0 ? ((totalPL / totalInvested) * 100).toFixed(2) : '0.00'}% Total Return
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex flex-row items-center gap-2 border-b border-border/20 mb-4 pb-4">
          <PieChart className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Stock Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          {holdings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-6">No stocks in your portfolio yet.</p>
              <Link to="/dashboard"><Button className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">Explore Stocks</Button></Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/20">
                  <TableHead className="w-[200px]">Stock</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Avg Price</TableHead>
                  <TableHead className="text-right">Current</TableHead>
                  <TableHead className="text-right">Invested</TableHead>
                  <TableHead className="text-right">P&L</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.map((holding) => {
                  const current = currentPrices[holding.symbol] || holding.averagePrice;
                  const pl = (current - holding.averagePrice) * holding.quantity;
                  const plPct = ((current - holding.averagePrice) / holding.averagePrice) * 100;
                  return (
                    <TableRow key={holding.symbol} className="hover:bg-white/5 border-border/10">
                      <TableCell className="font-medium">
                        <div className="font-bold">{holding.symbol}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[150px]">{holding.name}</div>
                      </TableCell>
                      <TableCell className="text-right font-mono">{holding.quantity}</TableCell>
                      <TableCell className="text-right font-mono">₹{holding.averagePrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-mono">₹{current.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-mono">₹{(holding.averagePrice * holding.quantity).toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className={`font-mono font-bold ${pl >= 0 ? 'text-primary' : 'text-destructive'}`}>₹{pl.toFixed(2)}</div>
                        <div className={`text-xs ${pl >= 0 ? 'text-primary/70' : 'text-destructive/70'}`}>{plPct.toFixed(2)}%</div>
                      </TableCell>
                      <TableCell>
                        <Link to={`/stock/${holding.symbol}`} target="_blank">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><ArrowUpRight className="h-4 w-4" /></Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
