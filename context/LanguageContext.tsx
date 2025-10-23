import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { translations } from '../lib/translations';
import type { Language } from '../types';
import { LANGUAGES } from '../constants';

const get = (obj: any, path: string, defaultValue: any = ''): any => {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
        result = result?.[key];
        if (result === undefined) {
            return defaultValue;
        }
    }
    return result || defaultValue;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => any;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(LANGUAGES[0]);

  useEffect(() => {
    const storedLangCode = localStorage.getItem('language_code');
    const browserLangCode = navigator.language.split('-')[0];
    const initialLang = LANGUAGES.find(l => l.code === storedLangCode) || LANGUAGES.find(l => l.code === browserLangCode) || LANGUAGES[0];
    setLanguageState(initialLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language_code', lang.code);
  };

  const t = useCallback((key: string): any => {
    const langTranslations = translations[language.code as keyof typeof translations] || translations.en;
    let translation = get(langTranslations, key);

    if (!translation) {
      translation = get(translations.en, key, key);
    }
    
    return translation;
  }, [language]);


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};