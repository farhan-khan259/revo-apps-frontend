import { useEffect, useState } from 'react';
import api from '../../api';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', image: '' });
  const [error, setError] = useState('');

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (err) {
      console.error(err);
      setError('Unable to load categories.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/categories', form);
      fetchCategories();
      setForm({ name: '', image: '' });
      setError('');
    } catch (err) {
      console.error(err);
      setError('Unable to save category.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete category?')) {
      try {
        await api.delete(`/admin/categories/${id}`);
        fetchCategories();
      } catch (err) {
        console.error(err);
        setError('Unable to delete category.');
      }
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      {error && <p className="admin-error">{error}</p>}
      <form className="admin-form">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <button onClick={handleSubmit}>Add</button>
      </form>
      <ul>
        {categories.map(c => (
          <li key={c._id}>{c.name} <button onClick={() => handleDelete(c._id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
}