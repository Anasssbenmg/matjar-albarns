import React, { useState, useRef, useEffect } from 'react';
import { Shield, Upload, Trash2, LogIn, Eye, EyeOff, Save, Image, CheckCircle, Lock, LayoutList, RotateCcw } from 'lucide-react';
import { useSettings, DEFAULT_SECTION_LABELS, type SectionLabel } from '@/lib/settings-context';
import { Button } from '@/components/ui/button';
import { ProductsManager } from '@/components/admin/ProductsManager';

const DEFAULT_PASSWORD = 'ridar2025';

const SECTION_KEYS = [
  { key: 'subscriptions', label: 'الاشتراكات' },
  { key: 'gift-cards',   label: 'البطاقات' },
  { key: 'games',        label: 'الألعاب' },
  { key: 'accounts',     label: 'الحسابات' },
  { key: 'social',       label: 'السوشيال' },
  { key: 'balance',      label: 'الرصيد' },
];

function resizeImage(file: File, maxSize = 300): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas error'));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/webp', 0.85));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const { settings, updateSetting, deleteSetting, getSectionLabel, getAllCategories, getProductsByCategory, loading } = useSettings();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [saving, setSaving] = useState<string | null>(null);
  const [savedOk, setSavedOk] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [sectionDraft, setSectionDraft] = useState<Record<string, SectionLabel>>({});
  const [sectionSaving, setSectionSaving] = useState(false);
  const [sectionSaved, setSectionSaved] = useState(false);

  useEffect(() => {
    const draft: Record<string, SectionLabel> = {};
    SECTION_KEYS.forEach(({ key }) => {
      draft[key] = getSectionLabel(key);
    });
    setSectionDraft(draft);
  }, [settings.sectionLabels]);

  const allProducts = getAllCategories().flatMap(cat =>
    getProductsByCategory(cat.id).map(p => ({ id: p.id, name: p.name }))
  );

  const correctPassword = settings.adminPassword || DEFAULT_PASSWORD;

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === correctPassword) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('كلمة المرور غير صحيحة');
    }
  }

  async function handleLogoUpload(file: File) {
    setSaving('logo');
    try {
      const base64 = await resizeImage(file, 256);
      await updateSetting('logo', base64);
      showSaved('logo');
    } finally {
      setSaving(null);
    }
  }

  async function handleProductImageUpload(productId: string, file: File) {
    setSaving(productId);
    try {
      const base64 = await resizeImage(file, 300);
      const current = settings.productImages ? { ...settings.productImages } : {};
      current[productId] = base64;
      await updateSetting('productImages', JSON.stringify(current));
      showSaved(productId);
    } finally {
      setSaving(null);
    }
  }

  async function handleDeleteProductImage(productId: string) {
    setSaving(productId);
    try {
      const current = settings.productImages ? { ...settings.productImages } : {};
      delete current[productId];
      await updateSetting('productImages', JSON.stringify(current));
    } finally {
      setSaving(null);
    }
  }

  async function handleDeleteLogo() {
    setSaving('logo');
    try {
      await deleteSetting('logo');
    } finally {
      setSaving(null);
    }
  }

  function showSaved(key: string) {
    setSavedOk(key);
    setTimeout(() => setSavedOk(null), 2000);
  }

  async function handleSaveSectionLabels() {
    setSectionSaving(true);
    try {
      await updateSetting('sectionLabels', JSON.stringify(sectionDraft));
      setSectionSaved(true);
      setTimeout(() => setSectionSaved(false), 2000);
    } finally {
      setSectionSaving(false);
    }
  }

  function handleResetSectionLabels() {
    const draft: Record<string, SectionLabel> = {};
    SECTION_KEYS.forEach(({ key }) => {
      draft[key] = { ...DEFAULT_SECTION_LABELS[key] };
    });
    setSectionDraft(draft);
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-28 pb-32 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="glass-panel rounded-3xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-black text-foreground">لوحة الإدارة</h1>
              <p className="text-muted-foreground text-sm mt-1">أدخل كلمة المرور للمتابعة</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="كلمة المرور"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors pr-12"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <p className="text-red-400 text-sm text-center">{loginError}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-l from-primary to-accent text-white font-bold h-12 rounded-xl"
              >
                <LogIn className="w-4 h-4 ml-2" />
                دخول
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-32 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground">لوحة الإدارة</h1>
            <p className="text-muted-foreground text-sm">إدارة المتجر • التغييرات تُحفظ على السيرفر</p>
          </div>
        </div>

        {/* Logo Section */}
        <div className="glass-panel rounded-2xl p-6 mb-6 border border-white/10">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Image className="w-5 h-5 text-primary" />
            لوغو المتجر
          </h2>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/10 flex items-center justify-center bg-secondary/50 shrink-0">
              {settings.logo ? (
                <img src={settings.logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-black text-primary">ب</span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleLogoUpload(file);
                  e.target.value = '';
                }}
              />

              <Button
                onClick={() => logoInputRef.current?.click()}
                disabled={saving === 'logo'}
                className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 font-bold"
              >
                {saving === 'logo' ? (
                  <span className="animate-pulse">جاري الرفع...</span>
                ) : savedOk === 'logo' ? (
                  <><CheckCircle className="w-4 h-4 ml-2 text-green-400" />تم الحفظ</>
                ) : (
                  <><Upload className="w-4 h-4 ml-2" />رفع لوغو جديد</>
                )}
              </Button>

              {settings.logo && (
                <Button
                  onClick={handleDeleteLogo}
                  disabled={saving === 'logo'}
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 font-bold"
                >
                  <Trash2 className="w-4 h-4 ml-2" />
                  حذف اللوغو
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Section Labels Editor */}
        <div className="glass-panel rounded-2xl p-6 mb-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <LayoutList className="w-5 h-5 text-primary" />
              أسماء الأقسام
            </h2>
            <button
              onClick={handleResetSectionLabels}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground text-xs font-bold transition-colors border border-white/5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              إعادة تعيين
            </button>
          </div>

          <div className="space-y-4">
            {SECTION_KEYS.map(({ key, label }) => (
              <div key={key} className="bg-secondary/30 rounded-xl p-4 border border-white/5">
                <p className="text-xs font-bold text-primary mb-3">{label}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-muted-foreground mb-1 block">اسم في القائمة (Navbar)</label>
                    <input
                      type="text"
                      value={sectionDraft[key]?.nav ?? ''}
                      onChange={e => setSectionDraft(prev => ({
                        ...prev,
                        [key]: { ...prev[key], nav: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-lg bg-background/60 border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      dir="auto"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground mb-1 block">عنوان الصفحة (رأس القسم)</label>
                    <input
                      type="text"
                      value={sectionDraft[key]?.page ?? ''}
                      onChange={e => setSectionDraft(prev => ({
                        ...prev,
                        [key]: { ...prev[key], page: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-lg bg-background/60 border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      dir="auto"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <Button
              onClick={handleSaveSectionLabels}
              disabled={sectionSaving}
              className="bg-gradient-to-l from-primary to-accent text-white font-bold px-8"
            >
              {sectionSaving ? (
                <span className="animate-pulse">جاري الحفظ...</span>
              ) : sectionSaved ? (
                <><CheckCircle className="w-4 h-4 ml-2 text-white" />تم الحفظ بنجاح</>
              ) : (
                <><Save className="w-4 h-4 ml-2" />حفظ أسماء الأقسام</>
              )}
            </Button>
          </div>
        </div>

        {/* Products Manager */}
        <ProductsManager />

        {/* Product Images Section */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10">
          <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <Image className="w-5 h-5 text-primary" />
            صور المنتجات
            <span className="text-sm font-normal text-muted-foreground mr-auto">
              {Object.keys(settings.productImages || {}).length} من {allProducts.length} منتج لديه صورة
            </span>
          </h2>

          {allProducts.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">لا توجد منتجات بعد</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProducts.map(product => {
                const image = settings.productImages?.[product.id];
                const isSaving = saving === product.id;
                const isSaved = savedOk === product.id;

                return (
                  <ProductImageCard
                    key={product.id}
                    product={product}
                    image={image}
                    isSaving={isSaving}
                    isSaved={isSaved}
                    onUpload={(file) => handleProductImageUpload(product.id, file)}
                    onDelete={() => handleDeleteProductImage(product.id)}
                  />
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function ProductImageCard({
  product,
  image,
  isSaving,
  isSaved,
  onUpload,
  onDelete,
}: {
  product: { id: string; name: string };
  image?: string;
  isSaving: boolean;
  isSaved: boolean;
  onUpload: (file: File) => void;
  onDelete: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-secondary/30 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-secondary/50 flex items-center justify-center shrink-0">
          {image ? (
            <img src={image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <Image className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <p className="text-sm font-bold text-foreground leading-tight line-clamp-2">{product.name}</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = '';
        }}
      />

      <div className="flex gap-2">
        <button
          onClick={() => inputRef.current?.click()}
          disabled={isSaving}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold border border-primary/20 transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <span className="animate-pulse">رفع...</span>
          ) : isSaved ? (
            <><CheckCircle className="w-3.5 h-3.5 text-green-400" />تم</>
          ) : (
            <><Upload className="w-3.5 h-3.5" />{image ? 'تغيير' : 'رفع صورة'}</>
          )}
        </button>

        {image && (
          <button
            onClick={onDelete}
            disabled={isSaving}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
