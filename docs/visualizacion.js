(() => {
  const progressEl = document.getElementById("progress");
  const trainEl = document.getElementById("train");
  const labels = Array.from(document.querySelectorAll(".label"));
  const stations = Array.from(document.querySelectorAll(".station"));
  const sections = Array.from(document.querySelectorAll("main section"));

  if (!progressEl || !trainEl || !sections.length) return;

  /* ===============================
     AVANCE POR SECCIÓN (NO SCROLL)
     Cada sección activa = tren avanza
     =============================== */

  const io = new IntersectionObserver(
    (entries) => {
      let best = null;

      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
      }
      if (!best) return;

      const id = best.target.id;
      const index = sections.findIndex((s) => s.id === id);
      if (index === -1) return;

      const percentage = index / (sections.length - 1);

      // Avanza barra y tren
      progressEl.style.transform = `scaleX(${percentage})`;
      trainEl.style.left = `${percentage * 100}%`;

      // Activación visual
      labels.forEach((l, i) => l.classList.toggle("label--active", i === index));
      stations.forEach((st, i) => st.classList.toggle("station--active", i === index));
    },
    {
      threshold: [0.4, 0.6],
      rootMargin: "-25% 0px -35% 0px",
    }
  );

  sections.forEach((sec) => io.observe(sec));

  /* ===============================
     CLICK EN LABEL → SCROLL SUAVE
     =============================== */

  document.querySelector(".railway__labels").addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#']");
    if (!a) return;

    e.preventDefault();
    const id = a.getAttribute("href").slice(1);
    const target = document.getElementById(id);

    const headerH = document.querySelector(".railway").getBoundingClientRect().height;
    const y =
      target.getBoundingClientRect().top + window.scrollY - (headerH + 16);

    window.scrollTo({ top: y, behavior: "smooth" });
  });
})();
