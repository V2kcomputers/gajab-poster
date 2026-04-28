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

  // Strong language rule (dynamic)
  const extraLine = `👉 STRICT LANGUAGE RULE:
The entire banner must be created ONLY in ${lang} language.
All text (title, headings, labels, buttons, descriptions) must be strictly in ${lang}.
Do NOT use any other language except ${lang}.
If any other language text appears, replace it with proper ${lang} translation.

`;

  // सबसे important → ऊपर add करना
  box.textContent = extraLine + base;
}

// Page load पर base दिखे
document.addEventListener("DOMContentLoaded", updatePrompt);

// Copy function
function copyText(id, btn) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);

  btn.innerText = "✅ Copied!";
  setTimeout(() => btn.innerText = "📋 Copy Prompt", 2000);
}