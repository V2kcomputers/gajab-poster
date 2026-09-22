(function () {
  'use strict';

  const CONFIG = {
    endpoint: '/affiliate-ads.json',
    slotSelector: '.yp-ad-slot[data-ad-type="affiliate"]',
    safeProtocolRegex: /^https?:\/\//i
  };

  /**
   * Validate destination and image URLs to avoid XSS (javascript: or data: URIs)
   */
 // Function to validate URLs safely
function isValidImageSrc(string) {
  if (!string || typeof string !== 'string') return false;
  const trimmed = string.trim();
  // https://, http:// या रिलेटिव पाथ जैसे /resources/...webp दोनों चलेंगे
  return /^https?:\/\//i.test(trimmed) || trimmed.startsWith('/');
}
  /**
   * Parse and validate ads based on active status and expiration time
   */
  function filterActiveAndValidAds(rawAds) {
    if (!Array.isArray(rawAds)) return [];

    const now = Date.now();

    return rawAds.filter(function (ad) {
      if (!ad || ad.active !== true) {
        return false;
      }

      // Check Expiry Date
      if (ad.expire && typeof ad.expire === 'string' && ad.expire.trim() !== '') {
        const expireTimestamp = new Date(ad.expire).getTime();
        // If unparseable date, skip it safely
        if (isNaN(expireTimestamp) || expireTimestamp <= now) {
          return false;
        }
      }

      // Must have at least a title and valid destination link
      const link = ad.website || ad.link;
      const image = ad.imageBanner || ad.image;

      if (!isValidHttpUrl(link) || !isValidHttpUrl(image)) {
        return false;
      }

      return true;
    });
  }

  /**
   * Securely create the Affiliate Ad card using native DOM methods (Zero innerHTML injection)
   */
  function buildAdElement(ad) {
    const targetLink = ad.website || ad.link || '#';
    const targetImage = ad.imageBanner || ad.image || '';
    const titleText = ad.title || 'Special Offer';
    const descText = ad.description || '';
    const buttonText = ad.button || 'View Offer';

    // <a> Container
    const anchor = document.createElement('a');
    anchor.className = 'yp-affiliate-ad';
    anchor.href = targetLink;
    anchor.target = '_blank';
    anchor.rel = 'nofollow sponsored noopener';
    anchor.setAttribute('aria-label', titleText);

    // Banner Container
    const banner = document.createElement('div');
    banner.className = 'yp-affiliate-ad__banner';

    // Image
    const img = document.createElement('img');
    img.className = 'yp-affiliate-ad__image';
    img.src = targetImage;
    img.alt = titleText;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.setAttribute('referrerpolicy', 'no-referrer');
    banner.appendChild(img);

    // Sponsored Badge
    const label = document.createElement('span');
    label.className = 'yp-affiliate-ad__label';
    label.textContent = 'Sponsored';
    banner.appendChild(label);

    anchor.appendChild(banner);

    // Content Container
    const content = document.createElement('div');
    content.className = 'yp-affiliate-ad__content';

    if (titleText) {
      const title = document.createElement('h3');
      title.className = 'yp-affiliate-ad__title';
      title.textContent = titleText;
      content.appendChild(title);
    }

    if (descText) {
      const desc = document.createElement('p');
      desc.className = 'yp-affiliate-ad__desc';
      desc.textContent = descText;
      content.appendChild(desc);
    }

    const button = document.createElement('span');
    button.className = 'yp-affiliate-ad__button';
    button.setAttribute('aria-hidden', 'true');
    button.textContent = buttonText;
    content.appendChild(button);

    anchor.appendChild(content);

    return anchor;
  }

  /**
   * Fisher-Yates shuffle algorithm
   */
  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  /**
   * Main initializer
   */
  async function initAffiliateAds() {
    const slots = document.querySelectorAll(CONFIG.slotSelector);
    if (!slots || slots.length === 0) {
      return;
    }

    try {
      const response = await fetch(CONFIG.endpoint, {
        headers: { 'Accept': 'application/json' },
        cache: 'default'
      });

      if (!response.ok) {
        throw new Error(`Failed to load affiliate ads: HTTP ${response.status}`);
      }

      const data = await response.json();
      const validAds = filterActiveAndValidAds(data.ads);

      if (validAds.length === 0) {
        // No ads available: clean up empty slots without visual disruption
        slots.forEach(slot => {
          slot.style.display = 'none';
        });
        return;
      }

      // Prepare an ad pool to avoid repeating ads across multiple slots
      let adPool = shuffle(validAds);

      slots.forEach(function (slot) {
        if (adPool.length === 0) {
          // Replenish and re-shuffle if there are more slots than ads
          adPool = shuffle(validAds);
        }

        const selectedAd = adPool.pop();
        const adNode = buildAdElement(selectedAd);

        // Clear existing slot placeholders and append
        slot.replaceChildren(adNode);
      });

    } catch (err) {
      console.error('Yojna Portal Ad Engine Error:', err);
      slots.forEach(slot => {
        slot.style.display = 'none';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAffiliateAds);
  } else {
    initAffiliateAds();
  }
})();