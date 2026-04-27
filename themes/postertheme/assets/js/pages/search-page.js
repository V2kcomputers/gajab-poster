let fuse;
let data = [];

const input = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const clearBtn = document.getElementById("clearBtn");
const form = document.getElementById("searchForm"); // form add करो

// URL query
const params = new URLSearchParams(window.location.search);
const queryParam = params.get("q") || "";

// set input
input.value = queryParam;

// highlight
function highlight(text, query) {
  let regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<mark>$1</mark>`);
}

// smooth update
function updateResults(html) {
  resultsDiv.innerHTML = html;
}

// 🔥 MAIN SEARCH FUNCTION
function runSearch(query) {
  if (!fuse || query === "") {
    updateResults("");
    return;
  }

  let results = fuse.search(query).slice(0, 16);

  if (results.length === 0) {
    updateResults(`<div class="no-result">No results found</div>`);
    return;
  }

  let output = `<div class="search-banner-list">`;

  output += results.map(r => {
    let item = r.item;

   return `
  <a href="${item.link}" class="search-banner-card" onclick='saveRecentItem(${JSON.stringify(item)})'>

    <div class="search-banner-img">
      <img src="${item.imagePoster || '/default.png'}">
      
      <div class="search-banner-overlay">
        <h3>${highlight(item.title, query)}</h3>
      </div>
    </div>

  </a>
`;
  }).join("");

  output += `</div>`;

  updateResults(output);
}

// 🔥 INIT
async function initSearch() {
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
  }
}

initSearch();

// 🔥 FORM SUBMIT (Button + Enter)
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const query = input.value.trim();

  if (!query) return;

  // URL update
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


// LOAD on Searches
const recentBox = document.getElementById("recentSearches");

// SAVE clicked item
function saveRecentItem(item) {
  let items = JSON.parse(localStorage.getItem("recentItems") || "[]");

  // duplicate remove
  items = items.filter(i => i.link !== item.link);

  items.unshift(item);
  items = items.slice(0, 6); // max 6

  localStorage.setItem("recentItems", JSON.stringify(items));
}

// SHOW recent banners
function loadRecentItems() {
  let items = JSON.parse(localStorage.getItem("recentItems") || "[]");

  if (items.length === 0) {
    recentBox.innerHTML = "";
    return;
  }

  let html = `<div class="search-banner-list">`;

html += items.map(item => `
  <div class="search-banner-card-wrap">

    <!-- ❌ Remove Button -->
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

// LOAD on page
loadRecentItems();

function removeRecentItem(link) {
  let items = JSON.parse(localStorage.getItem("recentItems") || "[]");

  items = items.filter(i => i.link !== link);

  localStorage.setItem("recentItems", JSON.stringify(items));

  loadRecentItems(); // refresh UI
}