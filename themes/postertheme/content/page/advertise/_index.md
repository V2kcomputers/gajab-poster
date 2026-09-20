---
title: "Advertise on Yojna Portal"
description: "अपने Business, Website, Software या Online Service को Yojna Portal की targeted audience तक पहुँचाएँ।"
draft: false
type: "pages"
layout: "advertise"
url: "/advertise"
---
<style>
    /**
 * Yojna Portal - Advertising Stylesheet
 * Responsive, Lightweight, Dark Mode Compatible
 */

:root {
  --yp-primary: #1a56db;
  --yp-primary-dark: #1e429f;
  --yp-primary-light: #e1effe;
  --yp-bg: #f8fafc;
  --yp-surface: #ffffff;
  --yp-card: #ffffff;
  --yp-text: #0f172a;
  --yp-text-muted: #64748b;
  --yp-border: #e2e8f0;
  --yp-success: #0e9f6e;
  --yp-success-bg: #def7ec;
  --yp-danger: #e02424;
  --yp-danger-bg: #fde8e8;
  --yp-warning: #d97706;
  --yp-radius: 12px;
  --yp-radius-sm: 6px;
  --yp-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  --yp-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
}

@media (prefers-color-scheme: dark) {
  :root {
    --yp-primary: #3f83f8;
    --yp-primary-dark: #1c64f2;
    --yp-primary-light: #1e293b;
    --yp-bg: #0b0f19;
    --yp-surface: #111827;
    --yp-card: #1f2937;
    --yp-text: #f9fafb;
    --yp-text-muted: #9ca3af;
    --yp-border: #374151;
    --yp-success: #31c48d;
    --yp-success-bg: #03543f;
    --yp-danger: #f98080;
    --yp-danger-bg: #771d1d;
  }
}

/* Base resets for components */
.yp-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.25rem;
}
.yp-container-narrow {
  max-width: 800px;
}
.text-center {
  text-align: center;
}

/* ==========================================================
   Top Banner Component
   ========================================================== */
.yp-ad-banner-wrapper {
  background-color: var(--yp-surface);
  border-bottom: 1px solid var(--yp-border);
  padding: 0.625rem 0;
  font-family: inherit;
}

.yp-ad-banner-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-decoration: none;
  color: var(--yp-text);
  padding: 0.5rem 1rem;
  background: var(--yp-primary-light);
  border-radius: var(--yp-radius-sm);
  border: 1px solid var(--yp-border);
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.yp-ad-banner-link:hover {
  border-color: var(--yp-primary);
}

.yp-ad-banner-badge .yp-ad-tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.45rem;
  background-color: var(--yp-primary);
  color: #ffffff;
  border-radius: 4px;
}

.yp-ad-banner-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.yp-ad-primary-text {
  font-weight: 600;
}

.yp-ad-separator {
  color: var(--yp-text-muted);
}

.yp-ad-secondary-text {
  color: var(--yp-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
}

.yp-btn-banner {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--yp-primary);
  border: 1px solid var(--yp-primary);
  padding: 0.3rem 0.75rem;
  border-radius: var(--yp-radius-sm);
  white-space: nowrap;
}

@media (max-width: 768px) {
  .yp-ad-separator, .yp-ad-secondary-text {
    display: none;
  }
  .yp-ad-banner-content {
    font-size: 0.8rem;
  }
}

/* ==========================================================
   Page Layout & Sections
   ========================================================== */
.yp-ad-page {
  background-color: var(--yp-bg);
  color: var(--yp-text);
  padding-bottom: 4rem;
}

.yp-hero-section {
  padding: 4rem 0 3rem;
  text-align: center;
  background: linear-gradient(180deg, var(--yp-primary-light) 0%, var(--yp-bg) 100%);
}

.yp-pill-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.35rem 0.85rem;
  background-color: var(--yp-primary);
  color: #ffffff;
  border-radius: 9999px;
  margin-bottom: 1.25rem;
}

.yp-hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1rem;
  line-height: 1.2;
}

.yp-hero-desc {
  font-size: 1.125rem;
  color: var(--yp-text-muted);
  max-width: 650px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.yp-section {
  padding: 3.5rem 0;
}

.yp-section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.yp-section-header h2 {
  font-size: 1.875rem;
  margin: 0 0 0.5rem;
  font-weight: 700;
}

.yp-section-header p {
  color: var(--yp-text-muted);
  font-size: 1rem;
}

/* Grid Layouts */
.yp-grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.yp-grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.yp-grid-5 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

/* Cards */
.yp-card {
  background-color: var(--yp-card);
  border: 1px solid var(--yp-border);
  border-radius: var(--yp-radius);
  padding: 1.75rem;
  box-shadow: var(--yp-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.yp-slot-card {
  display: flex;
  flex-direction: column;
  position: relative;
}

.yp-slot-badge {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--yp-primary);
  background: var(--yp-primary-light);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.yp-slot-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}

.yp-slot-desc {
  font-size: 0.875rem;
  color: var(--yp-text-muted);
  margin-bottom: 1.25rem;
  line-height: 1.5;
}

.yp-slot-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  flex: 1;
}

.yp-slot-features li {
  font-size: 0.875rem;
  padding: 0.4rem 0;
  border-bottom: 1px dashed var(--yp-border);
}

.yp-slot-features li:before {
  content: "✔ ";
  color: var(--yp-success);
  font-weight: bold;
}

.yp-slot-contact-note {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--yp-primary);
  display: block;
  text-align: center;
  background: var(--yp-primary-light);
  padding: 0.5rem;
  border-radius: var(--yp-radius-sm);
}

