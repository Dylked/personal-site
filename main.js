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

const form = document.querySelector(".contact-form");
const email = form.querySelector('input[name="email"]');
const message = form.querySelector('textarea[name="message"]');

form.addEventListener("submit", (e) => {
    // Exemple: message doit faire au moins 10 caractères “utiles”
    const msg = message.value.trim();
    if (msg.length < 10) {
        e.preventDefault();
        message.focus();
        alert("Please write a bit more detail (min 10 characters).");
        return;
    }

    // Exemple: bloque emails trop longs
    if (email.value.length > 254) {
        e.preventDefault();
        email.focus();
        alert("Email address seems too long.");
    }
});


form.addEventListener("submit", (e) => {
    // Exemple: message doit faire au moins 10 caractères “utiles”
    const msg = message.value.trim();
    if (msg.length < 10) {
        e.preventDefault();
        message.focus();
        alert("Please write a bit more detail (min 10 characters).");
        return;
    }

    // Exemple: bloque emails trop longs
    if (email.value.length > 254) {
        e.preventDefault();
        email.focus();
        alert("Email address seems too long.");
    }
});