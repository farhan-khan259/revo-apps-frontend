import { useState } from 'react';
import SectionEditor from '../../components/admin/SectionEditor';
import ImagePicker from '../../components/admin/ImagePicker';

function HeroEditorForm({ data, setData }) {
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const hero = data || {};

  const updateHero = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const updateButton = (btnKey, fieldKey, value) => {
    setData({
      ...data,
      [btnKey]: { ...(data[btnKey] || {}), [fieldKey]: value },
    });
  };

  const updateStats = (index, key, value) => {
    const stats = data?.stats || [];
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [key]: value };
    updateHero('stats', newStats);
  };

  const addStat = () => {
    updateHero('stats', [...(data?.stats || []), { value: '', label: '' }]);
  };

  const removeStat = (index) => {
    updateHero('stats', data?.stats?.filter((_, i) => i !== index) || []);
  };

  return (
    <div>
      <div className="admin-form">
        <label>
          <span>Badge</span>
          <input
            value={hero.badge || ''}
            onChange={(e) => updateHero('badge', e.target.value)}
            placeholder="e.g., Summer Sale"
          />
        </label>
        <label>
          <span>Heading</span>
          <input
            value={hero.heading || ''}
            onChange={(e) => updateHero('heading', e.target.value)}
            placeholder="Main hero title"
          />
        </label>
        <label>
          <span>Subheading</span>
          <input
            value={hero.subheading || ''}
            onChange={(e) => updateHero('subheading', e.target.value)}
            placeholder="Hero subtitle"
          />
        </label>
      </div>

      <div className="admin-form" style={{ gridColumn: '1 / -1' }}>
        <label>
          <span>Background Image</span>
          <div className="image-input-group">
            {hero.backgroundImage && (
              <img src={hero.backgroundImage} alt="hero" style={{ maxWidth: '200px', maxHeight: '150px' }} />
            )}
            <button
              type="button"
              onClick={() => setImagePickerOpen(true)}
            >
              Select Image
            </button>
          </div>
        </label>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Primary Button</h3>
        <div className="admin-form">
          <label>
            <span>Text</span>
            <input
              value={hero.primaryButton?.text || ''}
              onChange={(e) => updateButton('primaryButton', 'text', e.target.value)}
              placeholder="Button label"
            />
          </label>
          <label>
            <span>Link</span>
            <input
              value={hero.primaryButton?.link || ''}
              onChange={(e) => updateButton('primaryButton', 'link', e.target.value)}
              placeholder="e.g., #products, /cart"
            />
          </label>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Secondary Button</h3>
        <div className="admin-form">
          <label>
            <span>Text</span>
            <input
              value={hero.secondaryButton?.text || ''}
              onChange={(e) => updateButton('secondaryButton', 'text', e.target.value)}
              placeholder="Button label"
            />
          </label>
          <label>
            <span>Link</span>
            <input
              value={hero.secondaryButton?.link || ''}
              onChange={(e) => updateButton('secondaryButton', 'link', e.target.value)}
              placeholder="e.g., #about"
            />
          </label>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Hero Stats</h3>
        {(hero.stats || []).map((stat, i) => (
          <div key={i} className="admin-form">
            <label>
              <span>Value</span>
              <input
                value={stat.value || ''}
                onChange={(e) => updateStats(i, 'value', e.target.value)}
                placeholder="e.g., 1M+"
              />
            </label>
            <label>
              <span>Label</span>
              <input
                value={stat.label || ''}
                onChange={(e) => updateStats(i, 'label', e.target.value)}
                placeholder="e.g., Customers"
              />
            </label>
            <button type="button" onClick={() => removeStat(i)} className="danger">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addStat} style={{ marginTop: '1rem' }}>
          + Add Stat
        </button>
      </div>

      <ImagePicker
        isOpen={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={(url) => {
          updateHero('backgroundImage', url);
          setImagePickerOpen(false);
        }}
      />
    </div>
  );
}

export default function HeroEditor() {
  return (
    <div>
      <h1>Hero Section Editor</h1>
      <SectionEditor sectionKey="hero" title="Hero Section">
        {(data, setData) => <HeroEditorForm data={data} setData={setData} />}
      </SectionEditor>
    </div>
  );
}