/* Process Boxes */
.yp-step-box {
  background: var(--yp-card);
  border: 1px solid var(--yp-border);
  border-radius: var(--yp-radius);
  padding: 1.25rem;
  text-align: center;
}

.yp-step-number {
  width: 36px;
  height: 36px;
  line-height: 36px;
  background-color: var(--yp-primary);
  color: #fff;
  border-radius: 50%;
  margin: 0 auto 0.75rem;
  font-weight: 700;
}

.yp-step-box h4 {
  margin: 0 0 0.35rem;
  font-size: 1rem;
}

.yp-step-box p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--yp-text-muted);
}

/* ==========================================================
   Form Component
   ========================================================== */
.yp-form-card {
  box-shadow: var(--yp-shadow-lg);
  padding: 2.5rem;
}

.yp-card-header {
  margin-bottom: 2rem;
  text-align: center;
}

.yp-card-header h2 {
  font-size: 1.75rem;
  margin: 0 0 0.5rem;
}

.yp-card-header p {
  color: var(--yp-text-muted);
  font-size: 0.9rem;
}

.yp-req {
  color: var(--yp-danger);
  font-weight: bold;
}

.yp-optional {
  color: var(--yp-text-muted);
  font-size: 0.8rem;
  font-weight: normal;
}

.yp-form-group {
  margin-bottom: 1.25rem;
}

.yp-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 640px) {
  .yp-form-row {
    grid-template-columns: 1fr;
  }
}

.yp-form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.yp-input, .yp-select, .yp-textarea, .yp-file-input {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--yp-border);
  background-color: var(--yp-surface);
  color: var(--yp-text);
  border-radius: var(--yp-radius-sm);
  font-size: 0.9rem;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.yp-input:focus, .yp-select:focus, .yp-textarea:focus {
  outline: none;
  border-color: var(--yp-primary);
  box-shadow: 0 0 0 3px var(--yp-primary-light);
}

.yp-field-error {
  display: block;
  color: var(--yp-danger);
  font-size: 0.775rem;
  margin-top: 0.35rem;
  min-height: 1rem;
}

.yp-input.is-invalid, .yp-select.is-invalid {
  border-color: var(--yp-danger);
}

.yp-form-checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  margin: 1.5rem 0 0.5rem;
}

.yp-checkbox {
  margin-top: 0.25rem;
}

.yp-checkbox-label {
  font-size: 0.825rem;
  color: var(--yp-text-muted);
  line-height: 1.4;
}

/* Alert Boxes */
.yp-alert {
  padding: 0.85rem 1rem;
  border-radius: var(--yp-radius-sm);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.yp-alert-danger {
  background-color: var(--yp-danger-bg);
  color: var(--yp-danger);
  border: 1px solid var(--yp-danger);
}

/* Buttons */
.yp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: var(--yp-radius-sm);
  cursor: pointer;
  text-decoration: none;
  border: none;
  transition: background-color 0.2s, opacity 0.2s;
}

.yp-btn-primary {
  background-color: var(--yp-primary);
  color: #ffffff;
}

.yp-btn-primary:hover {
  background-color: var(--yp-primary-dark);
}

.yp-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.yp-btn-secondary {
  background-color: var(--yp-text);
  color: var(--yp-surface);
}

.yp-btn-outline {
  border: 1px solid var(--yp-border);
  background: transparent;
  color: var(--yp-text);
}

.yp-btn-block {
  width: 100%;
}

.yp-btn-spinner {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: yp-spin 0.8s linear infinite;
}

@keyframes yp-spin {
  to { transform: rotate(360deg); }
}

/* Success Card */
.yp-success-card {
  text-align: center;
  padding: 2rem 1rem;
}

.yp-success-icon {
  width: 56px;
  height: 56px;
  line-height: 56px;
  background-color: var(--yp-success);
  color: #ffffff;
  font-size: 1.75rem;
  border-radius: 50%;
  margin: 0 auto 1.25rem;
}

.yp-success-title {
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
}

.yp-tracking-text {
  font-size: 1rem;
  margin-bottom: 1.25rem;
}

.yp-tracking-badge {
  background-color: var(--yp-primary-light);
  color: var(--yp-primary);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1.1rem;
}

.yp-success-message {
  background-color: var(--yp-surface);
  border: 1px solid var(--yp-border);
  border-radius: var(--yp-radius-sm);
  padding: 1rem;
  margin-bottom: 2rem;
  color: var(--yp-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

.yp-success-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Policies & Guidelines */
.yp-info-card, .yp-danger-card {
  font-size: 0.9rem;
  line-height: 1.6;
}

.yp-card-icon {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.yp-danger-card {
  border-color: var(--yp-danger);
}

.yp-prohibited-list {
  padding-left: 1.2rem;
  color: var(--yp-danger);
}

.yp-prohibited-list li {
  margin-bottom: 0.4rem;
}

.yp-terms-list {
  padding-left: 1.2rem;
  font-size: 0.85rem;
  color: var(--yp-text-muted);
  line-height: 1.6;
}

.yp-terms-list li {
  margin-bottom: 0.6rem;
}

.yp-contact-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.yp-contact-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: var(--yp-card);
  border: 1px solid var(--yp-border);
  border-radius: 9999px;
  text-decoration: none;
  color: var(--yp-text);
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: var(--yp-shadow);
}
    </style>