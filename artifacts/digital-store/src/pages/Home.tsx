import { Link } from "wouter";

export default function Home() {
  const categories = [
    { href: "/gift-cards", emoji: "🎁", label: "بطاقات", desc: "iTunes • Google Play • شام • USDT", color: "from-orange-500/20 to-yellow-500/20 border-orange-500/30" },
    { href: "/subscriptions", emoji: "📺", label: "اشتراكات رقمية", desc: "Netflix • Shahid • Gemini • CapCut • Canva", color: "from-red-500/20 to-pink-500/20 border-red-500/30" },
    { href: "/accounts", emoji: "👤", label: "حسابات جاهزة", desc: "Gmail • TikTok • Instagram • Telegram وغيرها", color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30" },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-3">🛒 متجرك الرقمي</h1>
        <p className="text-muted-foreground text-lg mb-12">بطاقات، اشتراكات، وحسابات جاهزة بأسعار مناسبة</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(cat => (
            <Link key={cat.href} href={cat.href}>
              <div className={`bg-gradient-to-br ${cat.color} border rounded-2xl p-8 cursor-pointer hover:scale-105 transition-all duration-200 text-center`}>
                <div className="text-5xl mb-4">{cat.emoji}</div>
                <h2 className="text-xl font-bold text-white mb-2">{cat.label}</h2>
                <p className="text-muted-foreground text-sm">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 p-6 bg-[hsl(25,100%,55%)]/10 border border-[hsl(25,100%,55%)]/30 rounded-2xl">
          <p className="text-[hsl(25,100%,65%)] font-bold text-lg mb-3">للطلب والاستفسار</p>
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-3 rounded-full font-bold transition-all hover:scale-105"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.858L.057 23.486a.5.5 0 00.609.61l5.74-1.502A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 01-5.073-1.387l-.362-.214-3.757.984.998-3.648-.236-.374A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            للطلب تواصل معي
          </a>
        </div>
      </div>
    </div>
  );
}
