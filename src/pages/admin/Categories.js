import { useEffect, useState } from 'react';
import api from '../../api';
import ImagePicker from '../../components/admin/ImagePicker';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', image: '', description: '' });
  const [error, setError] = useState('');
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data.categories || []);
    } catch (err) {
      setError('Failed to load categories');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/admin/categories/${editing}`, form);
      } else {
        await api.post('/categories', form);
      }
      await fetchCategories();
      resetForm();
    } catch (err) {
      setError('Failed to save category');
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ name: '', slug: '', image: '', description: '' });
  };

  const handleEdit = (category) => {
    setEditing(category._id);
    setForm(category);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete category?')) {
      try {
        await api.delete(`/admin/categories/${id}`);
        fetchCategories();
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      {error && <div className="admin-error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          <span>Name</span>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Category name"
            required
          />
        </label>
        <label>
          <span>Slug</span>
          <input
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="category-slug"
            required
          />
        </label>
        <label style={{ gridColumn: '1 / -1' }}>
          <span>Category Image</span>
          <div className="image-input-group">
            {form.image && <img src={form.image} alt="category" style={{ maxWidth: '100px' }} />}
            <button
              type="button"
              onClick={() => setImagePickerOpen(true)}
            >
              Select Image
            </button>
          </div>
        </label>
        <label style={{ gridColumn: '1 / -1' }}>
          <span>Description</span>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Category description"
            rows="3"
          />
        </label>
        <button type="submit" style={{ gridColumn: '1 / -1' }}>
          {editing ? 'Update' : 'Create'}
        </button>
        {editing && (
          <button type="button" onClick={resetForm} style={{ gridColumn: '1 / -1' }}>
            Cancel
          </button>
        )}
      </form>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>{cat.name}</td>
                <td>{cat.slug}</td>
                <td>{cat.image && <img src={cat.image} alt={cat.name} style={{ maxHeight: '40px' }} />}</td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => handleEdit(cat)}>Edit</button>
                    <button onClick={() => handleDelete(cat._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ImagePicker
        isOpen={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={(url) => {
          setForm({ ...form, image: url });
          setImagePickerOpen(false);
        }}
      />
    </div>
  );
}
