import SectionEditor from './SectionEditor';

function HeroSectionForm({ data, setData }) {
  const hero = data || {};

  const updateHero = (key, value) => {
    setData({ ...hero, [key]: value });
  };

  const updateSlide = (index, key, value) => {
    const slides = hero.slides || [];
    const updated = [...slides];
    updated[index] = { ...updated[index], [key]: value };
    setData({ ...hero, slides: updated });
  };

  const addSlide = () => {
    setData({
      ...hero,
      slides: [...(hero.slides || []), { key: `slide-${Date.now()}`, image: '' }],
    });
  };

  const removeSlide = (index) => {
    setData({ ...hero, slides: (hero.slides || []).filter((_, i) => i !== index) });
  };

  const updateButton = (btnKey, fieldKey, value) => {
    setData({
      ...hero,
      [btnKey]: { ...(hero[btnKey] || {}), [fieldKey]: value },
    });
  };

  return (
    <div className="homepage-admin-section">
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

      <div className="homepage-admin-section">
        <h3>Banner Slides</h3>
        {(hero.slides || []).map((slide, index) => (
          <div key={slide.key || index} className="admin-form">
            <label>
              <span>Image URL</span>
              <input
                value={slide.image || ''}
                onChange={(e) => updateSlide(index, 'image', e.target.value)}
                placeholder="/images/slide1.jpg"
              />
            </label>
            <button type="button" onClick={() => removeSlide(index)} className="danger">
              Remove Slide
            </button>
          </div>
        ))}
        <button type="button" onClick={addSlide} style={{ marginTop: '1rem' }}>
          + Add Banner Slide
        </button>
      </div>

      <div className="homepage-admin-section">
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

      <div className="homepage-admin-section">
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
    </div>
  );
}

function CategoriesSectionForm({ data, setData }) {
  const section = data || {};
  const categories = section.categories || [];

  const updateCategory = (index, key, value) => {
    const updated = [...categories];
    updated[index] = { ...updated[index], [key]: value };
    setData({ ...section, categories: updated });
  };

  const addCategory = () => {
    setData({ ...section, categories: [...categories, { name: '', image: '' }] });
  };

  const removeCategory = (index) => {
    setData({ ...section, categories: categories.filter((_, i) => i !== index) });
  };

  return (
    <div className="homepage-admin-section">
      {(categories || []).map((cat, index) => (
        <div key={index} className="admin-form">
          <label>
            <span>Name</span>
            <input
              value={cat.name || ''}
              onChange={(e) => updateCategory(index, 'name', e.target.value)}
              placeholder="Category name"
            />
          </label>
          <label>
            <span>Image URL</span>
            <input
              value={cat.image || ''}
              onChange={(e) => updateCategory(index, 'image', e.target.value)}
              placeholder="/images/category.jpg"
            />
          </label>
          <button type="button" onClick={() => removeCategory(index)} className="danger">
            Remove Category
          </button>
        </div>
      ))}
      <button type="button" onClick={addCategory} style={{ marginTop: '1rem' }}>
        + Add Category
      </button>
    </div>
  );
}

export default function Homepage() {
  return (
    <div className="admin-homepage-shell">
      <h1>Homepage Section Editor</h1>
      <SectionEditor sectionKey="hero" title="Hero Section">
        {(data, setData) => <HeroSectionForm data={data} setData={setData} />}
      </SectionEditor>
      <SectionEditor sectionKey="categories" title="Homepage Categories">
        {(data, setData) => <CategoriesSectionForm data={data} setData={setData} />}
      </SectionEditor>
      <SectionEditor sectionKey="footer" title="Footer Section">
        {(data, setData) => (
          <div className="homepage-admin-section admin-form">
            <label>
              <span>Tagline</span>
              <input
                value={data?.tagline || ''}
                onChange={(e) => setData({ ...data, tagline: e.target.value })}
                placeholder="Footer tagline"
              />
            </label>
            <label>
              <span>Copyright Text</span>
              <input
                value={data?.copyright || ''}
                onChange={(e) => setData({ ...data, copyright: e.target.value })}
                placeholder="© 2026 Your Company"
              />
            </label>
          </div>
        )}
      </SectionEditor>
    </div>
  );
}
