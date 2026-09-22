/**
 * Production-Ready Vanilla JS Affiliate Advertisement Engine
 * Zero dependencies. Secure DOM operations. Responsive & Dynamic.
 */
(function (root) {
  'use strict';

  // Configurable rotation timer in ms (0 = disabled, 15000 = 15 seconds)
  const ROTATE_INTERVAL = 15000;
  const DATA_ENDPOINT = 'https://poster.yojnaportal.com/affiliate.json';

  let rawAdsCache = null;
  let fetchPromise = null;
  const activeRotations = new WeakMap();

  /**
   * Normalizes banner zone identifiers and handles common typos
   */
  function normalizeZone(zone) {
    if (!zone || typeof zone !== 'string') return '';
    const clean = zone.trim().toLowerCase();
    if (clean === 'resposive') return 'responsive';
    return clean;
  }

  /**
   * Safe URL protocol validation (XSS defense)
   */
  function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '#';
    const trimmed = url.trim();
    if (/^(https?:|\/\/)/i.test(trimmed)) {
      return trimmed;
    }
    return '#';
  }

  /**
   * Fetches JSON payload once and caches in memory
   */
  function fetchAdsData() {
    if (rawAdsCache) {
      return Promise.resolve(rawAdsCache);
    }
    if (fetchPromise) {
      return fetchPromise;
    }

    fetchPromise = fetch(DATA_ENDPOINT, { cache: 'default' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.ads)) {
          rawAdsCache = data.ads;
        } else {
          rawAdsCache = [];
        }
        return rawAdsCache;
      })
      .catch((err) => {
        console.warn('[AffiliateAds] Failed to load ads data:', err);
        rawAdsCache = [];
        return rawAdsCache;
      });

    return fetchPromise;
  }

  /**
   * Core Zone-Specific Priority Selection:
   * 1. Matches bannerSize === zone
   * 2. If one or more active === true exist: returns only active: true ads
   * 3. If zero active === true exist: returns active: false fallback ads
   * active: false is NEVER treated as a global disable.
   */
  function getEligibleAds(zone, adsList) {
    const normTarget = normalizeZone(zone);
    if (!normTarget) return [];

    const matchingAds = adsList.filter((ad) => {
      return normalizeZone(ad.bannerSize) === normTarget;
    });

    const activeAds = matchingAds.filter((ad) => ad.active === true);
    if (activeAds.length > 0) {
      return activeAds;
    }

    return matchingAds.filter((ad) => ad.active === false);
  }

  /**
   * Random integer generator within [0, max - 1]
   */
  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  /**
   * Applies aspect-ratio or dimensional constraints for fixed sizes (e.g. 900x300, 300x250)
   */
  function applySizeConstraints(slotEl, normalizedZone) {
    if (normalizedZone === 'responsive') {
      slotEl.style.aspectRatio = '';
      slotEl.style.maxWidth = '100%';
      return;
    }

    const match = normalizedZone.match(/^(\d+)x(\d+)$/);
    if (match) {
      const width = parseInt(match[1], 10);
      const height = parseInt(match[2], 10);
      if (width > 0 && height > 0) {
        slotEl.style.maxWidth = width + 'px';
        slotEl.style.aspectRatio = width + ' / ' + height;
      }
    }
  }

  /**
   * Safe DOM node generator for an advertisement
   */
  function createAdElement(ad) {
    const adArticle = document.createElement('article');
    adArticle.className = 'yp-affiliate-ad';

    const anchor = document.createElement('a');
    anchor.className = 'yp-affiliate-link';
    anchor.href = sanitizeUrl(ad.website);
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer nofollow sponsored';
    anchor.setAttribute('role', 'group');

    const cleanTitle = (ad.title || '').trim();
    const cleanDesc = (ad.description || '').trim();
    const cleanBtn = (ad.button || '').trim();
    const imgWidth = (ad.imageWidth || 'auto').trim().toLowerCase();

    // Accessible ARIA label
    const accessibleLabel = [cleanTitle, cleanDesc].filter(Boolean).join(' - ') || 'Advertisement';
    anchor.setAttribute('aria-label', accessibleLabel);

    // Image container & element
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'yp-affiliate-image-wrap';

    const img = document.createElement('img');
    img.className = 'yp-affiliate-image';
    img.src = sanitizeUrl(ad.imageBanner);
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = accessibleLabel;

    imgWrapper.appendChild(img);

    // Check if 100% image-only banner
    const isImageOnly = imgWidth === '100%';

    // Handle image load error securely
    img.addEventListener('error', function () {
      if (isImageOnly) {
        adArticle.style.display = 'none';
      } else {
        imgWrapper.style.display = 'none';
        if (contentWrapper) {
          contentWrapper.style.width = '100%';
          contentWrapper.style.flex = '1 1 100%';
        }
      }
    });

    let contentWrapper = null;

    if (isImageOnly) {
      adArticle.classList.add('yp-mode-image-only');
      anchor.appendChild(imgWrapper);
    } else {
      contentWrapper = document.createElement('div');
      contentWrapper.className = 'yp-affiliate-content';

      if (cleanTitle) {
        const titleEl = document.createElement('div');
        titleEl.className = 'yp-affiliate-title';
        titleEl.textContent = cleanTitle;
        contentWrapper.appendChild(titleEl);
      }

      if (cleanDesc) {
        const descEl = document.createElement('div');
        descEl.className = 'yp-affiliate-description';
        descEl.textContent = cleanDesc;
        contentWrapper.appendChild(descEl);
      }

      if (cleanBtn) {
        const btnEl = document.createElement('span');
        btnEl.className = 'yp-affiliate-button';
        btnEl.textContent = cleanBtn;
        contentWrapper.appendChild(btnEl);
      }

      // Configure widths according to imageWidth rules
      switch (imgWidth) {
        case '75%':
          adArticle.classList.add('yp-layout-split');
          imgWrapper.style.flex = '0 0 75%';
          contentWrapper.style.flex = '0 0 25%';
          break;
        case '50%':
          adArticle.classList.add('yp-layout-split');
          imgWrapper.style.flex = '0 0 50%';
          contentWrapper.style.flex = '0 0 50%';
          break;
        case '30%':
          adArticle.classList.add('yp-layout-split');
          imgWrapper.style.flex = '0 0 30%';
          contentWrapper.style.flex = '0 0 70%';
          break;
        case 'auto':
        default:
          adArticle.classList.add('yp-layout-auto');
          // Wait for image dimensions to dynamically determine orientation
          img.addEventListener('load', function () {
            const w = img.naturalWidth || 1;
            const h = img.naturalHeight || 1;
            if (h > w) {
              adArticle.classList.add('yp-img-portrait');
            } else if (w > h) {
              adArticle.classList.add('yp-img-landscape');
            } else {
              adArticle.classList.add('yp-img-square');
            }
          });
          break;
      }

      anchor.appendChild(imgWrapper);
      anchor.appendChild(contentWrapper);
    }

    adArticle.appendChild(anchor);
    return adArticle;
  }

  /**
   * Renders a specific ad into a designated slot
   */
  function renderAdIntoSlot(slotEl, ad, normalizedZone) {
    slotEl.innerHTML = '';
    applySizeConstraints(slotEl, normalizedZone);
    const adNode = createAdElement(ad);
    slotEl.appendChild(adNode);
    slotEl._currentAd = ad;
  }

  /**
   * Attaches rotation interval to an ad slot
   */
  function setupSlotRotation(slotEl, zone, allAds) {
    if (activeRotations.has(slotEl)) {
      clearInterval(activeRotations.get(slotEl));
      activeRotations.delete(slotEl);
    }

    if (ROTATE_INTERVAL <= 0) return;

    const timerId = setInterval(() => {
      if (!document.body.contains(slotEl)) {
        clearInterval(timerId);
        activeRotations.delete(slotEl);
        return;
      }

      // Re-evaluate eligible ads during rotation (ensuring active priority)
      const eligible = getEligibleAds(zone, allAds);
      if (eligible.length <= 1) return;

      const current = slotEl._currentAd;
      const candidates = eligible.filter((ad) => ad !== current);
      const nextAd = candidates.length > 0
        ? candidates[getRandomIndex(candidates.length)]
        : eligible[getRandomIndex(eligible.length)];

      renderAdIntoSlot(slotEl, nextAd, normalizeZone(zone));
    }, ROTATE_INTERVAL);

    activeRotations.set(slotEl, timerId);
  }

  /**
   * Initializes or updates all matching ad slots on the page
   */
  function processSlots() {
    const slots = Array.from(document.querySelectorAll('.yp-ad-slot'));
    if (slots.length === 0) return;

    fetchAdsData().then((allAds) => {
      if (!allAds || allAds.length === 0) return;

      // Group slots by normalized zone to prevent duplicate displays
      const zoneToSlots = new Map();
      slots.forEach((slot) => {
        const zone = slot.getAttribute('data-zone') || '';
        const normZone = normalizeZone(zone);
        if (!zoneToSlots.has(normZone)) {
          zoneToSlots.set(normZone, []);
        }
        zoneToSlots.get(normZone).push({ slot, rawZone: zone });
      });

      // Render slots per zone avoiding duplicate ads if enough unique ones exist
      zoneToSlots.forEach((slotItems, normZone) => {
        const eligible = getEligibleAds(normZone, allAds);
        if (eligible.length === 0) return;

        // Shuffle eligible ads for non-deterministic distribution
        const pool = eligible.slice().sort(() => Math.random() - 0.5);
        let poolIndex = 0;

        slotItems.forEach(({ slot, rawZone }) => {
          let chosenAd;
          if (poolIndex < pool.length) {
            chosenAd = pool[poolIndex++];
          } else {
            // Re-use ads randomly if there are more slots than eligible ads
            chosenAd = eligible[getRandomIndex(eligible.length)];
          }

          renderAdIntoSlot(slot, chosenAd, normZone);
          setupSlotRotation(slot, rawZone, allAds);
        });
      });
    });
  }

  /**
   * Public API
   */
  const YP_AffiliateAds = {
    init: function () {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', processSlots);
      } else {
        processSlots();
      }
    },
    refresh: function () {
      processSlots();
    },
    rotate: function () {
      const slots = Array.from(document.querySelectorAll('.yp-ad-slot'));
      if (slots.length === 0 || !rawAdsCache) return;

      slots.forEach((slot) => {
        const zone = slot.getAttribute('data-zone') || '';
        const eligible = getEligibleAds(zone, rawAdsCache);
        if (eligible.length <= 1) return;

        const current = slot._currentAd;
        const candidates = eligible.filter((ad) => ad !== current);
        const nextAd = candidates.length > 0
          ? candidates[getRandomIndex(candidates.length)]
          : eligible[getRandomIndex(eligible.length)];

        renderAdIntoSlot(slot, nextAd, normalizeZone(zone));
      });
    }
  };

  root.YP_AffiliateAds = YP_AffiliateAds;
  YP_AffiliateAds.init();
})(window);