import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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

interface Settings {
  logo?: string;
  productImages?: Record<string, string>;
  adminPassword?: string;
  sectionLabels?: Record<string, SectionLabel>;
}

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
  updateSetting: (key: string, value: string) => Promise<void>;
  deleteSetting: (key: string) => Promise<void>;
  getProductImage: (productId: string) => string | undefined;
  getSectionLabel: (key: string) => SectionLabel;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

const BASE_PATH = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';

async function apiGet(path: string) {
  const res = await fetch(`${BASE_PATH}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function apiPost(path: string, body: unknown) {
  const res = await fetch(`${BASE_PATH}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function apiDelete(path: string) {
  const res = await fetch(`${BASE_PATH}${path}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
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
  return settings;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await apiGet('/api/settings');
      if (res.success) setSettings(parseSettings(res.data));
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

  return (
    <SettingsContext.Provider value={{ settings, loading, updateSetting, deleteSetting, getProductImage, getSectionLabel }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
