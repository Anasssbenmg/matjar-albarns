import React from 'react';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-8xl font-black gradient-text mb-4">404</h1>
        <p className="text-foreground text-2xl font-bold mb-2">الصفحة غير موجودة</p>
        <p className="text-muted-foreground mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-primary to-accent text-white font-bold px-8 h-12 rounded-xl border-0">
            العودة للرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}
