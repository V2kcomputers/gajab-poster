

/* =========================
FABRIC
========================= */

const canvas =
new fabric.Canvas(
  "canvas",
  {
    preserveObjectStacking:true,
    backgroundColor:"#ffffff"
  }
);

canvas.renderAll();
/* =========================
RESPONSIVE FIX
========================= */

function fitCanvasToMobile(){

  const wrapper =
  document.querySelector(".canvas-wrapper");

  if(window.innerWidth <= 768){

    const scale =
    wrapper.clientWidth / 794;

    wrapper.style.height =
    (1123 * scale) + "px";

    canvas.setZoom(scale);

    canvas.setDimensions({

      width:794 * scale,
      height:1123 * scale

    });

  }else{

    canvas.setZoom(1);

    canvas.setDimensions({

      width:794,
      height:1123

    });

    wrapper.style.height =
    "1123px";

  }

  autoFitImages();

canvas.renderAll();

}

window.addEventListener(
  "resize",
  fitCanvasToMobile
);

window.addEventListener(
  "load",
  fitCanvasToMobile
);
function autoFitImages(){

  const canvasWidth =
  canvas.getWidth();

  canvas.getObjects().forEach(obj=>{

    if(obj.type === "image"){

      obj.scaleToWidth(canvasWidth);

      obj.set({
        left:0
      });

    }

  });

  canvas.renderAll();

}


let currentPanel = null;

/* =========================
OPEN PANEL
========================= */

function openPanel(id){

  const leftPanel =
  document.querySelector(".left-panel");

  const toolbar =
  document.querySelector(".top-toolbar");

  /* SAME PANEL CLICK */

  if(
    window.innerWidth <= 768 &&
    currentPanel === id &&
    leftPanel.classList.contains("show")
  ){

    leftPanel.classList.remove("show");

    toolbar.classList.remove("show");

    currentPanel = null;

    return;

  }

  /* HIDE ALL */

  document
  .querySelectorAll(".panel")
  .forEach(panel=>{

    panel.classList.remove("active");

  });

  /* SHOW NEW */

  document
  .getElementById(id)
  .classList.add("active");

  currentPanel = id;

  /* MOBILE */

  if(window.innerWidth <= 768){

    leftPanel.classList.add("show");

    toolbar.classList.remove("show");

    document
    .querySelector(".right-panel")
    ?.classList.remove("show");

  }

}

/* =========================
HIDE PANELS
========================= */

function closeAllPanels(){

  document
  .querySelector(".left-panel")
  ?.classList.remove("show");

  document
  .querySelector(".top-toolbar")
  ?.classList.remove("show");

  document
  .querySelector(".right-panel")
  ?.classList.remove("show");

  currentPanel = null;

}
canvas.on(
  "mouse:down",
  function(){

    if(window.innerWidth <= 768){

      closeAllPanels();

    }

  }
);
/* =========================
TOGGEL TOOLBAR
========================= */

function toggleToolbar(){

  const toolbar =
  document.querySelector(".top-toolbar");

  const leftPanel =
  document.querySelector(".left-panel");

  const rightPanel =
  document.querySelector(".right-panel");

  if(window.innerWidth <= 768){

    leftPanel.classList.remove("show");

    rightPanel?.classList.remove("show");

  }

  toolbar.classList.toggle("show");

}
/* =========================
TEXT
========================= */

function addText(text,size){

  const textbox =
  new fabric.Textbox(
    text,
    {

      left:100,
      top:100,

      fontSize:size,

      fontFamily:'Poppins',

      fill:'#000',

      fontWeight:'700',

      width:300

    }
  );

  canvas.add(textbox);

  canvas.setActiveObject(textbox);

}

function addNeonText(){

  const text =
  new fabric.Textbox(
    "NEON TEXT",
    {

      left:150,
      top:150,

      fontSize:40,

      fill:'#00ffff',

      shadow:'0 0 20px #00ffff',

      fontWeight:'900'

    }
  );

  canvas.add(text);

}

function addRect(){

  const rect =
  new fabric.Rect({

    left:100,
    top:100,

    width:300,
    height:120,

    fill:'#7c1414',

    rx:20,
    ry:20

  });

  canvas.add(rect);

}

function addCircle(){

  const circle =
  new fabric.Circle({

    left:100,
    top:100,

    radius:80,

    fill:'#0a9b32'

  });

  canvas.add(circle);

}

function addTriangle(){

  const triangle =
  new fabric.Triangle({

    left:100,
    top:100,

    width:150,
    height:150,

    fill:'#ff9900'

  });

  canvas.add(triangle);

}

