let loading = false;

async function loadNextPage() {
  if (loading) return;

  const nextBtn = document.querySelector(".pagination a:last-child");
  if (!nextBtn) return;

  loading = true;

  const res = await fetch(nextBtn.href);
  const html = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const newItems = doc.querySelectorAll(".banner-card");
  const container = document.querySelector(".banner-list");

  newItems.forEach(el => container.appendChild(el));

  // pagination update
  const newPagination = doc.querySelector(".pagination");
  document.querySelector(".pagination").innerHTML = newPagination.innerHTML;

  loading = false;
}

// 🔽 Vertical scroll (desktop + mobile)
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadNextPage();
  }
});

// 🔽 Horizontal scroll (mobile slider)
const bannerList = document.querySelector(".banner-list");

if (bannerList) {
  bannerList.addEventListener("scroll", () => {
    const scrollLeft = bannerList.scrollLeft;
    const visibleWidth = bannerList.clientWidth;
    const fullWidth = bannerList.scrollWidth;

    // जब right end पर पहुंचे
    if (scrollLeft + visibleWidth >= fullWidth - 50) {
      loadNextPage();
    }
  });
}