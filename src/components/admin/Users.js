import { useEffect, useState } from 'react';
import api from '../../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/admin/users');
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load users.');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Users</h1>
      {error && <p className="admin-error">{error}</p>}
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role || 'User'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
