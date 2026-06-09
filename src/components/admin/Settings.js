import { useEffect, useState } from 'react';
import api from '../../api';

export default function Settings() {
  const [settings, setSettings] = useState({ siteName: '', brandCopy: '', navLinks: [], footerColumns: [] });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/admin/settings');
        setSettings(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load settings.');
      }
    };
    fetch();
  }, []);

  const save = async () => {
    try {
      await api.put('/admin/settings', settings);
      alert('Saved');
    } catch (err) {
      console.error(err);
      setError('Unable to save settings.');
    }
  };

  return (
    <div>
      <h1>Site Settings</h1>
      {error && <p className="admin-error">{error}</p>}
      <div className="admin-form">
        <label>Site Name</label>
        <input value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
        <label>Brand Copy</label>
        <textarea value={settings.brandCopy} onChange={(e) => setSettings({ ...settings, brandCopy: e.target.value })} />
        <label>Nav Links (JSON)</label>
        <textarea value={JSON.stringify(settings.navLinks)} onChange={(e) => setSettings({ ...settings, navLinks: JSON.parse(e.target.value) })} />
        <button onClick={save}>Save Settings</button>
      </div>
    </div>
  );
}