import { Link } from "react-router-dom";
import { TrendingUp, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tighter">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span>Investro</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Smart Investing. Simplified. The premium platform for NIFTY 50 simulated trading and market insights.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Market Watch</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold mb-4">Social</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Investro Ltd. All simulated rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
