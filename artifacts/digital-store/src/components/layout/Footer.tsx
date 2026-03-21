import React from 'react';
import { MessageCircle, Instagram, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent p-0.5">
                <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                  <span className="text-primary font-black text-base">R</span>
                </div>
              </div>
              <h3 className="font-black text-2xl text-foreground tracking-tight">ريدار <span className="text-primary">ستور</span></h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              أسرع منصة عربية لشحن التطبيقات والألعاب والاشتراكات الرقمية. خدماتنا متوفرة 24/7 لضمان أفضل تجربة تسوق.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="rounded-full bg-secondary/50 border-white/5 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-secondary/50 border-white/5 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Twitter className="w-4 h-4" />
              </Button>
              <a href="https://wa.me/963997861597" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-full bg-secondary/50 border-white/5 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            <h4 className="font-bold text-lg text-foreground">روابط سريعة</h4>
            <ul className="space-y-3">
              <li><Link href="/subscriptions" className="text-muted-foreground hover:text-primary transition-colors text-sm">الاشتراكات</Link></li>
              <li><Link href="/gift-cards" className="text-muted-foreground hover:text-primary transition-colors text-sm">البطاقات الرقمية</Link></li>
              <li><Link href="/games" className="text-muted-foreground hover:text-primary transition-colors text-sm">شحن الألعاب</Link></li>
              <li><Link href="/accounts" className="text-muted-foreground hover:text-primary transition-colors text-sm">حسابات جاهزة</Link></li>
              <li><Link href="/social" className="text-muted-foreground hover:text-primary transition-colors text-sm">سوشيال ميديا</Link></li>
              <li><Link href="/balance" className="text-muted-foreground hover:text-primary transition-colors text-sm">شحن الرصيد</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-6">
            <h4 className="font-bold text-lg text-foreground">تواصل معنا</h4>
            <div className="p-6 rounded-2xl bg-secondary/30 border border-white/5 space-y-4">
              <a href="https://wa.me/963997861597" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">دعم واتساب 24/7</p>
                  <p dir="ltr" className="text-right">+963 997 861 597</p>
                </div>
              </a>
              <a href="mailto:matgernumber@gmail.com" className="flex items-center gap-4 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">البريد الإلكتروني</p>
                  <p dir="ltr" className="text-right">matgernumber@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} <span className="font-bold text-foreground">ريدار ستور</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
