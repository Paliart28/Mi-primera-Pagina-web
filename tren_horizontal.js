/* Tren sincronizado por secciones */

const progressEl = document.getElementById("progress");
const trainEl = document.getElementById("train");

const labels = Array.from(document.querySelectorAll(".label"));
const stations = Array.from(document.querySelectorAll(".station"));
const sections = Array.from(document.querySelectorAll("main section"));

/* Mueve el tren según el índice */
function setTrainPosition(index) {
  const fraction = index / (sections.length - 1);

  progressEl.style.transform = `scaleX(${fraction})`;
  trainEl.style.left = `${fraction * 100}%`;

  labels.forEach(l => l.classList.toggle("is-active", Number(l.dataset.index) === index));
  stations.forEach(s => s.classList.toggle("is-active", Number(s.dataset.index) === index));
}

/* Detecta qué sección domina la pantalla */
const observer = new IntersectionObserver(entries => {
  let best = null;

  for (const e of entries) {
    if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
  }

  if (best) {
    const idx = sections.indexOf(best.target);
    setTrainPosition(idx);
  }
}, {
  root: null,
  rootMargin: "-140px 0px 0px 0px",
  threshold: [0.25, 0.5, 0.75]
});

sections.forEach(sec => observer.observe(sec));

/* Click menú → baja exacto a la sección */
document.querySelector(".railway__labels").addEventListener("click", e => {
  const a = e.target.closest("a[href^='#']");
  if (!a) return;

  e.preventDefault();

  const id = a.getAttribute("href").slice(1);
  const el = document.getElementById(id);

  const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bar-h"));

  const top = el.getBoundingClientRect().top + window.pageYOffset - (header + 12);

  window.scrollTo({ top, behavior: "smooth" });
});
