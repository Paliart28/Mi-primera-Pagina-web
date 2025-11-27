document.addEventListener("DOMContentLoaded", () => {
  const progressEl = document.getElementById("progress");
  const trainEl = document.getElementById("train");
  const sections = Array.from(document.querySelectorAll("main section"));
  const labels = Array.from(document.querySelectorAll(".label"));
  const stations = Array.from(document.querySelectorAll(".station"));

  if (!progressEl || !trainEl || sections.length === 0) {
    console.error("ERROR: No se encontraron los elementos necesarios.");
    return;
  }

  /* ============================================================
     ACTUALIZAR BARRA DE PROGRESO Y POSICIÓN DEL TREN
     ============================================================ */

  const updateTrain = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollY = window.scrollY;

    let progress = scrollY / maxScroll;
    progress = Math.max(0, Math.min(1, progress));

    // Actualizar barra de progreso
    progressEl.style.transform = `scaleX(${progress})`;

    // Mover tren horizontalmente
    const trackWidth = progressEl.parentElement.offsetWidth;
    const trainX = progress * trackWidth;

    trainEl.style.left = `${trainX}px`;
  };

  window.addEventListener("scroll", updateTrain);
  window.addEventListener("resize", updateTrain);
  updateTrain();

  /* ============================================================
     INTERSECTION OBSERVER → MARCAR SECCIÓN ACTIVA
     ============================================================ */

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeId = entry.target.id;
          const index = sections.findIndex((s) => s.id === activeId);

          labels.forEach((l, i) =>
            l.classList.toggle("label--active", i === index)
          );

          stations.forEach((s, i) =>
            s.classList.toggle("station--active", i === index)
          );
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));

  /* ============================================================
     CLICK EN ETIQUETAS PARA SCROLL SUAVE
     ============================================================ */

  labels.forEach((label) => {
    label.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = label.getAttribute("href").replace("#", "");
      const target = document.getElementById(targetId);
      const headerHeight = document.querySelector(".railway").offsetHeight;

      const y = target.offsetTop - headerHeight - 10;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    });
  });
});
