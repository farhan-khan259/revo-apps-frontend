import { useEffect, useState, useCallback } from 'react';
import { useConfig } from '../context/ConfigContext';
import socket from '../services/socket';

export default function useConfigSubscription(pollInterval = 30000) {
  const { config, refresh } = useConfig();
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const manualRefresh = useCallback(async () => {
    await refresh();
    setLastUpdated(Date.now());
  }, [refresh]);

  useEffect(() => {
    let mounted = true;

    // Socket subscription
    function handleConfigUpdate(payload) {
      if (!mounted) return;
      // simple trigger to refresh
      refresh();
      setLastUpdated(Date.now());
    }

    socket.on('config.updated', handleConfigUpdate);

    // Polling fallback
    const intervalId = setInterval(() => {
      refresh().then(() => setLastUpdated(Date.now())).catch(() => {});
    }, pollInterval);

    return () => {
      mounted = false;
      socket.off('config.updated', handleConfigUpdate);
      clearInterval(intervalId);
    };
  }, [pollInterval, refresh]);

  return { config, manualRefresh, lastUpdated };
}
