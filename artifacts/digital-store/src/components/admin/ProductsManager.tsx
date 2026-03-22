import React, { useState, useCallback } from 'react';
import {
  Plus, Trash2, Pencil, X, Check, ChevronDown, ChevronUp,
  Package, FolderPlus, AlertCircle,
} from 'lucide-react';
import { useSettings, getDefaultProductsData, type ProductCategoryDef, type ProductsData } from '@/lib/settings-context';
import { type Product, type ProductOption, getIconComponent, ICON_NAMES } from '@/lib/store-data';
import { Button } from '@/components/ui/button';

const GRADIENT_OPTIONS = [
  { label: 'أحمر', value: 'from-red-600 to-red-900', bg: 'linear-gradient(to bottom right, #dc2626, #7f1d1d)' },
  { label: 'وردي-أحمر', value: 'from-pink-500 to-red-700', bg: 'linear-gradient(to bottom right, #ec4899, #b91c1c)' },
  { label: 'برتقالي', value: 'from-orange-500 to-red-700', bg: 'linear-gradient(to bottom right, #f97316, #b91c1c)' },
  { label: 'ذهبي', value: 'from-amber-500 to-yellow-700', bg: 'linear-gradient(to bottom right, #f59e0b, #a16207)' },
  { label: 'أخضر', value: 'from-green-500 to-green-700', bg: 'linear-gradient(to bottom right, #22c55e, #15803d)' },
  { label: 'نعناعي', value: 'from-teal-400 to-green-600', bg: 'linear-gradient(to bottom right, #2dd4bf, #16a34a)' },
  { label: 'زمردي', value: 'from-emerald-400 to-cyan-600', bg: 'linear-gradient(to bottom right, #34d399, #0891b2)' },
  { label: 'سماوي', value: 'from-sky-500 to-blue-600', bg: 'linear-gradient(to bottom right, #0ea5e9, #2563eb)' },
  { label: 'أزرق', value: 'from-blue-600 to-indigo-900', bg: 'linear-gradient(to bottom right, #2563eb, #1e1b4b)' },
  { label: 'أزرق-بنفسجي', value: 'from-blue-600 to-indigo-700', bg: 'linear-gradient(to bottom right, #2563eb, #4338ca)' },
  { label: 'بنفسجي-وردي', value: 'from-purple-600 to-pink-700', bg: 'linear-gradient(to bottom right, #9333ea, #be185d)' },
  { label: 'فوشيا', value: 'from-fuchsia-500 to-purple-800', bg: 'linear-gradient(to bottom right, #d946ef, #6b21a8)' },
  { label: 'رمادي', value: 'from-gray-700 to-gray-900', bg: 'linear-gradient(to bottom right, #374151, #111827)' },
  { label: 'سليت', value: 'from-slate-700 to-slate-900', bg: 'linear-gradient(to bottom right, #334155, #0f172a)' },
  { label: 'أسود', value: 'from-slate-900 to-black', bg: 'linear-gradient(to bottom right, #0f172a, #000000)' },
];

