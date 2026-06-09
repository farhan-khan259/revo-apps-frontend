import { useState } from 'react';
import SectionEditor from '../../components/admin/SectionEditor';

function ThemeEditorForm({ data, setData }) {
  const theme = data || {};

  const updateTheme = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const primaryColor = theme.primaryColor || '#2563eb';
  const secondaryColor = theme.secondaryColor || '#64748b';
  const buttonBorderRadius = theme.buttonBorderRadius || '0.95rem';

  return (
    <div>
      <div className="admin-form">
        <label>
          <span>Primary Color</span>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => updateTheme('primaryColor', e.target.value)}
              style={{ width: '60px', height: '40px', cursor: 'pointer' }}
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => updateTheme('primaryColor', e.target.value)}
              placeholder="#2563eb"
            />
          </div>
        </label>
        <label>
          <span>Secondary Color</span>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => updateTheme('secondaryColor', e.target.value)}
              style={{ width: '60px', height: '40px', cursor: 'pointer' }}
            />
            <input
              type="text"
              value={secondaryColor}
              onChange={(e) => updateTheme('secondaryColor', e.target.value)}
              placeholder="#64748b"
            />
          </div>
        </label>
        <label>
          <span>Font Family</span>
          <select
            value={theme.fontFamily || 'Inter'}
            onChange={(e) => updateTheme('fontFamily', e.target.value)}
          >
            <option value="Inter">Inter</option>
            <option value="Manrope">Manrope</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
          </select>
        </label>
        <label>
          <span>Button Border Radius (px)</span>
          <input
            type="number"
            value={parseInt(buttonBorderRadius) || 0}
            onChange={(e) => updateTheme('buttonBorderRadius', `${e.target.value}px`)}
            placeholder="12"
          />
        </label>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Live Preview</h3>
        <div className="theme-preview">
          <button
            style={{
              backgroundColor: primaryColor,
              color: '#fff',
              padding: '12px 24px',
              borderRadius: buttonBorderRadius,
              border: 'none',
              cursor: 'pointer',
              fontFamily: theme.fontFamily || 'Inter',
              fontSize: '16px',
              fontWeight: '600',
              marginRight: '12px',
              marginBottom: '12px',
            }}
          >
            Primary Button
          </button>
          <button
            style={{
              backgroundColor: secondaryColor,
              color: '#fff',
              padding: '12px 24px',
              borderRadius: buttonBorderRadius,
              border: 'none',
              cursor: 'pointer',
              fontFamily: theme.fontFamily || 'Inter',
              fontSize: '16px',
              fontWeight: '600',
              marginRight: '12px',
              marginBottom: '12px',
            }}
          >
            Secondary Button
          </button>
          <div
            style={{
              fontFamily: theme.fontFamily || 'Inter',
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
            }}
          >
            <p>This is sample text in {theme.fontFamily || 'Inter'} font family.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThemeEditor() {
  return (
    <div>
      <h1>Theme Editor</h1>
      <SectionEditor sectionKey="theme" title="Theme Configuration">
        {(data, setData) => <ThemeEditorForm data={data} setData={setData} />}
      </SectionEditor>
    </div>
  );
}
