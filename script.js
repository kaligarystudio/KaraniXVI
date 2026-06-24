document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       ELEMENTOS
       ========================================================================== */
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

    /* VIDEOS DE FONDO (INTERCAMBIO FLUIDO) */
    const videoIntro = document.getElementById("bg-video-intro");
    const videoScene = document.getElementById("bg-video-scene");

    /* ==========================================================================
       URLS (MÉTODOS CORRECTOS DE GOOGLE SHEETS)
       ========================================================================== */
    const API_URL =
    "https://script.google.com/macros/s/AKfycbwszSOWqX2raT8YmIqiU0l_QuewJti4YoDYJdZwf33Gi08_x6okwjPWV3HhKIM6xRP_/exec";

    const MESSAGE_API_URL =
    "https://script.google.com/macros/s/AKfycbxJdOSoVnGIdC1ksgkS7PrT2-KQ9D7gxcXUt3YdKxFs6GTf-aLqRhXhU5yHVRlwQWip/exec";

    /* ==========================================================================
       EFECTO INICIAL: APERTURA CONTROLADA DE CARTAS AL CARGAR
       ========================================================================== */
    setTimeout(() => {
        const stage = document.querySelector('.doors-stage');
        if (stage) stage.classList.add('doors-open');
    }, 400);

    /* ==========================================================================
       ENTRADA Y TRANSICIÓN CINEMATOGRÁFICA
       ========================================================================== */
    if (enterBtn) {
        enterBtn.addEventListener("click", () => {
            // Desactivar clics repetidos en el sello
            enterBtn.style.pointerEvents = 'none';

            // 1. Lanzar explosión mágica de naipes y destellos
            createMagicExplosion();

            // 2. Activar destello de portal intermedio
            portal?.classList.add("active");

            // 3. Encendido y Fade-In gradual de la música de fondo
            if (music) {
                music.volume = 0;
                music.play().catch((err) => console.log("Auto-play musical contenido:", err));

                let volume = 0;
                const fade = setInterval(() => {
                    volume += 0.05;
                    if (volume >= 0.4) {
                        music.volume = 0.4;
                        clearInterval(fade);
                    } else {
                        music.volume = volume;
                    }
                }, 200);
            }

            // 4. Intercambio de cortinas escénicas y videos
            setTimeout(() => {
                if (intro) intro.style.display = "none";
                scene?.classList.remove("hidden");

                if (videoIntro) videoIntro.classList.add('video-hidden');
                if (videoScene) {
                    videoScene.classList.remove('video-hidden');
                    videoScene.play().catch(() => {});
                }

                // Disparadores de partículas ambientales del bosque
                startLights();
                startFairies();
                startClocks();
                startDragons();

            }, 1200); // Sincronizado con el pico opaco del portal
        });
    }

    /* GENERADOR DE PARTÍCULAS EN SLOW-MOTION (EXPLOSIÓN DE SELLO) */
    function createMagicExplosion() {
        const container = document.getElementById('explosion-container');
        if (!container) return;

        const particlesPool = ['♦', '♥', '♣', '♠', '✨', '⭐', '🃏', '👑'];
        const particleCount = 75;

        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.textContent = particlesPool[Math.floor(Math.random() * particlesPool.length)];

            const angle = Math.random() * Math.PI * 2;
            const velocity = 150 + Math.random() * 300;

            const destX = Math.cos(angle) * velocity + 'px';
            const destY = Math.sin(angle) * velocity + 'px';

            p.style.setProperty('--x', destX);
            p.style.setProperty('--y', destY);
            p.style.setProperty('--duration', (1.8 + Math.random() * 1.5) + 's');
            p.style.setProperty('--rotate', (Math.random() * 720 - 360) + 'deg');
            p.style.setProperty('--size', (14 + Math.random() * 22) + 'px');
            p.style.setProperty('--scale-end', 0.2 + Math.random() * 0.7);

            p.style.color = Math.random() > 0.5 ? '#e8c77a' : '#ef233c';
            if (p.textContent === '✨' || p.textContent === '⭐') p.style.color = '#fffdf0';

            container.appendChild(p);
            p.addEventListener('animationend', () => p.remove());
        }
    }

    /* ==========================================================================
       AMBIENTACIÓN MÁGICA EN SEGUNDO PLANO
       ========================================================================== */
    function startLights() {
        const container = document.getElementById("lights");
        setInterval(() => {
            const light = document.createElement("div");
            light.className = "light";
            light.style.left = Math.random() * 100 + "vw";
            light.style.animationDuration = (6 + Math.random() * 6) + "s";
            container?.appendChild(light);
            setTimeout(() => light.remove(), 12000);
        }, 200);
    }

    function startFairies() {
        const container = document.getElementById("fairies");
        setInterval(() => {
            const fairy = document.createElement("div");
            fairy.className = "fairy";
            fairy.innerHTML = "🧚";
            fairy.style.left = Math.random() * 100 + "vw";
            fairy.style.animationDuration = (10 + Math.random() * 8) + "s";
            container?.appendChild(fairy);
            setTimeout(() => fairy.remove(), 18000);
        }, 3000);
    }

    function startClocks() {
        const container = document.getElementById("clocks");
        setInterval(() => {
            const clock = document.createElement("div");
            clock.className = "clock";
            clock.innerHTML = "🕰️";
            clock.style.left = Math.random() * 100 + "vw";
            clock.style.top = Math.random() * 100 + "vh";
            container?.appendChild(clock);
            setTimeout(() => clock.remove(), 15000);
        }, 4000);
    }

    function startDragons() {
        const container = document.getElementById("dragons");
        setInterval(() => {
            const dragon = document.createElement("div");
            dragon.className = "dragon";
            dragon.innerHTML = "🐉";
            dragon.style.top = Math.random() * 60 + "vh";
            container?.appendChild(dragon);
            setTimeout(() => dragon.remove(), 25000);
        }, 12000);
    }

    /* ==========================================================================
       MODAL ASISTENCIA
       ========================================================================== */
    if (openBtn) openBtn.addEventListener("click", () => modal?.classList.add("active"));
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal?.classList.remove("active");
            const status = document.getElementById("status");
            if (status) status.innerText = "";
        });
    }

    /* ==========================================================================
       LIBRO DE RECUERDOS (GOOGLE WEB APP + EFECTO HUMO)
       ========================================================================== */
    if (openMessageBtn) openMessageBtn.addEventListener("click", () => messageModal?.classList.add("active"));
    if (closeMessageBtn) {
        closeMessageBtn.addEventListener("click", () => {
            messageModal?.classList.remove("active");
            if (messageStatus) messageStatus.innerText = "";
        });
    }

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

                smokeEffect(
                    e.clientX || window.innerWidth / 2,
                    e.clientY || window.innerHeight / 2
                );

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

    /* ==========================================================================
       EFECTO PARTICULAS DE HUMO
       ========================================================================== */
    function smokeEffect(x, y) {
        for (let i = 0; i < 25; i++) {
            const smoke = document.createElement("div");
            smoke.className = "smoke";
            smoke.style.left = x + "px";
            smoke.style.top = y + "px";
            document.body.appendChild(smoke);

            smoke.animate([
                { transform: "translate(0,0) scale(1)", opacity: 1 },
                {
                    transform: `translate(${Math.random() * 200 - 100}px,-200px) scale(3)`,
                    opacity: 0
                }
            ], { duration: 1400 });

            setTimeout(() => smoke.remove(), 1400);
        }
    }

    /* ==========================================================================
       ASISTENCIA REALIZADA (GOOGLE WEB APP + DESCARGA AGENDAMIENTO ICS)
       ========================================================================== */
    if (sendBtn) {
        sendBtn.addEventListener("click", async (e) => {
            const nombre = document.getElementById("nombre")?.value.trim();
            const personas = document.getElementById("personas")?.value.trim();
            const status = document.getElementById("status");

            if (!nombre || !personas) {
                if (status) status.innerText = "Completa todos los datos ✨";
                return;
            }

            if (status) status.innerText = "Enviando magia...";

            try {
                await fetch(API_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, personas })
                });

                if (status) status.innerText = "¡Confirmado! Agendando evento... ✨";

                // Ejecución paralela de humo estético
                smokeEffect(
                    e.clientX || window.innerWidth / 2,
                    e.clientY || window.innerHeight / 2
                );

                // Disparar la descarga automática del calendario nativo del smartphone
                descargarCalendarioGala();

                setTimeout(() => {
                    modal?.classList.remove("active");
                    if (status) status.innerText = "";
                    document.getElementById("nombre").value = "";
                    document.getElementById("personas").value = "";
                }, 2000);

            } catch (error) {
                if (status) status.innerText = "Error al enviar";
                console.error(error);
            }
        });
    }

    /* GENERADOR DE ARCHIVO ICS UNIVERSAL (APPLE / GOOGLE CALENDAR) */
    function descargarCalendarioGala() {
        const titulo = "Dulces 16 de Karani ✨";
        const descripcion = "¡Tu pase real está agendado! Te esperamos para celebrar este momento mágico. Recuerda respetar el Dress Code (Rojo y Negro reservados exclusivamente para Karani). 🐈‍⬛🌹";
        const ubicacion = "Salón de Eventos 'El Reino Mágico', Av. Principal de la Magia #16";
        
        // Sincronizado exactamente para el 8 de Agosto de 2026 a las 18:30 hrs
        const fechaInicio = "20260808T183000";
        const fechaFin = "20260808T235900";

        const icsStructure = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Invitacion Gala//Karani//ES",
            "BEGIN:VEVENT",
            `UID:${new Date().getTime()}@karani16.com`,
            `DTSTAMP:${new Date().getTime()}`,
            `DTSTART:${fechaInicio}`,
            `DTEND:${fechaFin}`,
            `SUMMARY:${titulo}`,
            `DESCRIPTION:${descripcion}`,
            `LOCATION:${ubicacion}`,
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\n");

        const blob = new Blob([icsStructure], { type: "text/calendar;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", "Karani_Dulces_16.ics");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /* ==========================================================================
       SISTEMA DE RELOJ: CUENTA REGRESIVA CON ANTEPOSICIÓN DE CEROS
       ========================================================================== */
    const eventDate = new Date("August 8, 2026 18:30:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        // Añade ceros a la izquierda para mantener la simetría visual de las cajas
        document.getElementById("days").textContent = d < 10 ? "0" + d : d;
        document.getElementById("hours").textContent = h < 10 ? "0" + h : h;
        document.getElementById("minutes").textContent = m < 10 ? "0" + m : m;
        document.getElementById("seconds").textContent = s < 10 ? "0" + s : s;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
