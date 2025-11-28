// ===============================
// Tren sincronizado por secciones
// ===============================

const progressEl = document.getElementById("progress");
const trainEl = document.getElementById("train");
const trainBody = document.querySelector(".train-body");

const labels = Array.from(document.querySelectorAll(".label"));
const stations = Array.from(document.querySelectorAll(".station"));
const sections = Array.from(document.querySelectorAll("main section"));

// Colores de la paleta, uno por sección
const sectionColors = [
  "var(--acero)",
  "var(--senal)",
  "var(--oxido)",
  "var(--verde)",
  "var(--gris)"
];

function setTrainPosition(index) {
  const fraction = index / (sections.length - 1);

  // Barra de progreso
  progressEl.style.transform = `scaleX(${fraction})`;
  progressEl.style.background = sectionColors[index];

  // Posición del tren
  trainEl.style.left = `${fraction * 100}%`;

  // Color del cuerpo del tren
  if (trainBody) {
    trainBody.style.fill = sectionColors[index];
  }

  // Labels activos
  labels.forEach(l =>
    l.classList.toggle("is-active", Number(l.dataset.index) === index)
  );

  // Estaciones activas
  stations.forEach(s =>
    s.classList.toggle("is-active", Number(s.dataset.index) === index)
  );
}

// Observer: detecta sección dominante en pantalla
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
  rootMargin: "-45% 0px -45% 0px",
  threshold: [0.25, 0.5, 0.75]
});

sections.forEach(sec => observer.observe(sec));

// Click en menú: scroll suave a la sección
document.querySelector(".railway__labels").addEventListener("click", e => {
  const a = e.target.closest("a[href^='#']");
  if (!a) return;

  e.preventDefault();

  const id = a.getAttribute("href").slice(1);
  const el = document.getElementById(id);
  if (!el) return;

  const headerH = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--bar-h")
  ) || 72;

  const top =
    el.getBoundingClientRect().top +
    window.pageYOffset -
    (headerH + 16);

  window.scrollTo({
    top,
    behavior: "smooth"
  });
});

// Estado inicial
setTrainPosition(0);
