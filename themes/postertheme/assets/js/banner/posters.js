
const list = document.getElementById("imageList");
const preview = document.getElementById("previewImg");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

let currentIndex = 0;
let currentImage = null;

// SHOW IMAGE
function showImage(index){
  currentIndex = index;
  const img = images[index];

  preview.src = img.url;
  preview.alt = img.title;
  modalImg.src = img.url;

  currentImage = img;

  document.querySelectorAll(".image-item").forEach((el,i)=>{
    el.classList.toggle("active", i===index);
  });
}

// RENDER LIST
images.forEach((img,i)=>{
  const div = document.createElement("div");
  div.className="image-item";
  div.innerText = img.title;

  div.onclick = ()=> showImage(i);

  list.appendChild(div);

  if(i===0) showImage(0);
});

// NEXT PREV
function nextImage(){
  showImage((currentIndex+1)%images.length);
}
function prevImage(){
  showImage((currentIndex-1+images.length)%images.length);
}

// MODAL
preview.onclick = ()=>{
  modal.style.display="flex";
};

function closeModal(){
  modal.style.display="none";
}

// KEYBOARD
document.addEventListener("keydown",(e)=>{
  if(modal.style.display==="flex"){
    if(e.key==="ArrowRight") nextImage();
    if(e.key==="ArrowLeft") prevImage();
    if(e.key==="Escape") closeModal();
  }
});

// DOWNLOAD
async function downloadImg(btn){
  btn.innerText="Waiting...";

  try{
    const res = await fetch(currentImage.url + "?t=" + Date.now());

    if(!res.ok) throw new Error("Fetch failed");

    const blob = await res.blob();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = currentImage.title + ".gif";
    a.click();

    URL.revokeObjectURL(url);

  }catch(e){
    alert("Download failed ❌");
  }

  btn.innerText="⬇️ Download";
}
// SHARE
async function shareImg(btn){
  btn.innerText="Sharing...";

  try{
    const res = await fetch(currentImage.url + "?t=" + Date.now());

    if(!res.ok) throw new Error("Fetch failed");

    const blob = await res.blob();

    const file = new File([blob], currentImage.title + ".gif", {
      type: blob.type
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: currentImage.title,
        files: [file]
      });
    } else {
      alert("Device support नहीं करता");
    }

  }catch(e){
    alert("Sharing failed ❌");
  }

  btn.innerText="🔗 Share";
}
// PRINT CURRENT
function printCurrent(){
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;

  doc.open();
  doc.write(`
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
  `);
  doc.close();

  iframe.onload = function(){
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // ✅ auto remove iframe
    setTimeout(()=>{
      document.body.removeChild(iframe); 
    }, 1000);
  };
}
// PRINT ALL
function printAll(){
  const iframe = document.createElement("iframe");

  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;

  let html = `
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
  `;

  images.forEach(img=>{
    html += `
      <div class="page">
        <h3>${img.title}</h3>
        <img src="${img.url}">
      </div>
    `;
  });

  html += `</body></html>`;

  doc.open();
  doc.write(html);
  doc.close();

  // ✅ wait for all images load
  iframe.onload = function(){
    const imgs = iframe.contentWindow.document.images;
    let loaded = 0;

    if(imgs.length === 0){
      triggerPrint();
      return;
    }

    for(let i=0;i<imgs.length;i++){
      if(imgs[i].complete){
        loaded++;
      }else{
        imgs[i].onload = check;
        imgs[i].onerror = check;
      }
    }

    function check(){
      loaded++;
      if(loaded === imgs.length){
        triggerPrint();
      }
    }

    if(loaded === imgs.length){
      triggerPrint();
    }

    function triggerPrint(){
      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      // ✅ remove iframe after print
      setTimeout(()=>{
        document.body.removeChild(iframe);
      }, 1000);
    }
  };
}
let startX = 0;
let endX = 0;
// ✅ Mobile Screen Scroll
preview.addEventListener("touchstart", (e)=>{
  startX = e.touches[0].clientX;
});

preview.addEventListener("touchend", (e)=>{
  endX = e.changedTouches[0].clientX;

  if(startX - endX > 50){
    nextImage(); // swipe left
  }
  else if(endX - startX > 50){
    prevImage(); // swipe right
  }
});

// 👉 MODAL SWIPE
let modalStartX = 0;
let modalEndX = 0;

modal.addEventListener("touchstart", (e)=>{
  modalStartX = e.touches[0].clientX;
});

modal.addEventListener("touchend", (e)=>{
  modalEndX = e.changedTouches[0].clientX;

  if(modalStartX - modalEndX > 50){
    nextImage(); // swipe left
  }
  else if(modalEndX - modalStartX > 50){
    prevImage(); // swipe right
  }
});
// =================== post ya farmat copy====================== //

function shareWhatsApp(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;

  const text = el.innerText.trim();
  if (!text) {
    alert("No content to share!");
    return;
  }

  // Button loading state
  if (btn) btn.innerText = "Sharing...";

  const finalText = text + "\n\n👉 https://yojnaportal.com";
  const url = `https://wa.me/?text=${encodeURIComponent(finalText)}`;

  window.open(url, "_blank");

  setTimeout(() => {
    if (btn) btn.innerText = "🟢 WhatsApp";
  }, 2000);
}

function copyText(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;

  const text = el.innerText.trim();
  if (!text) {
    alert("No content to copy!");
    return;
  }

  // Modern Clipboard API
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showCopied(btn);
    }).catch(() => {
      fallbackCopy(text, btn);
    });
  } else {
    fallbackCopy(text, btn);
  }
}

// Fallback method (older browsers)
function fallbackCopy(text, btn) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  showCopied(btn);
}

// Button text change UX
function showCopied(btn) {
  if (!btn) return;

  const originalText = btn.innerText;
  btn.innerText = "Copied ✅";

  setTimeout(() => {
    btn.innerText = originalText;
  }, 2000);
}

