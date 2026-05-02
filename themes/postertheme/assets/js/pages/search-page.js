let fuse;
let data = [];

const input = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const clearBtn = document.getElementById("clearBtn");
const form = document.getElementById("searchForm");
const recentBox = document.getElementById("recentSearches");

// 🔥 Latest keywords
const latestKeywords = ["latest", "new", "new update", "latest poster", "latest banner"];

// URL query
const params = new URLSearchParams(window.location.search);
const queryParam = params.get("q") || "";

// set input
input.value = queryParam;

// 🔥 Highlight function
function highlight(text, query) {
  if (!query) return text;
  let regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<mark>$1</mark>`);
}

// 🔥 Update UI
function updateResults(html) {
  resultsDiv.innerHTML = html;
}

// 🔥 Render Results
function renderResults(results, query) {
if (!results || results.length === 0) {
  const encodedQuery = encodeURIComponent(query);

  updateResults(`
    <div class="no-result">
      <a href="https://www.yojnaportal.com/search/?q=${encodedQuery}" class="no-result-link" target="_blank" style="text-decoration:none;">
        🔍 Search on Yojna Portal "<strong>${query}</strong>"
      </a>
    </div>
  `);
  return;
}

  let output = `<div class="search-banner-list">`;

  output += results.map(item => `
    <a href="${item.link}" class="search-banner-card" onclick='saveRecentItem(${JSON.stringify(item)})'>
      <div class="search-banner-img">
        <img src="${item.imagePoster || '/default.png'}">
        <div class="search-banner-overlay">
          <h3>${highlight(item.title, query)}</h3>
        </div>
      </div>
    </a>
  `).join("");

  output += `</div>`;

  updateResults(output);
}

// 🔥 MAIN SEARCH FUNCTION
function runSearch(query) {
  if (!fuse || query === "") {
    updateResults("");
    return;
  }

  const lowerQuery = query.toLowerCase().trim();

  // 🔥 Latest search trigger (partial match भी)
  if (latestKeywords.some(k => lowerQuery.includes(k))) {

    let sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

    let results = sorted.slice(0, 16);

    renderResults(results, query);
    return;
  }

  // 🔥 Normal Fuse search
  let fuseResults = fuse.search(query).slice(0, 16);
  let results = fuseResults.map(r => r.item);

  renderResults(results, query);
}

// 🔥 INIT
async function initSearch() {
  try {
    const res = await fetch("/index.json");
    data = await res.json();

    fuse = new Fuse(data, {
      keys: ["title", "content"],
      threshold: 0.35,
      ignoreLocation: true
    });

    // Page load पर search
    if (queryParam) {
      runSearch(queryParam);
      clearBtn.style.display = "block";
    }

  } catch (err) {
    console.error("Search init error:", err);
  }
}

initSearch();

// 🔥 FORM SUBMIT
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) return;

  const newURL = `/search/?q=${encodeURIComponent(query)}`;
  history.pushState(null, "", newURL);

  runSearch(query);

  clearBtn.style.display = "block";
});

// 🔥 Clear button
clearBtn.addEventListener("click", function () {
  input.value = "";
  updateResults("");
  clearBtn.style.display = "none";
  history.pushState(null, "", "/search/");
  input.focus();
});

// 🔥 ESC key clear
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    input.value = "";
    updateResults("");
    clearBtn.style.display = "none";
  }
});

// 🔥 SAVE clicked item
function saveRecentItem(item) {
  let items = JSON.parse(localStorage.getItem("recentItems") || "[]");

  items = items.filter(i => i.link !== item.link);

  items.unshift(item);
  items = items.slice(0, 6);

  localStorage.setItem("recentItems", JSON.stringify(items));
}

// 🔥 LOAD recent
function loadRecentItems() {
  let items = JSON.parse(localStorage.getItem("recentItems") || "[]");

  if (items.length === 0) {
    recentBox.innerHTML = "";
    return;
  }

  let html = `<div class="search-banner-list">`;

  html += items.map(item => `
    <div class="search-banner-card-wrap">

      <span class="remove-btn" onclick="removeRecentItem('${item.link}')">✖</span>

      <a href="${item.link}" class="search-banner-card">
        <div class="search-banner-img">
          <img src="${item.imagePoster || '/default.png'}">
          <div class="search-banner-overlay">
            <h3>${item.title}</h3>
          </div>
        </div>
      </a>

    </div>
  `).join("");

  html += `</div>`;

  recentBox.innerHTML = html;
}

// 🔥 Remove item
function removeRecentItem(link) {
  let items = JSON.parse(localStorage.getItem("recentItems") || "[]");

  items = items.filter(i => i.link !== link);

  localStorage.setItem("recentItems", JSON.stringify(items));

  loadRecentItems();
}

// 🔥 Load on page
loadRecentItems();



// google search dats ======================================

        const scriptURL = 'https://script.google.com/macros/s/AKfycbzA_zNbxIRDyx8hjYvfoRm97aM9SM1oKceu8ZYnmFIleTXvO5iULYRaBXn_ecGwN3pJ/exec';

        // Set the timestamp automatically
        const timestampField = document.getElementById('timestamp-field');
        const now = new Date();
        const formattedDate = now.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', '');
        timestampField.value = formattedDate;
    
        // Handle form submission
        form.addEventListener('submit', e => {
            e.preventDefault();
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(() => alert("Thank you! Your form is submitted successfully."))
                .then(() => { window.location.reload(); })
                .catch(error => console.error('Error!', error.message));
        });
        
