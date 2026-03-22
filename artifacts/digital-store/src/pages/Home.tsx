import React, { useState } from 'react';
import { Link } from 'wouter';
import { Zap, ShieldCheck, Clock, HeadphonesIcon, ChevronLeft, ArrowLeft, Gamepad2, Users, Wallet, CreditCard, PlaySquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SUBSCRIPTIONS, GIFT_CARDS, GAMES, ACCOUNT_PRODUCTS, SOCIAL_PRODUCTS, Product } from '@/lib/store-data';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductModal } from '@/components/product/ProductModal';

export function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const trustBadges = [
    { icon: Zap, title: "شحن فوري", desc: "تسليم تلقائي بعد الدفع مباشرة" },
    { icon: ShieldCheck, title: "دفع آمن", desc: "طرق دفع موثوقة ومحمية 100%" },
    { icon: HeadphonesIcon, title: "دعم 24/7", desc: "فريق دعم متواجد على مدار الساعة" },
    { icon: Clock, title: "ضمان الجودة", desc: "ضمان كامل على جميع المنتجات" },
  ];

  const categories = [
    {
      href: "/subscriptions",
      title: "الاشتراكات الرقمية",
      desc: "Netflix، شاهد، Gemini، CapCut، Canva Pro",
      bg: "from-violet-900 to-indigo-900",
      glow: "bg-violet-500/20",
      icon: PlaySquare,
      count: SUBSCRIPTIONS.length,
    },
    {
      href: "/gift-cards",
      title: "البطاقات الرقمية",
      desc: "iTunes، Google Play، شام، USDT",
      bg: "from-blue-900 to-cyan-900",
      glow: "bg-cyan-500/20",
      icon: CreditCard,
      count: GIFT_CARDS.length,
    },
    {
      href: "/games",
      title: "شحن الألعاب",
      desc: "فورتنايت، ببجي، كلاش والمزيد",
      bg: "from-orange-900 to-red-900",
      glow: "bg-orange-500/20",
      icon: Gamepad2,
      count: GAMES.length,
    },
    {
      href: "/accounts",
      title: "حسابات جاهزة",
      desc: "Gmail، TikTok، Twitter، Facebook، Telegram",
      bg: "from-sky-900 to-blue-900",
      glow: "bg-sky-500/20",
      icon: Users,
      count: ACCOUNT_PRODUCTS.length,
    },
    {
      href: "/social",
      title: "سوشيال ميديا",
      desc: "متابعين انستغرام، تيك توك، يوتيوب، فيسبوك",
      bg: "from-pink-900 to-rose-900",
      glow: "bg-pink-500/20",
      icon: Users,
      count: SOCIAL_PRODUCTS.length,
    },
    {
      href: "/balance",
      title: "شحن الرصيد",
      desc: "Rcell، MTN، Syriatel — عبر شام كاش",
      bg: "from-emerald-900 to-green-900",
      glow: "bg-emerald-500/20",
      icon: Wallet,
      count: null,
    },
  ];

  const featured = [
    ...SUBSCRIPTIONS.slice(0, 2),
    ...GAMES.slice(0, 2),
    ...GIFT_CARDS.slice(0, 2),
    ...ACCOUNT_PRODUCTS.slice(0, 1),
    ...SOCIAL_PRODUCTS.slice(0, 1),
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-primary/15 via-accent/8 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-orange-500/8 rounded-full blur-3xl" />
          <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-rose-500/8 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary font-bold text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            متجر البرنس - وجهتك الأولى للخدمات الرقمية
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            أسرع خدمة <span className="gradient-text">شحن رقمية</span><br/>في العالم العربي
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            اشتراكات، ألعاب، بطاقات هدايا، سوشيال ميديا وشحن رصيد بأفضل الأسعار وأسرع تسليم.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/games">
              <Button size="lg" className="h-12 px-8 text-base font-bold rounded-xl bg-gradient-to-r from-primary to-accent border-0 hover:shadow-lg hover:shadow-primary/30 transition-all text-white">
                تسوق الآن
              </Button>
            </Link>
            <Link href="/subscriptions">
              <Button variant="outline" size="lg" className="h-12 px-6 text-base font-bold rounded-xl border-white/10 bg-secondary/50 backdrop-blur-md hover:bg-white/10 hover:text-white">
                اشتراكات
              </Button>
            </Link>
            <Link href="/gift-cards">
              <Button variant="outline" size="lg" className="h-12 px-6 text-base font-bold rounded-xl border-white/10 bg-secondary/50 backdrop-blur-md hover:bg-white/10 hover:text-white">
                بطاقات
              </Button>
            </Link>
            <Link href="/accounts">
              <Button variant="outline" size="lg" className="h-12 px-6 text-base font-bold rounded-xl border-white/10 bg-secondary/50 backdrop-blur-md hover:bg-white/10 hover:text-white">
                حسابات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-y border-white/5 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                  <badge.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground text-sm">{badge.title}</h3>
                <p className="text-xs text-muted-foreground hidden sm:block">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">جميع الأقسام</h2>
            <p className="text-muted-foreground">كل ما تحتاجه في مكان واحد</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <Link key={idx} href={cat.href} className="group relative rounded-2xl overflow-hidden h-[200px] cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.bg}`} />
                <div className={`absolute top-0 right-0 w-48 h-48 ${cat.glow} blur-3xl rounded-full -translate-y-1/2 translate-x-1/2`} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                      <cat.icon className="w-6 h-6 text-white" />
                    </div>
                    {cat.count !== null && (
                      <span className="text-xs bg-black/40 backdrop-blur-md text-white/70 px-3 py-1 rounded-full border border-white/10">
                        {cat.count} منتج
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-black text-white mb-1">{cat.title}</h3>
                    <p className="text-white/60 text-sm line-clamp-1">{cat.desc}</p>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-white/80 text-sm font-bold group-hover:text-white transition-colors">
                      تصفح القسم <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 pb-32">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-foreground mb-2">الأكثر مبيعاً</h2>
              <p className="text-muted-foreground">المنتجات المفضلة لدى عملائنا</p>
            </div>
            <Link href="/games" className="hidden sm:flex text-primary font-bold items-center gap-1 hover:text-primary/80 transition-colors text-sm">
              عرض الكل <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={setSelectedProduct} 
              />
            ))}
          </div>
        </div>
      </section>

      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}

export default Home;