/* =========================
UPLOAD IMAGE
========================= */

const imageUpload =
document.getElementById(
  "imageUpload"
);

imageUpload.addEventListener(
  "change",
  function(e){

    const file =
    e.target.files[0];

    if(!file) return;

    const reader =
    new FileReader();

    reader.onload =
    function(f){

      fabric.Image.fromURL(
        f.target.result,
        function(img){

          img.set({

            left:50,
            top:50

          });

          img.scaleToWidth(300);

          canvas.add(img);

          saveRecentImage(
            f.target.result
          );

        }
      );

    };

    reader.readAsDataURL(file);

  }
);

/* =========================
RECENT IMAGES
========================= */

function saveRecentImage(src){

  let images =
  JSON.parse(
    localStorage.getItem(
      "recentImages"
    ) || "[]"
  );

  images.unshift(src);

  images =
  images.slice(0,6);

  localStorage.setItem(
    "recentImages",
    JSON.stringify(images)
  );

  loadRecentImages();

}

function loadRecentImages(){

  const container =
  document.getElementById(
    "recentImages"
  );

  container.innerHTML = "";

  let images =
  JSON.parse(
    localStorage.getItem(
      "recentImages"
    ) || "[]"
  );

  images.forEach(src=>{

    const img =
    document.createElement("img");

    img.src = src;

    img.onclick = ()=>{

      fabric.Image.fromURL(
        src,
        function(image){

          image.set({

            left:100,
            top:100

          });

          image.scaleToWidth(300);

          canvas.add(image);

        }
      );

    };

    container.appendChild(img);

  });

}

loadRecentImages();

/* =========================
DRAW
========================= */

function enableDrawing(){

  canvas.isDrawingMode = true;

}

function disableDrawing(){

  canvas.isDrawingMode = false;

}

/* =========================
TEXT TOOLBAR
========================= */

document
.getElementById("fontSize")
.addEventListener(
  "input",
  function(){

    const obj =
    canvas.getActiveObject();

    if(obj){

      obj.set(
        "fontSize",
        parseInt(this.value)
      );

      canvas.renderAll();

    }

  }
);

document
.getElementById("fontColor")
.addEventListener(
  "input",
  function(){

    const obj =
    canvas.getActiveObject();

    if(obj){

      obj.set(
        "fill",
        this.value
      );

      canvas.renderAll();

    }

  }
);

document
.getElementById("fontFamily")
.addEventListener(
  "change",
  function(){

    const obj =
    canvas.getActiveObject();

    if(obj){

      obj.set(
        "fontFamily",
        this.value
      );

      canvas.renderAll();

    }

  }
);

function makeBold(){

  const obj =
  canvas.getActiveObject();

  if(obj){

    obj.set(
      "fontWeight",
      obj.fontWeight === 'bold'
      ? 'normal'
      : 'bold'
    );

    canvas.renderAll();

  }

}

function alignLeft(){

  const obj =
  canvas.getActiveObject();

  if(obj){

    obj.set(
      "textAlign",
      "left"
    );

    canvas.renderAll();

  }

}

function alignCenter(){

  const obj =
  canvas.getActiveObject();

  if(obj){

    obj.set(
      "textAlign",
      "center"
    );

    canvas.renderAll();

  }

}

function alignRight(){

  const obj =
  canvas.getActiveObject();

  if(obj){

    obj.set(
      "textAlign",
      "right"
    );

    canvas.renderAll();

  }

}

/* =========================
PROJECT TITLE
========================= */

const projectTitle =
document.getElementById(
  "projectTitle"
);

const savedTitle =
localStorage.getItem(
  "project_title"
);

if(savedTitle){

  projectTitle.value =
  savedTitle;

}

projectTitle.addEventListener(
  "input",
  function(){

    localStorage.setItem(
      "project_title",
      this.value
    );

  }
);

/* =========================
DOWNLOAD PNG
========================= */

function downloadPNG(){

  const fileName =
  (
    projectTitle.value ||
    "poster"
  ).trim();

  const link =
  document.createElement("a");

  link.download =
  fileName + ".png";

  link.href =
  canvas.toDataURL({
    format:'png',
    quality:1
  });

  link.click();

}
/* =========================
TRANSPARENT PNG
========================= */

