import { useEffect, useState } from 'react';
import api from '../../api';
import PreviewButton from './PreviewButton';

export default function SectionEditor({ sectionKey, title, children, onSave }) {
  const [data, setData] = useState(null);
  const [fullConfig, setFullConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showJson, setShowJson] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, [sectionKey]);

  const loadData = async () => {
    try {
      setLoading(true);
      const { data: config } = await api.get('/admin/config/all');
      setFullConfig(config || {});
      setData(config[sectionKey] || {});
      setJsonText(JSON.stringify(config[sectionKey] || {}, null, 2));
    } catch (err) {
      setError('Failed to load configuration');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      const payload = showJson ? JSON.parse(jsonText) : data;
      await api.put(`/admin/config/${sectionKey}`, { value: payload });
      setData(payload);
      if (onSave) onSave(payload);
      alert('Configuration saved successfully');
    } catch (err) {
      const apiMessage = err.response?.data?.message;
      setError(apiMessage || err.message || 'Failed to save configuration');
      console.error('Config save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleJsonChange = (e) => {
    setJsonText(e.target.value);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="section-editor">
      <div className="editor-header">
        <h3>{title}</h3>
        <div className="editor-controls">
          <button
            onClick={() => setShowJson(!showJson)}
            className={`toggle-btn ${showJson ? 'active' : ''}`}
          >
            {showJson ? 'Form' : 'JSON'}
          </button>
          <button onClick={handleSave} disabled={saving} className="save-btn">
            {saving ? 'Saving...' : 'Save'}
          </button>
          <PreviewButton
            tempConfig={(() => {
              try {
                const payload = showJson ? JSON.parse(jsonText) : data;
                return { ...(fullConfig || {}), [sectionKey]: payload };
              } catch (e) {
                return { ...(fullConfig || {}), [sectionKey]: data };
              }
            })()}
          />
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}

      {showJson ? (
        <div className="json-editor-wrapper">
          <textarea
            value={jsonText}
            onChange={handleJsonChange}
            className="json-editor"
            rows="12"
          />
        </div>
      ) : (
        <div className="form-wrapper">
          {children && typeof children === 'function'
            ? children(data, setData)
            : children}
        </div>
      )}
    </div>
  );
}
