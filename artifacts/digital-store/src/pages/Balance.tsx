import React from 'react';
import { Phone, MessageCircle, CheckCircle2, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const operators = [
  {
    name: "Rcell",
    initial: "R",
    color: "from-green-500 to-lime-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    textColor: "text-green-400",
    description: "شبكة الجوال السورية الثانية",
  },
  {
    name: "MTN",
    initial: "M",
    color: "from-yellow-400 to-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400",
    description: "شبكة MTN سوريا",
  },
  {
    name: "Syriatel",
    initial: "S",
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    textColor: "text-red-400",
    description: "شبكة سيريتل سوريا",
  },
];

export function Balance() {
  return (
    <div className="min-h-screen pt-28 pb-32">
      <div className="container mx-auto px-4">
        
        <div className="bg-secondary/40 border border-white/5 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <div className="text-center md:text-start">
              <h1 className="text-4xl font-black text-foreground mb-3">شحن الرصيد</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                شحن رصيد لجميع شبكات الجوال السورية — Rcell، MTN، Syriatel — بالدفع عبر شام كاش.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {operators.map((op, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${op.borderColor} ${op.bgColor} flex flex-col gap-4`}>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${op.color} flex items-center justify-center text-white font-black text-2xl shadow-lg`}>
                {op.initial}
              </div>
              <div>
                <h3 className="text-xl font-black text-foreground">{op.name}</h3>
                <p className={`text-sm ${op.textColor}`}>{op.description}</p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> شحن فوري</li>
                <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary shrink-0" /> جميع الفئات متوفرة</li>
                <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-blue-400 shrink-0" /> مضمون 100%</li>
              </ul>
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-2xl p-8 text-center">
          <MessageCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-2">اطلب عبر واتساب</h2>
          <p className="text-muted-foreground mb-6">
            لطلب شحن الرصيد، تواصل معنا مباشرة عبر واتساب وسنخدمك في أسرع وقت.
          </p>
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 h-12 rounded-xl border-0">
              تواصل عبر واتساب
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
