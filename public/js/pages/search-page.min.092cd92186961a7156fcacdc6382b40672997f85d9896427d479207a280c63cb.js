let fuse,data=[];const input=document.getElementById("searchInput"),resultsDiv=document.getElementById("results"),clearBtn=document.getElementById("clearBtn"),form=document.getElementById("searchForm"),recentBox=document.getElementById("recentSearches"),latestKeywords=["latest","new","new update","latest poster","latest banner"],params=new URLSearchParams(window.location.search),queryParam=params.get("q")||"";input.value=queryParam;function highlight(e,t){if(!t)return e;let n=new RegExp(`(${t})`,"gi");return e.replace(n,`<mark>$1</mark>`)}function updateResults(e){resultsDiv.innerHTML=e}function renderResults(e,t){if(!e||e.length===0){const e=encodeURIComponent(t);updateResults(`
    <div class="no-result">
      <a href="https://www.yojnaportal.com/search/?q=${e}" class="no-result-link" target="_blank">
        🔍 Search on Yojna Portal "<strong>${t}</strong>"
      </a>
    </div>
  `);return}let n=`<div class="search-banner-list">`;n+=e.map(e=>`
    <a href="${e.link}" class="search-banner-card" onclick='saveRecentItem(${JSON.stringify(e)})'>
      <div class="search-banner-img">
        <img src="${e.imagePoster||"/default.png"}">
        <div class="search-banner-overlay">
          <h3>${highlight(e.title,t)}</h3>
        </div>
      </div>
    </a>
  `).join(""),n+=`</div>`,updateResults(n)}function runSearch(e){if(!fuse||e===""){updateResults("");return}const t=e.toLowerCase().trim();if(latestKeywords.some(e=>t.includes(e))){let t=[...data].sort((e,t)=>new Date(t.date)-new Date(e.date)),n=t.slice(0,16);renderResults(n,e);return}let n=fuse.search(e).slice(0,16),s=n.map(e=>e.item);renderResults(s,e)}async function initSearch(){try{const e=await fetch("/index.json");data=await e.json(),fuse=new Fuse(data,{keys:["title","content"],threshold:.35,ignoreLocation:!0}),queryParam&&(runSearch(queryParam),clearBtn.style.display="block")}catch(e){console.error("Search init error:",e)}}initSearch(),form.addEventListener("submit",function(e){e.preventDefault();const t=input.value.trim();if(!t)return;const n=`/search/?q=${encodeURIComponent(t)}`;history.pushState(null,"",n),runSearch(t),clearBtn.style.display="block"}),clearBtn.addEventListener("click",function(){input.value="",updateResults(""),clearBtn.style.display="none",history.pushState(null,"","/search/"),input.focus()}),document.addEventListener("keydown",function(e){e.key==="Escape"&&(input.value="",updateResults(""),clearBtn.style.display="none")});function saveRecentItem(e){let t=JSON.parse(localStorage.getItem("recentItems")||"[]");t=t.filter(t=>t.link!==e.link),t.unshift(e),t=t.slice(0,6),localStorage.setItem("recentItems",JSON.stringify(t))}function loadRecentItems(){let t=JSON.parse(localStorage.getItem("recentItems")||"[]");if(t.length===0){recentBox.innerHTML="";return}let e=`<div class="search-banner-list">`;e+=t.map(e=>`
    <div class="search-banner-card-wrap">

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
  `).join(""),e+=`</div>`,recentBox.innerHTML=e}function removeRecentItem(e){let t=JSON.parse(localStorage.getItem("recentItems")||"[]");t=t.filter(t=>t.link!==e),localStorage.setItem("recentItems",JSON.stringify(t)),loadRecentItems()}loadRecentItems();const scriptURL="https://script.google.com/macros/s/AKfycbzA_zNbxIRDyx8hjYvfoRm97aM9SM1oKceu8ZYnmFIleTXvO5iULYRaBXn_ecGwN3pJ/exec",timestampField=document.getElementById("timestamp-field"),now=new Date,formattedDate=now.toLocaleString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","");timestampField.value=formattedDate,form.addEventListener("submit",e=>{e.preventDefault(),fetch(scriptURL,{method:"POST",body:new FormData(form)}).then(()=>alert("Thank you! Your form is submitted successfully.")).then(()=>{window.location.reload()}).catch(e=>console.error("Error!",e.message))})