function downloadTransparentPNG(){

  const fileName =
  (
    projectTitle.value ||
    "poster"
  ).trim();

  // OLD BG SAVE
  const oldBg =
  canvas.backgroundColor;

  // TEMP REMOVE BG
  canvas.setBackgroundColor(
    null,
    canvas.renderAll.bind(canvas)
  );

  const link =
  document.createElement("a");

  link.download =
  fileName + "-transparent.png";

  link.href =
  canvas.toDataURL({
    format:'png',
    quality:1
  });

  link.click();

  // RESTORE BG
  canvas.setBackgroundColor(
    oldBg,
    canvas.renderAll.bind(canvas)
  );

}
/* =========================
DOWNLOAD JPG
========================= */

function downloadJPG(){

  const fileName =
  (
    projectTitle.value ||
    "poster"
  ).trim();

  const link =
  document.createElement("a");

  link.download =
  fileName + ".jpg";

  link.href =
  canvas.toDataURL({
    format:'jpeg',
    quality:1
  });

  link.click();

}

/* =========================
PRINT
========================= */

function printCanvas(){

  const data =
  canvas.toDataURL();

  const win =
  window.open("");

  win.document.write(`
    <img
    src="${data}"
    style="width:100%;"
    onload="window.print();"
    >
  `);

}

/* =========================
SAVE JSON
========================= */

function downloadJSON(){

  const data =
  JSON.stringify(
    canvas.toJSON()
  );

  const blob =
  new Blob(
    [data],
    {
      type:"application/json"
    }
  );

  const link =
  document.createElement("a");

  link.href =
  URL.createObjectURL(blob);

  link.download =
  "poster-project.json";

  link.click();

}

/* =========================
LOAD JSON
========================= */

function loadJSON(){

  const input =
  document.createElement("input");

  input.type = "file";

  input.accept = ".json";

  input.onchange = function(e){

    const file =
    e.target.files[0];

    if(!file) return;

    const reader =
    new FileReader();

    reader.onload =
    function(f){

      canvas.loadFromJSON(
        f.target.result,
        function(){

          canvas.renderAll();

        }
      );

    };

    reader.readAsText(file);

  };

  input.click();

}

/* =========================
CANVAS SIZE
========================= */

document
.getElementById("canvasSize")
.addEventListener(
  "change",
  function(){

    const size =
    this.value.split("x");

    const width =
    parseInt(size[0]);

    const height =
    parseInt(size[1]);

    canvas.setWidth(width);

    canvas.setHeight(height);

    document
    .querySelector(".canvas-wrapper")
    .style.width =
    width + "px";

    document
    .querySelector(".canvas-wrapper")
    .style.height =
    height + "px";

    fitCanvasToMobile();

    canvas.renderAll();

  }
);

/* =========================
URL IMAGE LOAD
========================= */

const params =
new URLSearchParams(
  window.location.search
);

const imageURL =
params.get("img");

const titleURL =
params.get("tittle");

/* TITLE */

if(titleURL){

  const decodedTitle =
  decodeURIComponent(
    titleURL
  );

  projectTitle.value =
  decodedTitle;

}

/* IMAGE */

if(imageURL){

  const decodedImage =
  decodeURIComponent(
    imageURL
  );

  fabric.Image.fromURL(

    decodedImage +

    (
      decodedImage.includes("?")
      ? "&"
      : "?"
    ) +

    "t=" + Date.now(),

    function(img){

      const canvasWidth =
      canvas.getWidth();

      img.scaleToWidth(
        canvasWidth
      );

      img.set({

        left:0,
        top:0,

        selectable:true

      });

      canvas.add(img);

      canvas.sendToBack(img);

      canvas.renderAll();

    },

    {
      crossOrigin:'anonymous'
    }

  );

}
function toggleExportPanel(){

  if(window.innerWidth <= 768){

    document
    .querySelector(".right-panel")
    .classList.toggle("show");

  }

}


/*=======================CHANGE FONT SIZE==================================*/
function changeFontSize(value){

  const input =
  document.getElementById("fontSize");

  input.value =
  parseInt(input.value) + value;

  input.dispatchEvent(
    new Event("input")
  );

}

/* ITALIC */

function makeItalic(){

  const obj =
  canvas.getActiveObject();

  if(obj){

    obj.set(
      "fontStyle",
      obj.fontStyle === 'italic'
      ? 'normal'
      : 'italic'
    );

    canvas.renderAll();

  }

}

/* UNDERLINE */

function makeUnderline(){

  const obj =
  canvas.getActiveObject();

  if(obj){

    obj.set(
      "underline",
      !obj.underline
    );

    canvas.renderAll();

  }

}

  /* =========================
SET FONT FAMILY
========================= */

