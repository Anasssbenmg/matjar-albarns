const WHATSAPP_NUMBER = "212600000000";

const products = [
  {
    id: 1,
    name: "بطاقات ايتونز",
    note: "",
    bg: "from-pink-500 to-red-500",
    emoji: "🎵",
    logo: (
      <svg viewBox="0 0 100 100" className="w-16 h-16">
        <rect width="100" height="100" rx="20" fill="#FC3C44"/>
        <text x="50" y="65" textAnchor="middle" fontSize="50" fill="white">♪</text>
      </svg>
    ),
  },
  {
    id: 2,
    name: "بطاقات غوغل",
    note: "تعمل في سوريا",
    bg: "from-green-500 to-blue-500",
    emoji: "▶️",
    logo: null,
  },
  {
    id: 3,
    name: "شام",
    note: "متوفر (سوري) = كاش، دولار)",
    bg: "from-blue-400 to-cyan-500",
    emoji: "🛡️",
    logo: null,
  },
  {
    id: 4,
    name: "USDT",
    note: "متوفر من 10 الى $1000",
    bg: "from-teal-400 to-green-500",
    emoji: "💵",
    logo: null,
  },
];

const iconMap: Record<number, React.ReactNode> = {
  1: (
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center shadow-lg">
      <span className="text-4xl">🎵</span>
    </div>
  ),
  2: (
    <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center shadow-lg">
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <path d="M11.5 6h25A5.5 5.5 0 0142 11.5v25A5.5 5.5 0 0136.5 42h-25A5.5 5.5 0 016 36.5v-25A5.5 5.5 0 0111.5 6z" fill="#fff"/>
        <path d="M34 14l-7 2v14a4 4 0 11-2-3.46V16l5-1.5V14z" fill="#0F9D58"/>
        <path d="M34 14l-7 2v2l7-2v-2z" fill="#0F9D58"/>
      </svg>
    </div>
  ),
  3: (
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
      <span className="text-4xl font-bold text-white">ش</span>
    </div>
  ),
  4: (
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center shadow-lg border-4 border-teal-300">
      <span className="text-white font-black text-xl">₮</span>
    </div>
  ),
};

export default function GiftCards() {
  const whatsappMsg = (name: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`مرحبا، أريد الطلب: ${name}`)}`;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white text-center mb-2">🎁 بطاقات</h1>
        <p className="text-muted-foreground text-center mb-10">اختر البطاقة التي تريدها وتواصل معنا</p>

        <div className="grid grid-cols-2 gap-6">
          {products.map(p => (
            <div key={p.id} className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-[hsl(25,100%,55%)]/50 transition-all hover:scale-[1.02]">
              {iconMap[p.id]}
              <h2 className="text-lg font-bold text-white text-center">{p.name}</h2>
              {p.note && (
                <p className="text-muted-foreground text-sm text-center">{p.note}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("مرحبا، أريد الطلب من قسم البطاقات")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[hsl(25,100%,55%)] hover:bg-[hsl(25,100%,48%)] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl transition-all hover:scale-105"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
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
