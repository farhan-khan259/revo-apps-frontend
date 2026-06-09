import { useEffect, useState } from 'react';
import api from '../../api';
import ImagePicker from '../../components/admin/ImagePicker';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    price: '',
    oldPrice: '',
    discount: '',
    rating: 0,
    sold: 0,
    stock: 0,
    categories: [],
    tags: '',
    description: '',
    highlights: [],
    specs: [],
    images: [],
  });
  const [error, setError] = useState('');
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/admin/products');
      setProducts(data.products || []);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        categories: Array.isArray(form.categories) ? form.categories : [],
      };

      if (editing) {
        await api.put(`/admin/products/${editing}`, payload);
      } else {
        await api.post('/admin/products', payload);
      }
      await fetchProducts();
      resetForm();
    } catch (err) {
      setError('Failed to save product');
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({
      name: '',
      price: '',
      oldPrice: '',
      discount: '',
      rating: 0,
      sold: 0,
      stock: 0,
      categories: [],
      tags: '',
      description: '',
      highlights: [],
      specs: [],
      images: [],
    });
  };

  const handleEdit = (product) => {
    setEditing(product._id);
    setForm({
      ...product,
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete product?')) {
      try {
        await api.delete(`/admin/products/${id}`);
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  const updateHighlight = (index, value) => {
    const highlights = [...form.highlights];
    highlights[index] = value;
    setForm({ ...form, highlights });
  };

  const addHighlight = () => {
    setForm({ ...form, highlights: [...form.highlights, ''] });
  };

  const removeHighlight = (index) => {
    setForm({ ...form, highlights: form.highlights.filter((_, i) => i !== index) });
  };

  const updateSpec = (index, key, value) => {
    const specs = [...form.specs];
    specs[index] = { ...specs[index], [key]: value };
    setForm({ ...form, specs });
  };

  const addSpec = () => {
    setForm({ ...form, specs: [...form.specs, { name: '', value: '' }] });
  };

  const removeSpec = (index) => {
    setForm({ ...form, specs: form.specs.filter((_, i) => i !== index) });
  };

  const toggleCategory = (categoryId) => {
    const cats = form.categories || [];
    if (cats.includes(categoryId)) {
      setForm({ ...form, categories: cats.filter((c) => c !== categoryId) });
    } else {
      setForm({ ...form, categories: [...cats, categoryId] });
    }
  };

  const handleAddImage = (url) => {
    setForm({ ...form, images: [...form.images, url] });
    setImagePickerOpen(false);
  };

  const removeImage = (index) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <h1>Products</h1>
      {error && <div className="admin-error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <label style={{ gridColumn: '1 / -1' }}>
          <span>Product Name</span>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Product name"
            required
          />
        </label>

        <label>
          <span>Price</span>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="0.00"
            step="0.01"
            required
          />
        </label>
        <label>
          <span>Old Price</span>
          <input
            type="number"
            value={form.oldPrice}
            onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
            placeholder="0.00"
            step="0.01"
          />
        </label>
        <label>
          <span>Discount %</span>
          <input
            type="number"
            value={form.discount}
            onChange={(e) => setForm({ ...form, discount: e.target.value })}
            placeholder="0"
            min="0"
            max="100"
          />
        </label>

        <label>
          <span>Rating</span>
          <input
            type="number"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })}
            min="0"
            max="5"
            step="0.1"
          />
        </label>
        <label>
          <span>Sold</span>
          <input
            type="number"
            value={form.sold}
            onChange={(e) => setForm({ ...form, sold: parseInt(e.target.value) })}
            placeholder="0"
            min="0"
          />
        </label>
        <label>
          <span>Stock</span>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
            placeholder="0"
            min="0"
            required
          />
        </label>

        <label style={{ gridColumn: '1 / -1' }}>
          <span>Categories</span>
          <div className="checkbox-group">
            {categories.map((cat) => (
              <label key={cat._id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={(form.categories || []).includes(cat._id)}
                  onChange={() => toggleCategory(cat._id)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </label>

        <label style={{ gridColumn: '1 / -1' }}>
          <span>Tags (comma separated)</span>
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="bestseller, sale, new"
          />
        </label>

        <label style={{ gridColumn: '1 / -1' }}>
          <span>Description</span>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Product description"
            rows="4"
          />
        </label>
      </form>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Highlights</h3>
        {form.highlights.map((highlight, i) => (
          <div key={i} className="admin-form">
            <input
              value={highlight}
              onChange={(e) => updateHighlight(i, e.target.value)}
              placeholder="Product highlight"
            />
            <button type="button" onClick={() => removeHighlight(i)} className="danger">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addHighlight} style={{ marginTop: '0.5rem' }}>
          + Add Highlight
        </button>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Specifications</h3>
        {form.specs.map((spec, i) => (
          <div key={i} className="admin-form">
            <input
              value={spec.name}
              onChange={(e) => updateSpec(i, 'name', e.target.value)}
              placeholder="Spec name (e.g., Color)"
            />
            <input
              value={spec.value}
              onChange={(e) => updateSpec(i, 'value', e.target.value)}
              placeholder="Spec value (e.g., Red)"
            />
            <button type="button" onClick={() => removeSpec(i)} className="danger">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addSpec} style={{ marginTop: '0.5rem' }}>
          + Add Spec
        </button>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Product Images</h3>
        <div className="image-gallery">
          {form.images.map((img, i) => (
            <div key={i} className="image-thumb">
              <img src={img} alt="product" />
              <button type="button" onClick={() => removeImage(i)} className="remove-btn">
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setImagePickerOpen(true)}
            className="add-image-btn"
          >
            + Add Image
          </button>
        </div>
      </div>

      <div className="admin-form" style={{ marginTop: '1.5rem', gridColumn: '1 / -1' }}>
        <button type="submit">{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={resetForm}>Cancel</button>}
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>⭐ {p.rating}</td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    <button onClick={() => handleDelete(p._id)}>Delete</button>
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
        onSelect={handleAddImage}
      />
    </div>
  );
}
