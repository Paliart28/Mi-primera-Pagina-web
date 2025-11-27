document.addEventListener("DOMContentLoaded", () => {
  const progress = document.getElementById("progress");
  const train = document.getElementById("train");
  const labels = [...document.querySelectorAll(".label")];
  const stations = [...document.querySelectorAll(".station")];
  const sections = [...document.querySelectorAll("main section")];

  function updateTrain() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, window.scrollY / maxScroll));

    // Actualiza barra
    if (progress) {
      progress.style.transform = `scaleX(${p})`;
    }

    // Mueve el tren
    if (train && progress) {
      const trackWidth = progress.parentElement.getBoundingClientRect().width;
      train.style.left = `${p * trackWidth}px`;
    }
  }

  window.addEventListener("scroll", updateTrain);
  window.addEventListener("resize", updateTrain);
  updateTrain();

  // Monitor para activar labels y estaciones
  const io = new IntersectionObserver(
    entries => {
      let best = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!best) return;

      const idx = sections.indexOf(best.target);
      if (idx < 0) return;

      labels.forEach((l, i) => l.classList.toggle("label--active", i === idx));
      stations.forEach((s, i) => s.classList.toggle("station--active", i === idx));
    },
    { threshold: [0.25, 0.5, 0.7] }
  );

  sections.forEach(s => io.observe(s));
});
