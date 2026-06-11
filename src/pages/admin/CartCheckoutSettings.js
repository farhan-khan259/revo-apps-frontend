import SectionEditor from '../../components/admin/SectionEditor';

function CartCheckoutSettingsForm({ data, setData }) {
  const settings = data || {};

  const updateSetting = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const updateShipping = (index, key, value) => {
    const shipping = settings.shippingOptions || [];
    const newShipping = [...shipping];
    newShipping[index] = { ...newShipping[index], [key]: value };
    updateSetting('shippingOptions', newShipping);
  };

  const addShipping = () => {
    updateSetting('shippingOptions', [
      ...(settings.shippingOptions || []),
      { name: '', cost: '', isFree: false },
    ]);
  };

  const removeShipping = (index) => {
    updateSetting(
      'shippingOptions',
      settings.shippingOptions?.filter((_, i) => i !== index) || []
    );
  };

  const updatePaymentMethod = (index, key, value) => {
    const methods = settings.paymentMethods || [];
    const newMethods = [...methods];
    newMethods[index] = { ...newMethods[index], [key]: value };
    updateSetting('paymentMethods', newMethods);
  };

  const addPaymentMethod = () => {
    updateSetting('paymentMethods', [
      ...(settings.paymentMethods || []),
      { name: '', code: '', description: '' },
    ]);
  };

  const removePaymentMethod = (index) => {
    updateSetting(
      'paymentMethods',
      settings.paymentMethods?.filter((_, i) => i !== index) || []
    );
  };

  const updateCoupon = (index, key, value) => {
    const coupons = settings.coupons || [];
    const newCoupons = [...coupons];
    newCoupons[index] = { ...newCoupons[index], [key]: value };
    updateSetting('coupons', newCoupons);
  };

  const addCoupon = () => {
    updateSetting('coupons', [
      ...(settings.coupons || []),
      { code: '', discountPercent: '', expiresAt: '', maxUses: '' },
    ]);
  };

  const removeCoupon = (index) => {
    updateSetting('coupons', settings.coupons?.filter((_, i) => i !== index) || []);
  };

  const updateCheckoutField = (index, key, value) => {
    const fields = settings.checkoutFields || [];
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [key]: value };
    updateSetting('checkoutFields', newFields);
  };

  const toggleFieldRequired = (index) => {
    const fields = settings.checkoutFields || [];
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], required: !newFields[index].required };
    updateSetting('checkoutFields', newFields);
  };

  const addCheckoutField = () => {
    updateSetting('checkoutFields', [
      ...(settings.checkoutFields || []),
      { name: '', label: '', required: true, type: 'text', options: [] },
    ]);
  };

  const removeCheckoutField = (index) => {
    updateSetting(
      'checkoutFields',
      settings.checkoutFields?.filter((_, i) => i !== index) || []
    );
  };

  return (
    <div>
      <div className="admin-form">
        <label>
          <span>Minimum Order Amount</span>
          <input
            type="number"
            value={settings.minimumOrderAmount || ''}
            onChange={(e) => updateSetting('minimumOrderAmount', parseFloat(e.target.value))}
            placeholder="0.00"
            step="0.01"
          />
        </label>
        <label>
          <span>Tax Rate (%)</span>
          <input
            type="number"
            value={settings.taxRate || ''}
            onChange={(e) => updateSetting('taxRate', parseFloat(e.target.value))}
            placeholder="0"
            step="0.1"
          />
        </label>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Shipping Options</h3>
        {(settings.shippingOptions || []).map((option, i) => (
          <div key={i} className="admin-form">
            <label>
              <span>Name</span>
              <input
                value={option.name || ''}
                onChange={(e) => updateShipping(i, 'name', e.target.value)}
                placeholder="e.g., Standard Shipping"
              />
            </label>
            <label>
              <span>Cost</span>
              <input
                type="number"
                value={option.cost || ''}
                onChange={(e) => updateShipping(i, 'cost', e.target.value)}
                placeholder="0.00"
                step="0.01"
                disabled={option.isFree}
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={option.isFree || false}
                onChange={(e) => updateShipping(i, 'isFree', e.target.checked)}
              />
              <span>Free Shipping</span>
            </label>
            <button type="button" onClick={() => removeShipping(i)} className="danger">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addShipping} style={{ marginTop: '0.5rem' }}>
          + Add Shipping Option
        </button>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Payment Methods</h3>
        {(settings.paymentMethods || []).map((method, i) => (
          <div key={i} className="admin-form">
            <label>
              <span>Name</span>
              <input
                value={method.name || ''}
                onChange={(e) => updatePaymentMethod(i, 'name', e.target.value)}
                placeholder="e.g., Credit Card"
              />
            </label>
            <label>
              <span>Code</span>
              <input
                value={method.code || ''}
                onChange={(e) => updatePaymentMethod(i, 'code', e.target.value)}
                placeholder="e.g., CC, PAYPAL"
              />
            </label>
            <label style={{ gridColumn: '1 / -1' }}>
              <span>Description</span>
              <input
                value={method.description || ''}
                onChange={(e) => updatePaymentMethod(i, 'description', e.target.value)}
                placeholder="Method description"
              />
            </label>
            <button type="button" onClick={() => removePaymentMethod(i)} className="danger">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addPaymentMethod} style={{ marginTop: '0.5rem' }}>
          + Add Payment Method
        </button>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Coupons</h3>
        {(settings.coupons || []).map((coupon, i) => (
          <div key={i} className="admin-form">
            <label>
              <span>Code</span>
              <input
                value={coupon.code || ''}
                onChange={(e) => updateCoupon(i, 'code', e.target.value)}
                placeholder="e.g., SAVE10"
              />
            </label>
            <label>
              <span>Discount %</span>
              <input
                type="number"
                value={coupon.discountPercent || ''}
                onChange={(e) => updateCoupon(i, 'discountPercent', e.target.value)}
                placeholder="0"
              />
            </label>
            <label>
              <span>Expires At</span>
              <input
                type="date"
                value={coupon.expiresAt || ''}
                onChange={(e) => updateCoupon(i, 'expiresAt', e.target.value)}
              />
            </label>
            <label>
              <span>Max Uses</span>
              <input
                type="number"
                value={coupon.maxUses || ''}
                onChange={(e) => updateCoupon(i, 'maxUses', e.target.value)}
                placeholder="Unlimited"
              />
            </label>
            <button type="button" onClick={() => removeCoupon(i)} className="danger">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addCoupon} style={{ marginTop: '0.5rem' }}>
          + Add Coupon
        </button>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Checkout Fields</h3>
        {(settings.checkoutFields || []).map((field, i) => (
          <div key={i} className="admin-form">
            <label>
              <span>Field Name</span>
              <input
                value={field.name || ''}
                onChange={(e) => updateCheckoutField(i, 'name', e.target.value)}
                placeholder="e.g., firstName"
              />
            </label>
            <label>
              <span>Label</span>
              <input
                value={field.label || ''}
                onChange={(e) => updateCheckoutField(i, 'label', e.target.value)}
                placeholder="e.g., First Name"
              />
            </label>
            <label>
              <span>Type</span>
              <select
                value={field.type || 'text'}
                onChange={(e) => updateCheckoutField(i, 'type', e.target.value)}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="tel">Phone</option>
                <option value="select">Select</option>
              </select>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={field.required || false}
                onChange={() => toggleFieldRequired(i)}
              />
              <span>Required</span>
            </label>
            <button type="button" onClick={() => removeCheckoutField(i)} className="danger">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addCheckoutField} style={{ marginTop: '0.5rem' }}>
          + Add Checkout Field
        </button>
      </div>
    </div>
  );
}

export default function CartCheckoutSettings() {
  return (
    <div>
      <h1>Cart & Checkout Settings</h1>
      <SectionEditor sectionKey="cartSettings" title="Shopping Cart & Checkout Configuration">
        {(data, setData) => <CartCheckoutSettingsForm data={data} setData={setData} />}
      </SectionEditor>
    </div>
  );
}
