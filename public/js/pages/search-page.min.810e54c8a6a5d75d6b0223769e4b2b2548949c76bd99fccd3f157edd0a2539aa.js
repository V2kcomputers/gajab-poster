let fuse,data=[];const input=document.getElementById("searchInput"),resultsDiv=document.getElementById("results"),clearBtn=document.getElementById("clearBtn"),params=new URLSearchParams(window.location.search),queryParam=params.get("q")||"";input.value=queryParam;function highlight(e,t){let n=new RegExp(`(${t})`,"gi");return e.replace(n,`<mark>$1</mark>`)}let lastHTML="";function updateResults(e){if(e===lastHTML)return;lastHTML=e,resultsDiv.classList.add("fade-out"),setTimeout(()=>{resultsDiv.innerHTML=e,resultsDiv.classList.remove("fade-out"),resultsDiv.classList.add("fade-in")},120)}function runSearch(e){if(!fuse||e===""){updateResults("");return}let t=`<div class="search-banner-list">`;t+=results.map(t=>{let n=t.item;return`
    <a href="${n.link}" class="search-banner-card">

      <div class="search-banner-img">
        <img src="${n.imagePoster||"/default.png"}" alt="${n.title}">

        <div class="search-banner-overlay">
          <h3>${highlight(n.title,e)}</h3>
        </div>
      </div>

    </a>
  `}).join(""),t+=`</div>`,updateResults(t)}async function initSearch(){const e=await fetch("/index.json");data=await e.json(),fuse=new Fuse(data,{keys:["title","content"],threshold:.4,ignoreLocation:!0}),queryParam&&runSearch(queryParam)}initSearch();let timer;input.addEventListener("input",function(){const e=this.value.trim(),t=e?`/search/?q=${encodeURIComponent(e)}`:`/search/`;history.replaceState(null,"",t),clearBtn.style.display=e?"block":"none",clearTimeout(timer),timer=setTimeout(()=>{runSearch(e)},250)}),clearBtn.addEventListener("click",function(){input.value="",updateResults(""),clearBtn.style.display="none",history.replaceState(null,"","/search/"),input.focus()}),document.addEventListener("keydown",function(e){e.key==="Escape"&&(input.value="",updateResults(""),clearBtn.style.display="none")}),document.addEventListener("keydown",function(e){e.ctrlKey&&e.key.toLowerCase()==="k"&&(e.preventDefault(),input.focus())}),window.addEventListener("load",()=>{window.innerWidth>768&&input.focus()})