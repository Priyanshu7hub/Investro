import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { TrendingUp, LogOut, LayoutDashboard, Briefcase, Info, HelpCircle } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tighter hover:opacity-90 transition-opacity">
          <div className="bg-primary/10 p-2 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Investro
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/about" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : 'text-muted-foreground'}`}>
              About Us
            </Link>
            <Link to="/help" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/help') ? 'text-primary' : 'text-muted-foreground'}`}>
              Help
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'}`}>
                  Dashboard
                </Link>
                <Link to="/portfolio" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/portfolio') ? 'text-primary' : 'text-muted-foreground'}`}>
                  Portfolio
                </Link>
              </>
            )}
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/50 transition-all">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/9.x/micah/svg?seed=${user.email}`} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/portfolio" className="flex items-center w-full">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Portfolio</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/about" className="flex items-center w-full">
                    <Info className="mr-2 h-4 w-4" />
                    <span>About Us</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/help" className="flex items-center w-full">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Log In</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
