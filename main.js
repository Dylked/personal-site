(function () {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const alertBox = document.getElementById("formAlert");
    const submitBtn = document.getElementById("submitBtn");

    function showAlert(type, msg) {
        alertBox.className = `form-alert ${type}`;
        alertBox.textContent = msg;
    }

    function clearAlert() {
        alertBox.className = "form-alert";
        alertBox.textContent = "";
        alertBox.style.display = "none";
    }

    function encode(data) {
        return new URLSearchParams(data).toString();
    }

    function setSubmitting(isSubmitting) {
        submitBtn.disabled = isSubmitting;
        submitBtn.style.opacity = isSubmitting ? "0.85" : "1";
        submitBtn.style.cursor = isSubmitting ? "not-allowed" : "pointer";
        submitBtn.textContent = isSubmitting ? "Sending..." : "Send message →";
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearAlert();

        // ---- Simple JS validations (frontend UX) ----
        const name = form.elements["name"].value.trim();
        const email = form.elements["email"].value.trim();
        const message = form.elements["message"].value.trim();
        const consent = form.elements["consent"].checked;

        // Trim values back into fields (clean)
        form.elements["name"].value = name;
        form.elements["email"].value = email;
        form.elements["message"].value = message;

        if (name.length < 2) {
            showAlert("error", "Please enter your name (min 2 characters).");
            form.elements["name"].focus();
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showAlert("error", "Please enter a valid email address.");
            form.elements["email"].focus();
            return;
        }

        if (message.length < 10) {
            showAlert("error", "Please write a bit more detail (min 10 characters).");
            form.elements["message"].focus();
            return;
        }

        if (!consent) {
            showAlert("error", "Please confirm consent to be contacted.");
            form.elements["consent"].focus();
            return;
        }

        setSubmitting(true);

        try {
            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());

            const res = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode(payload),
            });

            if (!res.ok) throw new Error("Network response was not ok");

            // Success
            showAlert("success", "Message sent. Thanks — I’ll get back to you soon.");
            form.reset();
        } catch (err) {
            showAlert("error", "Something went wrong. Please try again or email me directly.");
        } finally {
            setSubmitting(false);
        }
    });
})();