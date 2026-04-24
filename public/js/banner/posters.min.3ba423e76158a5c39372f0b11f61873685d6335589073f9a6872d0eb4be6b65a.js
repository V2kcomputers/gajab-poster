const list=document.getElementById("imageList"),preview=document.getElementById("previewImg"),modal=document.getElementById("modal"),modalImg=document.getElementById("modalImg");let currentIndex=0,currentImage=null;function showImage(e){currentIndex=e;const t=images[e];preview.src=t.url,preview.alt=t.title,modalImg.src=t.url,currentImage=t,document.querySelectorAll(".image-item").forEach((t,n)=>{t.classList.toggle("active",n===e)})}images.forEach((e,t)=>{const n=document.createElement("div");n.className="image-item",n.innerText=e.title,n.onclick=()=>showImage(t),list.appendChild(n),t===0&&showImage(0)});function nextImage(){showImage((currentIndex+1)%images.length)}function prevImage(){showImage((currentIndex-1+images.length)%images.length)}preview.onclick=()=>{modal.style.display="flex"};function closeModal(){modal.style.display="none"}document.addEventListener("keydown",e=>{modal.style.display==="flex"&&(e.key==="ArrowRight"&&nextImage(),e.key==="ArrowLeft"&&prevImage(),e.key==="Escape"&&closeModal())});async function downloadImg(e){e.innerText="Waiting...";try{const t=await fetch(currentImage.url+"?t="+Date.now());if(!t.ok)throw new Error("Fetch failed");const s=await t.blob(),n=URL.createObjectURL(s),e=document.createElement("a");e.href=n,e.download=currentImage.title+".gif",e.click(),URL.revokeObjectURL(n)}catch{alert("Download failed ❌")}e.innerText="⬇️ Download"}async function shareImg(e){e.innerText="Sharing...";try{const e=await fetch(currentImage.url+"?t="+Date.now());if(!e.ok)throw new Error("Fetch failed");const t=await e.blob(),n=new File([t],currentImage.title+".gif",{type:t.type});navigator.canShare&&navigator.canShare({files:[n]})?await navigator.share({title:currentImage.title,files:[n]}):alert("Device support नहीं करता")}catch{alert("Sharing failed ❌")}e.innerText="🔗 Share"}function printCurrent(){const e=document.createElement("iframe");e.style.position="fixed",e.style.right="0",e.style.bottom="0",e.style.width="0",e.style.height="0",e.style.border="0",document.body.appendChild(e);const t=e.contentWindow.document;t.open(),t.write(`
    <html>
    <head>
      <title>${currentImage.title}</title>
      <style>
        body{margin:0;text-align:center;}
        img{max-width:100%;}
      </style>
    </head>
    <body>
      <img src="${currentImage.url}" id="img">
    </body>
    </html>
  `),t.close(),e.onload=function(){e.contentWindow.focus(),e.contentWindow.print(),setTimeout(()=>{document.body.removeChild(e)},1e3)}}function printAll(){const e=document.createElement("iframe");e.style.position="fixed",e.style.right="0",e.style.bottom="0",e.style.width="0",e.style.height="0",e.style.border="0",document.body.appendChild(e);const t=e.contentWindow.document;let n=`
    <html>
    <head>
      <title>Print All</title>
      <style>
        body{
          margin:0;
          font-family:sans-serif;
        }

        .page{
          page-break-after: always;
          text-align:center;
          padding:10px;
        }

        .page:last-child{
          page-break-after: auto;
        }

        img{
          width:100%;
          height:auto;
        }

        h3{
          margin:10px 0;
        }
      </style>
    </head>
    <body>
  `;images.forEach(e=>{n+=`
      <div class="page">
        <h3>${e.title}</h3>
        <img src="${e.url}">
      </div>
    `}),n+=`</body></html>`,t.open(),t.write(n),t.close(),e.onload=function(){const t=e.contentWindow.document.images;let n=0;if(t.length===0){s();return}for(let e=0;e<t.length;e++)t[e].complete?n++:(t[e].onload=o,t[e].onerror=o);function o(){n++,n===t.length&&s()}n===t.length&&s();function s(){e.contentWindow.focus(),e.contentWindow.print(),setTimeout(()=>{document.body.removeChild(e)},1e3)}}}