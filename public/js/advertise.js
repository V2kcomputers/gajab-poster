      // CONFIGURATION
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxnOrUp9KgaRFRhoaAY9VBZRkd6soiVLnPi2cW6PeBjj2jMG7wE36wNeCrzJqtm5mY/exec';
        const TARGET_EMAIL = 'yojnaportalhelp@gmail.com';

        const form = document.forms['search-form'];
        const submitBtn = document.getElementById('submit-btn');

        // Formats message for Clipboard & Mail Body
        function buildFormattedData() {
            return `*New Advertisement Campaign Request - Yojna Portal*
--------------------------------------------------
Business Name: ${document.getElementById("pv-businessName").textContent}
Contact Person: ${document.getElementById("pv-contactPerson").textContent}
Mobile: ${document.getElementById("pv-mobile").textContent}
WhatsApp: ${document.getElementById("pv-whatsapp").textContent}
Email: ${document.getElementById("pv-email").textContent}
Website URL: ${document.getElementById("pv-websiteURL").textContent}
Advertisement Type: ${document.getElementById("pv-advertisementType").textContent}
Duration: ${document.getElementById("pv-duration").textContent}
Bid Amount: ${document.getElementById("pv-bidAmount").textContent}
Description:
${document.getElementById("pv-advertisementDescription").textContent}
Terms Accepted: Yes`;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Set Timestamp
            const now = new Date();
            const formattedDate = now.toLocaleString('en-GB', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: false
            }).replace(',', '');
            document.getElementById('timestamp-field').value = formattedDate;

            // Extract Values
            const bName = document.getElementById("businessName").value.trim();
            const cPerson = document.getElementById("contactPerson").value.trim();
            const mob = document.getElementById("mobile").value.trim();
            const wa = document.getElementById("whatsapp").value.trim() || mob;
            const mail = document.getElementById("email").value.trim();
            const site = document.getElementById("websiteURL").value.trim() || 'Not Provided';
            const adType = document.getElementById("advertisementType").value;
            const dur = document.getElementById("duration").value;
            const bid = document.getElementById("bidAmount").value.trim() || 'Not Specified';
            const desc = document.getElementById("advertisementDescription").value.trim();
            const terms = document.getElementById("termsAccepted").checked ? 'Yes' : 'No';

            // Populate Preview Elements
            document.getElementById("pv-contactPerson-header").textContent = cPerson;
            document.getElementById("pv-businessName").textContent = bName;
            document.getElementById("pv-contactPerson").textContent = cPerson;
            document.getElementById("pv-mobile").textContent = mob;
            document.getElementById("pv-whatsapp").textContent = wa;
            document.getElementById("pv-email").textContent = mail;
            document.getElementById("pv-websiteURL").textContent = site;
            document.getElementById("pv-advertisementType").textContent = adType;
            document.getElementById("pv-duration").textContent = dur;
            document.getElementById("pv-bidAmount").textContent = bid;
            document.getElementById("pv-advertisementDescription").textContent = desc;
            document.getElementById("pv-termsAccepted").textContent = terms;

            // Submit Button Loading State
            submitBtn.disabled = true;
            submitBtn.textContent = "Registering request...";

            // Submit to Google Sheets Backend
            if (SCRIPT_URL && !SCRIPT_URL.includes('YOUR_APPS_SCRIPT')) {
                fetch(SCRIPT_URL, { method: 'POST', body: new FormData(form) })
                    .then(() => showPreview())
                    .catch(err => {
                        console.error('Error:', err);
                        showPreview();
                    })
                    .finally(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = "Review & Submit Campaign";
                    });
            } else {
                showPreview();
                submitBtn.disabled = false;
                submitBtn.textContent = "Review & Submit Campaign";
            }
        });

        function showPreview() {
            document.getElementById("form-panel").style.display = "none";
            document.getElementById("preview-panel").style.display = "block";
        }

        // 1. Send Mail To Support Click Handler
        document.getElementById("SendEmailBtn").addEventListener("click", function () {
            const bName = document.getElementById("pv-businessName").textContent;
            const subject = `Advertisement Request: ${bName} - Yojna Portal`;
            const body = buildFormattedData();

            const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;
        });

        // 2. Copy All Data Button Handler
        document.getElementById("CopyBtn").addEventListener("click", function () {
            const textToCopy = buildFormattedData();
            const btn = document.getElementById("CopyBtn");

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btn.textContent;
                btn.textContent = "✅ Copied!";
                btn.style.backgroundColor = "#059669";

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = "#0d9488";
                }, 2200);
            }).catch(() => {
                alert("Could not automatically copy. Please select and copy manually.");
            });
        });

        // 3. Show/Hide Support Email Button
        document.getElementById("ShowEmailBtn").addEventListener("click", function () {
            const box = document.getElementById("emailDisplayBox");
            if (box.style.display === "none" || !box.style.display) {
                box.style.display = "block";
                this.textContent = "🙈 Hide Desk Email";
            } else {
                box.style.display = "none";
                this.textContent = "🔍 Show Desk Email";
            }
        });

        // Click Box to Copy Email
        document.getElementById("emailDisplayBox").addEventListener("click", function () {
            navigator.clipboard.writeText(TARGET_EMAIL).then(() => {
                const notify = document.getElementById("emailCopyNotify");
                notify.textContent = "✅ Email copied to clipboard!";
                setTimeout(() => {
                    notify.textContent = "(Click box to copy email address)";
                }, 2000);
            });
        });

        function resetForm() {
            form.reset();
            document.getElementById("preview-panel").style.display = "none";
            document.getElementById("emailDisplayBox").style.display = "none";
            document.getElementById("ShowEmailBtn").textContent = "🔍 Show Desk Email";
            document.getElementById("form-panel").style.display = "block";
        }