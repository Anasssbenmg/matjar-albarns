const WHATSAPP_NUMBER = "212600000000";

const subs = [
  {
    id: 1,
    name: "اشتراك نيتفليكس",
    icon: (
      <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center shadow-lg">
        <svg viewBox="0 0 111 30" className="w-14 h-8" fill="#E50914">
          <path d="M105.06 22.118c-3.406 0-5.816-1.396-7.76-3.18l2.574-3.16c1.592 1.434 3.22 2.432 5.26 2.432 1.594 0 2.574-.636 2.574-1.68v-.056c0-.994-.612-1.506-3.59-2.276-3.59-.916-5.906-1.906-5.906-5.438v-.056c0-3.228 2.594-5.36 6.236-5.36 2.594 0 4.808.812 6.61 2.262l-2.264 3.36c-1.568-1.09-3.114-1.75-4.394-1.75-1.482 0-2.264.674-2.264 1.558v.056c0 1.17.768 1.558 3.84 2.376 3.61.944 5.656 2.244 5.656 5.326v.056c0 3.53-2.694 5.53-6.572 5.53zm-16.836-17.196h4.334v17.004h-4.334V4.922zM72.71 4.922h4.334l5.856 7.682 5.856-7.682h4.334v17.004h-4.302v-10.69l-5.888 7.742h-.114l-5.856-7.68v10.628H72.71V4.922zm-12.218 0h4.334v13.242h8.26v3.762H60.492V4.922zM44.636 4.922h14.424v3.706H48.91v3.32h9.016v3.706H48.91v3.51h10.262v3.74H44.636V4.922zM30.958 4.922h4.496l7.026 9.24V4.922h4.27v17.004h-4.146l-7.376-9.7v9.7h-4.27V4.922zM12.204 4.922h4.334v6.824H23.2V4.922h4.334v17.004H23.2v-6.888h-6.662v6.888h-4.334V4.922zM0 4.922h4.334v17.004H0V4.922z"/>
        </svg>
      </div>
    ),
  },
  {
    id: 2,
    name: "اشتراك شاهد",
    icon: (
      <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center shadow-lg">
        <div className="bg-[#1DB954] rounded-xl w-14 h-14 flex items-center justify-center">
          <span className="text-white font-black text-2xl">👁</span>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    name: "اشتراك جيميناي",
    icon: (
      <div className="w-20 h-20 rounded-2xl bg-[#1a1a2e] flex items-center justify-center shadow-lg border border-blue-500/30">
        <div className="text-center">
          <span className="text-3xl">✨</span>
          <p className="text-blue-400 text-xs font-bold">Gemini</p>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    name: "اشتراك كاب كات",
    icon: (
      <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center shadow-lg">
        <svg viewBox="0 0 40 40" className="w-12 h-12">
          <rect width="40" height="40" rx="10" fill="#000"/>
          <path d="M12 28V12l16 8-16 8z" fill="white"/>
        </svg>
      </div>
    ),
  },
  {
    id: 5,
    name: "اشتراك كانفا",
    icon: (
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
        <div className="text-center">
          <span className="text-white font-black text-xl">Canva</span>
          <div className="bg-yellow-400 text-black text-[9px] font-black px-1 rounded mt-0.5">PRO</div>
        </div>
      </div>
    ),
  },
];

export default function Subscriptions() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white text-center mb-2">📺 اشتراكات رقمية</h1>
        <p className="text-muted-foreground text-center mb-10">اشتراكات بأسعار مناسبة لجميع المنصات</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {subs.map(s => (
            <a
              key={s.id}
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`مرحبا، أريد الطلب: ${s.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 bg-card border border-border rounded-2xl p-5 hover:border-[hsl(25,100%,55%)]/60 transition-all hover:scale-[1.05] cursor-pointer group"
            >
              {s.icon}
              <p className="text-white text-sm font-bold text-center group-hover:text-[hsl(25,100%,65%)] transition-colors">{s.name}</p>
            </a>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("مرحبا، أريد الطلب من قسم الاشتراكات الرقمية")}`}
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
