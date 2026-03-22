import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useSettings } from '@/lib/settings-context';

export function Navbar() {
  const [location] = useLocation();
  const { itemCount, setIsCartOpen } = useCart();
  const { settings } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { getSectionLabel } = useSettings();

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: getSectionLabel('subscriptions').nav, path: '/subscriptions' },
    { name: getSectionLabel('gift-cards').nav,    path: '/gift-cards' },
    { name: getSectionLabel('games').nav,         path: '/games' },
    { name: getSectionLabel('accounts').nav,      path: '/accounts' },
    { name: getSectionLabel('social').nav,        path: '/social' },
    { name: getSectionLabel('balance').nav,       path: '/balance' },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-xl border-b border-white/5 py-2 shadow-lg' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent p-0.5 shadow-lg group-hover:shadow-primary/40 transition-shadow overflow-hidden">
            {settings.logo ? (
              <img src={settings.logo} alt="Logo" className="w-full h-full object-cover rounded-[10px]" />
            ) : (
              <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                <span className="text-primary font-black text-base">ب</span>
              </div>
            )}
          </div>
          <div className="font-black text-lg tracking-tight leading-none">
            <span className="text-foreground">متجر <span className="gradient-text">البرنس</span></span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 bg-secondary/40 backdrop-blur-md border border-white/5 rounded-full p-1">
          {navLinks.map(link => (
            <Link key={link.path} href={link.path}>
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                location === link.path
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}>
                {link.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 rounded-xl bg-secondary/60 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center shadow-md">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-secondary/60 border border-white/5 flex items-center justify-center"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-background/95 backdrop-blur-xl border-b border-white/5 p-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link key={link.path} href={link.path}>
                <span
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    location === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
