/* ==========================================================================
   CONFIGURACIÓN GENERAL Y ESTADOS
   ========================================================================== */
// Fecha de la fiesta (Reemplaza con el año, mes [0-11] y día exacto de la gala)
const EVENT_DATE = new Date(2026, 10, 16, 19, 0, 0).getTime(); 

window.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto Inicial: Las cartas de la baraja revelan el botón al cargar la página
    setTimeout(() => {
        const stage = document.querySelector('.doors-stage');
        if (stage) stage.classList.add('doors-open');
    }, 400);

    // 2. Inicializar Cuenta Regresiva Activa
    initCountdown();

    // 3. Configurar Eventos del Sello de Cera e Interactividad
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', triggerGalaTransition);
    }

    // 4. Configurar Ventanas Emergentes (Modales)
    initModals();
});

/* ==========================================================================
   TRANSICIÓN CINEMATOGRÁFICA Y EXPLOSIÓN MÁGICA
   ========================================================================== */
function triggerGalaTransition() {
    const enterBtn = document.getElementById('enter-btn');
    const introSection = document.getElementById('intro');
    const mainScene = document.querySelector('.scene');
    const portal = document.getElementById('portal');
    const videoIntro = document.getElementById('bg-video-intro');
    const videoScene = document.getElementById('bg-video-scene');
    const bgMusic = document.getElementById('bg-music');

    // Desactivar el botón para evitar múltiples clics durante la animación
    if (enterBtn) enterBtn.style.pointerEvents = 'none';

    // A. Lanzar explosión de naipes y destellos flotantes
    createMagicExplosion();

    // B. Activar el Flash del Portal Intermedio (Transición limpia de video)
    setTimeout(() => {
        if (portal) portal.classList.add('active');
    }, 600);

    // C. Intercambio de contenidos y arranque de música de fondo
    setTimeout(() => {
        // Ocultar Intro y mostrar panel principal de invitación
        if (introSection) introSection.classList.add('hidden');
        if (mainScene) mainScene.classList.remove('hidden');

        // Swap de Videos de fondo fluidos
        if (videoIntro) videoIntro.classList.add('video-hidden');
        if (videoScene) {
            videoScene.classList.remove('video-hidden');
            videoScene.play().catch(err => console.log("Video auto-play prevenido:", err));
        }

        // Intento controlado de reproducción de música (Políticas de navegador)
        if (bgMusic) {
            bgMusic.volume = 0.4;
            bgMusic.play().catch(err => {
                console.log("La música requiere interacción previa o permisos:", err);
                // Intento secundario al primer clic del usuario en pantalla
                document.body.addEventListener('click', () => bgMusic.play(), { once: true });
            });
        }
    }, 1200); // Sincronizado exactamente con el pico opaco del portal
}

/* GENERADOR DE PARTÍCULAS EN SLOW-MOTION (CARTA/MAGIA) */
function createMagicExplosion() {
    const container = document.getElementById('explosion-container');
    if (!container) return;

    // Elementos temáticos que saldrán despedidos de adentro hacia afuera
    const particlesPool = ['♦', '♥', '♣', '♠', '✨', '⭐', '🃏', '👑'];
    const particleCount = 75; // Cantidad para poblar la pantalla sin saturar móviles

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.textContent = particlesPool[Math.floor(Math.random() * particlesPool.length)];

        // Ángulo aleatorio de dispersión en 360 grados
        const angle = Math.random() * Math.PI * 2;
        const velocity = 150 + Math.random() * 300; // Fuerza de empuje de la explosión

        // Variables de destino calculadas nativamente por CSS (--x, --y)
        const destX = Math.cos(angle) * velocity + 'px';
        const destY = Math.sin(angle) * velocity + 'px';

        // Estilos aleatorios inyectados individualmente
        p.style.setProperty('--x', destX);
        p.style.setProperty('--y', destY);
        p.style.setProperty('--duration', (1.8 + Math.random() * 1.5) + 's'); // Cámara lenta prolongada
        p.style.setProperty('--rotate', (Math.random() * 720 - 360) + 'deg');
        p.style.setProperty('--size', (14 + Math.random() * 22) + 'px');
        p.style.setProperty('--scale-end', 0.2 + Math.random() * 0.7);

        // Color aleatorio entre los tonos dorados y rojos de la baraja
        p.style.color = Math.random() > 0.5 ? '#e8c77a' : '#ef233c';
        if (p.textContent === '✨' || p.textContent === '⭐') p.style.color = '#fffdf0';

        container.appendChild(p);

        // Limpieza de memoria eliminando los nodos una vez termine la animación
        p.addEventListener('animationend', () => p.remove());
    }
}

/* ==========================================================================
   SISTEMA DE RELOJ: CUENTA REGRESIVA EN TIEMPO REAL
   ========================================================================== */
