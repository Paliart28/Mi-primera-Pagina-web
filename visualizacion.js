document.addEventListener("DOMContentLoaded", () => {

  const progress = document.getElementById("progress");
  const train = document.getElementById("train");
  const labels = [...document.querySelectorAll(".label")];
  const stations = [...document.querySelectorAll(".station")];
  const sections = [...document.querySelectorAll("main section")];

  function updateTrain() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, window.scrollY / max));

    // barra
    progress.style.width = `${p * 100}%`;

    // tren
    const trackWidth = progress.parentElement.offsetWidth;
    train.style.left = `${p * trackWidth}px`;
  }

  window.addEventListener("scroll", updateTrain);
  window.addEventListener("resize", updateTrain);
  updateTrain();

  // Cambiar estación activa
  const io = new IntersectionObserver(entries => {
    let visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    let index = sections.indexOf(visible.target);

    labels.forEach((l,i)=> l.classList.toggle("label--active", i===index));
    stations.forEach((s,i)=> s.classList.toggle("station--active", i===index));
  }, { threshold: 0.5 });

  sections.forEach(s => io.observe(s));

});
