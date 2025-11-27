document.addEventListener("DOMContentLoaded", () => {

  const progress = document.getElementById("progress");
  const train = document.getElementById("train");
  const labels = [...document.querySelectorAll(".label")];
  const stations = [...document.querySelectorAll(".station")];
  const sections = [...document.querySelectorAll("main section")];

  function updateTrain() {

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const p = window.scrollY / maxScroll;

    // Barra de progreso
    progress.style.transform = `scaleX(${p})`;

    // ANCHO REAL DE TODA LA VÍA
    const track = document.querySelector(".railway__track");
    const trackWidth = track.offsetWidth;

    // Mueve el tren uniformemente por toda la vía
    train.style.left = `${p * trackWidth}px`;
  }

  window.addEventListener("scroll", updateTrain);
  window.addEventListener("resize", updateTrain);
  updateTrain();

  // === ACTIVA ESTACIONES Y LABELS SEGÚN SECCIÓN ===
  const io = new IntersectionObserver(
    entries => {
      let visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b)=> b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      let idx = sections.indexOf(visible.target);

      labels.forEach((l,i)=> l.classList.toggle("label--active", i===idx));
      stations.forEach((s,i)=> s.classList.toggle("station--active", i===idx));
    },
    { threshold: [0.35, 0.6] }
  );

  sections.forEach(s => io.observe(s));
});
