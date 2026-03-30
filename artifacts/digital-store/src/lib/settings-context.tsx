import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SUBSCRIPTIONS, GIFT_CARDS, GAMES, ACCOUNT_PRODUCTS, SOCIAL_PRODUCTS, BALANCE_PRODUCTS,
  type Product,
} from './store-data';

export interface SectionLabel {
  nav: string;
  page: string;
}

export const DEFAULT_SECTION_LABELS: Record<string, SectionLabel> = {
  subscriptions: { nav: 'اشتراكات', page: 'الاشتراكات الرقمية' },
  'gift-cards':  { nav: 'بطاقات',   page: 'البطاقات الرقمية' },
  games:         { nav: 'ألعاب',    page: 'شحن الألعاب' },
  accounts:      { nav: 'حسابات جاهزة', page: 'حسابات جاهزة' },
  social:        { nav: 'سوشيال',   page: 'سوشيال ميديا' },
  balance:       { nav: 'رصيد',     page: 'شحن الرصيد' },
};

export interface ProductCategoryDef {
  id: string;
  label: string;
}

export interface ProductsData {
  categories: ProductCategoryDef[];
  products: Product[];
}

const DEFAULT_CATEGORIES: ProductCategoryDef[] = [
  { id: 'subscriptions', label: 'اشتراكات' },
  { id: 'gift-cards', label: 'بطاقات' },
  { id: 'games', label: 'ألعاب' },
  { id: 'accounts', label: 'حسابات' },
  { id: 'social', label: 'سوشيال' },
  { id: 'balance', label: 'رصيد' },
];

const DEFAULT_PRODUCTS: Product[] = [
  ...SUBSCRIPTIONS,
  ...GIFT_CARDS,
  ...GAMES,
  ...ACCOUNT_PRODUCTS,
  ...SOCIAL_PRODUCTS,
  ...BALANCE_PRODUCTS,
];

export function getDefaultProductsData(): ProductsData {
  return {
    categories: DEFAULT_CATEGORIES,
    products: DEFAULT_PRODUCTS,
  };
}

interface Settings {
  logo?: string;
  productImages?: Record<string, string>;
  adminPassword?: string;
  sectionLabels?: Record<string, SectionLabel>;
  productsData?: ProductsData;
}

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
  updateSetting: (key: string, value: string) => Promise<void>;
  deleteSetting: (key: string) => Promise<void>;
  getProductImage: (productId: string) => string | undefined;
  getSectionLabel: (key: string) => SectionLabel;
  getProductsByCategory: (category: string) => Product[];
  getAllCategories: () => ProductCategoryDef[];
  getCategoryLabel: (categoryId: string) => string;
  updateProductsData: (data: ProductsData) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

const FIREBASE_URL = 'https://buisiness-40599-default-rtdb.firebaseio.com';

async function apiGet(_path: string) {
  const res = await fetch(`${FIREBASE_URL}/settings.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return { success: true, data: (data as Record<string, string>) ?? {} };
}

async function apiPost(_path: string, body: unknown) {
  const { key, value } = body as { key: string; value: string };
  const res = await fetch(`${FIREBASE_URL}/settings/${encodeURIComponent(key)}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return { success: true };
}

async function apiDelete(path: string) {
  const key = path.split('/').pop() ?? '';
  const res = await fetch(`${FIREBASE_URL}/settings/${encodeURIComponent(key)}.json`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return { success: true };
}

function parseSettings(raw: Record<string, string>): Settings {
  const settings: Settings = {};
  if (raw.logo) settings.logo = raw.logo;
  if (raw.adminPassword) settings.adminPassword = raw.adminPassword;
  if (raw.productImages) {
    try { settings.productImages = JSON.parse(raw.productImages); } catch { settings.productImages = {}; }
  }
  if (raw.sectionLabels) {
    try { settings.sectionLabels = JSON.parse(raw.sectionLabels); } catch { settings.sectionLabels = {}; }
  }
  if (raw.productsData) {
    try {
      const parsed = JSON.parse(raw.productsData);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.categories) && Array.isArray(parsed.products)) {
        settings.productsData = parsed as ProductsData;
      }
    } catch { settings.productsData = undefined; }
  }
  return settings;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await apiGet('/api/settings');
      if (res.success) {
        const parsed = parseSettings(res.data);
        if (!parsed.productsData) {
          const defaults = getDefaultProductsData();
          await apiPost('/api/settings', { key: 'productsData', value: JSON.stringify(defaults) });
          parsed.productsData = defaults;
        }
        setSettings(parsed);
      }
    } catch {
      // silently ignore - store works without API
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const updateSetting = useCallback(async (key: string, value: string) => {
    await apiPost('/api/settings', { key, value });
    await fetchSettings();
  }, [fetchSettings]);

  const deleteSetting = useCallback(async (key: string) => {
    await apiDelete(`/api/settings/${key}`);
    await fetchSettings();
  }, [fetchSettings]);

  const getProductImage = useCallback((productId: string) => {
    return settings.productImages?.[productId];
  }, [settings.productImages]);

  const getSectionLabel = useCallback((key: string): SectionLabel => {
    const saved = settings.sectionLabels?.[key];
    const def = DEFAULT_SECTION_LABELS[key] ?? { nav: key, page: key };
    return {
      nav:  saved?.nav  || def.nav,
      page: saved?.page || def.page,
    };
  }, [settings.sectionLabels]);

  const getProductsByCategory = useCallback((category: string): Product[] => {
    const data = settings.productsData;
    if (data) {
      return data.products.filter(p => p.category === category);
    }
    return DEFAULT_PRODUCTS.filter(p => p.category === category);
  }, [settings.productsData]);

  const getAllCategories = useCallback((): ProductCategoryDef[] => {
    const data = settings.productsData;
    if (data) return data.categories;
    return DEFAULT_CATEGORIES;
  }, [settings.productsData]);

  const getCategoryLabel = useCallback((categoryId: string): string => {
    const data = settings.productsData;
    const found = data?.categories.find(c => c.id === categoryId);
    if (found) return found.label;
    const def = DEFAULT_CATEGORIES.find(c => c.id === categoryId);
    return def?.label ?? categoryId;
  }, [settings.productsData]);

  const updateProductsData = useCallback(async (data: ProductsData) => {
    await apiPost('/api/settings', { key: 'productsData', value: JSON.stringify(data) });
    await fetchSettings();
  }, [fetchSettings]);

  return (
    <SettingsContext.Provider value={{
      settings, loading, updateSetting, deleteSetting,
      getProductImage, getSectionLabel, getProductsByCategory, getAllCategories, getCategoryLabel, updateProductsData,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
