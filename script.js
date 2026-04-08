document.addEventListener("DOMContentLoaded", () => {

const rabbit = document.getElementById("rabbit");
const startScreen = document.getElementById("start-screen");
const scene = document.querySelector(".scene");

const openBtn = document.getElementById("open-form");
const modal = document.getElementById("form-modal");
const closeBtn = document.getElementById("close");
const sendBtn = document.getElementById("send");

const API_URL = "https://script.google.com/macros/s/AKfycbxdDHLQBnv5YX-TLp6CwjZVQ5dJ6yh-N44M6MSiNIQ8rdw7rSTW4ahTTmafGbdmGGqh/exec";

/* ENTRADA */
rabbit.addEventListener("click", () => {
    startScreen.style.opacity = "0";

    setTimeout(() => {
        startScreen.style.display = "none";
        scene.classList.remove("hidden");
        startFloating();
    }, 1000);
});

/* OBJETOS */
function startFloating() {
    const container = document.getElementById("floating");

    setInterval(() => {
        const el = document.createElement("div");
        el.className = "floating";

        const items = ["🎩","🃏","⏱️"];
        el.innerText = items[Math.floor(Math.random()*items.length)];

        el.style.left = Math.random()*100 + "vw";

        container.appendChild(el);

        setTimeout(() => el.remove(), 6000);
    }, 500);
}

/* MODAL */
openBtn.addEventListener("click", () => modal.classList.add("active"));
closeBtn.addEventListener("click", () => modal.classList.remove("active"));

/* HUMO */
function humo(x,y){
    for(let i=0;i<25;i++){
        let s=document.createElement("div");
        s.className="smoke";
        s.style.left=x+"px";
        s.style.top=y+"px";
        document.body.appendChild(s);

        s.animate([
            {transform:"translate(0,0)",opacity:1},
            {transform:`translate(${Math.random()*200-100}px,-200px)`,opacity:0}
        ],{duration:1000});

        setTimeout(()=>s.remove(),1000);
    }
}

/* ENVÍO */
sendBtn.addEventListener("click", async (e) => {

    const nombre = document.getElementById("nombre").value.trim();
    const personas = document.getElementById("personas").value.trim();
    const status = document.getElementById("status");

    if (!nombre || !personas) {
        status.innerText = "Completa los datos";
        return;
    }

    status.innerText = "Enviando...";

    try {
        await fetch(API_URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({ nombre, personas })
        });

        status.innerText = "Confirmado 🎉";

        humo(e.clientX || 200, e.clientY || 200);

        setTimeout(() => {
            modal.classList.remove("active");
            status.innerText = "";
        }, 1000);

    } catch {
        status.innerText = "Error";
    }
});

});
