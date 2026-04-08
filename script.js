const rabbit = document.getElementById("rabbit");
const startScreen = document.getElementById("start-screen");
const scene = document.querySelector(".scene");
const music = document.getElementById("bg-music");

/* CLICK CONEJO */
rabbit.addEventListener("click", () => {

    /* EFECTO CAÍDA */
    startScreen.style.transition = "transform 1s ease-in, opacity 1s";
    startScreen.style.transform = "translateY(-100%) scale(0.5)";
    startScreen.style.opacity = "0";

    setTimeout(() => {
        startScreen.style.display = "none";
        scene.classList.remove("hidden");
    }, 1000);

    /* MÚSICA */
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
});

/* PARTÍCULAS LOCAS */
const container = document.getElementById("particles");

function createParticle() {
    const p = document.createElement("div");
    p.classList.add("particle");

    p.style.left = Math.random() * window.innerWidth + "px";
    p.style.top = window.innerHeight + "px";

    p.animate([
        { transform: "translateY(0)", opacity: 1 },
        { transform: "translateY(-300px)", opacity: 0 }
    ], {
        duration: 4000 + Math.random()*2000
    });

    container.appendChild(p);
    setTimeout(() => p.remove(), 5000);
}

function startParticles() {
    setInterval(createParticle, 200);
}
