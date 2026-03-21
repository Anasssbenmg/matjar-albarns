import React from 'react';
import { Shield } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="min-h-screen pt-28 pb-32 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-black text-foreground mb-3">لوحة الإدارة</h1>
        <p className="text-muted-foreground">قريباً...</p>
      </div>
    </div>
  );
}