function setFontFamily(font){

  const obj =
  canvas.getActiveObject();

  if(
    obj &&
    (
      obj.type === "textbox" ||
      obj.type === "text"
    )
  ){

    obj.set(
      "fontFamily",
      font
    );

    canvas.renderAll();

  }

}

/* =========================
SHADOW EFFECT
========================= */

function applyShadow(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  obj.set(
    "shadow",
    new fabric.Shadow({

      color:"rgba(0,0,0,0.45)",

      blur:15,

      offsetX:8,

      offsetY:8

    })
  );

  canvas.renderAll();

}

/* =========================
NEON EFFECT
========================= */

function applyNeon(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  obj.set({

    fill:"#00ffff",

    shadow:new fabric.Shadow({

      color:"#00ffff",

      blur:30,

      offsetX:0,

      offsetY:0

    })

  });

  canvas.renderAll();

}

/* =========================
OUTLINE EFFECT
========================= */

function applyOutline(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  obj.set({

    stroke:"#000",

    strokeWidth:2

  });

  canvas.renderAll();

}

/* =========================
REMOVE EFFECTS
========================= */

function removeEffects(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  obj.set({

    shadow:null,

    stroke:null,

    strokeWidth:0

  });

  canvas.renderAll();

}

/* =========================
EXTRA PREMIUM EFFECTS
========================= */

/* GOLD */

function applyGold(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  obj.set({

    fill:"#f7c948",

    shadow:new fabric.Shadow({

      color:"#f59e0b",

      blur:20,

      offsetX:3,

      offsetY:3

    })

  });

  canvas.renderAll();

}

/* RED GLOW */

function applyRedGlow(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  obj.set({

    fill:"#ff0000",

    shadow:new fabric.Shadow({

      color:"#ff0000",

      blur:25,

      offsetX:0,

      offsetY:0

    })

  });

  canvas.renderAll();

}

/* WHITE OUTLINE */

function applyWhiteOutline(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  obj.set({

    stroke:"#fff",

    strokeWidth:3

  });

  canvas.renderAll();

}

/* =========================
GRADIENT TEXT
========================= */

function applyGradient(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  obj.set(
    "fill",
    new fabric.Gradient({

      type:"linear",

      coords:{
        x1:0,
        y1:0,
        x2:obj.width,
        y2:0
      },

      colorStops:[
        {
          offset:0,
          color:"#ff0000"
        },
        {
          offset:0.5,
          color:"#ffff00"
        },
        {
          offset:1,
          color:"#00ff00"
        }
      ]

    })
  );

  canvas.renderAll();

}

/* =========================
CURVE EFFECT
========================= */

function applyCurve(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  obj.set({

    skewX:20

  });

  canvas.renderAll();

}

/* =========================
RESET TRANSFORM
========================= */

function resetTransform(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  obj.set({

    skewX:0,
    skewY:0,
    angle:0

  });

  canvas.renderAll();

}

  /* =========================
BUTTON ACTIVE HIGHLIGHT
========================= */

function clearEffectHighlight(){

  document
  .querySelectorAll(".effect-btn")
  .forEach(btn=>{

    btn.classList.remove("active");

  });

}

function setActiveEffect(button){

  clearEffectHighlight();

  button.classList.add("active");

}

/* =========================
SHADOW CUSTOMIZATION
========================= */

function updateShadowEffect(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  const blur =
  parseInt(
    document.getElementById("shadowBlur").value
  );

  const offsetX =
  parseInt(
    document.getElementById("shadowX").value
  );

  const offsetY =
  parseInt(
    document.getElementById("shadowY").value
  );

  const color =
  document.getElementById("shadowColor").value;

  obj.set(
    "shadow",
    new fabric.Shadow({

      color:color,

      blur:blur,

      offsetX:offsetX,

      offsetY:offsetY

    })
  );

  canvas.renderAll();

}

/* =========================
OUTLINE CUSTOMIZATION
========================= */

function updateOutlineEffect(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  const width =
  parseInt(
    document.getElementById("outlineWidth").value
  );

  const color =
  document.getElementById("outlineColor").value;

  obj.set({

    stroke:color,

    strokeWidth:width

  });

  canvas.renderAll();

}

/* =========================
UPDATED EFFECT FUNCTIONS
========================= */

function applyShadow(btn){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  setActiveEffect(btn);

  updateShadowEffect();

}

