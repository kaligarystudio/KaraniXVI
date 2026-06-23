document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       1. ELEMENTOS DEL DOM
       ========================================================================== */
    const intro = document.getElementById("intro");
    const portal = document.getElementById("portal");
    const enterBtn = document.getElementById("enter-btn");
    const scene = document.querySelector(".scene");
    const music = document.getElementById("bg-music");

    // Modal de Asistencia
    const openBtn = document.getElementById("open-form");
    const modal = document.getElementById("form-modal");
    const closeBtn = document.getElementById("close");
    const sendBtn = document.getElementById("send");
    const status = document.getElementById("status");

    // Modal de Libro de Recuerdos
    const messageModal = document.getElementById("message-modal");
    const openMessageBtn = document.getElementById("open-message");
    const closeMessageBtn = document.getElementById("close-message");
    const sendMessageBtn = document.getElementById("send-message");
    const messageStatus = document.getElementById("message-status");

    /* ==========================================================================
       2. URLS DE GOOGLE APPS SCRIPT (APIs)
       ========================================================================== */
    const API_URL = "https://script.google.com/macros/s/AKfycbwszSOWqX2raT8YmIqiU0l_QuewJti4YoDYJdZwf33Gi08_x6okwjPWV3HhKIM6xRP_/exec";
    const MESSAGE_API_URL = "https://script.google.com/macros/s/AKfycbxJdOSoVnGIdC1ksgkS7PrT2-KQ9D7gxcXUt3YdKxFs6GTf-aLqRhXhU5yHVRlwQWip/exec";

    /* ==========================================================================
       3. LÓGICA DE LA INTRO Y EXPLOSIÓN EN CÁMARA LENTA
       ========================================================================== */
    if (enterBtn) {
        enterBtn.addEventListener("click", () => {
            const explosionContainer = document.getElementById("explosion-container");
            const introContent = document.querySelector(".intro-content");
            
            // Ocultar suavemente el texto del sobre
            if (introContent) introContent.style.opacity = "0";

            // Configuración del estallido cinemático
            const particleTypes = ["⚙️", "✉️", "✨", "🕰️", "📜", "⚙️"]; 
            const totalParticles = 75; 

            for (let i = 0; i < totalParticles; i++) {
                const particle = document.createElement("div");
                particle.className = "particle";
                particle.innerText = particleTypes[Math.floor(Math.random() * particleTypes.length)];

                // Física radial del disparo de partículas
                const angle = Math.random() * Math.PI * 2;
                const velocity = 120 + Math.random() * 280; 
                const x = Math.cos(angle) * velocity + "px";
                const y = Math.sin(angle) * velocity + "px";
                
                // Tiempos prolongados para simular la cámara lenta (Slow-Motion)
                const duration = 2.5 + Math.random() * 1.5 + "s";
                const size = 16 + Math.random() * 26 + "px";
                const rotate = (Math.random() - 0.5) * 360 + "deg"; 
                const scaleEnd = 0.7 + Math.random() * 0.8;

                // Asignar variables al CSS de cada partícula
                particle.style.setProperty("--x", x);
                particle.style.setProperty("--y", y);
                particle.style.setProperty("--duration", duration);
                particle.style.setProperty("--size", size);
                particle.style.setProperty("--rotate", rotate);
                particle.style.setProperty("--scale-end", scaleEnd);

                explosionContainer?.appendChild(particle);
            }

            // Activar el portal de transición a mitad de la flotación (1.5 segundos)
            setTimeout(() => {
                portal?.classList.add("active");
            }, 1500);

            // Encendido gradual de la música de fondo (Fade-in)
            if (music) {
                music.volume = 0;
                music.play().catch(err => console.log("Audio bloqueado temporalmente por navegador:", err));
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

            // Revelación definitiva de la invitación principal
            setTimeout(() => {
                if (intro) intro.style.display = "none";
                scene?.classList.remove("hidden");
            }, 2400); 
        });
    }

    /* ==========================================================================
       4. CONTROL DE MODALES (ASISTENCIA Y MENSAJES)
       ========================================================================== */
    // Abrir / Cerrar Asistencia
    openBtn?.addEventListener("click", () => modal?.classList.add("active"));
    closeBtn?.addEventListener("click", () => modal?.classList.remove("active"));

    // Abrir / Cerrar Libro de Recuerdos
    openMessageBtn?.addEventListener("click", () => messageModal?.classList.add("active"));
    closeMessageBtn?.addEventListener("click", () => messageModal?.classList.remove("active"));

    // Cerrar modales haciendo clic fuera del recuadro
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
        if (e.target === messageModal) messageModal.classList.remove("active");
    });

    /* ==========================================================================
       5. ENVÍO DE FORMULARIO DE ASISTENCIA (API 1)
       ========================================================================== */
    sendBtn?.addEventListener("click", async () => {
        const nombre = document.getElementById("nombre").value.trim();
        const personas = document.getElementById("personas").value.trim();

        if (!nombre || !personas) {
            if (status) status.innerText = "Por favor, llena todos los campos.";
            return;
        }

        if (status) status.innerText = "Enviando confirmación... ✨";

        try {
            await fetch(API_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, personas })
            });

            if (status) status.innerText = "¡Asistencia confirmada! 🎉";

            setTimeout(() => {
                modal?.classList.remove("active");
                if (status) status.innerText = "";
                document.getElementById("nombre").value = "";
                document.getElementById("personas").value = "";
            }, 1800);

        } catch (error) {
            if (status) status.innerText = "Error al enviar. Intenta de nuevo.";
            console.error(error);
        }
    });

    /* ==========================================================================
       6. ENVÍO DE MENSAJES AL LIBRO DE RECUERDOS (API 2)
       ========================================================================== */
    sendMessageBtn?.addEventListener("click", async () => {
        const nombre = document.getElementById("message-name").value.trim();
        const mensaje = document.getElementById("memory-message").value.trim();

        if (!nombre || !mensaje) {
            if (messageStatus) messageStatus.innerText = "Por favor, llena todos los campos.";
            return;
        }

        if (messageStatus) messageStatus.innerText = "Guardando en el bosque... 📜";

        try {
            await fetch(MESSAGE_API_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, mensaje })
            });

            if (messageStatus) messageStatus.innerText = "¡Tu mensaje ha sido guardado! ✨";

            setTimeout(() => {
                messageModal?.classList.remove("active");
                if (messageStatus) messageStatus.innerText = "";
                document.getElementById("message-name").value = "";
                document.getElementById("memory-message").value = "";
            }, 1800);

        } catch (error) {
            if (messageStatus) messageStatus.innerText = "Error al guardar el mensaje.";
            console.error(error);
        }
    });

    /* ==========================================================================
       7. RELOJ DE CUENTA REGRESIVA
       ========================================================================== */
    const eventDate = new Date("August 8, 2026 19:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        // Si la fecha ya pasó, detener el intervalo
        if (distance < 0) {
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Renderizado en el DOM con ceros a la izquierda si es necesario
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl) daysEl.textContent = days < 10 ? "0" + days : days;
        if (hoursEl) hoursEl.textContent = hours < 10 ? "0" + hours : hours;
        if (minutesEl) minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
        if (secondsEl) secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
    }

    // Ejecutar inmediatamente y programar actualización cada segundo
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
});