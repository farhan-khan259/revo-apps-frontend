import { useEffect, useState } from 'react';
import api from '../../api';

export default function CancelledOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCancelled = async () => {
      try {
        const { data } = await api.get('/orders?status=cancelled');
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load cancelled orders.');
      }
    };
    fetchCancelled();
  }, []);

  return (
    <div>
      <h1>Cancelled Orders</h1>
      {error && <p className="admin-error">{error}</p>}
      {orders.length === 0 ? (
        <p>No cancelled orders.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Cancelled Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>#{order.orderNumber || order._id.slice(-6)}</td>
                <td>{order.customer?.email || order.email}</td>
                <td>{order.total}</td>
                <td>{order.cancelledAt ? new Date(order.cancelledAt).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
