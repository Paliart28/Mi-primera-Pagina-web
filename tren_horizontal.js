/* Tren sincronizado con secciones */

document.addEventListener("DOMContentLoaded", () => {
  const progressEl = document.getElementById("progress");
  const trainEl = document.getElementById("train");

  const labels = Array.from(document.querySelectorAll(".label"));
  const stations = Array.from(document.querySelectorAll(".station"));
  const sections = Array.from(document.querySelectorAll("main section"));

  if (!progressEl || !trainEl || sections.length === 0) return;

  function getActiveSectionIndex() {
    const viewportCenter = window.innerHeight / 2;
    let bestIdx = 0;
    let bestDist = Infinity;

    sections.forEach((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      const secCenter = rect.top + rect.height / 2;
      const d = Math.abs(secCenter - viewportCenter);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = idx;
      }
    });

    return bestIdx;
  }

  function updateTrain() {
    const idx = getActiveSectionIndex();
    const total = sections.length - 1 || 1;
    const ratio = idx / total;

    const percent = ratio * 100;
    progressEl.style.width = `${percent}%`;
    trainEl.style.left = `${percent}%`;

    labels.forEach((lab, i) => lab.classList.toggle("is-active", i === idx));
    stations.forEach((s, i) => s.classList.toggle("is-active", i === idx));
  }

  // Scroll listener
  window.addEventListener("scroll", updateTrain);
  window.addEventListener("resize", updateTrain);
  updateTrain();

  // Click en etiquetas → scroll a secciones
  labels.forEach((lab, idx) => {
    lab.addEventListener("click", (e) => {
      e.preventDefault();
      const target = sections[idx];
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 90; // margen por la barra
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });
});