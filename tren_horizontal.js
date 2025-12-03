/* ===========================================================
   TREN ANIMADO — JS FINAL OPTIMIZADO
   Detecta la sección activa y mueve el tren sin errores
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const progressEl = document.getElementById("progress");
  const trainEl = document.getElementById("train");
  const labels = Array.from(document.querySelectorAll(".label"));
  const stations = Array.from(document.querySelectorAll(".station")); // opcional si los usas
  const sections = Array.from(document.querySelectorAll("main section"));

  if (!progressEl || !trainEl || sections.length === 0) return;

  /* -----------------------------------------------------------
     FUNCIÓN — DETERMINAR QUÉ SECCIÓN ESTÁ AL CENTRO DE LA PANTALLA
  ----------------------------------------------------------- */
  function getActiveSectionIndex() {
    const midpoint = window.innerHeight * 0.50;
    let closest = 0;
    let minDist = Infinity;

    sections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      const secMid = rect.top + rect.height / 2;
      const dist = Math.abs(secMid - midpoint);

      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    return closest;
  }

  /* -----------------------------------------------------------
     FUNCIÓN — ACTUALIZA EL TREN Y LOS LABELS
  ----------------------------------------------------------- */
  function updateTrain() {
    const idx = getActiveSectionIndex();
    const total = sections.length - 1 || 1;
    const ratio = idx / total;

    const percent = ratio * 100;

    // Progreso y tren
    progressEl.style.width = `${percent}%`;
    trainEl.style.left = `${percent}%`;

    // Labels activos
    labels.forEach((label, i) => {
      label.classList.toggle("is-active", i === idx);
    });

    // Estaciones activas (si existen)
    stations.forEach((st, i) => {
      st.classList.toggle("is-active", i === idx);
    });
  }

  /* -----------------------------------------------------------
     SCROLL + RESIZE → ACTUALIZA EL TREN
  ----------------------------------------------------------- */
  window.addEventListener("scroll", updateTrain);
  window.addEventListener("resize", updateTrain);
  updateTrain();

  /* -----------------------------------------------------------
     CLICK EN LOS LABELS → SCROLLEAR A SECCIÓN
  ----------------------------------------------------------- */
  labels.forEach((label, idx) => {
    label.addEventListener("click", (e) => {
      e.preventDefault();
      const target = sections[idx];

      if (target) {
        // Ajuste para que la barra superior no tape el título
        const offset = target.getBoundingClientRect().top + window.scrollY - 90;

        window.scrollTo({
          top: offset,
          behavior: "smooth"
        });
      }
    });
  });

});
