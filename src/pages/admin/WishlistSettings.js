import { useState } from 'react';
import SectionEditor from '../../components/admin/SectionEditor';
import ImagePicker from '../../components/admin/ImagePicker';

function WishlistSettingsForm({ data, setData }) {
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const wishlist = data || {};

  const updateSetting = (key, value) => {
    setData({ ...data, [key]: value });
  };

  return (
    <div>
      <div className="admin-form">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={wishlist.enableGuestWishlist || false}
            onChange={(e) => updateSetting('enableGuestWishlist', e.target.checked)}
          />
          <span>Enable Guest Wishlist</span>
        </label>
        <label>
          <span>Max Items</span>
          <input
            type="number"
            value={wishlist.maxItems || ''}
            onChange={(e) => updateSetting('maxItems', parseInt(e.target.value))}
            placeholder="Unlimited if empty"
            min="1"
          />
        </label>
      </div>

      <div className="admin-form">
        <label style={{ gridColumn: '1 / -1' }}>
          <span>Empty State Message</span>
          <textarea
            value={wishlist.emptyStateMessage || ''}
            onChange={(e) => updateSetting('emptyStateMessage', e.target.value)}
            placeholder="Message to display when wishlist is empty"
            rows="3"
          />
        </label>
      </div>

      <div className="admin-form">
        <label style={{ gridColumn: '1 / -1' }}>
          <span>Empty State Image</span>
          <div className="image-input-group">
            {wishlist.emptyStateImage && (
              <img src={wishlist.emptyStateImage} alt="empty state" style={{ maxWidth: '150px' }} />
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

      <ImagePicker
        isOpen={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={(url) => {
          updateSetting('emptyStateImage', url);
          setImagePickerOpen(false);
        }}
      />
    </div>
  );
}

export default function WishlistSettings() {
  return (
    <div>
      <h1>Wishlist Settings</h1>
      <SectionEditor sectionKey="wishlist" title="Wishlist Configuration">
        {(data, setData) => <WishlistSettingsForm data={data} setData={setData} />}
      </SectionEditor>
    </div>
  );
}
