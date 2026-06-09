import { useState } from 'react';
import api from '../../api';

export default function ImagePicker({ onSelect, isOpen, onClose }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upload, setUpload] = useState(null);

  const loadImages = async () => {
    if (isOpen && images.length === 0) {
      try {
        setLoading(true);
        const { data } = await api.get('/admin/media');
        setImages(data.media || []);
      } catch (err) {
        console.error('Failed to load media:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await api.post('/admin/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImages([...images, data]);
      setUpload(null);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete image?')) {
      try {
        await api.delete(`/admin/media/${id}`);
        setImages(images.filter((img) => img._id !== id));
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  return isOpen ? (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Select Image</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="image-upload-section">
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: 'none' }}
            />
            <div className="upload-button">📤 Upload New Image</div>
          </label>
        </div>

        {loading ? (
          <div className="loading">Loading media...</div>
        ) : (
          <div className="media-grid">
            {images.map((img) => (
              <div key={img._id} className="media-item">
                <img src={img.url} alt="media" />
                <div className="media-actions">
                  <button onClick={() => { onSelect(img.url); onClose(); }}>Select</button>
                  <button onClick={() => handleDelete(img._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : null;
}