function applyNeon(btn){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  setActiveEffect(btn);

  obj.set({

    fill:"#00ffff",

    shadow:new fabric.Shadow({

      color:"#00ffff",

      blur:30,

      offsetX:0,

      offsetY:0

    })

  });

  canvas.renderAll();

}

function applyOutline(btn){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  setActiveEffect(btn);

  updateOutlineEffect();

}

function removeEffects(btn){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  setActiveEffect(btn);

  obj.set({

    shadow:null,

    stroke:null,

    strokeWidth:0,

    skewX:0,

    skewY:0

  });

  canvas.renderAll();

}

  function toggleEffectControls(id){

  // सभी कंट्रोल बंद करें
  document.querySelectorAll('.effect-box').forEach(box=>{
    box.classList.remove('active');
  });

  // जिस पर क्लिक हुआ वही खुले
  const target=document.getElementById(id);

  if(target){
    target.classList.add('active');
  }
}


/* =========================================================
UNDO / REDO HISTORY
========================================================= */

let history = [];
let historyStep = -1;
let isRedoing = false;

/* SAVE HISTORY */

function saveHistory(){

  if(isRedoing) return;

  historyStep++;

  if(historyStep < history.length){

    history.length = historyStep;

  }

  history.push(
    JSON.stringify(canvas)
  );

}

/* INITIAL SAVE */

saveHistory();

/* AUTO SAVE */

canvas.on(
  "object:added",
  saveHistory
);

canvas.on(
  "object:modified",
  saveHistory
);

canvas.on(
  "object:removed",
  saveHistory
);

/* UNDO */

function undo(){

  if(historyStep <= 0) return;

  isRedoing = true;

  historyStep--;

  canvas.loadFromJSON(

    history[historyStep],

    function(){

      canvas.renderAll();

      isRedoing = false;

    }

  );

}

/* REDO */

function redo(){

  if(
    historyStep >=
    history.length - 1
  ) return;

  isRedoing = true;

  historyStep++;

  canvas.loadFromJSON(

    history[historyStep],

    function(){

      canvas.renderAll();

      isRedoing = false;

    }

  );

}

/* =========================================================
LAYER UP
========================================================= */

function layerUp(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  canvas.bringForward(obj);

  canvas.renderAll();

  saveHistory();

}

/* =========================================================
LAYER DOWN
========================================================= */

function layerDown(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  canvas.sendBackwards(obj);

  canvas.renderAll();

  saveHistory();

}

/* =========================================================
LOCK / UNLOCK
========================================================= */

function toggleLock(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  const lockBtn =
  document.getElementById(
    "lockBtn"
  );

  const isLocked =
  obj.isLocked === true;

  /* =====================
     UNLOCK
  ===================== */

  if(isLocked){

    obj.set({

      selectable:true,
      evented:true,

      lockMovementX:false,
      lockMovementY:false,

      lockScalingX:false,
      lockScalingY:false,

      lockRotation:false,

      hasControls:true,
      hasBorders:true,

      opacity:1,

      isLocked:false

    });

    // TOOLBAR ICON
    if(lockBtn){

      lockBtn.innerHTML = "🔓";

    }

    // OBJECT ICON
    addLockIcon(obj,false);

  }

  /* =====================
     LOCK
  ===================== */

  else{

    obj.set({

      selectable:true,
      evented:true,

      lockMovementX:true,
      lockMovementY:true,

      lockScalingX:true,
      lockScalingY:true,

      lockRotation:true,

      hasControls:false,
      hasBorders:false,

      opacity:1,

      isLocked:true

    });

    // TOOLBAR ICON
    if(lockBtn){

      lockBtn.innerHTML = "🔒";

    }

    // OBJECT ICON
    addLockIcon(obj,true);

  }

  canvas.setActiveObject(obj);

  canvas.renderAll();

  saveHistory();

}

/* =========================================================
SELECT LOCKED OBJECT
========================================================= */

canvas.on(
  "mouse:down",
  function(opt){

    if(!opt.target) return;

    const obj =
    opt.target;

    // icon ignore
    if(obj.excludeFromExport) return;

    if(obj.isLocked){

      canvas.setActiveObject(obj);

      canvas.renderAll();

    }

  }
);

/* =========================================================
DUPLICATE
========================================================= */

function duplicateLayer(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  obj.clone(function(cloned){

    cloned.set({

      left:obj.left + 25,
      top:obj.top + 25

    });

    canvas.add(cloned);

    canvas.setActiveObject(cloned);

    canvas.renderAll();

    saveHistory();

  });

}

/* =========================================================
DELETE
========================================================= */