function initCountdown() {
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    function updateClock() {
        const now = new Date().getTime();
        const timeLeft = EVENT_DATE - now;

        if (timeLeft <= 0) {
            if (daysSpan) daysSpan.textContent = "00";
            if (hoursSpan) hoursSpan.textContent = "00";
            if (minutesSpan) minutesSpan.textContent = "00";
            if (secondsSpan) secondsSpan.textContent = "00";
            clearInterval(clockInterval);
            return;
        }

        // Cálculos matemáticos estándar para conversión de tiempo
        const d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const h = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Renderizado anteponiendo ceros a la izquierda
        if (daysSpan) daysSpan.textContent = d < 10 ? '0' + d : d;
        if (hoursSpan) hoursSpan.textContent = h < 10 ? '0' + h : h;
        if (minutesSpan) minutesSpan.textContent = m < 10 ? '0' + m : m;
        if (secondsSpan) secondsSpan.textContent = s < 10 ? '0' + s : s;
    }

    updateClock(); // Ejecución instantánea inicial
    const clockInterval = setInterval(updateClock, 1000);
}

/* ==========================================================================
   CONTROL DE MODALES (CONFIRMACIONES Y LIBRO DE RECUERDOS)
   ========================================================================== */
function initModals() {
    // Modal de Asistencia
    const openFormBtn = document.getElementById('open-form');
    const closeFormBtn = document.getElementById('close');
    const formModal = document.getElementById('form-modal');
    const sendFormBtn = document.getElementById('send');

    // Modal de Mensajes/Recuerdos
    const openMessageBtn = document.getElementById('open-message');
    const closeMessageBtn = document.getElementById('close-message');
    const messageModal = document.getElementById('message-modal');
    const sendMessageBtn = document.getElementById('send-message');

    // Lógica para Abrir / Cerrar Asistencia
    if (openFormBtn && formModal) openFormBtn.addEventListener('click', () => formModal.classList.add('active'));
    if (closeFormBtn && formModal) closeFormBtn.addEventListener('click', () => {
        formModal.classList.remove('active');
        document.getElementById('status').textContent = "";
    });

    // Lógica para Abrir / Cerrar Mensajes
    if (openMessageBtn && messageModal) openMessageBtn.addEventListener('click', () => messageModal.classList.add('active'));
    if (closeMessageBtn && messageModal) closeMessageBtn.addEventListener('click', () => {
        messageModal.classList.remove('active');
        document.getElementById('message-status').textContent = "";
    });

    // PROCESAMIENTO: Envío de Confirmación de Asistencia vía WhatsApp
    if (sendFormBtn) {
        sendFormBtn.addEventListener('click', () => {
            const name = document.getElementById('nombre').value.trim();
            const guests = document.getElementById('personas').value.trim();
            const statusTxt = document.getElementById('status');

            if (!name || !guests) {
                if (statusTxt) statusTxt.textContent = "⚠️ Por favor, llena todos los campos.";
                return;
            }

            // Construcción del mensaje preestablecido para Karani
            const whatsappText = encodeURIComponent(`¡Hola Karani! ✨ Confirmo mi asistencia a tus Dulces 16. Nombre: ${name}. Lugares reservados: ${guests}. ¡Ahí nos vemos! 🐈‍⬛🌹`);
            const phoneNumber = "1234567890"; // Reemplaza aquí con el número telefónico real (incluyendo código de país)
            
            if (statusTxt) statusTxt.textContent = "¡Abriendo WhatsApp... Mágicamente enviado! 🚀";
            
            setTimeout(() => {
                window.open(`https://wa.me/${phoneNumber}?text=${whatsappText}`, '_blank');
                formModal.classList.remove('active');
                // Limpiar formulario
                document.getElementById('nombre').value = "";
                document.getElementById('personas').value = "";
                if (statusTxt) statusTxt.textContent = "";
            }, 800);
        });
    }

    // PROCESAMIENTO: Guardado Simulado en el Libro de Recuerdos Digital
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', () => {
            const msgName = document.getElementById('message-name').value.trim();
            const msgText = document.getElementById('memory-message').value.trim();
            const msgStatus = document.getElementById('message-status');

            if (!msgName || !msgText) {
                if (msgStatus) msgStatus.textContent = "⚠️ Escribe tu nombre y un mensaje antes de guardar.";
                return;
            }

            if (msgStatus) msgStatus.textContent = "Escribiendo en las hojas del bosque... ✨ Guardado.";

            setTimeout(() => {
                messageModal.classList.remove('active');
                // Limpiar campos del bloque de notas
                document.getElementById('message-name').value = "";
                document.getElementById('memory-message').value = "";
                if (msgStatus) msgStatus.textContent = "";
                alert(`¡Gracias ${msgName}! Tu dedicatoria ha quedado grabada permanentemente.`);
            }, 1000);
        });
    }
}