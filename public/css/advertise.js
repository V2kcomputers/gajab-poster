/* Yojna Portal Advertisement Styles */
:root {
  --yp-primary: #1d4ed8;
  --yp-primary-hover: #1e40af;
  --yp-accent: #059669;
  --yp-bg: #f8fafc;
  --yp-card: #ffffff;
  --yp-text-main: #0f172a;
  --yp-text-muted: #475569;
  --yp-border: #e2e8f0;
  --yp-error: #dc2626;
  --yp-warning-bg: #eff6ff;
  --yp-radius: 10px;
}

.yp-ad-container {
  max-width: 900px;
  margin: 32px auto;
  padding: 0 16px;
  color: var(--yp-text-main);
  font-family: inherit;
}

.yp-ad-header {
  text-align: center;
  margin-bottom: 28px;
}

.yp-ad-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--yp-text-main);
  margin-bottom: 8px;
}

.yp-ad-header p {
  font-size: 16px;
  color: var(--yp-text-muted);
}

.yp-form-card {
  background: var(--yp-card);
  border-radius: var(--yp-radius);
  border: 1px solid var(--yp-border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  padding: 32px;
  margin-bottom: 36px;
}

/* Grid Layouts */
.yp-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.yp-grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 18px;
}

.yp-form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}

.yp-form-group label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--yp-text-main);
}

.yp-form-group label .required {
  color: var(--yp-error);
}

.yp-form-group input,
.yp-form-group select,
.yp-form-group textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--yp-border);
  border-radius: 6px;
  font-size: 14px;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.yp-form-group input:focus,
.yp-form-group select:focus,
.yp-form-group textarea:focus {
  outline: none;
  border-color: var(--yp-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.yp-form-group input.input-error,
.yp-form-group select.input-error,
.yp-form-group textarea.input-error {
  border-color: var(--yp-error);
}

.yp-error-msg {
  color: var(--yp-error);
  font-size: 12px;
  margin-top: 4px;
  min-height: 14px;
}

/* Spam Honeypot Hide */
.yp-hp-field {
  display: none !important;
  visibility: hidden;
}

/* Banner Notice */
.yp-notice-banner {
  background-color: var(--yp-warning-bg);
  border-left: 4px solid var(--yp-primary);
  padding: 14px 16px;
  border-radius: 6px;
  margin-bottom: 22px;
  font-size: 13.5px;
  color: #1e3a8a;
  line-height: 1.5;
}

.yp-notice-banner strong {
  display: block;
  margin-bottom: 3px;
  color: #172554;
}

/* Terms and Checkbox */
.yp-terms-group {
  margin-bottom: 24px;
}

.yp-checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}

.yp-checkbox-label input[type="checkbox"] {
  width: 17px;
  height: 17px;
  cursor: pointer;
}

.yp-checkbox-label a {
  color: var(--yp-primary);
  text-decoration: underline;
}

/* Submit Button */
.yp-submit-btn {
  width: 100%;
  background: var(--yp-primary);
  color: #ffffff;
  border: none;
  padding: 13px 20px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.05s ease;
}

.yp-submit-btn:hover {
  background: var(--yp-primary-hover);
}

.yp-submit-btn:active {
  transform: scale(0.99);
}

/* Policy Card */
.yp-policy-card {
  background: var(--yp-card);
  border-radius: var(--yp-radius);
  border: 1px solid var(--yp-border);
  padding: 28px 32px;
}

.yp-policy-card h2 {
  font-size: 20px;
  margin-bottom: 18px;
  color: var(--yp-text-main);
  border-bottom: 1px solid var(--yp-border);
  padding-bottom: 10px;
}

.yp-policy-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 20px;
}

.yp-policy-box h3 {
  font-size: 15px;
  margin-bottom: 10px;
}

.yp-policy-box.allowed h3 {
  color: var(--yp-accent);
}

.yp-policy-box.prohibited h3 {
  color: var(--yp-error);
}

.yp-policy-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.yp-policy-box ul li {
  font-size: 13px;
  color: var(--yp-text-muted);
  margin-bottom: 6px;
  padding-left: 18px;
  position: relative;
  line-height: 1.4;
}

.yp-policy-box.allowed ul li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--yp-accent);
  font-weight: bold;
}

.yp-policy-box.prohibited ul li::before {
  content: "✕";
  position: absolute;
  left: 0;
  color: var(--yp-error);
  font-weight: bold;
}

.yp-disclaimer {
  font-size: 12.5px;
  color: #64748b;
  line-height: 1.5;
  border-top: 1px solid #f1f5f9;
  padding-top: 12px;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .yp-grid-2,
  .yp-grid-3,
  .yp-policy-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .yp-form-card {
    padding: 20px 16px;
  }

  .yp-policy-card {
    padding: 20px 16px;
  }
}