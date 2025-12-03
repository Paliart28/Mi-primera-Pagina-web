// Cuando la página carga, animamos el tren
window.addEventListener("load", () => {
    const tren = document.getElementById("tren-animado");
    if (tren) {
        tren.classList.add("tren-animando");
    }

    const btn = document.getElementById("btn-iniciar");
    if (btn) {
        btn.addEventListener("click", () => {
            // Pequeña demora para que se sienta el viaje
            setTimeout(() => {
                window.location.href = "index2.html";
            }, 300);
        });
    }
});
