import React, { createContext, useEffect, useState } from 'react';

// LanguageContext provides current language and helpers to update it.
// It also persists the selection to localStorage and updates document `dir`.

export const SUPPORTED_LANGS = {
  EN: 'en',
  AR: 'ar',
};

export const LanguageContext = createContext({
  lang: SUPPORTED_LANGS.EN,
  setLang: () => {},
  toggleLang: () => {},
});

const STORAGE_KEY = 'siteLang';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || SUPPORTED_LANGS.EN;
    } catch (e) {
      return SUPPORTED_LANGS.EN;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // ignore
    }

    // update document direction and language attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === SUPPORTED_LANGS.AR ? 'rtl' : 'ltr';
    }
  }, [lang]);

  const setLang = (value) => setLangState(value);

  const toggleLang = () => setLangState((current) => (current === SUPPORTED_LANGS.EN ? SUPPORTED_LANGS.AR : SUPPORTED_LANGS.EN));

  return <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>{children}</LanguageContext.Provider>;
}

export default LanguageProvider;
