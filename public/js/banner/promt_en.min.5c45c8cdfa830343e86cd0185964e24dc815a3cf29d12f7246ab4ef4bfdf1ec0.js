function updatePrompt(){const s=document.getElementById("lang-select"),e=s.value,t=document.getElementById("prompt-box"),n=t.getAttribute("data-base");if(!e){t.textContent=n;return}const o=`👉 STRICT LANGUAGE RULE:
Step 1: Identify all text content provided in this prompt (titles, headings, labels, buttons, descriptions, etc.).
Step 2: Translate ALL that text into ${e}.
Step 3: Use ONLY the translated ${e} text while generating the image.
Do NOT use the original language text anywhere in the final output.

--------------------------------------------------

`;t.textContent=o+n}document.addEventListener("DOMContentLoaded",function(){updatePrompt()});function copyText(e,t){const n=document.getElementById(e).innerText;navigator.clipboard.writeText(n),t.innerText="✅ Copied!",setTimeout(()=>t.innerText="📋 Copy",2e3)}