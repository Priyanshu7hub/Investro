import { Search, Mail, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Help() {
  const categories = [
    { title: "Account Opening", icon: "👤" },
    { title: "Buying & Selling Stocks", icon: "📈" },
    { title: "Portfolio & Reports", icon: "📋" },
    { title: "Charges & Pricing", icon: "💰" },
    { title: "Security & Privacy", icon: "🔒" },
  ];

  const faqs = [
    {
      q: "How do I buy stocks on Investro?",
      a: "Simply go to the Dashboard, search for your preferred NIFTY 50 stock, click on it to open the detail page, and use the trade panel to Buy. All trades are simulated."
    },
    {
      q: "How is profit and loss calculated?",
      a: "P&L is calculated as: (Current Price - Average Buy Price) × Quantity owned. Total portfolio P&L is the sum of all individual stock P&Ls."
    },
    {
      q: "Is Investro free to use?",
      a: "Yes! Investro is a completely free simulated trading platform designed for learning and practice purposes."
    },
    {
      q: "Is my data secure?",
      a: "We take privacy seriously. Since this is a simulated platform, we only store your basic profile and portfolio data locally in your browser's storage."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 animate-in fade-in duration-500">
      <div className="container px-4 md:px-6 space-y-16 max-w-5xl mx-auto">
        {/* Header & Search */}
        <section className="text-center space-y-8">
          <h1 className="text-4xl font-display font-bold">How can we help you?</h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for topics, features, and more..." 
              className="h-14 pl-12 bg-card border-border/50 text-lg rounded-2xl focus:ring-primary/50 shadow-xl"
            />
          </div>
        </section>

        {/* Categories Grid */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                <div className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</div>
                <div className="text-xs font-bold leading-tight">{cat.title}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* FAQs */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold font-display">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border/50 bg-card/30 rounded-xl px-6">
                <AccordionTrigger className="hover:no-underline font-medium text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Support Contact */}
        <section className="grid md:grid-cols-2 gap-8 border-t border-border/50 pt-16">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Email Support</h3>
              <p className="text-muted-foreground mb-1 text-sm">Our team usually responds within 24 hours.</p>
              <a href="mailto:support@investro.com" className="text-primary hover:underline">support@investro.com</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Support Hours</h3>
              <p className="text-muted-foreground text-sm">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
              <p className="text-muted-foreground text-sm">Sat: 10:00 AM - 2:00 PM IST</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
