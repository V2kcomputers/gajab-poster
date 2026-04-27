let fuse,data=[];const input=document.getElementById("searchInput"),resultsDiv=document.getElementById("results"),clearBtn=document.getElementById("clearBtn"),form=document.getElementById("searchForm"),params=new URLSearchParams(window.location.search),queryParam=params.get("q")||"";input.value=queryParam;function highlight(e,t){let n=new RegExp(`(${t})`,"gi");return e.replace(n,`<mark>$1</mark>`)}function updateResults(e){resultsDiv.innerHTML=e}function runSearch(e){if(!fuse||e==="")return;let n=e.toLowerCase().split(" "),s=fuse.search({$and:n.map(e=>({$or:[{title:e},{content:e}]}))}).slice(0,16),t=`<div class="search-banner-list">`;t+=s.map(t=>{let n=t.item;return`
  <a href="${n.link}" class="search-banner-card" onclick='saveRecentItem(${JSON.stringify(n)})'>

    <div class="search-banner-img">
      <img src="${n.imagePoster||"/default.png"}">
      
      <div class="search-banner-overlay">
        <h3>${highlight(n.title,e)}</h3>
      </div>
    </div>

  </a>
`}).join(""),t+=`</div>`,updateResults(t)}async function initSearch(){const e=await fetch("/index.json");data=await e.json(),fuse=new Fuse(data,{keys:["title","content"],threshold:.35,ignoreLocation:!0}),queryParam&&runSearch(queryParam)}initSearch(),form.addEventListener("submit",function(e){e.preventDefault();const t=input.value.trim();if(!t)return;const n=`/search/?q=${encodeURIComponent(t)}`;history.pushState(null,"",n),runSearch(t),clearBtn.style.display="block"}),clearBtn.addEventListener("click",function(){input.value="",updateResults(""),clearBtn.style.display="none",history.pushState(null,"","/search/"),input.focus()}),document.addEventListener("keydown",function(e){e.key==="Escape"&&(input.value="",updateResults(""),clearBtn.style.display="none")});const recentBox=document.getElementById("recentSearches");function saveRecentItem(e){let t=JSON.parse(localStorage.getItem("recentItems")||"[]");t=t.filter(t=>t.link!==e.link),t.unshift(e),t=t.slice(0,6),localStorage.setItem("recentItems",JSON.stringify(t))}function loadRecentItems(){let t=JSON.parse(localStorage.getItem("recentItems")||"[]");if(t.length===0){recentBox.innerHTML="";return}let e=`<div class="search-banner-list">`;e+=t.map(e=>`
  <div class="search-banner-card-wrap">

    <!-- ❌ Remove Button -->
    <span class="remove-btn" onclick="removeRecentItem('${e.link}')">✖</span>

    <a href="${e.link}" class="search-banner-card">
      <div class="search-banner-img">
        <img src="${e.imagePoster||"/default.png"}">
        <div class="search-banner-overlay">
          <h3>${e.title}</h3>
        </div>
      </div>
    </a>

  </div>
`).join(""),e+=`</div>`,recentBox.innerHTML=e}loadRecentItems();function removeRecentItem(e){let t=JSON.parse(localStorage.getItem("recentItems")||"[]");t=t.filter(t=>t.link!==e),localStorage.setItem("recentItems",JSON.stringify(t)),loadRecentItems()}