function deleteLayer(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  canvas.remove(obj);

  canvas.renderAll();

  saveHistory();

}

/* =========================================================
DELETE KEY SUPPORT
========================================================= */

/* =========================================================
SAFE DELETE KEY
========================================================= */

document.addEventListener(

  "keydown",

  function(e){

    const obj =
    canvas.getActiveObject();

    if(!obj) return;

    /* =====================
       TEXT EDIT MODE
    ===================== */

    const isEditingText =

      (
        obj.type === "textbox" ||
        obj.type === "i-text"
      )

      &&

      obj.isEditing;

    /* =====================
       DELETE OBJECT
    ===================== */

    if(

      (
        e.key === "Delete" ||
        e.key === "Backspace"
      )

      &&

      !isEditingText

    ){

      e.preventDefault();

      canvas.remove(obj);

      canvas.renderAll();

      saveHistory();

    }

    /* =====================
       CTRL + Z
    ===================== */

    if(
      e.ctrlKey &&
      e.key.toLowerCase() === "z"
    ){

      e.preventDefault();

      undo();

    }

    /* =====================
       CTRL + Y
    ===================== */

    if(
      e.ctrlKey &&
      e.key.toLowerCase() === "y"
    ){

      e.preventDefault();

      redo();

    }

  }

);

/* =========================================================
PARTIAL TEXT COLOR
========================================================= */

function applySelectedTextColor(color){

  const obj =
  canvas.getActiveObject();

  if(
    !obj ||
    (
      obj.type !== "textbox" &&
      obj.type !== "i-text"
    )
  ) return;

  /* =====================
     SELECTED TEXT
  ===================== */

  if(

    obj.selectionStart !==
    obj.selectionEnd

  ){

    obj.setSelectionStyles(

      {

        fill:color

      },

      obj.selectionStart,

      obj.selectionEnd

    );

  }

  /* =====================
     FULL TEXT
  ===================== */

  else{

    obj.set(
      "fill",
      color
    );

  }

  canvas.renderAll();

  saveHistory();

}

/* =========================================================
PARTIAL TEXT BOLD
========================================================= */

function applySelectedBold(){

  const obj =
  canvas.getActiveObject();

  if(
    !obj ||
    (
      obj.type !== "textbox" &&
      obj.type !== "i-text"
    )
  ) return;

  if(

    obj.selectionStart !==
    obj.selectionEnd

  ){

    obj.setSelectionStyles(

      {

        fontWeight:"bold"

      },

      obj.selectionStart,

      obj.selectionEnd

    );

  }

  else{

    obj.set(

      "fontWeight",

      obj.fontWeight ===
      "bold"

      ? "normal"
      : "bold"

    );

  }

  canvas.renderAll();

  saveHistory();

}

/* =========================================================
PARTIAL TEXT ITALIC
========================================================= */

function applySelectedItalic(){

  const obj =
  canvas.getActiveObject();

  if(
    !obj ||
    (
      obj.type !== "textbox" &&
      obj.type !== "i-text"
    )
  ) return;

  if(

    obj.selectionStart !==
    obj.selectionEnd

  ){

    obj.setSelectionStyles(

      {

        fontStyle:"italic"

      },

      obj.selectionStart,

      obj.selectionEnd

    );

  }

  else{

    obj.set(

      "fontStyle",

      obj.fontStyle ===
      "italic"

      ? "normal"
      : "italic"

    );

  }

  canvas.renderAll();

  saveHistory();

}



/* =========================================================
CANVAS BACKGROUND COLOR
========================================================= */

document
.getElementById("canvasBgColor")
.addEventListener(
  "input",
  function(){

    canvas.setBackgroundColor(

      this.value,

      canvas.renderAll.bind(canvas)

    );

    saveHistory();

  }
);

/* =========================================================
OBJECT OPACITY
========================================================= */

document
.getElementById("objectOpacity")
.addEventListener(
  "input",
  function(){

    const obj =
    canvas.getActiveObject();

    if(!obj) return;

    obj.set({

      opacity:
      parseFloat(this.value)

    });

    canvas.renderAll();

    saveHistory();

  }
);

/* =========================================================
AUTO UPDATE OPACITY SLIDER
========================================================= */

canvas.on(
  "selection:created",
  updateOpacitySlider
);

canvas.on(
  "selection:updated",
  updateOpacitySlider
);

function updateOpacitySlider(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  document.getElementById(
    "objectOpacity"
  ).value =
  obj.opacity || 1;

}


  /* =========================
TOOL CONTROL TOGGLE
========================= */

