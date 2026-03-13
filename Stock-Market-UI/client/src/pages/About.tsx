import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Target, Eye, Users, TrendingUp, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 animate-in fade-in duration-500">
      <div className="container px-4 md:px-6 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">About Investro</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Investro is a modern investment platform built to make stock market investing simple, transparent, and accessible to everyone.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm space-y-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-display">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To empower individuals with the tools and confidence needed to grow their wealth through smart investing.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm space-y-4">
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Eye className="h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold font-display">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To become India's most trusted digital investment experience, fostering a culture of financial literacy and independence.
            </p>
          </div>
        </section>

        {/* Why Investro */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold font-display text-center">Why Investro?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Simple Design", icon: Shield, desc: "Intuitive interface for seamless trading." },
              { title: "Transparent Pricing", icon: TrendingUp, desc: "Zero hidden charges, pure simulated clarity." },
              { title: "Real-time Insights", icon: Award, desc: "Market movements tracked instantly." },
              { title: "Secure Platform", icon: Users, desc: "Built with the latest security standards." }
            ].map((item, i) => (
              <div key={i} className="p-6 text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 rounded-3xl bg-primary/5 border border-primary/10 text-center">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-bold font-display text-primary">1M+</div>
              <p className="text-muted-foreground">Simulated Users</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold font-display text-primary">₹10,000+ Cr</div>
              <p className="text-muted-foreground">Simulated Trades</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold font-display text-primary">99.9%</div>
              <p className="text-muted-foreground">Platform Uptime</p>
            </div>
          </div>
        </section>

        <section className="text-center pb-8">
          <Link to="/register">
            <Button size="lg" className="h-12 px-8">Start Your Journey</Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
