import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, LogIn, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/#services" },
  { label: "Careers", path: "/careers" },
  { label: "Contact Us", path: "/inquiries" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-wide text-primary">STALLION SECURITY</span>
            <span className="block text-[10px] tracking-widest text-muted-foreground">SECURITY SOLUTIONS</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === l.path ? "text-primary" : "text-foreground/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link to="/login">
            <Button size="sm" className="hidden bg-primary text-primary-foreground font-semibold hover:bg-primary/90 md:flex">
              <LogIn className="mr-1 h-4 w-4" /> Login
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="text-foreground md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setOpen(false)}>
            <Button className="mt-2 w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90" size="sm">
              <LogIn className="mr-1 h-4 w-4" /> Login
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