function toggleToolControl(id){

  document
  .querySelectorAll(".tool-control")
  .forEach(box=>{

    if(box.id !== id){

      box.classList.remove("show");

    }

  });

  document
  .getElementById(id)
  .classList.toggle("show");

}

/* =========================
FONT COLOR
========================= */

document
.getElementById("fontColor")
.addEventListener(
  "input",
  function(){

    applySelectedTextColor(
      this.value
    );

  }
);

/* =========================
JUSTIFY ALIGN
========================= */

function justifyAlign(){

  const obj =
  canvas.getActiveObject();

  if(!obj) return;

  obj.set(
    "textAlign",
    "justify"
  );

  canvas.renderAll();

}

/* =========================
CLICK OUTSIDE CLOSE
========================= */

document.addEventListener(
  "click",
  function(e){

    if(
      !e.target.closest(".tool-item")
    ){

      document
      .querySelectorAll(".tool-control")
      .forEach(box=>{

        box.classList.remove("show");

      });

    }

  }
);

  /* =========================================================
CANVAS DRAG & DROP IMAGE UPLOAD
========================================================= */

function initCanvasDragDrop(){

  const canvasContainer =
  canvas.upperCanvasEl;

  /* =====================
     PREVENT DEFAULT
  ===================== */

  [
    "dragenter",
    "dragover",
    "dragleave",
    "drop"
  ].forEach(eventName=>{

    canvasContainer.addEventListener(

      eventName,

      function(e){

        e.preventDefault();

        e.stopPropagation();

      },

      false

    );

  });

  /* =====================
     CANVAS HIGHLIGHT
  ===================== */

  [
    "dragenter",
    "dragover"
  ].forEach(eventName=>{

    canvasContainer.addEventListener(

      eventName,

      function(){

        canvasContainer.style.outline =
        "3px dashed #7c3aed";

        canvasContainer.style.outlineOffset =
        "-6px";

      },

      false

    );

  });

  /* =====================
     REMOVE HIGHLIGHT
  ===================== */

  [
    "dragleave",
    "drop"
  ].forEach(eventName=>{

    canvasContainer.addEventListener(

      eventName,

      function(){

        canvasContainer.style.outline =
        "none";

      },

      false

    );

  });

  /* =====================
     DROP IMAGE
  ===================== */

  canvasContainer.addEventListener(

    "drop",

    function(e){

      const dt =
      e.dataTransfer;

      const files =
      dt.files;

      if(!files.length) return;

      [...files].forEach(file=>{

        if(
          !file.type.startsWith(
            "image/"
          )
        ) return;

        const reader =
        new FileReader();

        reader.onload =
        function(event){

          fabric.Image.fromURL(

            event.target.result,

            function(img){

              /* DROP POSITION */

              const pointer =
              canvas.getPointer(e);

              img.set({

                left:pointer.x,
                top:pointer.y,

                originX:"center",
                originY:"center"

              });

              /* AUTO SCALE */

              if(
                img.width > 500
              ){

                img.scaleToWidth(300);

              }

              canvas.add(img);

              canvas.setActiveObject(img);

              canvas.renderAll();

              saveRecentImage(
                event.target.result
              );

              saveHistory();

            }

          );

        };

        reader.readAsDataURL(file);

      });

    },

    false

  );

}

/* =========================================================
INIT
========================================================= */

initCanvasDragDrop();

  /* =========================
APPLY IMAGE FILTERS
========================= */

function applyImageFilters(){

  const obj =
  canvas.getActiveObject();

  if(
    !obj ||
    obj.type !== "image"
  ) return;

  obj.filters = [];

  /* BRIGHTNESS */

  const brightness =
  parseFloat(
    document.getElementById(
      "brightnessRange"
    ).value
  );

  if(brightness !== 0){

    obj.filters.push(

      new fabric.Image.filters.Brightness({
        brightness:brightness
      })

    );

  }

  /* CONTRAST */

  const contrast =
  parseFloat(
    document.getElementById(
      "contrastRange"
    ).value
  );

  if(contrast !== 0){

    obj.filters.push(

      new fabric.Image.filters.Contrast({
        contrast:contrast
      })

    );

  }

  /* SATURATION */

  const saturation =
  parseFloat(
    document.getElementById(
      "saturationRange"
    ).value
  );

  if(saturation !== 0){

    obj.filters.push(

      new fabric.Image.filters.Saturation({
        saturation:saturation
      })

    );

  }

  /* BLUR */

  const blur =
  parseFloat(
    document.getElementById(
      "blurRange"
    ).value
  );

  if(blur > 0){

    obj.filters.push(

      new fabric.Image.filters.Blur({
        blur:blur
      })

    );

  }

  obj.applyFilters();

  canvas.renderAll();

}

