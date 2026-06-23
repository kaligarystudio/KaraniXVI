document.addEventListener("DOMContentLoaded", () => {

/* =========================
   ELEMENTOS
========================= */
const intro = document.getElementById("intro");
const portal = document.getElementById("portal");
const enterBtn = document.getElementById("enter-btn");

const scene = document.querySelector(".scene");
const music = document.getElementById("bg-music");

const openBtn = document.getElementById("open-form");
const modal = document.getElementById("form-modal");
const closeBtn = document.getElementById("close");
const sendBtn = document.getElementById("send");

/* LIBRO DE RECUERDOS */
const messageModal = document.getElementById("message-modal");
const openMessageBtn = document.getElementById("open-message");
const closeMessageBtn = document.getElementById("close-message");
const sendMessageBtn = document.getElementById("send-message");
const messageStatus = document.getElementById("message-status");

/* =========================
   URLS DE INTEGRACIÓN (MANTENIDAS)
========================= */
const API_URL = "https://script.google.com/macros/s/AKfycbwszSOWqX2raT8YmIqiU0l_QuewJti4YoDYJdZwf33Gi08_x6okwjPWV3HhKIM6xRP_/exec";
const MESSAGE_API_URL = "https://script.google.com/macros/s/AKfycbxJdOSoVnGIdC1ksgkS7PrT2-KQ9D7gxcXUt3YdKxFs6GTf-aLqRhXhU5yHVRlwQWip/exec";

/* =========================
   TRANSICIÓN DE ENTRADA DINÁMICA (ESTILO VIDEO)
========================= */
if (enterBtn) {
    enterBtn.addEventListener("click", () => {
        const explosionContainer = document.getElementById("explosion-container");
        const introContent = document.querySelector(".intro-content");
        
        if (introContent) introContent.style.opacity = "0";

        const particleTypes = ["⚙️", "✉️", "✨", "🕰️", "📜", "⚙️"]; 
        const totalParticles = 75; 

        for (let i = 0; i < totalParticles; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.innerText = particleTypes[Math.floor(Math.random() * particleTypes.length)];

            const angle = Math.random() * Math.PI * 2;
            // Distancia ligeramente más corta para que se concentre el efecto flotante
            const velocity = 120 + Math.random() * 280; 
            const x = Math.cos(angle) * velocity + "px";
            const y = Math.sin(angle) * velocity + "px";
            
            // DURACIÓN EXTENDIDA: Entre 2.5 y 4 segundos para el efecto Slow-Motion
            const duration = 2.5 + Math.random() * 1.5 + "s";
            const size = 16 + Math.random() * 26 + "px";
            // Rotación más sutil y elegante durante la flotación
            const rotate = (Math.random() - 0.5) * 360 + "deg"; 
            const scaleEnd = 0.7 + Math.random() * 0.8;

            particle.style.setProperty("--x", x);
            particle.style.setProperty("--y", y);
            particle.style.setProperty("--duration", duration);
            particle.style.setProperty("--size", size);
            particle.style.setProperty("--rotate", rotate);
            particle.style.setProperty("--scale-end", scaleEnd);

            explosionContainer?.appendChild(particle);
        }

        // El portal se activa más tarde (a los 1.5 segundos) para apreciar la cámara lenta
        setTimeout(() => {
            portal?.classList.add("active");
        }, 1500);

        if (music) {
            music.volume = 0;
            music.play().catch(() => {});
            let volume = 0;
            const fade = setInterval(() => {
                volume += 0.05;
                if (volume >= 0.5) {
                    music.volume = 0.5;
                    clearInterval(fade);
                } else {
                    music.volume = volume;
                }
            }, 150);
        }

        // La escena principal aparece cuando los objetos casi se desvanecen por completo
        setTimeout(() => {
            if (intro) intro.style.display = "none";
            scene?.classList.remove("hidden");
        }, 2400); 
    });
}

/* =========================
   CONTROL DE MODALES (MANTENIDOS)
========================= */
if (openBtn) { openBtn.addEventListener("click", () => { modal?.classList.add("active"); }); }
if (closeBtn) { closeBtn.addEventListener("click", () => { modal?.classList.remove("active"); }); }

if (openMessageBtn) { openMessageBtn.addEventListener("click", () => { messageModal?.classList.add("active"); }); }
if (closeMessageBtn) {
    closeMessageBtn.addEventListener("click", () => {
        messageModal?.classList.remove("active");
        if (messageStatus) messageStatus.innerText = "";
    });
}

/* =========================
   ENVÍO DE ASISTENCIA (MANTENIDO)
========================= */
if (sendBtn) {
    sendBtn.addEventListener("click", async (e) => {
        const nombre = document.getElementById("nombre")?.value.trim();
        const personas = document.getElementById("personas")?.value.trim();
        const status = document.getElementById("status");

        if (!nombre || !personas) {
            if (status) status.innerText = "Completa los campos ✨";
            return;
        }

        if (status) status.innerText = "Confirmando...";

        try {
            await fetch(API_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, personas })
            });

            if (status) status.innerText = "¡Asistencia confirmada! ✨";

            setTimeout(() => {
                modal?.classList.remove("active");
                if (status) status.innerText = "";
                document.getElementById("nombre").value = "";
                document.getElementById("personas").value = "";
            }, 1800);

        } catch (error) {
            if (status) status.innerText = "Error al enviar";
            console.error(error);
        }
    });
}

/* =========================
   ENVÍO AL LIBRO DE RECUERDOS (MANTENIDO)
========================= */
if (sendMessageBtn) {
    sendMessageBtn.addEventListener("click", async (e) => {
        const nombre = document.getElementById("message-name")?.value.trim();
        const mensaje = document.getElementById("memory-message")?.value.trim();

        if (!nombre || !mensaje) {
            if (messageStatus) messageStatus.innerText = "Completa todos los datos ✨";
            return;
        }

        if (messageStatus) messageStatus.innerText = "Guardando magia...";

        try {
            await fetch(MESSAGE_API_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, mensaje })
            });

            if (messageStatus) messageStatus.innerText = "Tu recuerdo quedó grabado ✨";

            setTimeout(() => {
                document.getElementById("message-name").value = "";
                document.getElementById("memory-message").value = "";
                messageModal?.classList.remove("active");
                if (messageStatus) messageStatus.innerText = "";
            }, 2000);

        } catch (error) {
            if (messageStatus) messageStatus.innerText = "Error al guardar";
            console.error(error);
        }
    });
}

/* =========================
   CUENTA REGRESIVA RE-SINCRONIZADA
========================= */
const eventDate = new Date("August 8, 2026 19:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) return;

    document.getElementById("days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutes").textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("seconds").textContent = Math.floor((distance % (1000 * 60)) / 1000);
}

updateCountdown();
setInterval(updateCountdown, 1000);

});