const progressEl = document.getElementById("progress");
const trainEl = document.getElementById("train");
const trainBody = document.querySelector(".train-body");

const labels = [...document.querySelectorAll(".label")];
const stations = [...document.querySelectorAll(".station")];
const sections = [...document.querySelectorAll("main section")];

const sectionColors = [
  "var(--acero)",
  "var(--senal)",
  "var(--oxido)",
  "var(--verde)",
  "var(--gris)"
];

function setTrainPosition(index) {
  const total = sections.length - 1;
  const fraction = index / total;

  // Avance del track
  progressEl.style.transform = `scaleX(${fraction})`;
  progressEl.style.background = sectionColors[index];

  // Posición del tren compensando su ancho
  trainEl.style.left = `calc(${fraction * 100}% - 20px)`;

  // Color dinámico del tren
  if (trainBody) trainBody.style.fill = sectionColors[index];

  // Labels activos
  labels.forEach(l =>
    l.classList.toggle("is-active", Number(l.dataset.index) === index)
  );

  // Estaciones activas
  stations.forEach(s =>
    s.classList.toggle("is-active", Number(s.dataset.index) === index)
  );
}

const observer = new IntersectionObserver(entries => {
  let best = null;

  entries.forEach(e => {
    if (!best || e.intersectionRatio > best.intersectionRatio) {
      best = e;
    }
  });

  if (best) {
    const idx = sections.indexOf(best.target);
    if (idx >= 0) setTrainPosition(idx);
  }
}, {
  root: null,
  rootMargin: "-40% 0px -40% 0px",
  threshold: [0, 0.25, 0.5, 0.75, 1]
});

sections.forEach(sec => observer.observe(sec));

document.querySelector(".railway__labels").addEventListener("click", e => {
  const a = e.target.closest("a[href^='#']");
  if (!a) return;

  e.preventDefault();

  const id = a.getAttribute("href").slice(1);
  const el = document.getElementById(id);
  if (!el) return;

  const headerH = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--bar-h")
  ) || 80;

  const top =
    el.getBoundingClientRect().top +
    window.pageYOffset -
    (headerH + 16);

  window.scrollTo({
    top,
    behavior: "smooth"
  });
});

// iniciar en la primera sección
setTrainPosition(0);
