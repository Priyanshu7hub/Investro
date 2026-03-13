import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, BarChart3, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const [candles, setCandles] = useState<Array<{ left: number; height: number; delay: number; isGreen: boolean }>>([]);

  useEffect(() => {
    const newCandles = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      height: 20 + Math.random() * 60,
      delay: Math.random() * 2,
      isGreen: Math.random() > 0.4
    }));
    setCandles(newCandles);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative overflow-hidden group/landing">
      {/* Background Animated Candles - Hover Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-700 group-hover/landing:opacity-100">
        {candles.map((candle, i) => (
          <div
            key={i}
            className={`candle-bg ${candle.isGreen ? 'green' : 'red'}`}
            style={{
              left: `${candle.left}%`,
              height: `${candle.height}vh`,
              animationDelay: `${candle.delay}s`,
              animation: candle.isGreen 
                ? `candle-up ${2 + Math.random()}s ease-in-out infinite alternate` 
                : `candle-down ${2 + Math.random()}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Smart Investing. Simplified.
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Investro
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
            Experience the future of market tracking with real-time simulated trading for NIFTY 50 stocks.
          </p>
        </div>

        {!user && (
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link to="/register">
              <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl">
          <div className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors group">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Data</h3>
            <p className="text-muted-foreground">Track NIFTY 50 stocks with realistic price movements and live updates.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors group">
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground">Detailed charts and performance metrics to analyze your trading strategy.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors group">
            <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Risk-Free Trading</h3>
            <p className="text-muted-foreground">Simulate buys and sells with virtual currency. Learn before you earn.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
