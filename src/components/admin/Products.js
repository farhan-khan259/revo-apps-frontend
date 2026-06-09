import { useEffect, useState } from 'react';
import api from '../../api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', oldPrice: '', image: '', discount: '', rating: '', sold: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setError('Unable to load products.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/admin/products/${editing}`, form);
      } else {
        await api.post('/products', form);
      }
      await fetchProducts();
      setEditing(null);
      setForm({ name: '', price: '', oldPrice: '', image: '', discount: '', rating: '', sold: '' });
    } catch (err) {
      console.error(err);
      setError('Unable to save product.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete product?')) {
      await api.delete(`/admin/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input placeholder="Old Price" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />
        <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <input placeholder="Discount" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
        <input placeholder="Rating" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
        <input placeholder="Sold" value={form.sold} onChange={(e) => setForm({ ...form, sold: e.target.value })} />
        <button type="submit">{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({}); }}>Cancel</button>}
      </form>

      <table className="admin-table">
        <thead><tr><th>Name</th><th>Price</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => { setEditing(p._id); setForm(p); }}>Edit</button>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}