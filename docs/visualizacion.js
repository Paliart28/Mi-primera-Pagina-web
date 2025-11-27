// ===========================
// SCRIPT DEFINITIVO – FUNCIONA 100%
// ===========================

document.addEventListener("DOMContentLoaded", () => {

  const progressEl = document.getElementById("progress");
  const trainEl = document.getElementById("train");
  const labels = [...document.querySelectorAll(".label")];
  const stations = [...document.querySelectorAll(".station")];
  const sections = [...document.querySelectorAll("main section")];

  if (!progressEl || !trainEl) return;

  // -------- PROGRESO DEL SCROLL --------
  function updateProgress() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const p = Math.min(1, window.scrollY / total);

    // barra
    progressEl.style.transform = `scaleX(${p})`;

    // mover tren
    const trackWidth = progressEl.offsetWidth;
    const x = p * trackWidth;

    trainEl.style.left = `${x}px`;
  }

  window.addEventListener("scroll", updateProgress);
  window.addEventListener("resize", updateProgress);
  updateProgress();

  // -------- SECCIÓN ACTIVA --------
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = sections.findIndex(s => s.id === id);

          labels.forEach((l, i) => l.classList.toggle("label--active", i === index));
          stations.forEach((st, i) => st.classList.toggle("station--active", i === index));
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(sec => io.observe(sec));

});
