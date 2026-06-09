import { useState } from 'react';
import SectionEditor from '../../components/admin/SectionEditor';

function OrderWorkflowForm({ data, setData }) {
  const workflow = data || {};
  const statuses = workflow.statuses || [];

  const updateStatus = (index, key, value) => {
    const newStatuses = [...statuses];
    newStatuses[index] = { ...newStatuses[index], [key]: value };
    setData({ ...data, statuses: newStatuses });
  };

  const updateTemplate = (index, key, value) => {
    const newStatuses = [...statuses];
    newStatuses[index] = {
      ...newStatuses[index],
      emailTemplate: { ...newStatuses[index]?.emailTemplate, [key]: value },
    };
    setData({ ...data, statuses: newStatuses });
  };

  const addStatus = () => {
    const newStatus = {
      id: `status_${Date.now()}`,
      displayName: '',
      color: '#000000',
      emailTemplate: { subject: '', body: '' },
    };
    setData({ ...data, statuses: [...statuses, newStatus] });
  };

  const removeStatus = (index) => {
    setData({ ...data, statuses: statuses.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <p className="help-text">
        Configure order statuses and email templates. Use placeholders: {'{'}
        {'{orderId}}'}, {'{customerName}}'}, {'{customerEmail}}'}, {'{customerPhone}'}, {'{shippingAddress}}'}, {'{total}'}.
      </p>

      {statuses.map((status, i) => (
        <div key={i} style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
          <div className="admin-form">
            <label>
              <span>Display Name</span>
              <input
                value={status.displayName || ''}
                onChange={(e) => updateStatus(i, 'displayName', e.target.value)}
                placeholder="e.g., Pending, Processing"
              />
            </label>
            <label>
              <span>Color</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={status.color || '#000000'}
                  onChange={(e) => updateStatus(i, 'color', e.target.value)}
                  style={{ width: '60px', height: '40px', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={status.color || '#000000'}
                  onChange={(e) => updateStatus(i, 'color', e.target.value)}
                />
              </div>
            </label>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <h4>Email Template</h4>
            <div className="admin-form">
              <label style={{ gridColumn: '1 / -1' }}>
                <span>Subject</span>
                <input
                  value={status.emailTemplate?.subject || ''}
                  onChange={(e) => updateTemplate(i, 'subject', e.target.value)}
                  placeholder="Order {orderId} is now {displayName}"
                />
              </label>
              <label style={{ gridColumn: '1 / -1' }}>
                <span>Body</span>
                <textarea
                  value={status.emailTemplate?.body || ''}
                  onChange={(e) => updateTemplate(i, 'body', e.target.value)}
                  placeholder="Dear {customerName},\n\nYour order {orderId} is {displayName}..."
                  rows="5"
                />
              </label>
            </div>
          </div>

          <button type="button" onClick={() => removeStatus(i)} className="danger" style={{ marginTop: '1rem' }}>
            Remove Status
          </button>
        </div>
      ))}

      <button type="button" onClick={addStatus} style={{ marginTop: '1rem' }}>
        + Add Order Status
      </button>
    </div>
  );
}

export default function OrderWorkflow() {
  return (
    <div>
      <h1>Order Workflow</h1>
      <SectionEditor sectionKey="orderWorkflow" title="Order Status Management">
        {(data, setData) => <OrderWorkflowForm data={data} setData={setData} />}
      </SectionEditor>
    </div>
  );
}
