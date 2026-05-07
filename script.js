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

const API_URL =
"https://script.google.com/macros/s/AKfycbxdDHLQBnv5YX-TLp6CwjZVQ5dJ6yh-N44M6MSiNIQ8rdw7rSTW4ahTTmafGbdmGGqh/exec";

/* =========================
   ENTRADA
========================= */

enterBtn.addEventListener("click", () => {

    portal.classList.add("active");

    if(music){

        music.volume = 0;

        music.play().catch(()=>{});

        let volume = 0;

        const fade = setInterval(() => {

            volume += 0.05;

            music.volume = volume;

            if(volume >= 0.5){
                clearInterval(fade);
            }

        }, 200);
    }

    setTimeout(() => {

        intro.style.display = "none";

        scene.classList.remove("hidden");

        startLights();
        startFairies();
        startClocks();
        startDragons();

    }, 1700);

});

/* =========================
   LUCES
========================= */

function startLights(){

    const container =
    document.getElementById("lights");

    setInterval(() => {

        const light =
        document.createElement("div");

        light.className = "light";

        light.style.left =
        Math.random() * 100 + "vw";

        light.style.animationDuration =
        (6 + Math.random() * 6) + "s";

        container.appendChild(light);

        setTimeout(() => {
            light.remove();
        }, 12000);

    }, 200);
}

/* =========================
   HADAS
========================= */

function startFairies(){

    const container =
    document.getElementById("fairies");

    setInterval(() => {

        const fairy =
        document.createElement("div");

        fairy.className = "fairy";

        fairy.innerHTML = "🧚";

        fairy.style.left =
        Math.random() * 100 + "vw";

        fairy.style.animationDuration =
        (10 + Math.random() * 8) + "s";

        container.appendChild(fairy);

        setTimeout(() => {
            fairy.remove();
        }, 18000);

    }, 3000);
}

/* =========================
   RELOJES
========================= */

function startClocks(){

    const container =
    document.getElementById("clocks");

    setInterval(() => {

        const clock =
        document.createElement("div");

        clock.className = "clock";

        clock.innerHTML = "🕰️";

        clock.style.left =
        Math.random() * 100 + "vw";

        clock.style.top =
        Math.random() * 100 + "vh";

        container.appendChild(clock);

        setTimeout(() => {
            clock.remove();
        }, 15000);

    }, 4000);
}

/* =========================
   DRAGONES
========================= */

function startDragons(){

    const container =
    document.getElementById("dragons");

    setInterval(() => {

        const dragon =
        document.createElement("div");

        dragon.className = "dragon";

        dragon.innerHTML = "🐉";

        dragon.style.top =
        Math.random() * 60 + "vh";

        container.appendChild(dragon);

        setTimeout(() => {
            dragon.remove();
        }, 25000);

    }, 12000);
}

/* =========================
   MODAL
========================= */

openBtn.addEventListener("click", () => {

    modal.classList.add("active");

});

closeBtn.addEventListener("click", () => {

    modal.classList.remove("active");

});

/* =========================
   HUMO
========================= */

function smokeEffect(x, y){

    for(let i = 0; i < 25; i++){

        const smoke =
        document.createElement("div");

        smoke.className = "smoke";

        smoke.style.left = x + "px";
        smoke.style.top = y + "px";

        document.body.appendChild(smoke);

        smoke.animate([
            {
                transform:"translate(0,0) scale(1)",
                opacity:1
            },
            {
                transform:
                `translate(
                ${Math.random()*200-100}px,
                -200px
                ) scale(3)`,

                opacity:0
            }
        ],{
            duration:1400
        });

        setTimeout(() => {
            smoke.remove();
        }, 1400);
    }
}

/* =========================
   ENVÍO
========================= */

sendBtn.addEventListener("click", async (e) => {

    const nombre =
    document.getElementById("nombre")
    .value
    .trim();

    const personas =
    document.getElementById("personas")
    .value
    .trim();

    const status =
    document.getElementById("status");

    if(!nombre || !personas){

        status.innerText =
        "Completa todos los datos ✨";

        return;
    }

    status.innerText =
    "Enviando magia...";

    try{

        await fetch(API_URL,{

            method:"POST",

            mode:"no-cors",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                nombre,
                personas
            })
        });

        status.innerText =
        "¡Asistencia confirmada! ✨";

        smokeEffect(
            e.clientX || window.innerWidth / 2,
            e.clientY || window.innerHeight / 2
        );

        setTimeout(() => {

            modal.classList.remove("active");

            status.innerText = "";

            document.getElementById("nombre").value = "";
            document.getElementById("personas").value = "";

        }, 1800);

    }catch(error){

        status.innerText =
        "Error al enviar";

        console.error(error);
    }

});
});