import { useEffect, useState } from 'react';
import api from '../../api';

export default function Reels() {
  const [reels, setReels] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    category: '',
    thumbnail: '',
    duration: '',
    views: '',
    description: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      const { data } = await api.get('/reels');
      setReels(data.reels || data || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Unable to load reels.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/admin/reels/${editing}`, form);
      } else {
        await api.post('/admin/reels', form);
      }
      await fetchReels();
      resetForm();
      setError('');
    } catch (err) {
      console.error(err);
      setError('Unable to save reel.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this reel?')) {
      try {
        await api.delete(`/admin/reels/${id}`);
        fetchReels();
        setError('');
      } catch (err) {
        console.error(err);
        setError('Unable to delete reel.');
      }
    }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ title: '', category: '', thumbnail: '', duration: '', views: '', description: '' });
  };

  return (
    <div>
      <h1>Reels (Short Videos)</h1>
      {error && <p className="admin-error">{error}</p>}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Category (e.g., Fashion, Tech)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
          required
        />
        <input
          placeholder="Duration (e.g., 0:18)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
        <input
          placeholder="Views (e.g., 12.4K)"
          value={form.views}
          onChange={(e) => setForm({ ...form, views: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows="2"
        />
        <button type="submit">{editing ? 'Update Reel' : 'Add Reel'}</button>
        {editing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Duration</th>
            <th>Views</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reels.map((reel) => (
            <tr key={reel._id}>
              <td>{reel.title}</td>
              <td>{reel.category}</td>
              <td>{reel.duration}</td>
              <td>{reel.views}</td>
              <td>
                <button onClick={() => { setEditing(reel._id); setForm(reel); }}>Edit</button>
                <button onClick={() => handleDelete(reel._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}