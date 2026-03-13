import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("investro_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (name: string, email: string) => {
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem("investro_user", JSON.stringify(newUser));
    navigate("/dashboard");
    toast({
      title: "Welcome back!",
      description: `Logged in as ${name}`,
    });
  };

  const register = (name: string, email: string) => {
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem("investro_user", JSON.stringify(newUser));
    navigate("/dashboard");
    toast({
      title: "Account created!",
      description: `Welcome to Investro, ${name}`,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("investro_user");
    navigate("/");
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
