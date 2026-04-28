function updatePrompt(){const s=document.getElementById("lang-select"),e=s.value,t=document.getElementById("prompt-box"),n=t.getAttribute("data-base");if(!e){t.textContent=n;return}const o=`👉 STRICT LANGUAGE RULE:
The entire banner must be created ONLY in ${e} language.
All text (title, headings, labels, buttons, descriptions) must be strictly in ${e}.
Do NOT use any other language except ${e}.
If any other language text appears, replace it with proper ${e} translation.

`;t.textContent=o+n}document.addEventListener("DOMContentLoaded",updatePrompt);function copyText(e,t){const n=document.getElementById(e).innerText;navigator.clipboard.writeText(n),t.innerText="✅ Copied!",setTimeout(()=>t.innerText="📋 Copy Prompt",2e3)}