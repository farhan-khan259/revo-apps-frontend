import React from 'react';

export default function PreviewButton({ tempConfig, label = 'Preview' }) {
  const handlePreview = () => {
    try {
      localStorage.setItem('previewConfig', JSON.stringify(tempConfig || {}));
      const url = `${window.location.origin}/?preview=1`;
      window.open(url, '_blank');
    } catch (err) {
      console.error('Failed to open preview', err);
    }
  };

  return (
    <button type="button" className="admin-preview-button" onClick={handlePreview}>
      {label}
    </button>
  );
}