/* =========================
GRAYSCALE
========================= */

function toggleGrayscale(){

  const obj =
  canvas.getActiveObject();

  if(
    !obj ||
    obj.type !== "image"
  ) return;

  obj.filters.push(
    new fabric.Image.filters.Grayscale()
  );

  obj.applyFilters();

  canvas.renderAll();

}

/* =========================
RESET IMAGE FILTER
========================= */

function resetImageFilters(){

  const obj =
  canvas.getActiveObject();

  if(
    !obj ||
    obj.type !== "image"
  ) return;

  obj.filters = [];

  obj.applyFilters();

  canvas.renderAll();

}

/* =========================
SIMPLE CROP MODE
========================= */

/* =========================
IMAGE CROP MODE
========================= */

let cropRect = null;
let croppingImage = null;

function enableCropMode(){

  // ACTIVE IMAGE SAVE
  const activeImg =
  canvas.getActiveObject();

  if(
    !activeImg ||
    activeImg.type !== "image"
  ){

    alert("Please select image first");

    return;

  }

  // IMAGE MEMORY
  croppingImage = activeImg;

  // BUTTON CLICK SE DESELECT NA HO
  canvas.discardActiveObject();

  // OLD CROP REMOVE
  if(cropRect){

    canvas.remove(cropRect);

  }

  // CREATE CROP BOX
  cropRect =
  new fabric.Rect({

    left:activeImg.left + 20,
    top:activeImg.top + 20,

    width:
    activeImg.width *
    activeImg.scaleX * 0.6,

    height:
    activeImg.height *
    activeImg.scaleY * 0.6,

    fill:'rgba(0,0,0,0.2)',

    stroke:'#7c3aed',
    strokeWidth:2,

    strokeDashArray:[8,8],

    cornerColor:'#7c3aed',

    transparentCorners:false,

    cornerSize:14,

    borderScaleFactor:2,

    selectable:true,
    evented:true

  });

  canvas.add(cropRect);

  // IMAGE KO LOCK NAHI HATANA
  canvas.bringToFront(cropRect);

  // IMPORTANT
  // IMAGE MEMORY SAFE RAHEGI
  // CROPPER ACTIVE RAHEGA

  canvas.setActiveObject(cropRect);

  canvas.renderAll();

}

/* =========================
APPLY CROP
========================= */

function applyCrop(){

  if(
    !cropRect ||
    !croppingImage
  ) return;

  const img =
  croppingImage;

  const scaleX =
  img.scaleX;

  const scaleY =
  img.scaleY;

  /* CROP AREA */

  const cropX =
  (cropRect.left - img.left) / scaleX;

  const cropY =
  (cropRect.top - img.top) / scaleY;

  const cropWidth =
  cropRect.width * cropRect.scaleX / scaleX;

  const cropHeight =
  cropRect.height * cropRect.scaleY / scaleY;

  /* APPLY */

  img.set({

    cropX:cropX,
    cropY:cropY,

    width:cropWidth,
    height:cropHeight

  });

  /* RESET SCALE */

  img.set({

    scaleX:scaleX,
    scaleY:scaleY

  });

  canvas.remove(cropRect);

  cropRect = null;

 canvas.discardActiveObject();

canvas.setActiveObject(img);

canvas.renderAll();


}

/* =========================
SHOW / HIDE APPLY BUTTON
========================= */

canvas.on(
  "selection:created",
  updateCropButton
);

canvas.on(
  "selection:updated",
  updateCropButton
);

canvas.on(
  "selection:cleared",
  function(){

    document.getElementById(
      "applyCropBtn"
    ).style.display = "none";

  }
);

function updateCropButton(){

  const obj =
  canvas.getActiveObject();

  const btn =
  document.getElementById(
    "applyCropBtn"
  );

  // IMAGE SELECTED
  // YA CROP MODE ACTIVE

  if(

    (
      obj &&
      obj.type === "image"
    )

    ||

    cropRect

  ){

    btn.style.display =
    "block";

  }

  else{

    btn.style.display =
    "none";

  }

}
/* =========================
ENTER KEY = APPLY CROP
========================= */

document.addEventListener(
  "keydown",
  function(e){

    if(
      e.key === "Enter" &&
      cropRect
    ){

      e.preventDefault();

      applyCrop();

    }

  }
);

