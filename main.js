(function () {
    const btn = document.getElementById("themeToggle");
    const body = document.body;

    btn.addEventListener("click", () => {
        body.classList.toggle("theme-light");
        btn.textContent = body.classList.contains("theme-light") ? "☀️" : "🌙";
    });

    // smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
            const target = document.querySelector(a.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        });
    });

    const form = document.getElementById("contactForm");
    const alertBox = document.getElementById("formAlert");
    const submitBtn = document.getElementById("submitBtn");

    if (!form || !alertBox || !submitBtn) return;

    function showAlert(type, msg) {
        alertBox.className = `form-alert ${type}`;
        alertBox.textContent = msg;       // ✅ textContent (pas innerHTML)
    }

    function clearAlert() {
        alertBox.className = "form-alert";
        alertBox.textContent = "";
    }

    function encode(obj) {
        return new URLSearchParams(obj).toString();
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearAlert();

        const name = form.elements["name"].value.trim();
        const email = form.elements["email"].value.trim();
        const message = form.elements["message"].value.trim();
        const consent = form.elements["consent"].checked;

        console.log("name", name)
        console.log("email", email)
        console.log("message", message)
        console.log("consent", consent)

        if (name.length < 2) return showAlert("error", "Please enter your name (min 2 characters).");
        if (!/^\S+@\S+\.\S+$/.test(email)) return showAlert("error", "Please enter a valid email address.");
        if (message.length < 10) return showAlert("error", "Please write a bit more detail (min 10 characters).");
        if (!consent) return showAlert("error", "Please confirm consent to be contacted.");

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        try {
            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());

            const res = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode(payload),
            });

            if (!res.ok) throw new Error("Request failed");

            showAlert("success", "Message sent. Thanks — I’ll get back to you soon.");
            form.reset();
        } catch (err) {
            showAlert("error", "Something went wrong. Please try again or email me directly to dn.nunezdylan@gmail.com .");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send message →";
        }
    })
})();
