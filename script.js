const rabbit = document.getElementById("rabbit");
const startScreen = document.getElementById("start-screen");
const scene = document.querySelector(".scene");
const music = document.getElementById("bg-music");

/* GOOGLE SCRIPT URL */
const API_URL = "https://script.google.com/macros/s/AKfycbxdDHLQBnv5YX-TLp6CwjZVQ5dJ6yh-N44M6MSiNIQ8rdw7rSTW4ahTTmafGbdmGGqh/exec";

/* INICIO */
rabbit.addEventListener("click", () => {

    startScreen.style.opacity = "0";
    startScreen.style.transition = "1s";

    setTimeout(() => {
        startScreen.style.display = "none";
        scene.classList.remove("hidden");
    }, 1000);

    if (music) {
        music.volume = 0;
        music.play();

        let vol = 0;
        const fade = setInterval(() => {
            vol += 0.05;
            music.volume = vol;
            if (vol >= 0.5) clearInterval(fade);
        }, 200);
    }

    startParticles();
    startCountdown();
});

/* PARTÍCULAS */
function startParticles() {
    setInterval(() => {
        const p = document.createElement("div");
        p.className = "particle";

        p.style.left = Math.random() * window.innerWidth + "px";
        p.style.top = window.innerHeight + "px";

        p.animate([
            { transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(-300px)", opacity: 0 }
        ], { duration: 4000 });

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 4000);
    }, 200);
}

/* COUNTDOWN */
function startCountdown() {
    const el = document.getElementById("countdown");
    const target = new Date("2026-08-08T19:00:00").getTime();

    setInterval(() => {
        const diff = target - new Date().getTime();
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff / (1000*60*60)) % 24);

        el.innerHTML = `${d} días ${h} horas`;
    }, 1000);
}

/* MODAL */
const openBtn = document.getElementById("open-form");
const modal = document.getElementById("form-modal");
const closeBtn = document.getElementById("close");

openBtn.onclick = () => modal.classList.add("active");
closeBtn.onclick = () => modal.classList.remove("active");

/* ENVÍO */
document.getElementById("send").onclick = async () => {

    const nombre = document.getElementById("nombre").value.trim();
    const personas = document.getElementById("personas").value.trim();
    const status = document.getElementById("status");

    if (!nombre || !personas) {
        status.innerText = "Completa todos los campos";
        return;
    }

    status.innerText = "Enviando...";

    try {
        await fetch(API_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, personas })
        });

        status.innerText = "Confirmación enviada 🎉";

        document.getElementById("nombre").value = "";
        document.getElementById("personas").value = "";

    } catch (err) {
        status.innerText = "Error al enviar";
    }
};
