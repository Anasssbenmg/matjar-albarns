import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import GiftCards from "@/pages/GiftCards";
import Subscriptions from "@/pages/Subscriptions";
import ReadyAccounts from "@/pages/ReadyAccounts";
import Home from "@/pages/Home";

const queryClient = new QueryClient();

function Navbar() {
  const [location] = useLocation();
  const links = [
    { href: "/", label: "الرئيسية" },
    { href: "/gift-cards", label: "بطاقات" },
    { href: "/subscriptions", label: "اشتراكات رقمية" },
    { href: "/accounts", label: "حسابات جاهزة" },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-[hsl(220,20%,8%)] border-b border-[hsl(220,15%,20%)] shadow-lg">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="text-[hsl(25,100%,55%)] font-bold text-xl tracking-wide">🛒 متجر رقمي</div>
        <div className="flex gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href}>
              <span className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
                ${location === l.href
                  ? "bg-[hsl(25,100%,55%)] text-white"
                  : "text-[hsl(0,0%,80%)] hover:bg-[hsl(220,15%,18%)]"}`}>
                {l.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/212600000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105 font-bold text-sm"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.858L.057 23.486a.5.5 0 00.609.61l5.74-1.502A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 01-5.073-1.387l-.362-.214-3.757.984.998-3.648-.236-.374A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
      تواصل واتساب
    </a>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gift-cards" component={GiftCards} />
      <Route path="/subscriptions" component={Subscriptions} />
      <Route path="/accounts" component={ReadyAccounts} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Navbar />
          <Router />
          <WhatsAppButton />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
