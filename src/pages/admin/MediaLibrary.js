import { useEffect, useState } from 'react';
import api from '../../api';

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data } = await api.get('/media');
      setMedia(data.media || []);
    } catch (err) {
      setError('Failed to load media');
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    try {
      setUploading(true);
      await api.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await fetchMedia();
    } catch (err) {
      setError('Upload failed');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete image?')) {
      try {
        await api.delete(`/admin/media/${id}`);
        setMedia(media.filter((m) => m._id !== id));
      } catch (err) {
        setError('Delete failed');
      }
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div>
      <h1>Media Library</h1>
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-form">
        <label style={{ gridColumn: '1 / -1' }}>
          <span>Upload Images</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
        {uploading && <div className="loading" style={{ gridColumn: '1 / -1' }}>Uploading...</div>}
      </div>

      <div className="media-gallery">
        {media.map((item) => (
          <div key={item._id} className="media-card">
            <img src={item.url} alt="media" className="media-image" />
            <div className="media-info">
              <small>{item.filename || 'Image'}</small>
            </div>
            <div className="media-actions">
              <button
                onClick={() => handleCopyUrl(item.url)}
                title="Copy URL"
                className={copiedUrl === item.url ? 'copied' : ''}
              >
                {copiedUrl === item.url ? '✓ Copied' : '📋 Copy URL'}
              </button>
              <button onClick={() => handleDelete(item._id)} className="danger">
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {media.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
          <p>No images uploaded yet. Upload some images to get started.</p>
        </div>
      )}
    </div>
  );
}
