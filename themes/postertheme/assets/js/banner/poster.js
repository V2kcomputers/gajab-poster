

let preview = document.getElementById("previewImg");
let modal = document.getElementById("modal");
let modalImg = document.getElementById("modalImg");

function getCurrentImage(){
  return {
    src: preview.src,
    title: document.getElementById("title").innerText || "poster"
  };
}

// OPEN MODAL
function openModal(){
  modal.style.display = "flex";
  modalImg.src = preview.src;
}

// CLOSE
function closeModal(){
  modal.style.display = "none";
}

// ================= DOWNLOAD =================
async function downloadImg(btn){
  btn.innerText = "Waiting...";

  const img = getCurrentImage();

  try{
    let res = await fetch(img.src + "?t=" + Date.now());
    let blob = await res.blob();

    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = img.title + ".gif";
    a.click();

    URL.revokeObjectURL(url);

  }catch(e){
    alert("Download failed");
  }

  btn.innerText = "⬇️ Download";
}

// ================= SHARE =================
async function shareImg(btn){
  btn.innerText = "Sharing...";

  const img = {
    src: document.getElementById("previewImg").src,
    title: document.getElementById("title").innerText || "image"
  };

  try {
    const res = await fetch(img.src + "?t=" + Date.now());

    if (!res.ok) throw new Error("Fetch failed");

    const blob = await res.blob();

    const file = new File([blob], img.title + ".gif", {
      type: blob.type || "image/gif"
    });

    // ✅ ONLY FILE SHARE
    if (navigator.canShare && navigator.canShare({ files: [file] })) {

      await navigator.share({
        title: img.title,
        files: [file]
      });

    } else {
      alert("❌ आपका device file share support नहीं करता");
    }

  } catch (err) {
    console.error("Share Error:", err);
    alert("❌ Sharing failed");
  }

  btn.innerText = "🔗 Share";
}

// ================= PRINT =================
function printImg(btn){
  btn.innerText = "Preparing...";

  const img = getCurrentImage();

  const win = window.open("");

  win.document.write(`
    <html>
    <body style="margin:0;text-align:center;">
      <img src="${img.src}" style="max-width:100%;">
      <script>
        window.onload=function(){
          window.print();
          setTimeout(()=>window.close(),500);
        }
      <\/script>
    </body>
    </html>
  `);

  win.document.close();

  btn.innerText = "🖨️ Print";
}

    function renderGallery(filteredImages) {
  categoryContainer.innerHTML = '';

  const categories = [...new Set(filteredImages.map(img => img.category))];

  categories.forEach(cat => {
    const catDiv = document.createElement('div');
    catDiv.className = "category";

    catDiv.innerHTML = `<h2>${cat}</h2><div class="gallery"></div>`;
    const container = catDiv.querySelector('.gallery');

    filteredImages
      .filter(img => img.category === cat)
      .forEach(img => {

        const item = document.createElement('div');
        item.className = "gallery-item";

        // skeleton
        const skeleton = document.createElement("div");
        skeleton.className = "skeleton";

        const image = document.createElement("img");
        image.loading = "lazy";
        image.src = img.src;
        image.style.display = "none";

        image.onload = () => {
          skeleton.remove();
          image.style.display = "block";
        };

        item.appendChild(skeleton);
        item.appendChild(image);

        const title = document.createElement("div");
        title.className = "image-title";
        title.innerText = img.title;

        item.appendChild(title);

        item.onclick = () => openModal(img);

        container.appendChild(item);
      });

    categoryContainer.appendChild(catDiv);
  });
}

