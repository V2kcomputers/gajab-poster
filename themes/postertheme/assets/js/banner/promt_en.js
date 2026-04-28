function updatePrompt() {
  const select = document.getElementById("lang-select");
  const lang = select.value;
  const box = document.getElementById("prompt-box");

  const base = box.getAttribute("data-base");

  // अगर कोई language select नहीं है
  if (!lang) {
    box.textContent = base;
    return;
  }

  // Dynamic line
  const extraLine = `\n\nLanguage: 👉 Ensure that all banner text (title, labels, buttons) is written in ${lang}.`;

  box.textContent = base + extraLine;
}

// Page load पर base prompt दिखे
document.addEventListener("DOMContentLoaded", function () {
  updatePrompt();
});

// Copy function
function copyText(id, btn) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);

  btn.innerText = "✅ Copied!";
  setTimeout(() => btn.innerText = "📋 Copy", 2000);
}