import { useState } from 'react';
import SectionEditor from '../../components/admin/SectionEditor';

function NavigationEditorForm({ data, setData }) {
  const links = data?.links || [];

  const updateLink = (index, key, value) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [key]: value };
    setData({ ...data, links: newLinks });
  };

  const addLink = () => {
    setData({
      ...data,
      links: [...links, { label: '', href: '', target: '_self' }],
    });
  };

  const removeLink = (index) => {
    setData({
      ...data,
      links: links.filter((_, i) => i !== index),
    });
  };

  const moveLink = (index, direction) => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === links.length - 1)) {
      return;
    }

    const newLinks = [...links];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newLinks[index], newLinks[swapIndex]] = [newLinks[swapIndex], newLinks[index]];
    setData({ ...data, links: newLinks });
  };

  return (
    <div>
      <p className="help-text">Edit navigation links. Use section IDs (e.g., #products), /cart, /my-account, etc.</p>
      {links.map((link, i) => (
        <div key={i} className="admin-form" style={{ alignItems: 'flex-end' }}>
          <label>
            <span>Label</span>
            <input
              value={link.label || ''}
              onChange={(e) => updateLink(i, 'label', e.target.value)}
              placeholder="Menu label"
            />
          </label>
          <label>
            <span>URL / Link</span>
            <input
              value={link.href || ''}
              onChange={(e) => updateLink(i, 'href', e.target.value)}
              placeholder="e.g., #products, /cart"
            />
          </label>
          <label>
            <span>Target</span>
            <select value={link.target || '_self'} onChange={(e) => updateLink(i, 'target', e.target.value)}>
              <option value="_self">Same Tab</option>
              <option value="_blank">New Tab</option>
            </select>
          </label>
          <div className="table-actions">
            <button type="button" onClick={() => moveLink(i, 'up')} disabled={i === 0}>
              ⬆
            </button>
            <button type="button" onClick={() => moveLink(i, 'down')} disabled={i === links.length - 1}>
              ⬇
            </button>
            <button type="button" onClick={() => removeLink(i)} className="danger">
              Delete
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addLink} style={{ marginTop: '1rem' }}>
        + Add Navigation Link
      </button>
    </div>
  );
}

export default function NavigationEditor() {
  return (
    <div>
      <h1>Navigation Editor</h1>
      <SectionEditor sectionKey="navigation" title="Navbar Links">
        {(data, setData) => <NavigationEditorForm data={data} setData={setData} />}
      </SectionEditor>
    </div>
  );
}
