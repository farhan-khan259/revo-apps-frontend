import { useContext, useCallback } from 'react';
import translations from './translations';
import { LanguageContext, SUPPORTED_LANGS } from '../context/LanguageContext';

export function useTranslation() {
  const { lang } = useContext(LanguageContext);

  const t = useCallback(
    (path, fallback) => {
      const ns = translations[lang] || translations[SUPPORTED_LANGS.EN];
      const parts = path.split('.');
      let cur = ns;
      for (let i = 0; i < parts.length; i += 1) {
        if (!cur) break;
        cur = cur[parts[i]];
      }
      return cur || fallback || path;
    },
    [lang],
  );

  return { t, lang };
}

export default useTranslation;
