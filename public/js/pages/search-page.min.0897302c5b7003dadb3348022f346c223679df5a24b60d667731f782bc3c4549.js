let fuse,data=[];const input=document.getElementById("searchInput"),resultsDiv=document.getElementById("results"),clearBtn=document.getElementById("clearBtn"),form=document.getElementById("searchForm"),params=new URLSearchParams(window.location.search),queryParam=params.get("q")||"";input.value=queryParam;function highlight(e,t){let n=new RegExp(`(${t})`,"gi");return e.replace(n,`<mark>$1</mark>`)}function updateResults(e){resultsDiv.innerHTML=e}function runSearch(e){if(!fuse||e===""){updateResults("");return}let n=fuse.search(e).slice(0,16);if(n.length===0){updateResults(`<div class="no-result">No results found</div>`);return}let t=`<div class="search-banner-list">`;t+=n.map(t=>{let n=t.item;return`
      <a href="${n.link}" class="search-banner-card">
        <div class="search-banner-img">
          <img src="${n.imagePoster||"/default.png"}">
          <div class="search-banner-overlay">
            <h3>${highlight(n.title,e)}</h3>
          </div>
        </div>
      </a>
    `}).join(""),t+=`</div>`,updateResults(t)}async function initSearch(){const e=await fetch("/index.json");data=await e.json(),fuse=new Fuse(data,{keys:["title","content"],threshold:.35,ignoreLocation:!0}),queryParam&&runSearch(queryParam)}initSearch(),form.addEventListener("submit",function(e){e.preventDefault();const t=input.value.trim();if(!t)return;const n=`/search/?q=${encodeURIComponent(t)}`;history.pushState(null,"",n),runSearch(t),clearBtn.style.display="block"}),clearBtn.addEventListener("click",function(){input.value="",updateResults(""),clearBtn.style.display="none",history.pushState(null,"","/search/"),input.focus()}),document.addEventListener("keydown",function(e){e.key==="Escape"&&(input.value="",updateResults(""),clearBtn.style.display="none")})