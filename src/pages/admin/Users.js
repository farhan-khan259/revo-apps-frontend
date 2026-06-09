import { useEffect, useState } from 'react';
import api from '../../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data.users || []);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdating(userId);
      await api.put(`/admin/users/${userId}`, { role: newRole });
      const updated = users.map((u) =>
        u._id === userId ? { ...u, role: newRole } : u
      );
      setUsers(updated);
    } catch (err) {
      setError('Failed to update user role');
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Delete user? This action cannot be undone.')) {
      try {
        await api.delete(`/admin/users/${userId}`);
        setUsers(users.filter((u) => u._id !== userId));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.name || 'N/A'}</td>
                <td>
                  <select
                    value={user.role || 'customer'}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    disabled={updating === user._id}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => handleDelete(user._id)} className="danger">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
