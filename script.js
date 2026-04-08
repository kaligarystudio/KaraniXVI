document.addEventListener("DOMContentLoaded", () => {

const rabbit = document.getElementById("rabbit");
const startScreen = document.getElementById("start-screen");
const scene = document.querySelector(".scene");
const tunnel = document.getElementById("tunnel");
const music = document.getElementById("bg-music");

const modal = document.getElementById("form-modal");

/* ENTRADA */
rabbit.onclick = () => {

    tunnel.classList.add("active");

    if (music) {
        music.volume = 0;
        music.play();

        let v = 0;
        const fade = setInterval(()=>{
            v += 0.05;
            music.volume = v;
            if(v>=0.5) clearInterval(fade);
        },200);
    }

    setTimeout(() => {
        startScreen.style.display = "none";
        scene.classList.remove("hidden");
        startFloating();
    }, 1500);
};

/* OBJETOS */
function startFloating() {
    const container = document.getElementById("floating");

    setInterval(() => {
        const el = document.createElement("div");
        el.className = "floating";

        const items = ["🎩","🃏","♠️","♥️"];
        el.innerText = items[Math.floor(Math.random()*items.length)];

        el.style.left = Math.random()*100 + "vw";

        container.appendChild(el);

        setTimeout(()=>el.remove(),6000);
    }, 400);
}

/* MODAL */
document.getElementById("open-form").onclick = () => modal.classList.add("active");
document.getElementById("close").onclick = () => modal.classList.remove("active");

/* HUMO */
function humo(x,y){
    for(let i=0;i<20;i++){
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
const sendBtn = document.getElementById("send");

sendBtn.addEventListener("click", async (e) => {
    await fetch("https://script.google.com/macros/s/AKfycbxdDHLQBnv5YX-TLp6CwjZVQ5dJ6yh-N44M6MSiNIQ8rdw7rSTW4ahTTmafGbdmGGqh/exec",{
        method:"POST",
        mode:"no-cors",
        body: JSON.stringify({
            nombre: document.getElementById("nombre").value,
            personas: document.getElementById("personas").value
        })
    });

    humo(e.clientX||200,e.clientY||200);

    setTimeout(()=>modal.classList.remove("active"),1000);
});

});