function newOptionId() {
  return `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function newProductId(category: string) {
  return `${category.slice(0, 4)}-${Date.now().toString(36)}`;
}

interface ProductFormData {
  name: string;
  badge: string;
  iconName: string;
  color: string;
  isCustom: boolean;
  features: string[];
  options: ProductOption[];
}

const emptyForm = (): ProductFormData => ({
  name: '',
  badge: '',
  iconName: 'Package',
  color: 'from-blue-600 to-indigo-900',
  isCustom: false,
  features: [],
  options: [{ id: newOptionId(), name: '', price: 0 }],
});

function productToForm(p: Product): ProductFormData {
  return {
    name: p.name,
    badge: p.badge ?? '',
    iconName: p.iconName,
    color: p.color,
    isCustom: p.isCustom ?? false,
    features: p.features ?? [],
    options: p.options.map(o => ({ ...o })),
  };
}

function ProductForm({
  initialData,
  onSave,
  onCancel,
  saving,
}: {
  initialData: ProductFormData;
  onSave: (data: ProductFormData) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<ProductFormData>(initialData);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [iconSearch, setIconSearch] = useState('');

  const filteredIcons = ICON_NAMES.filter(n =>
    n.toLowerCase().includes(iconSearch.toLowerCase())
  );

  function setField<K extends keyof ProductFormData>(key: K, val: ProductFormData[K]) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  function addFeature() {
    setField('features', [...form.features, '']);
  }
  function setFeature(i: number, val: string) {
    const arr = [...form.features];
    arr[i] = val;
    setField('features', arr);
  }
  function removeFeature(i: number) {
    setField('features', form.features.filter((_, idx) => idx !== i));
  }

  function addOption() {
    setField('options', [...form.options, { id: newOptionId(), name: '', price: 0 }]);
  }
  function setOption(i: number, key: 'name' | 'price', val: string | number) {
    const arr = [...form.options];
    arr[i] = { ...arr[i], [key]: val };
    setField('options', arr);
  }
  function removeOption(i: number) {
    setField('options', form.options.filter((_, idx) => idx !== i));
  }

  const CurrentIcon = getIconComponent(form.iconName);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block font-bold">اسم المنتج *</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setField('name', e.target.value)}
            placeholder="مثال: نتفليكس (Netflix)"
            className="w-full px-3 py-2.5 rounded-lg bg-background/60 border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
            dir="auto"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block font-bold">شارة (Badge)</label>
          <input
            type="text"
            value={form.badge}
            onChange={e => setField('badge', e.target.value)}
            placeholder="مثال: الأكثر طلباً"
            className="w-full px-3 py-2.5 rounded-lg bg-background/60 border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
            dir="auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block font-bold">أيقونة</label>
          <button
            type="button"
            onClick={() => setShowIconPicker(!showIconPicker)}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-background/60 border border-white/10 text-foreground text-sm hover:border-primary/40 transition-colors"
          >
            <CurrentIcon className="w-4 h-4 text-primary shrink-0" />
            <span className="flex-1 text-right">{form.iconName}</span>
            {showIconPicker ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {showIconPicker && (
            <div className="mt-2 bg-background/90 border border-white/10 rounded-xl p-3 shadow-2xl max-h-52 overflow-y-auto">
              <input
                type="text"
                value={iconSearch}
                onChange={e => setIconSearch(e.target.value)}
                placeholder="ابحث عن أيقونة..."
                className="w-full mb-2 px-2 py-1.5 rounded-lg bg-secondary/40 border border-white/10 text-xs text-foreground focus:outline-none"
                dir="ltr"
              />
              <div className="grid grid-cols-6 gap-1">
                {filteredIcons.map(name => {
                  const Ico = getIconComponent(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => { setField('iconName', name); setShowIconPicker(false); setIconSearch(''); }}
                      title={name}
                      className={`p-2 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors ${form.iconName === name ? 'bg-primary/30 ring-1 ring-primary/50' : 'bg-secondary/30'}`}
                    >
                      <Ico className="w-4 h-4 text-foreground" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block font-bold">لون البطاقة</label>
          <div className="grid grid-cols-5 gap-1.5">
            {GRADIENT_OPTIONS.map(g => (
              <button
                key={g.value}
                type="button"
                onClick={() => setField('color', g.value)}
                title={g.label}
                className={`w-8 h-8 rounded-lg transition-all ${form.color === g.value ? 'ring-2 ring-white scale-110' : 'hover:scale-105'}`}
                style={{ background: g.bg }}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <label className="text-xs text-muted-foreground font-bold">الميزات</label>
          <button
            type="button"
            onClick={addFeature}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-bold transition-colors"
          >
            <Plus className="w-3 h-3" />
            إضافة ميزة
          </button>
        </div>
        <div className="space-y-2">
          {form.features.map((f, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={f}
                onChange={e => setFeature(i, e.target.value)}
                placeholder="مثال: تسليم فوري"
                className="flex-1 px-3 py-2 rounded-lg bg-background/60 border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
                dir="auto"
              />
              <button
                type="button"
                onClick={() => removeFeature(i)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <label className="text-xs text-muted-foreground font-bold">خيارات الأسعار *</label>
          <button
            type="button"
            onClick={addOption}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-bold transition-colors"
          >
            <Plus className="w-3 h-3" />
            إضافة خيار
          </button>
        </div>
        <div className="space-y-2">
          {form.options.map((opt, i) => (
            <div key={opt.id} className="flex gap-2">
              <input
                type="text"
                value={opt.name}
                onChange={e => setOption(i, 'name', e.target.value)}
                placeholder="اسم الخيار (مثال: شهر واحد)"
                className="flex-1 px-3 py-2 rounded-lg bg-background/60 border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
                dir="auto"
              />
              <div className="relative w-28 shrink-0">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={opt.price}
                  onChange={e => setOption(i, 'price', parseFloat(e.target.value) || 0)}
                  className="w-full pl-6 pr-2 py-2 rounded-lg bg-background/60 border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
                  dir="ltr"
                />
              </div>
              <button
                type="button"
                onClick={() => removeOption(i)}
                disabled={form.options.length <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors shrink-0 disabled:opacity-30"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="isCustom"
          checked={form.isCustom}
          onChange={e => setField('isCustom', e.target.checked)}
          className="w-4 h-4 rounded accent-primary"
        />
        <label htmlFor="isCustom" className="text-sm text-muted-foreground cursor-pointer">
          منتج "حسب الطلب" (لا يُعرض السعر)
        </label>
      </div>

      {!form.name.trim() && (
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-xs text-amber-400">يرجى إدخال اسم المنتج</p>
        </div>
      )}

      {form.options.filter(o => o.name.trim()).length === 0 && (
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-xs text-amber-400">يجب إضافة خيار سعر واحد على الأقل باسم صحيح</p>
        </div>
      )}

      <SaveButtons form={form} saving={saving} onSave={onSave} onCancel={onCancel} />
    </div>
  );
}

function SaveButtons({ form, saving, onSave, onCancel }: {
  form: ProductFormData;
  saving: boolean;
  onSave: (data: ProductFormData) => void;
  onCancel: () => void;
}) {
  const hasValidOption = form.options.some(o => o.name.trim());
  const canSave = !!form.name.trim() && hasValidOption;
  return (
    <div className="flex gap-3 pt-1">
      <Button
        onClick={() => canSave && onSave(form)}
        disabled={saving || !canSave}
        className="flex-1 bg-gradient-to-l from-primary to-accent text-white font-bold"
      >
        {saving ? <span className="animate-pulse">جاري الحفظ...</span> : <><Check className="w-4 h-4 ml-1.5" />حفظ</>}
      </Button>
      <Button
        onClick={onCancel}
        variant="ghost"
        disabled={saving}
        className="border border-white/10 text-muted-foreground hover:text-foreground"
      >
        إلغاء
      </Button>
    </div>
  );
}

export function ProductsManager() {
  const { settings, getProductsByCategory, getAllCategories, updateProductsData } = useSettings();

  const [activeCategory, setActiveCategory] = useState<string>('subscriptions');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryLabel, setNewCategoryLabel] = useState('');
  const [saving, setSaving] = useState(false);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const categories = getAllCategories();

  React.useEffect(() => {
    if (categories.length > 0 && !categories.find(c => c.id === activeCategory)) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  const validActiveCategory = categories.find(c => c.id === activeCategory) ? activeCategory : (categories[0]?.id ?? '');
  const products = getProductsByCategory(validActiveCategory);

  function getCurrentData(): ProductsData {
    return settings.productsData ?? getDefaultProductsData();
  }

  async function save(data: ProductsData) {
    setSaving(true);
    try {
      await updateProductsData(data);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteProduct(productId: string) {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    const data = getCurrentData();
    await save({ ...data, products: data.products.filter(p => p.id !== productId) });
  }

  async function handleSaveEdit(productId: string, formData: ProductFormData) {
    const data = getCurrentData();
    const updated = data.products.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        name: formData.name.trim(),
        badge: formData.badge.trim() || undefined,
        iconName: formData.iconName,
        color: formData.color,
        isCustom: formData.isCustom || undefined,
        features: formData.features.filter(f => f.trim()),
        options: formData.options.filter(o => o.name.trim()),
      };
    });
    await save({ ...data, products: updated });
    setEditingId(null);
  }

  async function handleAddProduct(formData: ProductFormData) {
    const data = getCurrentData();
    const newProduct: Product = {
      id: newProductId(validActiveCategory),
      category: validActiveCategory,
      name: formData.name.trim(),
      badge: formData.badge.trim() || undefined,
      iconName: formData.iconName,
      color: formData.color,
      isCustom: formData.isCustom || undefined,
      features: formData.features.filter(f => f.trim()),
      options: formData.options.filter(o => o.name.trim()),
    };
    await save({ ...data, products: [...data.products, newProduct] });
    setShowAddProduct(false);
  }

  async function handleAddCategory() {
    const label = newCategoryLabel.trim();
    if (!label) return;
    const id = label
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\u0600-\u06FF-]/g, '')
      || `cat-${Date.now().toString(36)}`;
    const data = getCurrentData();
    if (data.categories.find(c => c.id === id)) {
      alert('هذه الفئة موجودة بالفعل');
      return;
    }
    await save({ ...data, categories: [...data.categories, { id, label }] });
    setActiveCategory(id);
    setNewCategoryLabel('');
    setShowAddCategory(false);
  }

  async function handleDeleteCategory(catId: string) {
    const count = getCurrentData().products.filter(p => p.category === catId).length;
    if (count > 0) {
      alert(`لا يمكن حذف هذه الفئة لأنها تحتوي على ${count} منتج. يرجى حذف جميع منتجاتها أولاً.`);
      return;
    }
    if (!confirm('هل تريد حذف هذه الفئة الفارغة؟')) return;
    const data = getCurrentData();
    const newCats = data.categories.filter(c => c.id !== catId);
    await save({ ...data, categories: newCats });
    if (activeCategory === catId) {
      setActiveCategory(newCats[0]?.id ?? '');
    }
  }

  async function handleRenameCategory(catId: string) {
    const label = renameValue.trim();
    if (!label) { setRenaming(null); return; }
    const data = getCurrentData();
    const newCats = data.categories.map(c => c.id === catId ? { ...c, label } : c);
    await save({ ...data, categories: newCats });
    setRenaming(null);
    setRenameValue('');
  }

  return (
    <div className="glass-panel rounded-2xl p-6 mb-6 border border-white/10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          إدارة المنتجات
        </h2>
        <button
          onClick={() => { setShowAddCategory(!showAddCategory); setShowAddProduct(false); setEditingId(null); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-colors border border-primary/20"
        >
          <FolderPlus className="w-3.5 h-3.5" />
          إضافة فئة
        </button>
      </div>

      {showAddCategory && (
        <div className="mb-5 flex gap-2">
          <input
            type="text"
            value={newCategoryLabel}
            onChange={e => setNewCategoryLabel(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleAddCategory(); if (e.key === 'Escape') setShowAddCategory(false); }}
            placeholder="اسم الفئة الجديدة (مثال: كورسات)"
            autoFocus
            className="flex-1 px-3 py-2.5 rounded-lg bg-background/60 border border-primary/30 text-foreground text-sm focus:outline-none"
            dir="auto"
          />
          <Button onClick={handleAddCategory} disabled={saving || !newCategoryLabel.trim()} className="bg-primary text-white font-bold shrink-0">
            <Check className="w-4 h-4" />
          </Button>
          <Button onClick={() => setShowAddCategory(false)} variant="ghost" className="border border-white/10 shrink-0">
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="flex gap-2 flex-wrap mb-5">
        {categories.map(cat => (
          <div key={cat.id} className="group relative flex items-center">
            {renaming === cat.id ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleRenameCategory(cat.id); if (e.key === 'Escape') setRenaming(null); }}
                  autoFocus
                  className="px-2 py-1 rounded-lg bg-background/60 border border-primary/40 text-foreground text-sm focus:outline-none w-28"
                  dir="auto"
                />
                <button onClick={() => handleRenameCategory(cat.id)} className="text-green-400 hover:text-green-300">
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setRenaming(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setActiveCategory(cat.id); setEditingId(null); setShowAddProduct(false); }}
                onDoubleClick={() => { setRenaming(cat.id); setRenameValue(cat.label); }}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
              >
                {cat.label}
                <span className="mr-1.5 text-[10px] opacity-60">
                  ({getCurrentData().products.filter(p => p.category === cat.id).length})
                </span>
              </button>
            )}
            {renaming !== cat.id && (
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="hidden group-hover:flex absolute -top-1.5 -left-1.5 w-4 h-4 items-center justify-center rounded-full bg-red-500 text-white z-10 shadow-md"
                title="حذف الفئة"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          <FolderPlus className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>لا توجد فئات. ابدأ بإضافة فئة جديدة.</p>
        </div>
      ) : (
        <>
          <div className="space-y-2 mb-4">
            {products.length === 0 && !showAddProduct && (
              <div className="py-8 text-center text-muted-foreground text-sm">
                <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>لا توجد منتجات في هذه الفئة</p>
              </div>
            )}

            {products.map(product => {
              const Icon = getIconComponent(product.iconName);
              const isEditing = editingId === product.id;
              return (
                <div key={product.id} className={`rounded-xl border transition-all ${isEditing ? 'border-primary/30 bg-secondary/20' : 'border-white/5 bg-secondary/20 hover:border-white/10'}`}>
                  <div className="flex items-center gap-3 p-3">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${product.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{product.name}</p>
                      <p className="text-[11px] text-muted-foreground">{product.options.length} خيار سعر</p>
                    </div>
                    {product.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/20 font-bold shrink-0">
                        {product.badge}
                      </span>
                    )}
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => { setEditingId(isEditing ? null : product.id); setShowAddProduct(false); }}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                          isEditing
                            ? 'bg-secondary text-muted-foreground border-white/10'
                            : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'
                        }`}
                      >
                        {isEditing ? <ChevronUp className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
                        {isEditing ? 'إخفاء' : 'تعديل'}
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors border bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        حذف
                      </button>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="px-4 pb-4 pt-2 border-t border-white/5">
                      <ProductForm
                        initialData={productToForm(product)}
                        onSave={data => handleSaveEdit(product.id, data)}
                        onCancel={() => setEditingId(null)}
                        saving={saving}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {showAddProduct && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 mb-4">
              <h3 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                إضافة منتج جديد
              </h3>
              <ProductForm
                initialData={emptyForm()}
                onSave={handleAddProduct}
                onCancel={() => setShowAddProduct(false)}
                saving={saving}
              />
            </div>
          )}

          <button
            onClick={() => { setShowAddProduct(!showAddProduct); setEditingId(null); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-white/20 hover:border-primary/40 text-muted-foreground hover:text-primary text-sm font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            إضافة منتج جديد
          </button>

          {categories.length > 0 && (
            <p className="text-[10px] text-muted-foreground/50 text-center mt-3">
              انقر مرتين على اسم الفئة للتغيير • الخ لحذف فئة
            </p>
          )}
        </>
      )}
    </div>
  );
}
