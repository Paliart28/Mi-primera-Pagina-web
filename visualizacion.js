document.addEventListener("DOMContentLoaded", () => {
  const progress = document.getElementById("progress");
  const train = document.getElementById("train");
  const labels = [...document.querySelectorAll(".label")];
  const stations = [...document.querySelectorAll(".station")];
  const sections = [...document.querySelectorAll("main section")];

  function updateTrain() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const p = window.scrollY / maxScroll;

    if (progress) {
      progress.style.transform = `scaleX(${p})`;
    }
    if (train) {
      const trackWidth = progress.parentElement.offsetWidth;
      train.style.left = `${p * trackWidth}px`;
    }
  }

  window.addEventListener("scroll", updateTrain);
  window.addEventListener("resize", updateTrain);
  updateTrain();

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
    { threshold: [0.3, 0.6] }
  );

  sections.forEach(s => io.observe(s));
});
