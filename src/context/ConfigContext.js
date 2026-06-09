import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchAllConfig, saveConfig as saveConfigService } from '../services/configService';
import socket from '../services/socket';

const ConfigContext = createContext();

export function useConfig() {
  return useContext(ConfigContext);
}

function injectCssVariables(theme = {}) {
  const root = document.documentElement;
  const mapping = {
    primaryColor: '--color-primary',
    secondaryColor: '--color-secondary',
    fontFamily: '--font-family',
    headingFont: '--font-heading',
    backgroundColor: '--color-background',
  };

  Object.keys(mapping).forEach((k) => {
    if (theme[k]) root.style.setProperty(mapping[k], theme[k]);
  });
}

export default function ConfigProvider({ children }) {
  const [config, setConfig] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const refresh = async () => {
    try {
      // support preview mode: if preview=1 in URL and previewConfig in localStorage, use it
      const urlSearch = typeof window !== 'undefined' ? window.location.search : '';
      if (urlSearch && urlSearch.includes('preview=1')) {
        const pv = localStorage.getItem('previewConfig');
        if (pv) {
          const parsed = JSON.parse(pv);
          setConfig(parsed || {});
          if (parsed && parsed.theme) injectCssVariables(parsed.theme);
          return parsed;
        }
      }

      const data = await fetchAllConfig();
      setConfig(data || {});
      if (data && data.theme) injectCssVariables(data.theme);
      return data;
    } catch (err) {
      console.error('Failed to fetch config', err);
      return null;
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    refresh();
    // subscribe to socket updates
    const handle = () => refresh();
    socket.on('config.updated', handle);

    return () => {
      socket.off('config.updated', handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateConfig = async (patch) => {
    try {
      const updated = await saveConfigService(patch);
      if (updated) {
        setConfig((prev) => ({ ...(prev || {}), ...updated }));
        if (updated.theme) injectCssVariables(updated.theme);
      }
      return updated;
    } catch (err) {
      console.error('Failed to update config', err);
      throw err;
    }
  };

  const value = {
    config: config || {},
    updateConfig,
    refresh,
  };

  if (!loaded) return null;

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

