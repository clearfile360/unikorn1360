import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translate, applyGoogleTranslation } from '../lib/i18n';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, defaultText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  setLanguage: () => {},
  t: (key: string, defaultText?: string) => defaultText || key,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(() => {
    return localStorage.getItem('unikorn_lang') || 'EN';
  });

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('unikorn_lang', lang);
    applyGoogleTranslation(lang);
    window.dispatchEvent(new CustomEvent('unikorn_lang_changed', { detail: lang }));
  };

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && customEvent.detail !== language) {
        setLanguageState(customEvent.detail);
        applyGoogleTranslation(customEvent.detail);
      }
    };

    window.addEventListener('unikorn_lang_changed', handleLangChange);
    return () => {
      window.removeEventListener('unikorn_lang_changed', handleLangChange);
    };
  }, [language]);

  const t = (key: string, defaultText?: string): string => {
    const res = translate(key, language);
    if (res === key && defaultText) {
      return defaultText;
    }
    return res;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
