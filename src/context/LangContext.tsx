import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationEN from '../locales/en.json';
import translationRU from '../locales/ru.json';
import translationKZ from '../locales/kz.json';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      ru: { translation: translationRU },
      kz: { translation: translationKZ },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

type LanguageType = 'en' | 'ru' | 'kz';

interface LangContextType {
  language: LanguageType;
  changeLanguage: (lang: LanguageType) => void;
}

const LangContext = createContext<LangContextType>({
  language: 'en',
  changeLanguage: () => {},
});

export const useLang = () => useContext(LangContext);

interface LangProviderProps {
  children: ReactNode;
}

export const LangProvider = ({ children }: LangProviderProps) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  useEffect(() => {
    // Check if user has a language preference in localStorage
    const savedLang = localStorage.getItem('language') as LanguageType;
    
    if (savedLang && ['en', 'ru', 'kz'].includes(savedLang)) {
      setLanguage(savedLang);
      i18n.changeLanguage(savedLang);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'ru', 'kz'].includes(browserLang)) {
        setLanguage(browserLang as LanguageType);
        i18n.changeLanguage(browserLang);
      }
    }
  }, []);

  const changeLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LangContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
}; 